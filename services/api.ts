import axios from 'axios';

// DummyJSON for authentication only
const AUTH_API_BASE_URL = 'https://dummyjson.com';

// WMATA (Washington Metropolitan Area Transit Authority) Bus API
const WMATA_API_BASE_URL = 'https://api.wmata.com/Bus.svc/json';

// You need to get your own API key from: https://developer.wmata.com/
// For demo purposes, using a demo key (limited requests)
// Note: In React Native, environment variables need expo-constants or react-native-dotenv
// For now, using direct key for simplicity
const WMATA_API_KEY = 'e13626d03d8e4c03ac07f95541b3091b'; // Demo key - Replace with your own

// Authentication API (using DummyJSON)
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${AUTH_API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    const data = response.data;
    return {
      ...data,
      token: data.accessToken || data.token || 'demo-token-' + Date.now(),
    };
  },
  
  register: async (userData: any) => {
    return {
      id: Math.floor(Math.random() * 1000),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: 'demo-token-' + Date.now(),
    };
  },
};

// Fallback static data in case WMATA API fails
const FALLBACK_DESTINATIONS = [
  {
    id: 1,
    name: 'Paris Metro Tour',
    description: 'Experience the iconic Paris Metro system and explore the City of Light through its extensive underground network.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    country: 'France',
    city: 'Paris',
    rating: 4.8,
    status: 'Popular',
    transportType: 'Metro',
    duration: '4 hours',
    price: 25,
    schedule: ['Daily', '9:00 AM - 6:00 PM'],
    tags: ['Metro', 'City Tour', 'Culture', 'History'],
    highlights: ['Eiffel Tower Station', 'Louvre Museum', 'Champs-Élysées', 'Historic Architecture', 'Local Culture'],
    tips: ['Buy a day pass for unlimited travel', 'Avoid rush hours (8-9 AM, 5-7 PM)', 'Keep belongings secure in crowded trains'],
    reviewCount: 1250,
  },
  {
    id: 2,
    name: 'Tokyo Bullet Train Experience',
    description: 'Ride the legendary Shinkansen bullet train and witness Japanese engineering excellence at 320 km/h.',
    image: 'https://images.unsplash.com/photo-1548898395-16c8f69c0669?w=800',
    country: 'Japan',
    city: 'Tokyo',
    rating: 4.9,
    status: 'Popular',
    transportType: 'Train',
    duration: '3 hours',
    price: 150,
    schedule: ['Daily', 'Multiple departures'],
    tags: ['High-Speed Train', 'Technology', 'Scenic', 'Comfort'],
    highlights: ['Mount Fuji Views', 'Onboard Service', 'Speed Experience', 'Modern Stations', 'Punctuality'],
    tips: ['Book JR Pass in advance', 'Reserve window seats for views', 'Try ekiben (station lunch boxes)'],
    reviewCount: 2100,
  },
  {
    id: 3,
    name: 'London Double-Decker Bus Tour',
    description: 'Hop on the iconic red double-decker buses and discover London\'s famous landmarks from the top deck.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    country: 'United Kingdom',
    city: 'London',
    rating: 4.6,
    status: 'Active',
    transportType: 'Bus',
    duration: '2.5 hours',
    price: 35,
    schedule: ['Daily', 'Every 30 minutes'],
    tags: ['Bus', 'Sightseeing', 'Iconic', 'Hop-on Hop-off'],
    highlights: ['Big Ben', 'Tower Bridge', 'Buckingham Palace', 'Westminster Abbey', 'Thames Views'],
    tips: ['Sit on the top deck for best views', 'Use contactless payment', 'Download route maps'],
    reviewCount: 980,
  },
  {
    id: 4,
    name: 'New York Subway Adventure',
    description: 'Navigate the world\'s largest subway system and experience the heartbeat of New York City.',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800',
    country: 'USA',
    city: 'New York',
    rating: 4.3,
    status: 'Active',
    transportType: 'Subway',
    duration: '5 hours',
    price: 33,
    schedule: ['24/7', 'Unlimited day pass'],
    tags: ['Subway', 'Urban', '24-Hour', 'Cultural'],
    highlights: ['Times Square Station', 'Grand Central', 'Brooklyn Bridge', 'Central Park', 'Street Performers'],
    tips: ['Get a MetroCard for convenience', 'Watch for express vs local trains', 'Keep track of your belongings'],
    reviewCount: 1500,
  },
  {
    id: 5,
    name: 'Singapore MRT City Loop',
    description: 'Experience one of the world\'s most efficient metro systems and explore Singapore\'s diverse neighborhoods.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    country: 'Singapore',
    city: 'Singapore',
    rating: 4.8,
    status: 'Active',
    transportType: 'MRT',
    duration: '3 hours',
    price: 20,
    schedule: ['Daily', '5:30 AM - 12:00 AM'],
    tags: ['Metro', 'Modern', 'Clean', 'Efficient'],
    highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Chinatown', 'Little India', 'Orchard Road'],
    tips: ['Get an EZ-Link card', 'System is very clean and efficient', 'No eating or drinking allowed'],
    reviewCount: 1320,
  },
];

