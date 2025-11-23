# GoMate - Testing Guide

## 🧪 Complete Testing Checklist

This guide helps you test all features before submission.

## 🚀 Setup Testing Environment

### 1. Clean Installation Test

```bash
# Remove node_modules
rm -rf node_modules
# Clear npm cache
npm cache clean --force
# Reinstall
npm install
# Start fresh
npm start -- --clear
```

### 2. Device/Emulator Setup

- [ ] iOS Simulator ready (Mac only)
- [ ] Android Emulator ready
- [ ] Physical device with Expo Go installed
- [ ] Same WiFi network for device and computer

## ✅ Feature Testing

### Authentication Testing

#### Registration

1. **Valid Registration**

   - [ ] First Name: `John`
   - [ ] Last Name: `Doe`
   - [ ] Email: `john.doe@example.com`
   - [ ] Username: `johndoe`
   - [ ] Password: `Test123!`
   - [ ] Confirm Password: `Test123!`
   - [ ] Click "Create Account"
   - [ ] Should show success alert
   - [ ] Should navigate to home screen
   - [ ] Username should appear in header

2. **Validation Testing**

   - [ ] Empty fields → Shows "required" errors
   - [ ] Short first name (1 char) → Shows "at least 2 characters"
   - [ ] Invalid email → Shows "Invalid email address"
   - [ ] Weak password (no uppercase) → Shows error
   - [ ] Weak password (no number) → Shows error
   - [ ] Mismatched passwords → Shows "Passwords must match"
   - [ ] Invalid username (with spaces) → Shows error

3. **UI Testing**
   - [ ] Show/hide password icons work
   - [ ] Form scrolls on small screens
   - [ ] Keyboard doesn't cover inputs
   - [ ] Loading indicator shows during registration
   - [ ] "Already have account?" link works

#### Login

1. **Valid Login**

   - [ ] Username: `emilys`
   - [ ] Password: `emilyspass`
   - [ ] Click "Login"
   - [ ] Should navigate to home
   - [ ] User name shows: "Emily" or "Emily Johnson"

2. **Invalid Login**

   - [ ] Wrong username → Shows error
   - [ ] Wrong password → Shows error
   - [ ] Empty fields → Shows validation errors

3. **UI Testing**
   - [ ] Show/hide password icon works
   - [ ] "Don't have account?" link works
   - [ ] Demo credentials hint visible
   - [ ] Loading indicator shows

#### Persistence Testing

1. [ ] Login successfully
2. [ ] Close app completely
3. [ ] Reopen app
4. [ ] Should still be logged in (skip login screen)
5. [ ] Should show home screen directly

---

### Home Screen Testing

#### Data Loading

1. **Initial Load**

   - [ ] Shows loading indicator
   - [ ] Fetches destinations from API
   - [ ] Displays at least 20-30 destinations
   - [ ] All images load correctly
   - [ ] No broken images

2. **Card Display**

   - [ ] Each card shows:
     - [ ] Destination image
     - [ ] Destination name
     - [ ] Country/location
     - [ ] Rating (if available)
     - [ ] Status badge (Popular/Active/Upcoming)
     - [ ] Heart icon (favorite button)

3. **Pull to Refresh**

   - [ ] Pull down from top
   - [ ] Shows refresh indicator
   - [ ] Reloads data
   - [ ] New data appears

4. **Scrolling**

   - [ ] Smooth scrolling
   - [ ] All items accessible
   - [ ] No lag or stuttering

5. **User Name Display**
   - [ ] Shows "Welcome back,"
   - [ ] Shows user's first name
   - [ ] Matches logged-in user

#### Interactions

1. **Tap Card**

   - [ ] Tap any destination card
   - [ ] Navigates to details screen
   - [ ] Shows correct destination details

2. **Favorite Toggle (from Home)**
   - [ ] Tap heart icon on card
   - [ ] Heart fills with color
   - [ ] Tap again → Heart unfills
   - [ ] Changes persist

---

### Details Screen Testing

#### Navigation

1. [ ] Tap destination from home
2. [ ] Details screen opens
3. [ ] Back button visible in header
4. [ ] Back button returns to home

#### Content Display

1. **Header Section**

   - [ ] Large destination image
   - [ ] Favorite button (heart icon)
   - [ ] Destination name as title
   - [ ] Status badge

2. **Metadata Section**

   - [ ] Location with map pin icon
   - [ ] Rating with star icon
   - [ ] Review count

3. **Description Section**

   - [ ] Description text visible
   - [ ] Readable and formatted

4. **Tags Section**

   - [ ] Tags displayed in chips/pills
   - [ ] Multiple tags visible
   - [ ] Properly wrapped

5. **What to Expect Section**

   - [ ] List of items with checkmark icons
   - [ ] Multiple items visible

6. **Travel Tips Section**

   - [ ] Numbered steps visible
   - [ ] Step numbers in circles
   - [ ] Instructions readable

