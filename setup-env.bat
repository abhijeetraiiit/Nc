@echo off
REM setup-env.bat
REM Creates .env file from .env.example if it doesn't exist
REM Validates that DATABASE_URL is configured

echo.
echo Checking environment setup...
echo.

REM Check if .env.example exists
echo Checking for .env.example...
if not exist ".env.example" (
    echo [ERROR] .env.example not found
    echo.
    echo The .env.example file is missing from the repository.
    echo This is required to create your .env file.
    exit /b 1
)
echo [OK] .env.example found

echo.

REM Check if .env already exists
echo Checking for .env file...
if exist ".env" (
    echo [OK] .env file already exists
    echo.
    echo Your .env file is already configured.
    echo If you want to reset it, delete .env and run this script again.
    echo.
    
    REM Check if DATABASE_URL is set
    findstr /C:"DATABASE_URL=" ".env" >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] DATABASE_URL is configured
    ) else (
        echo [ERROR] DATABASE_URL not found in .env
        echo.
        echo Please add DATABASE_URL to your .env file.
        echo You can copy it from .env.example:
        echo.
        echo DATABASE_URL="postgresql://nc_user:nc_password@localhost:5432/nc_ecommerce"
        exit /b 1
    )
    
    echo.
    echo Environment setup is complete!
    exit /b 0
)

echo [WARNING] .env file not found
echo.

REM Create .env from .env.example
echo Creating .env file from .env.example...
copy ".env.example" ".env" >nul

if %errorlevel% equ 0 (
    echo [OK] .env file created successfully!
) else (
    echo [ERROR] Failed to create .env file
    exit /b 1
)

echo.

REM Validate DATABASE_URL exists
echo Validating DATABASE_URL...
findstr /C:"DATABASE_URL=" ".env" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] DATABASE_URL is configured correctly
) else (
    echo [ERROR] DATABASE_URL not found in .env
    echo.
    echo Something went wrong. Please check your .env.example file.
    exit /b 1
)

echo.
echo Environment setup complete!
echo.
echo Your .env file has been created with default values.
echo.
echo You can now run:
echo   cd packages\database
echo   npx prisma migrate dev --name init
echo.
echo Note: The default DATABASE_URL is configured for local development.
echo       For production, update the values in .env
echo.

exit /b 0
