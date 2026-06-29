# Prompt Meadow — Asset Downloader
# Downloads free CC0 game assets from Kenney.nl and OpenGameArt
# Run: powershell -ExecutionPolicy Bypass -File scripts/download-assets.ps1

$ProgressPreference = "SilentlyContinue"
$AssetDir = "E:\Workspace\prompt-meadow\public\assets"
New-Item -ItemType Directory -Force -Path "$AssetDir\kenney", "$AssetDir\oga", "$AssetDir\temp" | Out-Null

Write-Host "🌿 Prompt Meadow Asset Downloader" -ForegroundColor Green
Write-Host "==================================`n"

# ── Helper ──
function Download-Pack {
    param($Name, $Url, $Subdir)
    $zipPath = "$AssetDir\temp\$Name.zip"
    $dest = "$AssetDir\$Subdir\$Name"
    try {
        Write-Host "  ⏳ Downloading $Name..." -NoNewline
        Invoke-WebRequest -Uri $Url -OutFile $zipPath -ErrorAction Stop
        Expand-Archive -LiteralPath $zipPath -DestinationPath $dest -Force
        Write-Host " ✓" -ForegroundColor Green
    } catch {
        Write-Host " ✗ ($($_.Exception.Message))" -ForegroundColor Red
    }
}

# ── 1. Kenney UI Pack (buttons, panels, sliders, icons) ──
Download-Pack -Name "ui-pack" `
    -Url "https://kenney.nl/data/kenney_ui-pack.zip" `
    -Subdir "kenney"

# ── 2. Kenney Pixel Platformer (tiles, characters, items) ──
Download-Pack -Name "pixel-platformer" `
    -Url "https://kenney.nl/data/kenney_pixel-platformer.zip" `
    -Subdir "kenney"

# ── 3. Kenney Animal Pack (farm animals as agent icons) ──
Download-Pack -Name "animal-pack" `
    -Url "https://kenney.nl/data/kenney_animal-pack.zip" `
    -Subdir "kenney"

# ── 4. Kenney RPG Audio (cozy background music) ──
Download-Pack -Name "rpg-audio" `
    -Url "https://kenney.nl/data/kenney_rpg-audio.zip" `
    -Subdir "kenney"

# ── 5. OpenGameArt — 16x16 RPG Items ──
Write-Host "`n📦 OpenGameArt packs require manual download:"
Write-Host "  → https://opengameart.org/content/98-pixel-art-rpg-icons"
Write-Host "  → https://opengameart.org/content/base-character-spritesheet-16x16"
Write-Host "  → https://opengameart.org/content/stunning-pixel-art-rpg-tileset"

# ── Cleanup ──
Remove-Item -LiteralPath "$AssetDir\temp" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n✅ Done! Assets in: $AssetDir" -ForegroundColor Green
Write-Host "   (OpenGameArt packs: download manually from the URLs above)" -ForegroundColor Yellow
