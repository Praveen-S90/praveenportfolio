const fs = require('fs');
const path = require('path');

const certsDir = "C:\\Users\\Admin\\.gemini\antigravity\\scratch\\portfolio\\assets\\certificates";

const renameMap = {
    "Certificate rdbms iit bombay.pdf": "iit-bombay-rdbms.pdf",
    "Coursera Project Leadership Prioritizing, Managing Risks,.pdf": "coursera-data-analysis.pdf",
    "From Relational Model (SQL) to MongoDB's.pdf": "sql-to-mongodb.pdf",
    "MongoDB and the Document Model.pdf": "mongodb.pdf",
    "Participant-Certificate iit bombay ML .pdf": "iit-bombay-ml.pdf",
    "SAP Business Data Cloud.pdf": "sap-business-data-cloud.pdf",
    "google  Data Analysis Coursera certificate  .pdf": "google-data-analytics.pdf",
    "juniper Open Learning  Design, Associate (JNCIADesign).pdf": "juniper-design-associate.pdf",
    "nptel admit card python.pdf": "nptel-python.pdf"
};

console.log("Starting renaming process in Node...");
for (const [oldName, newName] of Object.entries(renameMap)) {
    const oldPath = path.join(certsDir, oldName);
    const newPath = path.join(certsDir, newName);
    
    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Successfully renamed: '${oldName}' -> '${newName}'`);
        } catch (err) {
            console.error(`Error renaming '${oldName}':`, err.message);
        }
    } else {
        console.log(`File not found: '${oldName}'`);
    }
}
console.log("Renaming complete.");
