# PowerShell Script to start Vite dev server
# Workaround for npm path issues with spaces in directory name

$vitePath = Join-Path $PSScriptRoot "node_modules\vite\bin\vite.js"
node $vitePath
