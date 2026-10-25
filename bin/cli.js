#!/usr/bin/env node
'use strict';

/*
 * cn-p — download a Computer Network (CM31206) practical by its number.
 *
 *   npx --yes github:ashaz-ansari/cn-p 6
 *
 * The documents live in the repository itself; this script fetches the
 * one you ask for from the repository's raw URLs.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO = 'ashaz-ansari/cn-p';
const BRANCH = 'main';
const BASE = 'https://raw.githubusercontent.com/' + REPO + '/' + BRANCH;

const TITLES = [
  'Survey Existing Network Infrastructure',
  'Create and Test a Standard Straight Network Cable',
  'Create and Test a Standard Cross Network Cable',
  'Create a Small LAN',
  'Create a Star Topology Network',
  'Configure Static IP Address',
  'Run Network Diagnostic Commands',
  'Create a Network Based on IPv6 Address Using a Simulator',
  'Install Wireshark and Capture Network Packets',
  'Implement Classful Addressing in a Given Network',
  'Locate Errors Using the Checksum Error Detection Method',
  'Write a C Program for Parity Check Error Detection',
  'Create a Hybrid Network Using Bluetooth',
  'Create Tree Topology Using Cisco Packet Tracer'
];

const COUNT = TITLES.length;

function pad(n) {
  return String(n).padStart(2, '0');
}

function usage() {
  console.log([
    'Computer Network (CM31206) practicals — download one by number.',
    '',
    '  npx --yes github:' + REPO + ' <number> [options]',
    '',
    '  <number>       1 to ' + COUNT,
    '  --pdf          only the PDF',
    '  --docx         only the Word file',
    '  -o <dir>       save into <dir>  (default: the current folder)',
    '  --list         list all ' + COUNT + ' practicals',
    '  -h, --help     show this message',
    '',
    'Examples',
    '  npx --yes github:' + REPO + ' 6',
    '  npx --yes github:' + REPO + ' 6 --pdf',
    '  npx --yes github:' + REPO + ' 12 -o D:\\cn\\practicals'
  ].join('\n'));
}

function list() {
  console.log('CN practicals in ' + REPO + ':\n');
  TITLES.forEach(function (title, i) {
    console.log('  ' + pad(i + 1) + '  ' + title);
  });
  console.log('\nDownload one with:  npx --yes github:' + REPO + ' 6');
}

function get(url, depth) {
  depth = depth || 0;
  return new Promise(function (resolve, reject) {
    https.get(url, { headers: { 'user-agent': 'cn-p' } }, function (res) {
      var code = res.statusCode;
      if (code >= 300 && code < 400 && res.headers.location && depth < 5) {
        res.resume();
        resolve(get(new URL(res.headers.location, url).href, depth + 1));
        return;
      }
      if (code !== 200) {
        res.resume();
        reject(new Error('server replied ' + code));
        return;
      }
      var parts = [];
      res.on('data', function (chunk) { parts.push(chunk); });
      res.on('end', function () { resolve(Buffer.concat(parts)); });
    }).on('error', function (err) {
      reject(err);
    });
  });
}

async function main() {
  var args = process.argv.slice(2);

  if (args.length === 0 || args.indexOf('-h') !== -1 || args.indexOf('--help') !== -1) {
    usage();
    return;
  }

  if (args.indexOf('--list') !== -1) {
    list();
    return;
  }

  var number = parseInt(args[0], 10);
  if (!Number.isInteger(number) || number < 1 || number > COUNT) {
    console.error('Give a practical number from 1 to ' + COUNT + '.');
    console.error('Example:  npx --yes github:' + REPO + ' 6');
    process.exitCode = 1;
    return;
  }

  var wantPdf = args.indexOf('--docx') === -1;
  var wantDocx = args.indexOf('--pdf') === -1;

  var outDir = '.';
  var oIndex = Math.max(args.indexOf('-o'), args.indexOf('--out'));
  if (oIndex !== -1 && args[oIndex + 1]) {
    outDir = args[oIndex + 1];
  }
  fs.mkdirSync(outDir, { recursive: true });

  var exts = [];
  if (wantPdf) exts.push('pdf');
  if (wantDocx) exts.push('docx');

  console.log('Practical ' + number + ': ' + TITLES[number - 1]);

  for (var i = 0; i < exts.length; i++) {
    var ext = exts[i];
    var target = path.join(outDir, 'CN-Practical-' + pad(number) + '.' + ext);
    var url = BASE + '/p' + number + '.' + ext;
    process.stdout.write('  downloading ' + path.basename(target) + ' ... ');
    try {
      var body = await get(url);
      if (body.length === 0) {
        throw new Error('empty file');
      }
      fs.writeFileSync(target, body);
      console.log('done (' + Math.round(body.length / 1024) + ' KB)');
    } catch (err) {
      console.log('failed');
      console.error('  could not fetch ' + url + ' — ' + err.message);
      process.exitCode = 1;
    }
  }
}

main().catch(function (err) {
  console.error('cn-p: ' + err.message);
  process.exitCode = 1;
});
