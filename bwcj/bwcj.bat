@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

rem =============================================
rem Spring Boot Application Launcher (with Embedded JRE)
rem Version: 2.0
rem =============================================

rem Set colors
for /f "delims=;" %%a in ('color') do set "DEFAULT_COLOR=%%a"
color 0A

echo.
echo =============================================
echo   Spring Boot Application Launcher
echo   (Embedded JRE Included)
echo =============================================
echo.

rem Set JRE path
set "JRE_PATH=%~dp0jre"
set "JAVA_EXE=%JRE_PATH%\bin\java.exe"

rem Verify JRE exists
if not exist "%JAVA_EXE%" (
    echo.
    echo [ERROR] JRE not found in: %JRE_PATH%
    echo.
    echo Please ensure:
    echo 1. The 'jre' folder is in the same directory as this script
    echo 2. The JRE is extracted correctly
    echo.
    pause
    exit /b 1
)

rem Verify JRE works
echo [Step 1] Verifying embedded JRE...
"%JAVA_EXE%" -version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Embedded JRE is not working!
    echo.
    echo Please check the JRE package integrity.
    echo.
    pause
    exit /b 1
)

for /f "tokens=3" %%a in ('"%JAVA_EXE%" -version 2^>^&1 ^| findstr /i "version"') do (
    set "java_version=%%a"
    set "java_version=!java_version:~1,-1!"
)

echo [INFO] Using embedded JRE version: !java_version!
echo.

rem Find JAR file
echo [Step 2] Searching for application...
set "jar_file="
for %%i in (app\*.jar) do set "jar_file=%%i"

if not defined jar_file (
    echo.
    echo [ERROR] No application JAR file found!
    echo.
    echo Please ensure:
    echo 1. The JAR file is in the 'app' folder
    echo 2. There is only one JAR file in the folder
    echo.
    pause
    exit /b 1
)

echo [INFO] Found application: %jar_file%
echo.

rem Configure port
echo [Step 3] Configure application port
set /p port="Enter port number (default 9999): "
if not defined port set port=9999

echo [INFO] Using port: %port%
echo.

rem Configure JVM options
echo [Step 4] Configure JVM options (optional)
set /p jvm_opts="Enter JVM options (e.g. -Xms512m -Xmx1024m, press Enter to skip): "
echo.

rem Check port availability
echo [Step 5] Checking port %port% availability...
netstat -aon | findstr :%port% >nul
if %errorlevel% == 0 (
    echo.
    echo [ERROR] Port %port% is already in use!
    echo.
    echo Solutions:
    echo 1. Close the program using this port
    echo 2. Or choose another port
    echo.
    pause
    exit /b 1
)

echo [INFO] Port %port% is available
echo.

rem Start application
echo [Step 6] Starting application...
echo.
echo =============================================
echo   Application is starting... DO NOT CLOSE
echo   Access URL: http://localhost:%port%
echo   Backend API: http://localhost:%port%/api/
echo   Frontend: http://localhost:%port%/
echo   Stop application: Press Ctrl+C
echo =============================================
echo.

set "cmd="%JAVA_EXE%" -jar"
if defined jvm_opts set "cmd=!cmd! !jvm_opts!"
set "cmd=!cmd! "%jar_file%" --server.port=%port%"

echo [COMMAND] !cmd!
echo.

!cmd!

rem After application exits
echo.
echo =============================================
echo   Application has stopped
echo =============================================
echo.
pause
color %DEFAULT_COLOR%
endlocal