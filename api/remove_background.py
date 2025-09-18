from http.server import BaseHTTPRequestHandler
import json
import base64
import io
from rembg import remove
from PIL import Image
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Set CORS headers
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            # Get content length
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse JSON data
            data = json.loads(post_data.decode('utf-8'))
            
            # Get image data and format
            image_data = data.get('image')
            output_format = data.get('format', 'PNG').upper()
            
            if not image_data:
                self.wfile.write(json.dumps({'error': 'No image data provided'}).encode())
                return
            
            # Decode base64 image
            image_bytes = base64.b64decode(image_data.split(',')[1])
            input_image = Image.open(io.BytesIO(image_bytes))
            
            # Remove background using rembg
            output_image = remove(input_image)
            
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
                'format': format_ext
            }
            
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

