# WMATA Bus API Integration Guide

## Overview
GoMate now integrates with the **WMATA (Washington Metropolitan Area Transit Authority)** Bus API to display real-time bus route information, live bus positions, schedules, and stops for the Washington DC Metro area.

## Features
✅ **Real-time Bus Routes** - Fetch live bus routes from WMATA  
✅ **Live Bus Positions** - Track buses in real-time with GPS coordinates  
✅ **Route Details** - View complete route paths with all stops  
✅ **Schedule Information** - Check bus schedules and service hours  
✅ **Deviation Tracking** - See if buses are running late or early  

## Getting Your API Key

### Option 1: Use Demo Key (Limited)
The app comes with a demo API key that has limited requests:
- **Rate Limit**: 10 requests/second
- **Daily Limit**: 50,000 requests/day
- **Key**: `e13626d03d8e4c03ac07f95541b3091b`

### Option 2: Get Your Own Key (Recommended for Production)

1. **Visit WMATA Developer Portal**  
   Go to: https://developer.wmata.com/

2. **Sign Up for Free Account**  
   - Click "Sign Up" in the top right
   - Fill in your information
   - Verify your email

3. **Create New App**  
   - Go to "Products" → "Default Tier"
   - Click "Subscribe"
   - You'll receive two keys: **Primary Key** and **Secondary Key**

4. **Copy Your API Key**  
   - Use the Primary Key for your app
   - Keep the Secondary Key as backup

5. **Update .env File**  
   ```env
   WMATA_API_KEY=your_actual_api_key_here
   ```

## API Endpoints Used

### 1. Bus Routes (`/jRoutes`)
Returns list of all bus routes in the DC Metro area
```typescript
const routes = await busAPI.getRoutes();
```

### 2. Bus Positions (`/jBusPositions`)
Returns real-time GPS positions of all buses
```typescript
const positions = await busAPI.getBusPositions(routeId);
```

### 3. Route Details (`/jRouteDetails`)
Returns detailed route information including stops and path
```typescript
const details = await busAPI.getRouteDetails(routeId);
```

### 4. Stop Schedule (`/jStopSchedule`)
Returns schedule information for a specific stop
```typescript
const schedule = await busAPI.getScheduleAtStop(stopId);
```

## Data Structure

### Bus Position Object
```typescript
{
  DateTime: "2024-11-23T10:30:00Z",
  Deviation: -2,  // Minutes early (-) or late (+)
  DirectionText: "NORTH",
  Lat: 38.8951,
  Lon: -77.0364,
  RouteID: "B30",
  VehicleID: "6217",
  TripHeadsign: "GREENBELT STATION"
}
```

### Route Details Object
```typescript
{
  RouteID: "B30",
  Name: "B30 - GREENBELT-BWI",
  Direction0: {
    DirectionText: "NORTH",
    TripHeadsign: "BWI AIRPORT",
    Stops: [...],
    Shape: [...]  // GPS coordinates for route path
  }
}
```

## Using Alternative APIs

You can easily swap WMATA with other transit APIs:

### 1. MTA (New York)
```typescript
const MTA_API_BASE = 'http://api.mta.info/api';
const MTA_API_KEY = 'your_mta_key';
```

### 2. CTA (Chicago)
```typescript
const CTA_API_BASE = 'http://www.ctabustracker.com/bustime/api/v2';
const CTA_API_KEY = 'your_cta_key';
```

### 3. BART (San Francisco)
```typescript
const BART_API_BASE = 'http://api.bart.gov/api';
const BART_API_KEY = 'MW9S-E7SL-26DU-VV8V';
```

### 4. Any Generic Transit API
Just update the `services/api.ts` file:
```typescript
const WMATA_API_BASE_URL = 'your_api_endpoint';
const WMATA_API_KEY = 'your_api_key';

// Modify the transformation functions to match your API response
```

## Testing the Integration

### 1. Check API Connection
```bash
npm start
# App should load bus routes from WMATA
```

### 2. View Real-time Data
- Open the app
- You should see 15 bus routes from Washington DC
- Routes are sorted by number of active buses
- Tap any route to see live bus positions

### 3. Monitor API Calls
Check the console for API logs:
```
Fetching routes...
Fetching bus positions for route B30...
Route B30 has 3 active buses
```

## Troubleshooting

### Error: "API Key Invalid"
- Check your `.env` file has the correct key
- Ensure no extra spaces around the key
- Verify the key is active at https://developer.wmata.com/

### Error: "Rate Limit Exceeded"
- You've hit the API limit (10 req/sec or 50k/day)
- Wait a few minutes or upgrade your WMATA plan
- Consider caching responses to reduce API calls

### Error: "Network Request Failed"
- Check your internet connection
- Verify the API endpoint is accessible
- Try accessing https://api.wmata.com/Bus.svc/json/jRoutes manually

### No Bus Routes Displayed
- API might be down (check https://developer.wmata.com/status)
- Check console for error messages
- Verify your API key is working

## Rate Limiting Best Practices

### 1. Implement Caching
```typescript
const CACHE_DURATION = 30000; // 30 seconds
let cachedRoutes = null;
let cacheTime = 0;

if (Date.now() - cacheTime < CACHE_DURATION && cachedRoutes) {
  return cachedRoutes;
}
```

### 2. Debounce Requests
```typescript
// Don't fetch on every screen render
useEffect(() => {
  const timer = setTimeout(fetchData, 300);
  return () => clearTimeout(timer);
}, []);
```

### 3. Batch API Calls
```typescript
// Fetch multiple routes in parallel
const results = await Promise.all([
  busAPI.getRoutes(),
  busAPI.getBusPositions(),
]);
```

## API Response Examples

### Sample Routes Response
```json
{
  "Routes": [
    { "RouteID": "10A", "Name": "10A - EASTOVER" },
    { "RouteID": "B30", "Name": "B30 - GREENBELT-BWI" }
  ]
}
```

### Sample Bus Positions Response
```json
{
  "BusPositions": [
    {
      "DateTime": "2024-11-23T10:23:40Z",
      "Deviation": 7,
      "DirectionText": "NORTH",
      "Lat": 39.191525,
      "Lon": -76.672821,
      "RouteID": "B30",
      "VehicleID": "6217",
      "TripHeadsign": "BWI AIRPORT"
    }
  ]
}
```

## Support
- WMATA Developer Portal: https://developer.wmata.com/
- API Documentation: https://developer.wmata.com/docs/services/
- Support Email: api-support@wmata.com

## License
This integration uses public WMATA APIs. Please review their [Developer License Agreement](https://developer.wmata.com/developer) before deploying to production.
