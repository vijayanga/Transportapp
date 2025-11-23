# Git Commit Guide for GoMate

## 📝 Feature-Based Commits

This guide provides commit messages organized by feature, following best practices for the assignment requirement of "feature-based commits."

## 🚀 Initial Setup

```bash
git init
git add .
git commit -m "Initial project setup with Expo and TypeScript configuration"
```

## 📦 Dependency Installation

```bash
git add package.json package-lock.json
git commit -m "Add dependencies: Redux Toolkit, AsyncStorage, Yup, Formik, and Axios"
```

## 🗂️ Redux Store Setup

```bash
git add store/
git commit -m "Set up Redux store with auth, favorites, and theme slices"
```

### Individual Slice Commits (Alternative)

```bash
git add store/authSlice.ts
git commit -m "Implement authentication slice with login/logout actions"

git add store/favoritesSlice.ts
git commit -m "Implement favorites slice with add/remove/persist functionality"

git add store/themeSlice.ts
git commit -m "Implement theme slice for dark mode support"

git add store/index.ts store/hooks.ts
git commit -m "Configure Redux store and add typed hooks"
```

## 🔐 Authentication Feature

```bash
git add utils/validation.ts
git commit -m "Add Yup validation schemas for login and registration"

git add app/login.tsx
git commit -m "Implement login screen with form validation"

git add app/register.tsx
git commit -m "Implement registration screen with comprehensive validation"

git add services/api.ts
git commit -m "Add authentication API integration with DummyJSON"
```

## 🧭 Navigation Structure

```bash
git add app/_layout.tsx
git commit -m "Set up root layout with Redux Provider and auth protection"

git add app/index.tsx
git commit -m "Implement entry point with authentication routing"

git add app/(tabs)/_layout.tsx
git commit -m "Configure bottom tab navigation with themed icons"
```

## 🏠 Home Screen & API Integration

```bash
git add app/(tabs)/index.tsx
git commit -m "Implement home screen with destination list from API"

git add services/api.ts
git commit -m "Add destinations API integration with data transformation"
```

## 📄 Details Screen

```bash
git add app/details/[id].tsx
git commit -m "Implement destination details screen with full information display"
```

## ⭐ Favorites Feature

```bash
git add app/(tabs)/favorites.tsx
git commit -m "Implement favorites screen with grid layout and empty state"

git add store/favoritesSlice.ts
git commit -m "Add AsyncStorage persistence for favorites"
```

## 👤 Profile Screen

```bash
git add app/(tabs)/profile.tsx
git commit -m "Implement profile screen with user info and settings"
```

## 🎨 Styling & Theme

```bash
git add constants/theme.ts
git commit -m "Create theme system with colors, spacing, and typography"

git add app/(tabs)/profile.tsx
git commit -m "Add dark mode toggle functionality to profile screen"
```

## 🎨 UI Polish

```bash
git add app/(tabs)/index.tsx app/details/[id].tsx
git commit -m "Add Feather icons and improve card layouts"

git add app/(tabs)/
git commit -m "Implement responsive design across all screens"

git add app/(tabs)/index.tsx
git commit -m "Add pull-to-refresh functionality to home screen"
```

## 📚 Documentation

```bash
git add README.md
git commit -m "Add comprehensive README with setup instructions"

git add QUICKSTART.md
git commit -m "Add quick start guide for easy onboarding"

git add SCREENSHOTS.md
git commit -m "Add screenshot guide for documentation"

git add SUBMISSION_CHECKLIST.md
git commit -m "Add submission checklist for assignment requirements"
```

## 🐛 Bug Fixes (If needed)

```bash
git add <files>
git commit -m "Fix TypeScript navigation type errors"

git add <files>
git commit -m "Fix AsyncStorage persistence on app restart"

git add <files>
git commit -m "Fix favorite toggle animation and state sync"
```

## ✨ Enhancements

```bash
git add <files>
git commit -m "Add loading indicators for better UX"

git add <files>
git commit -m "Add error handling for API failures"

git add <files>
git commit -m "Improve form validation error messages"
```

