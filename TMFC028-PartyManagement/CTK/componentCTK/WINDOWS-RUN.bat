@echo off
echo 🚀 Starting CTK Execution (Windows)...

:: Step 1: Move into the scripts folder
cd /d %~dp0scripts

:: Step 2: Install Python dependencies
echo 📦 Installing Python dependencies...
pip install -r requirements.txt

:: Step 3: Run the CTK Executor
echo 🧪 Running CTK Executor...
python CTK_Executor.py

echo ✅ CTK execution complete.
pause
