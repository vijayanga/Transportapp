# GoMate - DC Metro Transit App 🚇

**IN3210 Mobile Applications Development - Assignment 2**

A cross-platform mobile application built with React Native and Expo that displays real-time Washington DC Metro information using the WMATA API.

## 📱 About the App

GoMate is a public transport companion app that helps users explore DC Metro stations, view real-time train predictions, and manage their favorite stations. Built following React Native best practices with proper state management, navigation, and API integration.

## ✨ Features

### ✅ Assignment Requirements Met

- **User Authentication**: Complete registration and login flow with validation
- **Navigation**: Stack and Tab navigation using React Navigation
- **API Integration**: Real WMATA (DC Metro) API integration
- **Dynamic Item List**: Metro stations displayed as cards with images, titles, and descriptions
- **Item Details**: Detailed view for each Metro station
- **State Management**: Redux Toolkit for favorites and authentication
- **Favorites**: Mark stations as favorites with persistent storage
- **Responsive UI**: Clean, consistent design with Feather Icons
- **Dark Mode**: Toggle between light and dark themes (Bonus Feature)

### 🚇 Core Functionality

1. **Browse Metro Stations**

   - View all DC Metro stations from 6 lines (Red, Blue, Orange, Silver, Green, Yellow)
   - Each station card shows: image, name, line info, rating, and status
   - Real data from WMATA API

2. **Station Details**

   - Detailed information about each station
   - Operating hours, fare information, features
   - Real-time train predictions
   - Transfer information and amenities

3. **Favorites Management**

   - Add/remove stations from favorites
   - Persistent storage using AsyncStorage
   - Quick access to favorite stations

4. **User Profile**
   - Display logged-in user information
   - Theme toggle (light/dark mode)
   - Logout functionality

## 🛠️ Technologies Used

- **React Native** (via Expo)
- **TypeScript**
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **Axios** - API calls
- **AsyncStorage** - Data persistence
- **Feather Icons** - Iconography
- **Yup** - Form validation
- **WMATA API** - Real DC Metro data

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (or emulator)

