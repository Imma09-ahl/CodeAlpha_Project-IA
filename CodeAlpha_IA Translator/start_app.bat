@echo off
echo Arret de tous les processus Python...
taskkill /F /IM python.exe 2>nul
timeout /t 2 /nobreak >nul
echo Demarrage de l'application...
python run.py

@REM Made with Bob
