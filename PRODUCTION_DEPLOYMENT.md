# 🚀 Production Deployment Guide

## 📋 Prerequisites Checklist

Before deploying to production, ensure you have:
- ✅ PostgreSQL database (Neon/Supabase/AWS RDS/etc.)
- ✅ Reality Defender API key
- ✅ Domain name (optional but recommended)
- ✅ SSL certificate (for HTTPS)

---

## 🏗️ **Method 1: VPS/Server Deployment (Recommended)**

### Step 1: Prepare Your Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ 
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx -y
```

### Step 2: Deploy Your Application
```bash
# Clone your repository
git clone <your-repo-url>
cd deepfake-detection

# Install dependencies
npm install

# Create production environment file
nano .env
```

Add to `.env`:
```env
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
REALITY_DEFENDER_API_KEY=your_api_key
PORT=3000
```

### Step 3: Build and Start
```bash
# Build for production
npm run build

# Start with PM2
pm2 start dist/index.js --name "deepfake-app"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Step 4: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/deepfake-app
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    # Increase client max body size for video uploads
    client_max_body_size 500M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeout for video processing
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/deepfake-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL Certificate (Optional but Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

---

## ☁️ **Method 2: Cloud Platform Deployment**

### **Option A: Railway**
1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `DATABASE_URL`
   - `REALITY_DEFENDER_API_KEY`
3. Railway will automatically detect and deploy your Node.js app

### **Option B: Render**
1. Connect GitHub repository
2. Build Command: `npm run build`
3. Start Command: `npm start`
4. Set environment variables in Render dashboard

### **Option C: DigitalOcean App Platform**
1. Create new app from GitHub
2. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Add environment variables

### **Option D: AWS/Google Cloud/Azure**
Use their container services or VM instances following Method 1 steps.

---

## 🐳 **Method 3: Docker Deployment**

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REALITY_DEFENDER_API_KEY=${REALITY_DEFENDER_API_KEY}
      - PORT=3000
    restart: unless-stopped
    volumes:
      - /tmp:/tmp  # For temporary file processing

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl  # If using SSL
    depends_on:
      - app
    restart: unless-stopped
```

Deploy with Docker:
```bash
# Build and start
docker-compose up -d

# Check logs
docker-compose logs -f app
```

---

## 🔧 **Production Configuration**

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
REALITY_DEFENDER_API_KEY=your_api_key_here
PORT=3000

# Optional optimizations
NODE_OPTIONS=--max-old-space-size=2048
```

### Database Setup
```bash
# Push schema to production database
DATABASE_URL="your_production_db_url" npm run db:push
```

### Performance Optimizations
1. **Enable gzip compression** (Nginx handles this)
2. **Set up CDN** for static assets (optional)
3. **Database connection pooling** (already configured)
4. **Process management** with PM2

---

## 📊 **Monitoring & Maintenance**

### PM2 Commands
```bash
# Check status
pm2 status

# View logs
pm2 logs deepfake-app

# Restart app
pm2 restart deepfake-app

# Monitor resources
pm2 monit
```

### Health Checks
```bash
# Test API endpoints
curl http://your-domain.com/api/analyses

# Check database connection
curl -X POST http://your-domain.com/api/analyze \
  -F "video=@test.mp4"
```

---

## 🚨 **Security Considerations**

1. **Firewall**: Only open ports 80, 443, and SSH
2. **Environment Variables**: Never commit `.env` to git
3. **File Upload Security**: Already configured with file type validation
4. **Rate Limiting**: Consider adding rate limiting for API endpoints
5. **HTTPS**: Always use SSL in production

---

## 🎯 **Quick Start Commands**

### Local Production Test
```bash
# Build and test locally
npm run build
DATABASE_URL="your_db_url" REALITY_DEFENDER_API_KEY="your_key" npm start
```

### Server Deployment
```bash
git clone <repo>
cd deepfake-detection
npm install
npm run build
pm2 start dist/index.js --name deepfake-app
```

Your application will be available at `http://your-server-ip:3000` or your configured domain!

---

## 📞 **Support**

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Verify environment variables are set
3. Ensure database is accessible
4. Check Nginx configuration
5. Verify firewall settings

Your deepfake detection app is production-ready! 🎉