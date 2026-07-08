import os

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

found = False
start_idx = -1
end_idx = -1
skills_count = 0

out_lines = []

for idx, line in enumerate(lines):
    if 'id="skills"' in line or 'id=\'skills\'' in line:
        start_idx = idx + 1
        found = True
        out_lines.append(f"Skills section starts at line {start_idx}: {line.strip()}\n")
    if found and '</section>' in line:
        skills_count += 1
        if skills_count == 1: # Usually it's the first </section> after the start
            end_idx = idx + 1
            out_lines.append(f"Skills section ends at line {end_idx}: {line.strip()}\n")
            break

# Print some lines around the skills section
if start_idx != -1:
    out_lines.append("\n--- SKILLS SECTION CONTENT PREVIEW ---\n")
    end_preview = min(end_idx + 10 if end_idx != -1 else start_idx + 200, len(lines))
    for i in range(start_idx - 5, end_preview):
        out_lines.append(f"{i+1}: {lines[i]}")

with open('skills_output.txt', 'w', encoding='utf-8') as f:
    f.writelines(out_lines)

print("Done! Output written to skills_output.txt")
