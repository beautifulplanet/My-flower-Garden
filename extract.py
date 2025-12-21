import re

with open('FlowerGarden-Standalone.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find body content
body_match = re.search(r'<body>.*?(?=<script>)', content, re.DOTALL)
if body_match:
    body_content = body_match.group(0)
    
    new_html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Flower Garden — A Botanical Journal</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌸</text></svg>">
</head>
''' + body_content + '''
    <script src="botanical-illustrations.js"></script>
    <script src="game.js"></script>
</body>
</html>'''
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print('SUCCESS: Created fresh index.html!')
else:
    print('ERROR: Could not find body content')
