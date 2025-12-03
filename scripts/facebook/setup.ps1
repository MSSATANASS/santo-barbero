# Script de Inicio Rapido - Facebook Automation
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "SANTO BARBERO - CONFIGURACION DE FACEBOOK AUTOMATION" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Paso 1: Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Paso 2: Instalando dependencias..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Dependencias instaladas" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Paso 3: Configurando credenciales..." -ForegroundColor Yellow

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Archivo .env creado" -ForegroundColor Green
    Write-Host ""
    Write-Host "Edita .env con tus credenciales:" -ForegroundColor Cyan
    Write-Host "  1. FACEBOOK_PAGE_ACCESS_TOKEN" -ForegroundColor Gray
    Write-Host "  2. FACEBOOK_PAGE_ID" -ForegroundColor Gray
    Write-Host "  3. GEMINI_API_KEY" -ForegroundColor Gray
    Write-Host ""
    notepad .env
}

Write-Host ""
Write-Host "Paso 4: Verificando conexion..." -ForegroundColor Yellow
node test-connection.js

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "CONFIGURACION COMPLETADA!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Comandos disponibles:" -ForegroundColor Yellow
    Write-Host "  node ai-content-generator.js publish 'tema'" -ForegroundColor Gray
    Write-Host "  node scheduler.js weekly" -ForegroundColor Gray
    Write-Host "  node dashboard.js" -ForegroundColor Gray
}
