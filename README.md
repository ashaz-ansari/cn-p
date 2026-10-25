# cn-p

Computer Network (CM31206) practical journal — Government Polytechnic, Pune.
Fourteen practicals, each as a Word file you can edit and a PDF ready to submit.

Every practical has two files:

| File | What it is |
|---|---|
| `p<N>.pdf` | Final version, ready to print or submit |
| `p<N>.docx` | Editable Word version |

Replace `<N>` with the practical number, from `1` to `14`.

## Download one practical

The practical number goes at the end of the link.

**Command Prompt, Git Bash, or PowerShell:**

```
curl.exe -LO https://raw.githubusercontent.com/ashaz-ansari/cn-p/main/p3.pdf
```

That saves `p3.pdf` in the folder you are in. Change the `3` for any other practical, and swap `pdf` for `docx` to get the Word file.

**Windows PowerShell, without curl:**

```powershell
Invoke-WebRequest -Uri https://raw.githubusercontent.com/ashaz-ansari/cn-p/main/p3.pdf -OutFile p3.pdf
```

**Both files at once, using the helper script:**

```bat
curl.exe -LO https://raw.githubusercontent.com/ashaz-ansari/cn-p/main/cnp.cmd
cnp 3
```

`cnp 3` downloads `CN-Practical-03.pdf` and `CN-Practical-03.docx` with readable names. Give it any number from 1 to 14. Put `cnp.cmd` in a folder on your `PATH` and it works from anywhere.

## The practicals

| No | Title | Files |
|---:|---|---|
| 1 | Survey Existing Network Infrastructure | [pdf](p1.pdf) · [docx](p1.docx) |
| 2 | Create and Test a Standard Straight Network Cable | [pdf](p2.pdf) · [docx](p2.docx) |
| 3 | Create and Test a Standard Cross Network Cable | [pdf](p3.pdf) · [docx](p3.docx) |
| 4 | Create a Small LAN | [pdf](p4.pdf) · [docx](p4.docx) |
| 5 | Create a Star Topology Network | [pdf](p5.pdf) · [docx](p5.docx) |
| 6 | Configure Static IP Address | [pdf](p6.pdf) · [docx](p6.docx) |
| 7 | Run Network Diagnostic Commands | [pdf](p7.pdf) · [docx](p7.docx) |
| 8 | Create a Network Based on IPv6 Address Using a Simulator | [pdf](p8.pdf) · [docx](p8.docx) |
| 9 | Install Wireshark and Capture Network Packets | [pdf](p9.pdf) · [docx](p9.docx) |
| 10 | Implement Classful Addressing in a Given Network | [pdf](p10.pdf) · [docx](p10.docx) |
| 11 | Locate Errors Using the Checksum Error Detection Method | [pdf](p11.pdf) · [docx](p11.docx) |
| 12 | Write a C Program for Parity Check Error Detection | [pdf](p12.pdf) · [docx](p12.docx) |
| 13 | Create a Hybrid Network Using Bluetooth | [pdf](p13.pdf) · [docx](p13.docx) |
| 14 | Create Tree Topology Using Cisco Packet Tracer | [pdf](p14.pdf) · [docx](p14.docx) |

Each document follows the journal format: Aim, Theory, materials or tables where the practical needs them, a network diagram, Procedure, Observation and Conclusion.
