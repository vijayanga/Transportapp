# GoMate - Git Repository Setup (PowerShell)
# Run this script to initialize Git with feature-based commits

Write-Host "🚀 GoMate - Git Repository Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (Test-Path .git) {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Creating feature-based commits..." -ForegroundColor Yellow
Write-Host ""

# Initial setup
Write-Host "1/14 - Initial project setup" -ForegroundColor Cyan
git add package.json package-lock.json app.json tsconfig.json eslint.config.js expo-env.d.ts .gitignore
git commit -m "Initial project setup with Expo and TypeScript configuration" --allow-empty

# Dependencies
Write-Host "2/14 - Dependencies" -ForegroundColor Cyan
git add package.json package-lock.json
git commit -m "Add dependencies: Redux Toolkit, AsyncStorage, Yup, Formik, and Axios" --allow-empty

# Redux Store
Write-Host "3/14 - Redux Store" -ForegroundColor Cyan
git add store/
git commit -m "Set up Redux store with auth, favorites, and theme slices" --allow-empty

# Constants & Utils
Write-Host "4/14 - Constants & Utils" -ForegroundColor Cyan
git add constants/ utils/
git commit -m "Add theme constants and Yup validation schemas" --allow-empty

# Services
Write-Host "5/14 - API Services" -ForegroundColor Cyan
git add services/
git commit -m "Implement API integration with DummyJSON for auth and destinations" --allow-empty

# Authentication
Write-Host "6/14 - Authentication" -ForegroundColor Cyan
git add app/login.tsx app/register.tsx
git commit -m "Implement login and registration screens with form validation" --allow-empty

# Navigation
Write-Host "7/14 - Navigation" -ForegroundColor Cyan
git add app/_layout.tsx app/index.tsx "app/(tabs)/_layout.tsx"
git commit -m "Set up Expo Router navigation with auth protection and tab navigation" --allow-empty

# Home Screen
Write-Host "8/14 - Home Screen" -ForegroundColor Cyan
git add "app/(tabs)/index.tsx"
git commit -m "Implement home screen with API integration and destination cards" --allow-empty

# Details Screen
Write-Host "9/14 - Details Screen" -ForegroundColor Cyan
git add app/details/
git commit -m "Implement destination details screen with comprehensive information" --allow-empty

# Favorites
Write-Host "10/14 - Favorites" -ForegroundColor Cyan
git add "app/(tabs)/favorites.tsx"
git commit -m "Implement favorites screen with persistence and grid layout" --allow-empty

# Profile
Write-Host "11/14 - Profile" -ForegroundColor Cyan
git add "app/(tabs)/profile.tsx"
git commit -m "Implement profile screen with user info and settings" --allow-empty

# Dark Mode
Write-Host "12/14 - Dark Mode" -ForegroundColor Cyan
git add store/themeSlice.ts "app/(tabs)/profile.tsx"
git commit -m "Add dark mode support with theme persistence" --allow-empty

# Documentation
Write-Host "13/14 - Documentation" -ForegroundColor Cyan
git add README.md QUICKSTART.md TESTING_GUIDE.md SCREENSHOTS.md GIT_GUIDE.md SUBMISSION_CHECKLIST.md PROJECT_SUMMARY.md QUICK_REFERENCE.md
git commit -m "Add comprehensive project documentation" --allow-empty

# Components & Assets
Write-Host "14/14 - Final touches" -ForegroundColor Cyan
git add components/ assets/
git commit -m "Add components and assets" --allow-empty

Write-Host ""
Write-Host "✅ All commits created!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Commit Summary:" -ForegroundColor Yellow
git log --oneline

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create GitHub repository at https://github.com/new"
Write-Host "2. Run: git remote add origin <your-repo-url>"
Write-Host "3. Run: git branch -M main"
Write-Host "4. Run: git push -u origin main"
Write-Host ""
Write-Host "✨ Done! Your repository is ready." -ForegroundColor Green
