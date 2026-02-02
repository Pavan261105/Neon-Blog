@echo off
echo Starting Backend...
start cmd /k "cd backend && python -m uvicorn main:app --reload"
echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"
echo App is starting! Check the opened windows for logs.
pause
