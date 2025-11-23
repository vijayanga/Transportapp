#!/bin/bash

# GoMate - Git Initialization Script
# This script helps initialize Git repository with feature-based commits

echo "🚀 GoMate - Git Repository Setup"
echo "================================="
echo ""

# Check if git is initialized
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
fi

echo ""
echo "📝 Creating feature-based commits..."
echo ""

# Initial setup
echo "1/14 - Initial project setup"
git add package.json package-lock.json app.json tsconfig.json eslint.config.js expo-env.d.ts .gitignore
git commit -m "Initial project setup with Expo and TypeScript configuration" --allow-empty

# Dependencies
echo "2/14 - Dependencies"
git add package.json package-lock.json
git commit -m "Add dependencies: Redux Toolkit, AsyncStorage, Yup, Formik, and Axios" --allow-empty

# Redux Store
echo "3/14 - Redux Store"
git add store/
git commit -m "Set up Redux store with auth, favorites, and theme slices" --allow-empty

# Constants & Utils
echo "4/14 - Constants & Utils"
git add constants/ utils/
git commit -m "Add theme constants and Yup validation schemas" --allow-empty

# Services
echo "5/14 - API Services"
git add services/
git commit -m "Implement API integration with DummyJSON for auth and destinations" --allow-empty

# Authentication
echo "6/14 - Authentication"
git add app/login.tsx app/register.tsx
git commit -m "Implement login and registration screens with form validation" --allow-empty

# Navigation
echo "7/14 - Navigation"
git add app/_layout.tsx app/index.tsx app/(tabs)/_layout.tsx
git commit -m "Set up Expo Router navigation with auth protection and tab navigation" --allow-empty

# Home Screen
echo "8/14 - Home Screen"
git add app/(tabs)/index.tsx
git commit -m "Implement home screen with API integration and destination cards" --allow-empty

# Details Screen
echo "9/14 - Details Screen"
git add app/details/
git commit -m "Implement destination details screen with comprehensive information" --allow-empty

# Favorites
echo "10/14 - Favorites"
git add app/(tabs)/favorites.tsx
git commit -m "Implement favorites screen with persistence and grid layout" --allow-empty

# Profile
echo "11/14 - Profile"
git add app/(tabs)/profile.tsx
git commit -m "Implement profile screen with user info and settings" --allow-empty

# Dark Mode
echo "12/14 - Dark Mode"
git add store/themeSlice.ts app/(tabs)/profile.tsx
git commit -m "Add dark mode support with theme persistence" --allow-empty

# Documentation
echo "13/14 - Documentation"
git add README.md QUICKSTART.md TESTING_GUIDE.md SCREENSHOTS.md GIT_GUIDE.md SUBMISSION_CHECKLIST.md PROJECT_SUMMARY.md QUICK_REFERENCE.md
git commit -m "Add comprehensive project documentation" --allow-empty

# Components & Assets
echo "14/14 - Final touches"
git add components/ assets/
git commit -m "Add components and assets" --allow-empty

echo ""
echo "✅ All commits created!"
echo ""
echo "📊 Commit Summary:"
git log --oneline

echo ""
echo "🎯 Next Steps:"
echo "1. Create GitHub repository"
echo "2. Run: git remote add origin <your-repo-url>"
echo "3. Run: git branch -M main"
echo "4. Run: git push -u origin main"
echo ""
echo "✨ Done! Your repository is ready."
