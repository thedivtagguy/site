import json
import os
import shutil
from meta_tags_parser import parse_tags_from_url_async, structs

# Assuming you have an async environment for parse_tags_from_url_async
# Define the path to your Markdown file and image directories
md_path = '/home/amnbh/Home/Personal/visual-references.md'
original_img_dir = '/home/amnbh/Home/Personal/attachments'
script_dir = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.abspath(os.path.join(script_dir, os.pardir, 'images'))

# Ensure the image directory exists
os.makedirs(img_dir, exist_ok=True)

async def convert_image_path(line):
    if '![[' in line and ']]' in line:
        start_pos, end_pos = line.find('![['), line.find(']]') + 2
        obsidian_img_path, img_name = line[start_pos:end_pos], line[start_pos+3:end_pos-2]
        original_path, new_path = os.path.join(original_img_dir, img_name), os.path.join(img_dir, img_name)

        if os.path.exists(original_path) and not os.path.exists(new_path):
            try:
                shutil.copy(original_path, new_path)
                print(f"Image copied: {img_name}")
            except Exception as e:
                print(f"Error copying {img_name}: {e}")

        return line.replace(obsidian_img_path, f'![{img_name}]({new_path})')
    return line

async def fetch_metadata_and_convert_md_to_json(md_path):
    with open(md_path, 'r') as md_file:
        lines = [await convert_image_path(line.strip()) for line in md_file if line.strip()]

    # Assuming the table is at the end of the document and starts with a header row followed by a separator
    table_start_idx = next(i for i, line in enumerate(lines) if '|' in line)
    header, *data_rows = lines[table_start_idx:]
    columns = [col.strip() for col in header.split('|')]

    json_data = []
    for row in data_rows:
        row_data = [data.strip() for data in row.split('|')]
        if len(row_data) != len(columns):
            continue
        json_row = dict(zip(columns, row_data))
        # Example URL extraction from row; adjust based on actual content
        url = json_row.get('Link')
        print(url)  # Adjust 'URL' based on actual column name containing URLs
        if url:
            tags_group: structs.TagsGroup = await parse_tags_from_url_async(url)
            # Example: Adding title and description from Open Graph meta tags
            json_row['title'] = tags_group.open_graph.title
            json_row['description'] = tags_group.open_graph.description
        json_data.append(json_row)

    json_output_path = os.path.abspath(os.path.join(script_dir, os.pardir, 'output.json'))
    with open(json_output_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

# Remember to run this in an async context
import asyncio
asyncio.run(fetch_metadata_and_convert_md_to_json(md_path))