## 🎯 Complete Feature Commits (Alternative Approach)

If you prefer larger feature-based commits:

```bash
# Authentication Feature
git add app/login.tsx app/register.tsx utils/validation.ts store/authSlice.ts services/api.ts
git commit -m "Feature: Complete authentication system with login, registration, and validation"

# Navigation Feature
git add app/_layout.tsx app/index.tsx app/(tabs)/_layout.tsx
git commit -m "Feature: Complete navigation structure with Expo Router and tab navigation"

# Home & API Feature
git add app/(tabs)/index.tsx services/api.ts
git commit -m "Feature: Home screen with API integration and destination display"

# Details Feature
git add app/details/[id].tsx
git commit -m "Feature: Destination details screen with comprehensive information"

# Favorites Feature
git add app/(tabs)/favorites.tsx store/favoritesSlice.ts
git commit -m "Feature: Favorites management with persistence"

# Profile & Theme Feature
git add app/(tabs)/profile.tsx store/themeSlice.ts constants/theme.ts
git commit -m "Feature: Profile screen with dark mode support"

# Styling Feature
git add constants/theme.ts app/**/*.tsx
git commit -m "Feature: Complete UI styling system with responsive design"
```

## 📋 Recommended Commit Strategy

### Option 1: Granular Commits (Recommended)

- Commit after each file/feature completion
- Clear, specific commit messages
- Easy to track changes
- Better for debugging

### Option 2: Feature Commits

- Commit complete features together
- Fewer commits overall
- Good for feature tracking
- Matches assignment requirements explicitly

## 🔧 Git Commands Reference

### Initial Setup

```bash
# Initialize repository
git init

# Check status
git status

# Add files
git add <filename>
git add .  # Add all files

# Commit changes
git commit -m "Your message"

# View commit history
git log --oneline
```

### Connecting to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/gomate.git
git branch -M main
git push -u origin main

# Subsequent pushes
git push
```

### Useful Commands

```bash
# See what changed
git diff

# Undo changes (before commit)
git restore <filename>

# Amend last commit
git commit --amend -m "New message"

# View commit history
git log --graph --oneline --all
```

## ✅ Pre-Push Checklist

Before pushing to GitHub:

- [ ] All files committed
- [ ] Meaningful commit messages
- [ ] No sensitive data (API keys, passwords)
- [ ] .gitignore properly configured
- [ ] README.md complete
- [ ] Package.json includes all dependencies

## 📝 Commit Message Best Practices

### Format

```
<type>: <subject>

<body (optional)>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: Add user authentication with JWT tokens
fix: Resolve AsyncStorage persistence issue on iOS
docs: Update README with installation instructions
style: Format code with Prettier
refactor: Restructure Redux store for better organization
```

## 🎓 For This Assignment

Recommended commit sequence:

1. ✅ Initial setup
2. ✅ Dependencies
3. ✅ Redux store
4. ✅ Authentication (login + register)
5. ✅ Navigation
6. ✅ API integration
7. ✅ Home screen
8. ✅ Details screen
9. ✅ Favorites feature
10. ✅ Profile screen
11. ✅ Theme system
12. ✅ Dark mode
13. ✅ UI polish
14. ✅ Documentation

Total: ~14 feature-based commits minimum

## 🚀 Quick Start Git Workflow

```bash
# 1. Initialize
git init
git add .
git commit -m "Initial project setup"

# 2. Create GitHub repo and connect
git remote add origin <your-repo-url>
git push -u origin main

# 3. After each feature
git add <files>
git commit -m "Feature: <description>"
git push

# 4. Before submission
git log --oneline  # Verify all commits
git push  # Final push
```

## 📌 Important Notes

1. **Never commit**:

   - `node_modules/`
   - `.env` files
   - Personal API keys
   - `.expo/` cache

2. **Always commit**:

   - Source code
   - Configuration files
   - README and documentation
   - package.json
   - .gitignore

3. **Commit messages should**:
   - Be clear and descriptive
   - Use present tense ("Add feature" not "Added feature")
   - Reference feature being implemented
   - Be under 72 characters for subject line

Happy committing! 🎉
