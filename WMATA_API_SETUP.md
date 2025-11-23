# WMATA API Setup Guide (Washington DC Metro)

This app uses **real public transport data** from WMATA (Washington Metropolitan Area Transit Authority) API - perfect for the IN3210 Mobile Applications Development assignment!

## 🚀 Getting Started

### 1. Sign Up for WMATA API

1. Go to [https://developer.wmata.com/signup](https://developer.wmata.com/signup)
2. Create a **FREE account**
   - **Free tier includes**:
     - 10 calls per second
     - 50,000 calls per day
     - Access to all Metro APIs

### 2. Get Your API Key

1. After signing up, log in to the [WMATA Developer Portal](https://developer.wmata.com/)
2. Navigate to **"My Account"** > **"API Keys"**
3. Copy your **Primary Key** (this is your API key)

### 3. Configure Your App

1. Open `services/api.ts`
2. Replace the API key on line 9:

```typescript
const WMATA_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your WMATA API key
```

**Example:**
```typescript
const WMATA_API_KEY = 'e13626d03d8e4c03b07f4d01b65e3e08';
```

### 4. Run Your App

```bash
npm start
```

The app will now fetch **real-time Washington DC Metro data**! 🚇

## 📡 Available Features

### Current Features:
- ✅ **All Metro Stations**: Fetches all DC Metro stations (Red, Blue, Orange, Silver, Green, Yellow lines)
- ✅ **Real-Time Train Predictions**: Get live train arrival times
- ✅ **Station Information**: Detailed info about each station
- ✅ **Parking Information**: Find parking at Metro stations
- ✅ **Line Information**: Get details about each Metro line
- ✅ **Fallback Data**: 10 popular DC Metro stations if API is unavailable
- ✅ **Unique Photos**: Each station card has different images
- ✅ **Detailed Descriptions**: Rich information about each location

### API Endpoints Being Used:
1. **Stations** (`/Rail.svc/json/jStations`) - All Metro stations
2. **Train Predictions** (`/StationPrediction.svc/json/GetPrediction/{StationCode}`) - Real-time arrivals
3. **Station Info** (`/Rail.svc/json/jStationInfo`) - Detailed station data
4. **Parking** (`/Rail.svc/json/jStationParking`) - Parking availability
5. **Lines** (`/Rail.svc/json/jLines`) - Metro line information

## 🎯 Perfect for Your Assignment!

This implementation meets all IN3210 Assignment 2 requirements:

### ✅ API Integration
- Real public transport API (WMATA)
- Professional API with proper authentication
- Dynamic data fetching with error handling

### ✅ Data Display
- Each station displayed as a card with:
  - Image ✓
  - Title (Station Name) ✓
  - Description (Line info, features) ✓
  - Status ("Active") ✓
  - Rating ✓
  - Additional details (fare, schedule, features) ✓

### ✅ State Management
- Uses Redux Toolkit for favorites
- Proper state persistence
- Clean architecture

### ✅ Navigation
- Stack navigation to Details screen
- Bottom tabs for Home/Favorites/Profile
- Smooth user experience

## 🗺️ DC Metro Coverage

The app covers the entire Washington DC Metro system:

- **Red Line**: Shady Grove ↔ Glenmont
- **Orange Line**: New Carrollton ↔ Vienna
- **Silver Line**: Largo Town Center ↔ Wiehle-Reston East
- **Blue Line**: Franconia-Springfield ↔ Largo Town Center
- **Yellow Line**: Huntington ↔ Fort Totten
- **Green Line**: Branch Ave ↔ Greenbelt

## 🔍 API Methods Available

### 1. Get All Metro Stations
```typescript
const stations = await destinationsAPI.getDestinations();
```

### 2. Get Real-Time Train Predictions
```typescript
const predictions = await destinationsAPI.getTrainPredictions('A01');
// Returns live train arrival times for Metro Center station
```

### 3. Get Station Details
```typescript
const info = await destinationsAPI.getStationInfo('C01');
// Returns detailed info for Union Station
```

### 4. Get Parking Information
```typescript
const parking = await destinationsAPI.getStationParking('A11');
// Returns parking details for Bethesda station
```

### 5. Get All Metro Lines
```typescript
const lines = await destinationsAPI.getLines();
// Returns info about all 6 Metro lines
```

## 📊 Data Structure

Each station object includes:
```typescript
{
  id: number,
  stationCode: string,        // e.g., "A01" for Metro Center
  name: string,               // "Metro Center"
  description: string,        // Detailed description
  image: string,              // Unique photo URL
  city: string,               // "Washington DC"
  country: string,            // "United States"
  rating: number,             // 4.0-5.0
  status: string,             // "Active"
  type: string,               // "Metro Station"
  route: string,              // "Red Line" or "Red, Blue, Orange, Silver Lines"
  lineCode: string,           // "RD", "BL", "OR", "SV", "GR", "YL"
  schedule: string,           // Operating schedule
  operatingHours: string,     // "5:00 AM - 12:00 AM"
  fare: string,               // "$2.00-$6.00"
  stops: number,              // 0 (not used for metro)
  features: string[],         // ["SmarTrip Card", "Elevator Access", ...]
  popularStops: string[],     // Popular destinations
  latitude: number,           // GPS coordinates
  longitude: number,          // GPS coordinates
  address: string            // Street address
}
```

## ⚠️ Important Notes

1. **Free Tier**: 50,000 calls per day - more than enough for development and testing
2. **DC Metro Only**: WMATA API covers Washington DC Metropolitan Area
3. **Rate Limiting**: 10 calls per second - very generous
4. **Real Data**: Live, real-time information from actual Metro system
5. **Fallback**: App works offline with 10 popular stations

## 🌐 WMATA API Coverage

- **Rail**: Complete Metro rail system
- **Bus**: DC Metrobus service
- **Real-Time**: Live train predictions
- **Incidents**: Service alerts and delays
- **Parking**: Station parking information
- **Routes**: Path finding and trip planning

## 📚 Additional Resources

- [WMATA API Documentation](https://developer.wmata.com/docs/services/)
- [API Console](https://developer.wmata.com/api-details)
- [Sample Code](https://developer.wmata.com/docs/services/)
- [Support](mailto:api-support@wmata.com)

## 🔒 Security Note

**Never commit your API key to version control!**

For production, consider:
1. Using environment variables
2. Installing `react-native-dotenv`
3. Storing key in `.env` file
4. Adding `.env` to `.gitignore`

## 🆘 Troubleshooting

### App shows fallback data:
- ✅ Check that you've replaced `YOUR_API_KEY_HERE` with your actual WMATA API key
- ✅ Verify your key at [WMATA Developer Portal](https://developer.wmata.com/)
- ✅ Check console logs for error messages

### API errors:
- Check your daily API call limit (50,000 for free tier)
- Verify your internet connection
- Check the console for detailed error messages
- Ensure API key is valid and active

### No data showing:
- The app will show 10 fallback DC Metro stations if API fails
- Check network connectivity
- Verify API key is correctly configured

## 🎓 Assignment Benefits

Using WMATA API for your IN3210 assignment:

✅ **Real professional API** - Not a mock/dummy API  
✅ **Free and reliable** - 50,000 calls/day  
✅ **Well-documented** - Official government API  
✅ **Live data** - Real-time train predictions  
✅ **Perfect domain** - Public transport as required  
✅ **Rich data** - Stations, lines, schedules, parking  
✅ **Easy to use** - Simple REST API with API key authentication  

---

**Ready for Assignment Submission! 🚇📱**

## 🚀 Getting Started

### 1. Sign Up for TransportAPI

1. Go to [https://developer.transportapi.com/signup](https://developer.transportapi.com/signup)
2. Create a free account
   - **Free Plan**: 30 API calls per day (perfect for development)
   - **Paid Plans**: Available for production use with higher limits

### 2. Get Your API Credentials

1. After signing up, log in to the [TransportAPI Developer Portal](https://developer.transportapi.com/)
2. Navigate to **"Apps"** section
3. You'll see your default app with:
   - `app_id` - Your application ID
   - `app_key` - Your application key

### 3. Configure Your App

1. Open `services/api.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
const TRANSPORT_APP_ID = "YOUR_APP_ID"; // Replace with your app_id
const TRANSPORT_APP_KEY = "YOUR_APP_KEY"; // Replace with your app_key
```

**Example:**

```typescript
const TRANSPORT_APP_ID = "a1b2c3d4";
const TRANSPORT_APP_KEY = "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0";
```

### 4. Run Your App

```bash
npm start
```

The app will now fetch real-time UK transport data!

## 📡 Available Features

### Current Features:

- ✅ **Bus Stops Near You**: Fetches nearby bus stops in London
- ✅ **Live Departures**: Get real-time bus departure times
- ✅ **Train Station Info**: Access train station data
- ✅ **Search Places**: Search for transport locations by name
- ✅ **Fallback Data**: Gracefully falls back to static data if API is unavailable

### API Endpoints Being Used:

1. **Places API** - Find bus stops, train stations, and other transport points
2. **Live Departures** - Real-time bus arrival information
3. **Train Departures** - Live train departure boards

## 🗺️ Customizing Locations

By default, the app searches for transport near **Central London** (coordinates: 51.5074, -0.1278).

To change the location, edit `services/api.ts`:

```typescript
// Change these coordinates in getDestinations()
const lat = 51.5074; // Latitude
const lon = -0.1278; // Longitude
```

**Example locations:**

- **Manchester**: lat: 53.4808, lon: -2.2426
- **Birmingham**: lat: 52.4862, lon: -1.8904
- **Edinburgh**: lat: 55.9533, lon: -3.1883

## 🔍 API Methods Available

### 1. Get Transport Destinations

```typescript
const destinations = await destinationsAPI.getDestinations();
```

### 2. Get Live Bus Departures

```typescript
const departures = await destinationsAPI.getLiveDepartures("490000001K");
// atcocode is the unique bus stop identifier
```

### 3. Get Train Departures

```typescript
const trains = await destinationsAPI.getTrainDepartures("VIC");
// VIC is Victoria Station code
```

### 4. Search Places

```typescript
const results = await destinationsAPI.searchPlaces(
  "Victoria",
  51.5074,
  -0.1278
);
```

## 📊 Data Structure

Each destination object includes:

```typescript
{
  id: number,
  name: string,
  description: string,
  image: string,
  city: string,
  country: string,
  rating: number,
  status: string,
  type: string,
  route: string,
  schedule: string,
  operatingHours: string,
  fare: string,
  stops: number,
  features: string[],
  popularStops: string[],
  latitude: number,  // GPS coordinates
  longitude: number, // GPS coordinates
  atcocode: string,  // For bus stops
  stationCode: string // For train stations
}
```

## ⚠️ Important Notes

1. **Free Tier Limits**: 30 API calls per day - use wisely during development
2. **UK Only**: TransportAPI primarily covers UK transport data
3. **Rate Limiting**: The API has rate limits - implement caching if needed
4. **Fallback**: The app will use static data if API credentials are not configured

## 🌐 TransportAPI Coverage

- **Bus**: Real-time bus information across the UK
- **Train**: Live departure boards for National Rail
- **Tube**: London Underground information
- **Tram**: Light rail and tram networks
- **Coach**: Long-distance coach services

## 📚 Additional Resources

- [TransportAPI Documentation](https://developer.transportapi.com/docs)
- [API Examples](https://developer.transportapi.com/examples)
- [Support](https://developer.transportapi.com/support)

## 🔒 Security Note

**Never commit your API credentials to version control!**

Consider using environment variables for production:

1. Install `react-native-dotenv`
2. Store credentials in `.env` file
3. Add `.env` to `.gitignore`

## 🆘 Troubleshooting

### App shows fallback data:

- ✅ Check that you've replaced `YOUR_APP_ID` and `YOUR_APP_KEY` with real credentials
- ✅ Verify your credentials at [TransportAPI Portal](https://developer.transportapi.com/)
- ✅ Check console logs for error messages

### API errors:

- Check your daily API call limit (30 for free tier)
- Verify your internet connection
- Check the console for detailed error messages

### No data showing:

- The app will show fallback data if the API fails
- Check that coordinates are valid (latitude between -90 and 90, longitude between -180 and 180)

---

**Happy Coding! 🚌🚂🚇**
