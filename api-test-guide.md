# Reality Defender API Testing Guide

## 🔑 Your API Key
```
REALITY_DEFENDER_API_KEY=PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY
```

## 📡 API Endpoints to Test
1. `https://api.realitydefender.com/v2/detect`
2. `https://api.realitydefender.com/detect`

---

## 🧪 Method 1: Postman Testing

### Step 1: Create New Request
- Method: `POST`
- URL: `https://api.realitydefender.com/v2/detect`

### Step 2: Set Headers
```
Authorization: Bearer PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY
Content-Type: multipart/form-data
```

### Step 3: Set Body
- Select `form-data`
- Key: `file` (set type to `File`)
- Value: Upload any small video file (MP4, AVI, MOV)

### Step 4: Send Request
Expected responses:
- ✅ `200 OK`: API key is valid and working
- ❌ `401 Unauthorized`: API key is invalid
- ❌ `403 Forbidden`: API key doesn't have permissions
- ❌ `429 Too Many Requests`: Rate limit exceeded

---

## 🧪 Method 2: cURL Testing

### Test 1: Basic Authentication
```bash
curl -X POST https://api.realitydefender.com/v2/detect \
  -H "Authorization: Bearer PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY" \
  -F "file=@/path/to/your/video.mp4"
```

### Test 2: Alternative Endpoint
```bash
curl -X POST https://api.realitydefender.com/detect \
  -H "Authorization: Bearer PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY" \
  -F "file=@/path/to/your/video.mp4"
```

---

## 🧪 Method 3: Node.js Testing Script

Save this as `test-rd-api.js` and run with `node test-rd-api.js`:

```javascript
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const API_KEY = 'PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY';

async function testRealityDefenderAPI() {
  const endpoints = [
    'https://api.realitydefender.com/v2/detect',
    'https://api.realitydefender.com/detect'
  ];

  // Create a test video file (you can replace this with a real video file path)
  const videoPath = './test-video.mp4'; // Replace with your video file path
  
  if (!fs.existsSync(videoPath)) {
    console.log('❌ Please provide a video file at:', videoPath);
    return;
  }

  for (const endpoint of endpoints) {
    try {
      console.log(`\n🧪 Testing: ${endpoint}`);
      
      const form = new FormData();
      form.append('file', fs.createReadStream(videoPath));

      const response = await axios.post(endpoint, form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${API_KEY}`,
        },
        timeout: 60000, // 60 second timeout
      });

      console.log('✅ SUCCESS!');
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(response.data, null, 2));
      return true;
      
    } catch (error) {
      if (error.response) {
        console.log('❌ API Error:');
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      } else {
        console.log('❌ Network Error:', error.message);
      }
    }
  }
  
  return false;
}

testRealityDefenderAPI();
```

---

## 🔍 Expected API Response Format

When successful, Reality Defender typically returns:

```json
{
  "result": {
    "is_deepfake": false,
    "confidence": 0.85,
    "video_metadata": {
      "duration": 30.5,
      "resolution": "1920x1080",
      "frame_rate": 30
    }
  }
}
```

Or alternative format:
```json
{
  "verdict": "authentic",
  "score": 85.2,
  "metadata": {
    "duration": 30.5,
    "resolution": "1920x1080"
  }
}
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid API Key"
- ✅ Double-check the API key spelling
- ✅ Ensure no extra spaces or characters
- ✅ Contact Reality Defender support

### Issue 2: "File too large"
- ✅ Try with a smaller video file (< 100MB)
- ✅ Check Reality Defender's file size limits

### Issue 3: "Unsupported file format"
- ✅ Use MP4, AVI, or MOV files only
- ✅ Ensure the file is a valid video

### Issue 4: Network timeout
- ✅ Try with a smaller file
- ✅ Check internet connection
- ✅ Increase timeout in your requests

---

## 📞 Next Steps

1. **Test with Postman first** - easiest method
2. **Try different video files** - small test files work best
3. **Check API documentation** - Reality Defender may have updated endpoints
4. **Contact Reality Defender support** if API key issues persist

Your API key format looks correct: `PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY`