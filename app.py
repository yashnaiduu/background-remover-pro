from flask import Flask, render_template, request, jsonify
try:
    # Prefer backgroundremover if available (supports models and alpha matting)
    from backgroundremover.bg import remove as br_remove
    HAS_BGREMOVER = True
except Exception:
    HAS_BGREMOVER = False
from rembg import remove as rembg_remove
from PIL import Image
import base64
import io
import os

app = Flask(__name__, static_folder='public', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/remove_background', methods=['POST'])
def remove_background():
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Get image data and format
        image_data = data['image']
        output_format = data.get('format', 'PNG').upper()
        # Optional processing params (backgroundremover)
        model_name = data.get('model', 'u2net')
        alpha_matting = bool(data.get('alpha_matting', False))
        am_fg = int(data.get('alpha_matting_foreground_threshold', 240))
        am_bg = int(data.get('alpha_matting_background_threshold', 10))
        am_erode = int(data.get('alpha_matting_erode_structure_size', 10))
        am_base = int(data.get('alpha_matting_base_size', 1000))
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        input_image = Image.open(io.BytesIO(image_bytes))
        
        # Remove background using preferred library
        output_image: Image.Image
        if HAS_BGREMOVER:
            try:
                # backgroundremover expects bytes and returns bytes (PNG with alpha)
                result_bytes = br_remove(
                    image_bytes,
                    model_name=model_name,
                    alpha_matting=alpha_matting,
                    alpha_matting_foreground_threshold=am_fg,
                    alpha_matting_background_threshold=am_bg,
                    alpha_matting_erode_structure_size=am_erode,
                    alpha_matting_base_size=am_base,
                )
                output_image = Image.open(io.BytesIO(result_bytes))
            except Exception:
                # Fallback to rembg on error
                output_image = rembg_remove(input_image)
        else:
            output_image = rembg_remove(input_image)
        
        # Convert to desired format
        if output_format == 'JPG' or output_format == 'JPEG':
            # For JPG, we need to add a white background since JPG doesn't support transparency
            white_background = Image.new('RGB', output_image.size, (255, 255, 255))
            white_background.paste(output_image, mask=output_image.split()[-1] if output_image.mode == 'RGBA' else None)
            output_image = white_background
            format_ext = 'JPEG'
        elif output_format == 'WEBP':
            format_ext = 'WEBP'
        else:
            format_ext = 'PNG'
        
        # Save to bytes
        output_buffer = io.BytesIO()
        output_image.save(output_buffer, format=format_ext, quality=95)
        output_buffer.seek(0)
        
        # Encode to base64
        output_base64 = base64.b64encode(output_buffer.getvalue()).decode('utf-8')
        
        # Return result
        result = {
            'success': True,
            'image': f'data:image/{format_ext.lower()};base64,{output_base64}',
            'format': format_ext,
            'engine': 'backgroundremover' if HAS_BGREMOVER else 'rembg',
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