// WMATA Bus API - Real-time bus data for Washington DC Metro area
// Types based on WMATA API response structure
export interface BusRoute {
  RouteID: string;
  Name: string;
  LineDescription?: string;
}

export interface BusPosition {
  DateTime: string;
  Deviation: number;
  DirectionNum: string;
  DirectionText: string;
  Lat: number;
  Lon: number;
  RouteID: string;
  TripEndTime: string;
  TripHeadsign: string;
  TripID: string;
  TripStartTime: string;
  VehicleID: string;
}

export interface BusStop {
  StopID: string;
  Name: string;
  Lat: number;
  Lon: number;
  Routes: string[];
}

export interface ShapePoint {
  Lat: number;
  Lon: number;
  SeqNum: number;
}

export interface RouteDirection {
  DirectionNum: string;
  DirectionText: string;
  TripHeadsign: string;
  Shape: ShapePoint[];
  Stops: BusStop[];
}

export interface RouteDetails {
  RouteID: string;
  Name: string;
  Direction0?: RouteDirection;
  Direction1?: RouteDirection;
}

// WMATA Bus API endpoints
const wmataAPI = axios.create({
  baseURL: WMATA_API_BASE_URL,
  headers: {
    'api_key': WMATA_API_KEY,
  },
});

export const busAPI = {
  // Get all bus routes
  getRoutes: async (): Promise<BusRoute[]> => {
    try {
      const response = await wmataAPI.get('/jRoutes');
      return response.data.Routes || [];
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  // Get bus positions for a specific route or all routes
  getBusPositions: async (routeId?: string): Promise<BusPosition[]> => {
    try {
      const params = routeId ? { RouteID: routeId } : {};
      const response = await wmataAPI.get('/jBusPositions', { params });
      return response.data.BusPositions || [];
    } catch (error) {
      console.error('Error fetching bus positions:', error);
      throw error;
    }
  },

  // Get route path details including stops and shape points
  getRouteDetails: async (routeId: string, date?: string): Promise<RouteDetails> => {
    try {
      const params: any = { RouteID: routeId };
      if (date) params.Date = date;
      
      const response = await wmataAPI.get('/jRouteDetails', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching route details:', error);
      throw error;
    }
  },

  // Search for bus stops
  searchStops: async (lat?: number, lon?: number, radius?: number): Promise<BusStop[]> => {
    try {
      const params: any = {};
      if (lat && lon && radius) {
        params.Lat = lat;
        params.Lon = lon;
        params.Radius = radius;
      }
      
      const response = await wmataAPI.get('/jStops', { params });
      return response.data.Stops || [];
    } catch (error) {
      console.error('Error fetching stops:', error);
      throw error;
    }
  },

  // Get schedule for a specific route at a stop
  getScheduleAtStop: async (stopId: string, date?: string): Promise<any> => {
    try {
      const params: any = { StopID: stopId };
      if (date) params.Date = date;
      
      const response = await wmataAPI.get('/jStopSchedule', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },
};

// Transform WMATA bus routes to our app's destination format
const transformBusRouteToDestination = (
  route: BusRoute,
  index: number,
  details?: RouteDetails,
  positions?: BusPosition[]
): any => {
  const routeNumber = route.RouteID;
  const activePositions = positions?.filter(p => p.RouteID === routeNumber) || [];
  
  // Extract stops from details
  const allStops = [
    ...(details?.Direction0?.Stops || []),
    ...(details?.Direction1?.Stops || []),
  ];
  const uniqueStops = Array.from(new Set(allStops.map(s => s.Name))).slice(0, 5);
  
  // Create highlights from stops
  const highlights = uniqueStops.length > 0 
    ? uniqueStops 
    : [`Route ${routeNumber}`, 'Multiple stops', 'Real-time tracking', 'Scheduled service', 'Accessible'];

  // Generate tips
  const tips = [
    `Track real-time bus positions on route ${routeNumber}`,
    `${activePositions.length} buses currently active on this route`,
    'Check schedule for exact departure times',
    'Plan your trip using the route map',
  ];

  // Calculate average deviation if positions exist
  const avgDeviation = activePositions.length > 0
    ? activePositions.reduce((sum, p) => sum + Math.abs(p.Deviation), 0) / activePositions.length
    : 0;

  const status = activePositions.length > 5 ? 'Popular' : activePositions.length > 0 ? 'Active' : 'Scheduled';
  
  // Get direction info
  const direction = details?.Direction0 || details?.Direction1;
  const headsign = direction?.TripHeadsign || route.Name;
  
  return {
    id: index + 1,
    routeId: routeNumber,
    name: `${routeNumber} - ${headsign}`,
    description: route.Name || `Bus route ${routeNumber} in Washington DC Metro area. ${activePositions.length} buses currently running.`,
    image: `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800`, // Generic bus image
    country: 'USA',
    city: 'Washington DC',
    rating: Math.min(5, 4.2 + (activePositions.length * 0.1)),
    status,
    transportType: 'Bus',
    duration: 'Varies by route',
    price: 2.00, // Standard DC Metro bus fare
    schedule: activePositions.length > 0 
      ? [`${activePositions.length} buses active`, 'Real-time tracking available']
      : ['Check schedule', 'Service hours vary'],
    tags: ['Bus', 'Public Transit', 'Real-time', 'WMATA'],
    highlights,
    tips,
    reviewCount: Math.floor(Math.random() * 500) + 100,
    // WMATA-specific data
    busPositions: activePositions,
    routeDetails: details,
    activeBuses: activePositions.length,
    avgDeviation: Math.round(avgDeviation),
  };
};

export const destinationsAPI = {
  // Get bus routes as destinations
  getDestinations: async () => {
    try {
      console.log('Fetching WMATA bus routes...');
      
      // Fetch all routes
      const routes = await busAPI.getRoutes();
      
      if (!routes || routes.length === 0) {
        console.warn('No routes returned from WMATA API, using fallback data');
        return FALLBACK_DESTINATIONS;
      }
      
      console.log(`Found ${routes.length} routes, getting positions for top 15...`);
      
      // Get a sample of popular routes (limit to avoid rate limiting)
      const popularRoutes = routes.slice(0, 15);
      
      // Fetch positions for all routes in parallel
      const positionsPromises = popularRoutes.map(route => 
        busAPI.getBusPositions(route.RouteID).catch(err => {
          console.log(`No positions for route ${route.RouteID}`);
          return [];
        })
      );
      const allPositions = await Promise.all(positionsPromises);
      
      // Transform to destination format
      const destinations = popularRoutes.map((route, index) => 
        transformBusRouteToDestination(
          route,
          index,
          undefined,
          allPositions[index]
        )
      );
      
      console.log(`Successfully transformed ${destinations.length} routes`);
      
      // Sort by number of active buses (most active first)
      return destinations.sort((a, b) => (b.activeBuses || 0) - (a.activeBuses || 0));
    } catch (error: any) {
      console.error('Error fetching WMATA destinations:', error);
      console.error('Error details:', error.message);
      console.log('Using fallback static destinations instead');
      
      // Return fallback data on error instead of empty array
      return FALLBACK_DESTINATIONS;
    }
  },
  
  getDestinationById: async (id: number) => {
    try {
      console.log(`Fetching details for destination ID: ${id}`);
      
      // First get all routes to find the one matching the ID
      const routes = await busAPI.getRoutes();
      const route = routes[id - 1]; // ID is 1-indexed
      
      if (!route) {
        console.warn(`Route not found for ID ${id}, using fallback data`);
        const fallbackDest = FALLBACK_DESTINATIONS.find(d => d.id === id);
        if (fallbackDest) return fallbackDest;
        throw new Error('Destination not found');
      }
      
      // Fetch detailed information
      const [details, positions] = await Promise.all([
        busAPI.getRouteDetails(route.RouteID).catch(err => {
          console.log(`Failed to get route details: ${err.message}`);
          return undefined;
        }),
        busAPI.getBusPositions(route.RouteID).catch(err => {
          console.log(`Failed to get bus positions: ${err.message}`);
          return [];
        }),
      ]);
      
      return transformBusRouteToDestination(route, id - 1, details, positions);
    } catch (error: any) {
      console.error('Error fetching destination by ID:', error);
      console.error('Error details:', error.message);
      
      // Try to return fallback data
      const fallbackDest = FALLBACK_DESTINATIONS.find(d => d.id === id);
      if (fallbackDest) {
        console.log('Returning fallback destination');
        return fallbackDest;
      }
      
      throw error;
    }
  },
};
