
from PIL import Image
import os

def create_solid_png(filename, size=(32, 32), color=(255, 255, 255, 255)):
    img = Image.new('RGBA', size, color)
    img.save(filename, "PNG")

# Define the base path for assets relative to the script's location
assets_base_path = "../public/assets/ui/"

# Ensure the directory exists
os.makedirs(assets_base_path, exist_ok=True)

# Create placeholder images with specific colors
create_solid_png(os.path.join(assets_base_path, "parchment.png"), color=(210, 180, 140, 255)) # Light brown/beige
create_solid_png(os.path.join(assets_base_path, "btn_base.png"), color=(122, 78, 25, 255)) # Dark brown/panel
create_solid_png(os.path.join(assets_base_path, "goldSpark.png"), color=(201, 166, 78, 255)) # Gold/yellow

print("Solid placeholder images created.")
