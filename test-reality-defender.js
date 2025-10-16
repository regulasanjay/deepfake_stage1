#!/usr/bin/env node

/**
 * Reality Defender API Test Script
 * Run this script locally where you have internet access to test your API key
 */

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_KEY = 'PUru95eOFEa8XuTj6c8m080v8xXWKydL7x8AEapY';

console.log('🔍 Reality Defender API Key Tester');
console.log('=====================================');
console.log('API Key:', API_KEY.substring(0, 8) + '...' + API_KEY.substring(API_KEY.length - 4));
console.log('');

async function testAPIKey() {
  const endpoints = [
    'https://api.realitydefender.com/v2/detect',
    'https://api.realitydefender.com/detect',
    'https://api.realitydefender.com/api/v1/detect' // Alternative endpoint
  ];

  // Look for video files in current directory
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
  const currentDir = process.cwd();
  const files = fs.readdirSync(currentDir);
  
  let testVideoPath = null;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (videoExtensions.includes(ext)) {
      testVideoPath = path.join(currentDir, file);
      break;
    }
  }

  if (!testVideoPath) {
    console.log('⚠️  No video files found in current directory');
    console.log('   Please add a video file (.mp4, .avi, .mov) to test with');
    console.log('   Or specify a file path as argument: node test-reality-defender.js /path/to/video.mp4');
    
    if (process.argv[2]) {
      testVideoPath = process.argv[2];
      if (!fs.existsSync(testVideoPath)) {
        console.log('❌ File not found:', testVideoPath);
        return;
      }
    } else {
      return;
    }
  }

  console.log('📹 Using test video:', path.basename(testVideoPath));
  const fileSize = fs.statSync(testVideoPath).size;
  console.log('📊 File size:', (fileSize / 1024 / 1024).toFixed(2), 'MB');
  console.log('');

  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    console.log(`🧪 Test ${i + 1}/${endpoints.length}: ${endpoint}`);
    
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(testVideoPath), {
        filename: path.basename(testVideoPath),
        contentType: 'video/mp4'
      });

      console.log('   📤 Uploading file...');
      
      const response = await axios.post(endpoint, form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${API_KEY}`,
        },
        timeout: 120000, // 2 minute timeout
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      console.log('   ✅ SUCCESS!');
      console.log('   📊 Status:', response.status);
      console.log('   📋 Response:');
      console.log('   ', JSON.stringify(response.data, null, 4));
      console.log('');
      
      // If we get here, the API key works!
      console.log('🎉 API KEY IS WORKING!');
      console.log('✅ Your Reality Defender API key is valid and functional');
      return true;
      
    } catch (error) {
      if (error.response) {
        console.log('   ❌ API Error');
        console.log('   📊 Status:', error.response.status);
        console.log('   📋 Response:', error.response.data);
        
        if (error.response.status === 401) {
          console.log('   🔑 This indicates an authentication issue with your API key');
        } else if (error.response.status === 403) {
          console.log('   🚫 This indicates your API key doesn\'t have permission for this endpoint');
        } else if (error.response.status === 429) {
          console.log('   ⏰ Rate limit exceeded - wait before trying again');
        }
      } else if (error.code === 'ENOTFOUND') {
        console.log('   ❌ Network Error: Cannot reach', endpoint);
        console.log('   🌐 Check your internet connection');
      } else {
        console.log('   ❌ Error:', error.message);
      }
      console.log('');
    }
  }

  console.log('❌ All endpoints failed');
  console.log('💡 Possible issues:');
  console.log('   - API key might be invalid or expired');
  console.log('   - Endpoints might have changed');
  console.log('   - Network connectivity issues');
  console.log('   - File format not supported');
  console.log('');
  console.log('📞 Contact Reality Defender support for assistance');
  
  return false;
}

// Run the test
testAPIKey().catch(console.error);