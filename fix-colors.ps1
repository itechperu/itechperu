# Script para reemplazar colores hardcodeados con variables CSS dinámicas

$files = @(
    "components\layout\Navbar.tsx",
    "components\layout\Footer.tsx",
    "components\home\LandingPage.tsx",
    "app\components\ProductList.tsx",
    "app\info\faq\page.tsx",
    "app\info\envios\page.tsx",
    "app\info\garantia\page.tsx",
    "app\info\contacto\page.tsx"
)

$replacements = @{
    "color: '#fff'" = "color: 'var(--lp-text-primary)'"
    "color: '#ffffff'" = "color: 'var(--lp-text-primary)'"
    "color: '#94a3b8'" = "color: 'var(--lp-text-secondary)'"
    "color: '#e2e8f0'" = "color: 'var(--lp-text-secondary)'"
    "color: '#0f172a'" = "color: 'var(--lp-text-primary)'"
}

foreach ($file in $files) {
    $fullPath = "c:\Users\fabio\OneDrive\Desktop\PROYECTOS ONLINE\iTech Peru Oficial\itech-store\$file"
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        $modified = $false
        
        foreach ($key in $replacements.Keys) {
            if ($content -match [regex]::Escape($key)) {
                $content = $content -replace [regex]::Escape($key), $replacements[$key]
                $modified = $true
            }
        }
        
        if ($modified) {
            Set-Content -Path $fullPath -Value $content -NoNewline
            Write-Host "✓ Updated: $file"
        }
    }
}

Write-Host "`n✅ All color replacements completed!"
