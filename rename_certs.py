import os

certs_dir = r"C:\Users\Admin\.gemini\antigravity\scratch\portfolio\assets\certificates"

rename_map = {
    "Certificate rdbms iit bombay.pdf": "iit-bombay-rdbms.pdf",
    "Coursera Project Leadership Prioritizing, Managing Risks,.pdf": "coursera-data-analysis.pdf",
    "From Relational Model (SQL) to MongoDB's.pdf": "sql-to-mongodb.pdf",
    "MongoDB and the Document Model.pdf": "mongodb.pdf",
    "Participant-Certificate iit bombay ML .pdf": "iit-bombay-ml.pdf",
    "SAP Business Data Cloud.pdf": "sap-business-data-cloud.pdf",
    "google  Data Analysis Coursera certificate  .pdf": "google-data-analytics.pdf",
    "juniper Open Learning  Design, Associate (JNCIADesign).pdf": "juniper-design-associate.pdf",
    "nptel admit card python.pdf": "nptel-python.pdf"
}

print("Starting file renaming...")
for old_name, new_name in rename_map.items():
    old_path = os.path.join(certs_dir, old_name)
    new_path = os.path.join(certs_dir, new_name)
    if os.path.exists(old_path):
        try:
            os.rename(old_path, new_path)
            print(f"Successfully renamed: '{old_name}' -> '{new_name}'")
        except Exception as e:
            print(f"Error renaming '{old_name}': {e}")
    else:
        print(f"File not found: '{old_name}'")
print("Finished renaming.")
