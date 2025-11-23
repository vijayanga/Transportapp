# GoMate - UK Transport Data Integration

## TransportAPI Integration

This app now uses **TransportAPI** (https://www.transportapi.com/) to provide comprehensive, real-time UK transport data.

### Features

#### 1. Bus Services

- **Real-time bus services** across major UK cities
- **Live departure boards** with accurate ETAs
- **Route information** including all stops and directions
- **Operator details** (First Bus, Arriva, Stagecoach, etc.)
- **Service status** and disruption alerts

#### 2. Train Stations

- **Major railway stations** (Paddington, Victoria, Waterloo, Kings Cross, London Bridge)
- **Live departure/arrival times** from National Rail
- **Multi-operator support** (GWR, LNER, South Western Railway, etc.)
- **Platform information** and train status
- **Destination tracking** for all services

#### 3. Bus Stops

- **Individual bus stop timetables**
- **Real-time arrival predictions**
- **Multiple route tracking** at each stop
- **GPS coordinates** for map integration
- **Stop-specific information** (bearing, indicator, locality)

#### 4. Places Search

- **Intelligent search** across all transport types
- **Autocomplete support** for locations
- **Fuzzy matching** for station/stop names
- **Filter by type**: bus_stop, train_station, tube_station, tram_stop
- **Geospatial filtering** with lat/lon coordinates

#### 5. Journey Planning

- **Multi-modal journey planning**
- **Step-by-step directions**
- **Real-time route updates**
- **Cost estimation**
- **Duration calculation**

### API Endpoints Used

#### Bus Data

```typescript
// Get bus services (collection)
transportAPI.getBusServices({
  operator: "GAHL", // Optional: filter by operator code
  line_name: "11", // Optional: specific route
  lat: 51.5, // Optional: near location
  lon: -0.1,
  limit: 25,
});

// Get bus stop timetable (live departures)
transportAPI.getBusStopTimetable("490014378M", {
  limit: 25,
  live: true, // Enable real-time data
});
```

#### Train Data

```typescript
// Get train station timetable
transportAPI.getTrainStationTimetable("crs:PAD", {
  datetime: "2025-01-15T09:00:00",
  limit: 25,
  live: true, // Enable real-time updates
});
```

#### Search

```typescript
// Search for places
transportAPI.searchPlaces("Paddington", {
  type: ["train_station", "bus_stop"],
  lat: 51.5,
  lon: -0.1,
  limit: 10,
});
```

#### Journey Planning

```typescript
// Plan a journey
transportAPI.getJourneyPlan(
  "lonlat:-0.134649,51.529258", // From
  "lonlat:-0.088780,51.506383", // To
  {
    date: "2025-01-15",
    time: "09:00",
    modes: ["bus", "train", "tube"],
  }
);
```

### Data Transformation

#### Bus Services → Destinations

```typescript
{
  id: 1,
  routeId: 'service-id',
  name: 'Route 11',
  description: 'Liverpool Street to Fulham Broadway',
  transportType: 'Bus',
  operatorName: 'Go Ahead London',
  highlights: ['Liverpool Street', 'Bank', 'St Pauls', ...],
  tips: ['Pay with contactless', 'Real-time tracking available'],
  rating: 4.5,
  price: 1.75,
  directions: [...],  // Outbound/inbound routes
  departures: [...],  // Live departure times
}
```

#### Train Stations → Destinations

```typescript
{
  id: 1,
  routeId: 'crs:PAD',
  name: 'London Paddington',
  description: 'Major railway station...',
  transportType: 'Train',
  stationCode: 'PAD',
  operators: ['GWR', 'TfL Rail'],
  highlights: ['Heathrow Express', 'Reading', 'Bristol', ...],
  tips: ['Book in advance', 'Elizabeth line available'],
  rating: 4.6,
  price: 15.00,
  departures: [...],  // Live train departures
  latitude: 51.515,
  longitude: -0.177,
}
```

#### Bus Stops → Destinations

```typescript
{
  id: 1,
  routeId: '490014378M',
  name: 'Wembley High Road',
  transportType: 'Bus',
  atcocode: '490014378M',
  routes: ['11', '18', '223'],  // Routes serving this stop
  highlights: ['Route 11', 'Route 18', 'Route 223'],
  tips: ['Real-time arrivals', 'Contactless payment'],
  rating: 4.2,
  departures: [...],  // Live bus arrivals
  latitude: 51.553,
  longitude: -0.292,
}
```

### API Credentials

#### Get Your Own API Key

1. Visit https://www.transportapi.com/
2. Sign up for a free account
3. Get your `app_id` and `app_key`
4. Update in `services/api.ts`:

```typescript
const TRANSPORT_API_ID = "your-app-id";
const TRANSPORT_API_KEY = "your-app-key";
```

#### Free Tier Limits

- **1,000 requests/day** (free tier)
- **Up to 25 results** per request
- **Real-time data** included
- **No credit card** required for free tier

### Data Sources

TransportAPI aggregates data from:

- **National Rail** (train schedules and real-time updates)
- **TfL** (London buses and tubes)
- **Local bus operators** across the UK
- **NaPTAN** (National Public Transport Access Nodes)
- **BODS** (Bus Open Data Service)
- **Network Rail** (live train tracking)

### Response Format

All endpoints return data in this structure:

```json
{
  "request_time": "2025-01-15T09:00:00+00:00",
  "source": "TransportAPI",
  "acknowledgements": "Contains data from National Rail, TfL...",
  "member": [...],  // Array of results
  "view": {
    "page": 1,
    "page_size": 25,
    "next": "url-to-next-page"
  }
}
```

### Error Handling

All API calls include comprehensive error handling:

```typescript
try {
  const data = await transportAPI.getBusServices();
  if (!data) {
    // Handle API failure
    console.warn("API returned no data");
    return [];
  }
  // Process data
} catch (error) {
  console.error("API error:", error);
  return [];
}
```

### Example Screens

#### Home Screen (Destinations List)

- Shows 10 bus services + 5 train stations
- Real-time status for each service
- Rating based on service reliability
- Transport type badges (Bus/Train/Metro)
- Quick filters by transport type

#### Details Screen

- Live departure board (next 20 departures)
- Route map with all stops
- Service alerts and disruptions
- Operator information
- Real-time GPS tracking (buses)
- Platform information (trains)
- Journey planning integration

#### Search Screen

- Search bus stops by name or number
- Find train stations across UK
- Filter by location (nearby stops)
- Show on map with coordinates
- Quick access to live departures

### Performance

#### Caching Strategy

- Cache destinations for 5 minutes
- Refresh live departures every 30 seconds
- Store frequently accessed stations/stops
- Background updates for active routes

#### Optimization

- Parallel API requests for multiple services
- Limit results to 25 items per call
- Use pagination for large datasets
- Filter at API level (not client-side)

### Migration from Previous APIs

#### Removed APIs

- ❌ **WMATA** (Washington DC Metro) - quota limits
- ❌ **TfL Direct API** - rate limiting

#### Why TransportAPI?

- ✅ **No quota limits** on free tier (1000 req/day)
- ✅ **Comprehensive UK coverage** (not just London)
- ✅ **Real-time data** from National Rail
- ✅ **Professional support** and documentation
- ✅ **Consistent API design** across all transport modes
- ✅ **Built-in caching** and rate limiting
- ✅ **Journey planning** included

### Troubleshooting

#### No data showing?

1. Check API credentials in `services/api.ts`
2. Verify network connection
3. Check console for error messages
4. Ensure API key is active (not expired)

#### Wrong location data?

- TransportAPI uses UK coordinates (WGS84)
- Format: `lonlat:longitude,latitude`
- Example: `lonlat:-0.1,51.5` (London)

#### Live data not updating?

- Ensure `live: true` is set in API calls
- Check if service supports real-time data
- Some rural services may not have GPS tracking

### Documentation Links

- **Official Docs**: https://developer.transportapi.com/
- **API Reference**: https://developer.transportapi.com/docs
- **Example Code**: https://github.com/transportapi/transportapi-examples
- **Support**: support@transportapi.com

### License & Attribution

When using TransportAPI data, include attribution:

```
"Powered by TransportAPI"
"Contains information from National Rail, TfL, and local bus operators"
```

Required acknowledgements:

- National Rail (train data)
- Transport for London (London transport)
- Bus Open Data Service (bus data)
- Network Rail (infrastructure)

---

## Next Steps

1. **Sign up** for TransportAPI at https://www.transportapi.com/
2. **Replace API credentials** in `services/api.ts`
3. **Test** the app with `npm start`
4. **Customize** data transformation as needed
5. **Add features** like journey planning, map integration

For questions or issues, check the TransportAPI documentation or contact their support team.
