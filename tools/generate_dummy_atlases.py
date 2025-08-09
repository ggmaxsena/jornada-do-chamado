from PIL import Image
import json
import os

# Define the base path for assets relative to the script's location
assets_base_dir = "../public/assets/characters/layers/"

def create_dummy_atlas_asset(name, color, size=(64, 64)):
    # Ensure the directory exists
    os.makedirs(assets_base_dir, exist_ok=True)

    # Create PNG
    png_path = os.path.join(assets_base_dir, f"{name}.png")
    img = Image.new('RGBA', size, color)
    img.save(png_path, "PNG")

    # Create JSON
    json_path = os.path.join(assets_base_dir, f"{name}.json")
    data = {
        "frames": {
            f"{name}_0": {
                "frame": {"x": 0, "y": 0, "w": size[0], "h": size[1]},
                "rotated": False,
                "trimmed": False,
                "spriteSourceSize": {"x": 0, "y": 0, "w": size[0], "h": size[1]},
                "sourceSize": {"w": size[0], "h": size[1]}
            }
        },
        "meta": {
            "app": "Phaser",
            "version": "3.0",
            "image": f"{name}.png",
            "format": "RGBA8888",
            "size": {"w": size[0], "h": size[1]},
            "scale": "1"
        }
    }
    with open(json_path, 'w') as f:
        json.dump(data, f, indent=2)

# Create dummy assets for each atlas
create_dummy_atlas_asset("body", (100, 100, 100, 255)) # Grey
create_dummy_atlas_asset("robes", (150, 0, 0, 255)) # Red
create_dummy_atlas_asset("armors", (0, 150, 0, 255)) # Green
create_dummy_atlas_asset("weapons", (0, 0, 150, 255)) # Blue
create_dummy_atlas_asset("fx", (200, 200, 0, 255)) # Yellow

print("Dummy atlas assets created.")