7. **Info Cards**
   - [ ] Duration card with clock icon
   - [ ] Calories card with activity icon
   - [ ] Servings card with users icon

#### Scrolling

- [ ] Can scroll through all content
- [ ] No content cut off
- [ ] Smooth scrolling

#### Favorite Toggle

1. [ ] Tap heart button
2. [ ] Heart fills/unfills
3. [ ] Go to favorites tab
4. [ ] Should see/not see item
5. [ ] Go back to details
6. [ ] State matches

---

### Favorites Screen Testing

#### With Favorites

1. **Add Items**

   - [ ] Add 3-4 destinations to favorites
   - [ ] Go to Favorites tab
   - [ ] All favorites appear in grid

2. **Grid Display**

   - [ ] Two columns layout
   - [ ] Cards show image and basic info
   - [ ] Heart icons filled red
   - [ ] Proper spacing

3. **Tap Card**

   - [ ] Tap favorite card
   - [ ] Opens details screen
   - [ ] Back button returns to favorites

4. **Remove Favorite**
   - [ ] Tap heart icon on card
   - [ ] Card removes from grid
   - [ ] Grid updates immediately

#### Empty State

1. **Clear All Favorites**

   - [ ] Remove all favorites
   - [ ] Empty state appears

2. **Empty State Display**

   - [ ] Heart icon visible
   - [ ] "No Favorites Yet" title
   - [ ] Descriptive message
   - [ ] "Explore Destinations" button

3. **Empty State Button**
   - [ ] Tap "Explore Destinations"
   - [ ] Navigates to Home tab

#### Persistence

1. [ ] Add favorites
2. [ ] Close app
3. [ ] Reopen app
4. [ ] Navigate to Favorites
5. [ ] All favorites still there

---

### Profile Screen Testing

#### User Information

1. **Display**

   - [ ] Avatar with user initials
   - [ ] Full name displayed
   - [ ] Email displayed
   - [ ] Username with @ symbol

2. **Avatar**
   - [ ] Shows first letter of first name
   - [ ] Shows first letter of last name
   - [ ] Colored background
   - [ ] White text

#### Dark Mode Toggle

1. **Enable Dark Mode**

   - [ ] Toggle switch to ON
   - [ ] Profile screen turns dark
   - [ ] Navigate to Home → dark
   - [ ] Navigate to Favorites → dark
   - [ ] Navigate to Details → dark
   - [ ] All text readable
   - [ ] Icons visible

2. **Disable Dark Mode**

   - [ ] Toggle switch to OFF
   - [ ] All screens return to light
   - [ ] Proper color contrast

3. **Persistence**
   - [ ] Enable dark mode
   - [ ] Close app
   - [ ] Reopen app
   - [ ] Should still be in dark mode

#### Menu Items

- [ ] Edit Profile item visible
- [ ] Settings item visible
- [ ] Help & Support item visible
- [ ] About item visible
- [ ] All have chevron icons

#### Logout

1. **Logout Flow**

   - [ ] Tap "Logout" button
   - [ ] Confirmation alert appears
   - [ ] Tap "Cancel" → stays on profile
   - [ ] Tap "Logout" again
   - [ ] Tap "Logout" in alert
   - [ ] Navigates to login screen
   - [ ] Cannot go back to app

2. **After Logout**
   - [ ] Reopen app
   - [ ] Shows login screen
   - [ ] Not logged in
   - [ ] Must login again

---

### Navigation Testing

#### Bottom Tabs

1. **Tab Switching**

   - [ ] Tap Home tab → shows home
   - [ ] Tap Favorites tab → shows favorites
   - [ ] Tap Profile tab → shows profile
   - [ ] Active tab highlighted
   - [ ] Icons change color

2. **Tab Icons**

   - [ ] Home: house icon
   - [ ] Favorites: heart icon
   - [ ] Profile: user icon
   - [ ] All Feather icons

3. **Tab Bar**
   - [ ] Always visible on main screens
   - [ ] Hidden on details screen
   - [ ] Proper theming (light/dark)

#### Stack Navigation

1. **Forward Navigation**

   - [ ] Home → Details
   - [ ] Favorites → Details
   - [ ] Can navigate to multiple details

2. **Back Navigation**
   - [ ] Back button works from details
   - [ ] Returns to previous screen
   - [ ] Tab state preserved

---

### UI/UX Testing

#### Responsive Design

1. **Different Screen Sizes**

   - [ ] Test on iPhone (small)
   - [ ] Test on iPad (large)
   - [ ] Test on Android phone
   - [ ] All content visible
   - [ ] Proper scaling

2. **Orientation** (if supported)
   - [ ] Portrait mode works
   - [ ] Landscape mode works (optional)

#### Icons

- [ ] All icons are Feather icons
- [ ] Icons match their function
- [ ] Consistent size throughout
- [ ] Visible in both themes

#### Typography

- [ ] Headings clear and readable
- [ ] Body text appropriate size
- [ ] Good contrast
- [ ] Consistent font weights