### Installation

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd gomate
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure WMATA API**

   - Sign up at [https://developer.wmata.com/signup](https://developer.wmata.com/signup)
   - Get your free API key (50,000 calls/day)
   - Open `services/api.ts`
   - Replace the API key:

   ```typescript
   const WMATA_API_KEY = "your-api-key-here";
   ```

4. **Start the development server**

```bash
npm start
```

5. **Run on your device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press 'a' for Android emulator, 'i' for iOS simulator

## 📂 Project Structure

```
gomate/
├── app/                      # Application screens
│   ├── (tabs)/              # Tab navigator screens
│   │   ├── index.tsx        # Home screen (stations list)
│   │   ├── favorites.tsx    # Favorites screen
│   │   └── profile.tsx      # Profile screen
│   ├── details/
│   │   └── [id].tsx         # Station details screen
│   ├── login.tsx            # Login screen
│   ├── register.tsx         # Registration screen
│   └── _layout.tsx          # Root layout
├── services/
│   └── api.ts               # API integration (WMATA)
├── store/                   # Redux store
│   ├── index.ts             # Store configuration
│   ├── authSlice.ts         # Authentication state
│   ├── favoritesSlice.ts    # Favorites state
│   ├── themeSlice.ts        # Theme state
│   └── hooks.ts             # Typed hooks
├── constants/
│   └── theme.ts             # Theme colors
├── utils/
│   └── validation.ts        # Form validation schemas
└── assets/                  # Images and assets
```

## 🎨 Features Breakdown

### Authentication & Validation

- Custom validation using Yup
- Secure password requirements
- Email format validation
- Username availability check
- Persistent authentication state

### Navigation Implementation

- **Stack Navigator**: Login → Register → Tabs
- **Tab Navigator**: Home, Favorites, Profile
- **Modal Navigation**: Station details
- Smooth transitions and gestures
- Type-safe navigation with TypeScript

### API Integration

- **Endpoints Used**:

  - `/Rail.svc/json/jStations` - All stations
  - `/StationPrediction.svc/json/GetPrediction/{code}` - Real-time predictions
  - `/Rail.svc/json/jStationInfo` - Station details
  - `/Rail.svc/json/jStationParking` - Parking info
  - `/Rail.svc/json/jLines` - Metro lines

- **Error Handling**: Graceful fallbacks with 10 popular stations
- **Loading States**: Proper loading indicators
- **Retry Logic**: Automatic retry on failure

### State Management (Redux Toolkit)

```typescript
// Authentication
- login/logout
- user data
- token management

// Favorites
- addFavorite
- removeFavorite
- toggleFavorite
- Persisted to AsyncStorage

// Theme
- light/dark mode
- Persisted preference
```

### UI/UX Design

- **Consistent Theme**: Custom color palette
- **Responsive**: Works on all screen sizes
- **Icons**: Feather Icons throughout
- **Typography**: Clear hierarchy
- **Spacing**: Consistent padding/margins
- **Cards**: Material-style elevation
- **Animations**: Smooth transitions

## 📊 Data Model

### Station Object

```typescript
{
  id: number
  stationCode: string        // "A01"
  name: string              // "Metro Center"
  description: string
  image: string
  city: string
  country: string
  rating: number
  status: "Active"
  type: "Metro Station"
  route: string             // "Red, Blue, Orange, Silver Lines"
  lineCode: string          // "RD"
  schedule: string
  operatingHours: string
  fare: string
  features: string[]
  latitude: number
  longitude: number
  address: string
}
```

## 🧪 Testing

### Login Credentials (DummyJSON API)

```
Username: emilys
Password: emilyspass
```

or

```
Username: michaelw
Password: michaelwpass
```

### API Testing

- All WMATA endpoints tested
- Error scenarios handled
- Fallback data verified
- Real-time updates confirmed

## 📸 Screenshots

See `SCREENSHOTS.md` for detailed app screenshots showing:

- Login/Register screens
- Home screen with station list
- Station details view
- Favorites screen
- Profile screen
- Dark mode

## 🎥 Demo Video

A 2-minute demo video is included showing:

- User authentication flow
- Browsing Metro stations
- Viewing station details
- Adding to favorites
- Theme switching
- Navigation flow

## 📝 Code Quality & Best Practices

✅ **TypeScript** - Full type safety
✅ **Component Structure** - Reusable, modular components
✅ **State Management** - Centralized Redux store
✅ **Error Handling** - Try-catch blocks, user feedback
✅ **Loading States** - Activity indicators
✅ **Code Comments** - Clear documentation
✅ **Consistent Naming** - camelCase, PascalCase
✅ **File Organization** - Feature-based structure
✅ **Git Commits** - Feature-based commits with clear messages
✅ **No Console Warnings** - Clean console output
✅ **Performance** - Optimized re-renders, memoization

## 🚀 Deployment Notes

### For Assignment Submission

1. **GitHub Repository**

   - All code committed
   - Clear commit history
   - README included

2. **Screenshots**

   - All key screens captured
   - Both light and dark modes
   - High resolution

3. **Demo Video**

   - Under 2 minutes
   - Shows complete user flow
   - Good quality recording

4. **Documentation**
   - Setup instructions
   - API configuration guide
   - Feature descriptions

## 🔐 Security Considerations

- API keys should use environment variables in production
- Passwords validated before submission
- Token stored securely
- No sensitive data in logs
- HTTPS for all API calls

## 📦 Deliverables Checklist

- ✅ GitHub repository URL
- ✅ All source code
- ✅ Screenshots folder
- ✅ Demo video (≤2 minutes)
- ✅ README documentation
- ✅ Setup instructions
- ✅ Working authentication
- ✅ API integration
- ✅ State management
- ✅ Navigation implementation
- ✅ Favorites feature
- ✅ Responsive UI
- ✅ Dark mode (bonus)

## 👨‍💻 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

### Environment Setup

1. Install dependencies: `npm install`
2. Configure WMATA API key in `services/api.ts`
3. Run `npm start`
4. Use Expo Go to test on device

## 📚 API Documentation

See `WMATA_API_SETUP.md` for detailed API integration guide.

## 🤝 Assignment Compliance

This project fully complies with IN3210 Assignment 2 requirements:

| Requirement         | Implementation                 | Status |
| ------------------- | ------------------------------ | ------ |
| User Authentication | Login/Register with validation | ✅     |
| Navigation          | Stack + Tab navigation         | ✅     |
| API Integration     | WMATA real transport API       | ✅     |
| Dynamic List        | Metro stations with cards      | ✅     |
| Item Details        | Full station details screen    | ✅     |
| State Management    | Redux Toolkit                  | ✅     |
| Favorites           | Persistent favorites           | ✅     |
| UI/UX               | Consistent, responsive design  | ✅     |
| Code Quality        | TypeScript, best practices     | ✅     |
| Bonus: Dark Mode    | Theme toggle                   | ✅     |

## 📄 License

This project is created for educational purposes as part of IN3210 Mobile Applications Development course.

## 🙏 Acknowledgments

- **WMATA** for providing free public transport API
- **DummyJSON** for authentication API
- **Expo** for the development framework
- **React Navigation** for routing
- **Redux Team** for Redux Toolkit

---

**Built with ❤️ for IN3210 Mobile Applications Development**

**Deadline**: November 23, 2025
