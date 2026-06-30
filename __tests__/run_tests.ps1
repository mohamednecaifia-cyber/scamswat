$ErrorActionPreference = "Stop"
$target = "https://scamswat.vercel.app/api/analyze"
$payloads = Get-Content "$PSScriptRoot\payloads.json" | ConvertFrom-Json

$passed = 0
$failed = 0
$total = $payloads.Count
$results = @()

Write-Host "`n========== SCAMSWAT PENETRATION TEST SUITE ==========" -ForegroundColor Cyan
Write-Host "Target: $target" -ForegroundColor Cyan
Write-Host "Total test cases: $total`n" -ForegroundColor Cyan

foreach ($test in $payloads) {
    $body = @{prompt = $test.prompt; type = $test.type} | ConvertTo-Json -Depth 3
    $body | Set-Content -Path "$env:TEMP\payload.json" -Encoding ASCII

    try {
        $response = curl.exe -s -X POST $target -H "Content-Type: application/json" -d "@$env:TEMP\payload.json" --max-time 20 2>&1
        $json = $response | Select-String -Pattern '^{.*}$' | ForEach-Object { $_.Matches.Value }
        if (-not $json) { throw "No JSON response" }
        $result = $json | ConvertFrom-Json

        $verdict = if ($result.isScam) { "SCAM" } else { "SAFE" }
        $expected = if ($test.expectScam) { "SCAM" } else { "SAFE" }
        $ok = $result.isScam -eq $test.expectScam

        $statusIcon = if ($ok) { "[PASS]" } else { "[FAIL]" }
        $fgColor = if ($ok) { "Green" } else { "Red" }

        Write-Host "$statusIcon $($test.id) $($test.desc)" -ForegroundColor $fgColor
        Write-Host "        Input : $($test.prompt.Substring(0, [Math]::Min(50, $test.prompt.Length)))..." -ForegroundColor Gray
        Write-Host "        Verdict: $verdict (conf: $($result.confidence)%) [expected: $expected]" -ForegroundColor Gray
        Write-Host "        Reasons: $($result.reasons -join ' | ')" -ForegroundColor DarkGray

        if ($ok) { $passed++ } else { $failed++ }

        $results += [PSCustomObject]@{
            ID = $test.id
            Desc = $test.desc
            Verdict = $verdict
            Confidence = $result.confidence
            Expected = $expected
            Status = if ($ok) { "PASS" } else { "FAIL" }
            Reasons = $result.reasons -join "; "
        }
    } catch {
        Write-Host "[FAIL] $($test.id) $($test.desc) - ERROR: $_" -ForegroundColor Red
        $failed++
        $results += [PSCustomObject]@{
            ID = $test.id
            Desc = $test.desc
            Verdict = "ERROR"
            Confidence = -1
            Expected = if ($test.expectScam) { "SCAM" } else { "SAFE" }
            Status = "FAIL"
            Reasons = $_.ToString()
        }
    }

    Start-Sleep -Milliseconds 100
}

Write-Host "`n========== SUMMARY ==========" -ForegroundColor Cyan
Write-Host "Total : $total" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
$pct = [math]::Round($passed / $total * 100, 1)
Write-Host "Rate  : $pct%`n" -ForegroundColor Yellow

$results | Format-Table ID, Status, Verdict, Confidence, Expected -AutoSize
