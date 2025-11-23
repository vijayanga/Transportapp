# GoMate - Travel & Transport Mobile App

## 📱 Project Overview

GoMate is a cross-platform mobile application built with React Native and Expo for IN3210 Mobile Applications Development Assignment 2. The app helps users explore travel destinations, manage favorites, and plan their journeys.

## ✨ Features

### Core Features

- ✅ **User Authentication** - Complete registration and login flow with form validation
- ✅ **Dynamic Item List** - Browse destinations fetched from API with card-based UI
- ✅ **Details Screen** - View comprehensive information about each destination
- ✅ **Favorites Management** - Mark and persist favorite destinations
- ✅ **State Management** - Redux Toolkit for global state
- ✅ **Responsive Design** - Works across different screen sizes
- ✅ **Feather Icons** - Consistent iconography throughout

### Bonus Features

- ✅ **Dark Mode** - Toggle between light and dark themes with persistence

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Redux Toolkit
- **Form Handling**: Formik
- **Validation**: Yup
- **Storage**: AsyncStorage
- **API Integration**: Axios
- **Icons**: Feather Icons (@expo/vector-icons)
- **Language**: TypeScript

## 📁 Project Structure

```
gomate/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── index.tsx            # Home screen
│   │   ├── favorites.tsx        # Favorites screen
│   │   └── profile.tsx          # Profile screen
│   ├── details/                 # Details screens
│   │   └── [id].tsx             # Dynamic destination details
│   ├── _layout.tsx              # Root layout with Redux provider
│   ├── index.tsx                # Entry point with auth check
│   ├── login.tsx                # Login screen
│   └── register.tsx             # Registration screen
├── store/                        # Redux store
│   ├── index.ts                 # Store configuration
│   ├── authSlice.ts             # Authentication state
│   ├── favoritesSlice.ts        # Favorites state
│   ├── themeSlice.ts            # Theme state
│   └── hooks.ts                 # Typed Redux hooks
├── services/                     # API services
│   └── api.ts                   # API integration
├── utils/                        # Utilities
│   └── validation.ts            # Yup validation schemas
├── constants/                    # Constants
│   └── theme.ts                 # Theme colors and styles
└── components/                   # Reusable components
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**

```bash
cd gomate
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. **Run on your device**

- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Or press `a` for Android emulator, `i` for iOS simulator

## 🔑 Demo Credentials

For testing the login functionality, use these credentials:

- **Username**: `emilys`
- **Password**: `emilyspass`

You can also create a new account through the registration screen.

## 🎯 Key Features Implementation

### 1. User Authentication

- Form validation using Yup schema
- Secure token storage with AsyncStorage
- Persistent login state across app restarts
- Protected routes with automatic redirection

### 2. Navigation Structure

- Expo Router for file-based routing
- Bottom tab navigation for main screens
- Stack navigation for details
- Proper back navigation and deep linking support

### 3. API Integration

- Axios for HTTP requests
- DummyJSON API for authentication
- Recipe API transformed for destination data
- Error handling and loading states

### 4. State Management

- Redux Toolkit for global state
- Separate slices for auth, favorites, and theme
- Async thunks for API calls
- TypeScript for type safety

### 5. Data Persistence

- AsyncStorage for:
  - User authentication tokens
  - Favorite destinations
  - Theme preferences
- Auto-load on app startup

### 6. UI/UX Design

- Consistent design system with theme constants
- Card-based layouts
- Smooth animations and transitions
- Pull-to-refresh functionality
- Empty states and loading indicators
- Responsive images

### 7. Dark Mode

- Toggle in profile screen
- Persistent across app restarts
- Consistent theming throughout all screens
- Dynamic icon and color changes


## 🎨 Design Features

- **Color Scheme**: Dynamic light/dark mode
- **Typography**: Clear hierarchy with proper font sizes
- **Spacing**: Consistent spacing system
- **Icons**: Feather icons for all UI elements
- **Cards**: Elevated cards with shadows
- **Images**: Optimized with proper aspect ratios




## 🔒 Security Best Practices

- Passwords validated with strong requirements
- Authentication tokens stored securely in AsyncStorage
- No sensitive data in plain text
- Form validation on client side
- Proper error handling

## 📝 Code Quality

- **TypeScript**: Full type safety
- **Modular Code**: Feature-based organization
- **Reusable Components**: DRY principle
- **Clean Code**: Consistent naming and formatting
- **Comments**: Where necessary for clarity
- **Error Handling**: Try-catch blocks and user feedback

## 🧪 Testing

To test the application:

1. Test user registration with various inputs
2. Test form validation (try invalid inputs)
3. Test login with demo credentials
4. Browse destinations and test pull-to-refresh
5. Add/remove favorites
6. Test navigation between screens
7. Toggle dark mode
8. Test logout and re-login

## 📦 Dependencies

Main dependencies:

- expo: ~54.0.25
- react: 19.1.0
- react-native: 0.81.5
- @reduxjs/toolkit: latest
- react-redux: latest
- @react-native-async-storage/async-storage: latest
- yup: latest
- formik: latest
- axios: latest
- expo-router: ~6.0.15
- @expo/vector-icons: ^15.0.3

## 🚧 Future Enhancements

- Search and filter destinations
- Map integration
- Booking functionality
- User reviews and ratings
- Social sharing
- Offline mode
- Push notifications

## 👨‍💻 Development

This project was developed following:

- React Native best practices
- Redux Toolkit patterns
- Expo Router conventions
- TypeScript strict mode
- Component-based architecture

## 📄 License

This project is for educational purposes as part of IN3210 Mobile Applications Development course.

## 👤 Author

Vijayanga Dissanayaka

---

**Note**: This application uses dummy APIs for demonstration purposes. In a production environment, proper backend services with authentication and real travel data would be required.
