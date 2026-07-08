$certsDir = "C:\Users\Admin\.gemini\antigravity\scratch\portfolio\assets\certificates"

$renameMap = @{
    "Certificate rdbms iit bombay.pdf" = "iit-bombay-rdbms.pdf"
    "Coursera Project Leadership Prioritizing, Managing Risks,.pdf" = "coursera-data-analysis.pdf"
    "From Relational Model (SQL) to MongoDB's.pdf" = "sql-to-mongodb.pdf"
    "MongoDB and the Document Model.pdf" = "mongodb.pdf"
    "Participant-Certificate iit bombay ML .pdf" = "iit-bombay-ml.pdf"
    "SAP Business Data Cloud.pdf" = "sap-business-data-cloud.pdf"
    "google  Data Analysis Coursera certificate  .pdf" = "google-data-analytics.pdf"
    "juniper Open Learning  Design, Associate (JNCIADesign).pdf" = "juniper-design-associate.pdf"
    "nptel admit card python.pdf" = "nptel-python.pdf"
}

Write-Host "Starting renaming process..."
foreach ($oldName in $renameMap.Keys) {
    $newName = $renameMap[$oldName]
    $oldPath = Join-Path $certsDir $oldName
    $newPath = Join-Path $certsDir $newName
    
    if (Test-Path $oldPath) {
        try {
            Rename-Item -Path $oldPath -NewName $newName -ErrorAction Stop
            Write-Host "Successfully renamed: '$oldName' -> '$newName'"
        } catch {
            Write-Host "Error renaming '$oldName': $_"
        }
    } else {
        Write-Host "File not found: '$oldName'"
    }
}
Write-Host "Renaming complete."
