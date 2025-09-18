# Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/background-remover-app)

### Option 2: Manual Deploy

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration and deploy

## Local Development

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Run locally:**
```bash
python3 app.py
```

3. **Or use Vercel dev:**
```bash
vercel dev
```

## Environment Variables

No environment variables are required for basic functionality.

## File Size Limits

- Vercel Function timeout: 30 seconds
- Maximum file size: 10MB (recommended: 5MB)
- Memory limit: 1024MB

## Troubleshooting

### Common Issues

1. **Import errors on Vercel:**
   - Ensure `requirements.txt` includes all dependencies
   - Check Python version compatibility

2. **Function timeout:**
   - Reduce image size before processing
   - Optimize image compression

3. **Memory issues:**
   - Process smaller images
   - Consider image resizing before background removal

### Performance Tips

- Use PNG format for best quality
- Compress images before upload
- Consider implementing image resizing for large files

## Monitoring

Monitor your deployment in the Vercel dashboard:
- Function execution time
- Memory usage
- Error rates
- Request volume

