#!/bin/bash

echo "🚛 E-Truck Transport System - Vercel Deployment"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Test build locally first
echo "Testing build locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Deploying to Vercel..."
    
    # Deploy to Vercel
    vercel --prod
    
    echo "🎉 Deployment complete!"
    echo "Your E-Truck Transport System is now live!"
    echo ""
    echo "Demo Accounts:"
    echo "Admin: admin@etruck.com / admin123"
    echo "Agent: agent@etruck.com / agent123"
    echo "Driver: driver@etruck.com / driver123"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
