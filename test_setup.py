#!/usr/bin/env python3
"""
Test script to verify the background remover setup
"""

def test_imports():
    """Test if all required packages can be imported"""
    try:
        import rembg
        print("✅ rembg imported successfully")
    except ImportError as e:
        print(f"❌ rembg import failed: {e}")
        return False
    
    try:
        from PIL import Image
        print("✅ PIL imported successfully")
    except ImportError as e:
        print(f"❌ PIL import failed: {e}")
        return False
    
    try:
        import flask
        print("✅ Flask imported successfully")
    except ImportError as e:
        print(f"❌ Flask import failed: {e}")
        return False
    
    return True

def test_rembg_functionality():
    """Test basic rembg functionality"""
    try:
        from rembg import remove
        from PIL import Image
        import io
        
        # Create a simple test image
        test_image = Image.new('RGB', (100, 100), color='red')
        
        # Test rembg
        result = remove(test_image)
        print("✅ rembg background removal test passed")
        return True
    except Exception as e:
        print(f"❌ rembg functionality test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Background Remover Setup...")
    print("=" * 40)
    
    imports_ok = test_imports()
    if imports_ok:
        functionality_ok = test_rembg_functionality()
        
        if functionality_ok:
            print("\n🎉 All tests passed! The setup is ready.")
            print("\n📋 Next steps:")
            print("1. Install dependencies: pip install -r requirements.txt")
            print("2. Run locally: python3 app.py")
            print("3. Deploy to Vercel: vercel --prod")
        else:
            print("\n❌ Some functionality tests failed.")
    else:
        print("\n❌ Import tests failed. Please install dependencies first:")
        print("pip install -r requirements.txt")

