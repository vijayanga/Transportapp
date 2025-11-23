# GoMate - Screenshots Guide

## 📸 Required Screenshots

Take the following screenshots for submission:

### 1. Authentication Screens

#### Login Screen (Light Mode)
- Show login form with username and password fields
- Include "Welcome to GoMate" header
- Show demo credentials hint
- Capture: `screenshots/01-login-light.png`

#### Login Screen (Dark Mode)
- Same as above but in dark theme
- Capture: `screenshots/02-login-dark.png`

#### Registration Screen
- Show all form fields (first name, last name, email, username, passwords)
- Include validation example (optional)
- Capture: `screenshots/03-register.png`

### 2. Home Screen

#### Home - Destination List
- Show multiple destination cards
- Display user's name in header
- Show at least 3-4 visible cards
- Capture: `screenshots/04-home-list.png`

#### Home - Card Details
- Highlight a destination card showing:
  - Image
  - Title
  - Location
  - Rating
  - Status badge
  - Heart icon
- Capture: `screenshots/05-home-card.png`

### 3. Details Screen

#### Destination Details - Top
- Show destination image
- Title and metadata
- Status badge
- Heart icon (favorite button)
- Capture: `screenshots/06-details-top.png`

#### Destination Details - Full
- Scroll to show description
- Tags section
- "What to Expect" section
- Travel tips
- Info cards (duration, calories, servings)
- Capture: `screenshots/07-details-full.png`

### 4. Favorites Screen

#### Favorites - With Items
- Show grid of favorited destinations
- Display at least 2-3 favorites
- Show heart icons filled
- Capture: `screenshots/08-favorites-filled.png`

#### Favorites - Empty State
- Show empty favorites screen
- "No Favorites Yet" message
- "Explore Destinations" button
- Capture: `screenshots/09-favorites-empty.png`

### 5. Profile Screen

#### Profile - Light Mode
- Show user information
- Avatar with initials
- Dark mode toggle (OFF)
- Menu items
- Logout button
- Capture: `screenshots/10-profile-light.png`

#### Profile - Dark Mode
- Same as above but with dark mode ON
- Show the difference in colors
- Capture: `screenshots/11-profile-dark.png`

### 6. Additional Features

#### Pull to Refresh
- Capture home screen while pulling down
- Show refresh indicator
- Capture: `screenshots/12-pull-refresh.png`

#### Form Validation
- Show validation errors on login/register
- Display error messages in red
- Capture: `screenshots/13-validation.png`

#### Navigation
- Show bottom tab navigation highlighted
- Capture: `screenshots/14-navigation.png`

## 📱 How to Take Screenshots

### On iOS Simulator
1. Run: `npm run ios`
2. Press: `Cmd + S` to save screenshot
3. Screenshots saved to Desktop

### On Android Emulator
1. Run: `npm run android`
2. Click camera icon in emulator toolbar
3. Or press `Cmd + S` (Mac) / `Ctrl + S` (Windows)

### On Physical Device
- **iOS**: Press `Side Button + Volume Up`
- **Android**: Press `Power + Volume Down`

## 🎨 Screenshot Tips

1. **Use consistent device** - Same phone/emulator for all shots
2. **Clear data** - Remove test data, use clean examples
3. **Good lighting** - If using physical device
4. **Portrait mode** - Keep all screenshots vertical
5. **Show functionality** - Capture key features in action
6. **Annotations** - Optional: add arrows/labels in image editor

## 📂 Folder Structure

Create a `screenshots` folder:
```
gomate/
├── screenshots/
│   ├── 01-login-light.png
│   ├── 02-login-dark.png
│   ├── 03-register.png
│   ├── 04-home-list.png
│   ├── 05-home-card.png
│   ├── 06-details-top.png
│   ├── 07-details-full.png
│   ├── 08-favorites-filled.png
│   ├── 09-favorites-empty.png
│   ├── 10-profile-light.png
│   ├── 11-profile-dark.png
│   ├── 12-pull-refresh.png
│   ├── 13-validation.png
│   └── 14-navigation.png
```

## ✅ Checklist

Before submission, ensure you have screenshots showing:
- [ ] Login screen (light & dark)
- [ ] Register screen
- [ ] Home screen with destinations
- [ ] Destination details
- [ ] Favorites (with items & empty)
- [ ] Profile (light & dark)
- [ ] Dark mode toggle
- [ ] Form validation
- [ ] Navigation elements

## 🎥 For Demo Video

Record 2-minute video showing:
1. **Login** (0:00-0:15)
   - Show login screen
   - Enter credentials
   - Navigate to home

2. **Browse Destinations** (0:15-0:45)
   - Scroll through list
   - Pull to refresh
   - Tap a card

3. **View Details** (0:45-1:00)
   - Scroll through details
   - Show tags, tips, info cards

4. **Manage Favorites** (1:00-1:20)
   - Add to favorites
   - Go to favorites tab
   - Remove from favorites

5. **Profile & Dark Mode** (1:20-1:45)
   - Open profile
   - Toggle dark mode
   - Show theme change

6. **Logout** (1:45-2:00)
   - Logout
   - Show login screen

## 📝 Notes

- Keep screenshots at original resolution
- Don't crop essential UI elements
- Include status bar for realism
- Show real destination data from API
- Demonstrate both light and dark themes
