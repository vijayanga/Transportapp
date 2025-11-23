# GoMate - Quick Start Guide

## 📋 Prerequisites Checklist

Before running the app, ensure you have:

- ✅ Node.js installed (v16+)
- ✅ npm or yarn package manager
- ✅ Expo Go app on your phone (iOS/Android)
- ✅ OR Android Studio / Xcode for emulators

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

### Step 3: Run the App

- **On Physical Device**: Scan QR code with Expo Go
- **On Android Emulator**: Press `a`
- **On iOS Simulator**: Press `i`

## 🔑 Test Credentials

**Login with:**

- Username: `emilys`
- Password: `emilyspass`

**Or register a new account!**

## 📱 App Flow

1. **Login/Register** → Enter credentials or create account
2. **Home Screen** → Browse destinations from API
3. **Tap Card** → View destination details
4. **Heart Icon** → Add to favorites
5. **Favorites Tab** → See saved destinations
6. **Profile Tab** → Toggle dark mode, logout

## 🎯 Features to Test

### Authentication

- [ ] Register with valid details
- [ ] Try invalid inputs (see validation errors)
- [ ] Login with demo credentials
- [ ] Logout and login again

### Destinations

- [ ] Pull down to refresh list
- [ ] Tap card to see details
- [ ] Scroll through destination info
- [ ] View tags, tips, and metadata

### Favorites

- [ ] Tap heart to add favorite
- [ ] View favorites in Favorites tab
- [ ] Remove from favorites
- [ ] Favorites persist after app restart

### Dark Mode

- [ ] Toggle dark mode in Profile
- [ ] Check all screens update
- [ ] Close and reopen app (should remember preference)

### Navigation

- [ ] Use bottom tabs
- [ ] Navigate to details and back
- [ ] Test deep navigation flow

## 🐛 Troubleshooting

### Issue: Dependencies not installing

```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### Issue: Expo server won't start

```bash
# Reset Expo cache
npx expo start -c
```

### Issue: App won't load on device

1. Ensure phone and computer on same WiFi
2. Try scanning QR code again
3. Restart Expo Go app

### Issue: TypeScript errors

```bash
# These are expected for Expo Router paths
# The app will still run correctly
```

## 📊 Project Stats

- **Total Files**: 20+ TypeScript/React files
- **State Management**: Redux with 3 slices
- **Screens**: 7 main screens
- **API Integration**: DummyJSON
- **Form Validation**: Yup with Formik
- **Storage**: AsyncStorage for persistence
- **Icons**: Feather Icons (150+)

## 🎨 UI Components

- Login/Register forms with validation
- Card-based destination list
- Detailed destination view
- Favorites grid layout
- Profile with settings
- Dark/Light theme toggle
- Loading states
- Empty states
- Error handling

## 📦 Build Commands

```bash
# Start development server
npm start

# Start with cache clearing
npm start -- --clear

# Run on specific platform
npm run android
npm run ios
npm run web

# Run linter
npm run lint
```

## 🔧 Configuration Files

- `app.json` - Expo configuration
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `eslint.config.js` - ESLint rules

## 📁 Important Directories

```
/app              - All screens (Expo Router)
/store            - Redux state management
/services         - API integration
/constants        - Theme, colors, spacing
/utils            - Validation schemas
```

## 💡 Pro Tips

1. **Use pull-to-refresh** on home screen for fresh data
2. **Dark mode** persists across app restarts
3. **Favorites** are saved locally - won't lose them!
4. **Form validation** shows errors in real-time
5. **Back button** works naturally everywhere

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ React Native development with Expo
- ✅ State management with Redux Toolkit
- ✅ Form handling and validation
- ✅ API integration and async operations
- ✅ Local data persistence
- ✅ Navigation patterns
- ✅ Theme management
- ✅ TypeScript best practices
- ✅ Clean code architecture

## 📞 Need Help?

Common commands:

- `npm start` - Start dev server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `r` - Reload app
- `m` - Toggle menu

Happy coding! 🚀
