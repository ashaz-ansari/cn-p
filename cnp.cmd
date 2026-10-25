@echo off
setlocal
set "REPO=https://raw.githubusercontent.com/ashaz-ansari/cn-p/main"
if "%~1"=="" (
    echo Usage: cnp ^<practical number^>      example:  cnp 3
    echo Downloads the PDF and Word file of that practical.
    exit /b 1
)
set /a N=%~1
if %N% lss 1 (
    echo Give a practical number from 1 to 14.
    exit /b 1
)
if %N% gtr 14 (
    echo Give a practical number from 1 to 14.
    exit /b 1
)
set "PAD=0%N%"
set "PAD=%PAD:~-2%"
curl.exe -fsSL -o "CN-Practical-%PAD%.pdf"  "%REPO%/p%N%.pdf"
if errorlevel 1 (
    echo Could not download p%N%.pdf
    exit /b 1
)
curl.exe -fsSL -o "CN-Practical-%PAD%.docx" "%REPO%/p%N%.docx"
if errorlevel 1 (
    echo Could not download p%N%.docx
    exit /b 1
)
echo Downloaded CN-Practical-%PAD%.pdf and CN-Practical-%PAD%.docx
exit /b 0