#### Spacing

- [ ] Consistent padding
- [ ] Proper margins
- [ ] No overlapping elements
- [ ] Balanced whitespace

#### Colors

- [ ] Light mode pleasant
- [ ] Dark mode comfortable
- [ ] Proper contrast ratios
- [ ] Consistent color usage

#### Loading States

- [ ] Loading indicators shown during API calls
- [ ] Centered and visible
- [ ] Themed correctly

#### Error States

- [ ] Network errors handled
- [ ] API errors handled
- [ ] User-friendly messages
- [ ] Can recover from errors

---

### Performance Testing

#### Speed

- [ ] App launches quickly
- [ ] Screens load fast
- [ ] Navigation smooth
- [ ] No lag in scrolling

#### Memory

- [ ] No crashes during testing
- [ ] Can navigate extensively
- [ ] Images load efficiently

#### Network

- [ ] Works on WiFi
- [ ] Works on cellular data
- [ ] Handles slow connections
- [ ] Handles no connection

---

### Dark Mode Specific Testing

#### All Screens in Dark Mode

1. [ ] Login screen
2. [ ] Register screen
3. [ ] Home screen
4. [ ] Details screen
5. [ ] Favorites screen (with items)
6. [ ] Favorites screen (empty)
7. [ ] Profile screen

#### Element Visibility

- [ ] All text readable
- [ ] All icons visible
- [ ] Cards have contrast
- [ ] Buttons clearly visible
- [ ] Form inputs readable

---

### Cross-Platform Testing

#### iOS

- [ ] All features work
- [ ] No iOS-specific bugs
- [ ] Keyboard behavior correct
- [ ] Safe areas respected

#### Android

- [ ] All features work
- [ ] No Android-specific bugs
- [ ] Back button works
- [ ] Material design elements

---

### Data Validation Testing

#### Form Validations

1. **Email Validation**

   - [ ] `test@test.com` → Valid
   - [ ] `test` → Invalid
   - [ ] `test@` → Invalid
   - [ ] `@test.com` → Invalid

2. **Password Validation**

   - [ ] `Test123` → Invalid (no special char needed, but need uppercase + number)
   - [ ] `test123` → Invalid (no uppercase)
   - [ ] `TEST123` → Invalid (no lowercase for our schema, but has uppercase + number)
   - [ ] `Test12` → Invalid (too short)
   - [ ] `TestTest` → Invalid (no number)
   - [ ] `Test1234` → Valid

3. **Username Validation**
   - [ ] `ab` → Invalid (too short)
   - [ ] `abc` → Valid
   - [ ] `john doe` → Invalid (has space)
   - [ ] `john_doe` → Valid
   - [ ] `john-doe` → Invalid (has hyphen)

---

## 📊 Test Results Template

Use this to document your testing:

```
GOMATE TESTING RESULTS
Date: _______________
Tester: _______________
Device: _______________
OS: _______________

✅ Authentication: PASS / FAIL
✅ Navigation: PASS / FAIL
✅ Home Screen: PASS / FAIL
✅ Details Screen: PASS / FAIL
✅ Favorites: PASS / FAIL
✅ Profile: PASS / FAIL
✅ Dark Mode: PASS / FAIL
✅ Persistence: PASS / FAIL
✅ UI/UX: PASS / FAIL
✅ Performance: PASS / FAIL

Issues Found:
1. _______________
2. _______________

Overall: PASS / FAIL
```

---

## 🐛 Common Issues & Solutions

### Issue: App won't start

**Solution**:

```bash
npx expo start --clear
```

### Issue: White screen after login

**Solution**: Check Redux store initialization

### Issue: Favorites not persisting

**Solution**: Check AsyncStorage permissions

### Issue: API not loading

**Solution**: Check internet connection, try different network

### Issue: Dark mode not working

**Solution**: Check theme slice, verify toggle updates state

---

## ✅ Pre-Submission Final Test

Run through this complete flow one final time:

1. [ ] Fresh install on device
2. [ ] Register new account
3. [ ] Browse destinations
4. [ ] Add 3 favorites
5. [ ] View details of 2 destinations
6. [ ] Enable dark mode
7. [ ] Check all screens in dark mode
8. [ ] Close app
9. [ ] Reopen app
10. [ ] Verify still logged in
11. [ ] Verify dark mode persisted
12. [ ] Verify favorites persisted
13. [ ] Logout
14. [ ] Login again
15. [ ] Everything still works

If all above works → **READY TO SUBMIT!** ✅

---

## 📹 Recording Demo Video

While testing, record these specific actions:

- Login process (0:15)
- Browse and scroll destinations (0:20)
- Open details, scroll content (0:20)
- Add/remove favorites (0:20)
- Toggle dark mode (0:15)
- Navigate between tabs (0:15)
- Logout (0:15)

Total: ~2 minutes ✅

---

**Happy Testing! 🎉**
