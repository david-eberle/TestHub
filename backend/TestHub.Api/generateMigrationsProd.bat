@echo off
REM Save current value
set OLD_ENV=%ASPNETCORE_ENVIRONMENT%

REM Put into Production mode
set ASPNETCORE_ENVIRONMENT=Production

REM Generate migration pointing to SQL Server
dotnet ef migrations add AddErrorMessageModels --context TestHubContext

REM Return to previous value (or Development)
set ASPNETCORE_ENVIRONMENT=%OLD_ENV%
echo Environment restored to %ASPNETCORE_ENVIRONMENT%
