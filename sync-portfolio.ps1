$ErrorActionPreference = "Stop"

Write-Host "Syncing portfolio files to root..."

Copy-Item "portfolio\index.html" "." -Force
Copy-Item "portfolio\styles.css" "." -Force
Copy-Item "portfolio\script.js" "." -Force
Copy-Item "portfolio\resume.html" "." -Force
Copy-Item "portfolio\Chukwuebuka_Resume_2026.pdf" "." -Force

# Mirror images folder contents to root images folder
New-Item -ItemType Directory -Path "images" -Force | Out-Null
Copy-Item "portfolio\images\*" "images\" -Recurse -Force

Write-Host "Sync complete."
Write-Host "Next: git add . && git commit -m 'Sync portfolio updates to root' && git push origin main"
