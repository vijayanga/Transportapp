import axios from 'axios';

// DummyJSON for authentication only
const AUTH_API_BASE_URL = 'https://dummyjson.com';

// WMATA (Washington Metropolitan Area Transit Authority) Bus API
const WMATA_API_BASE_URL = 'https://api.wmata.com/Bus.svc/json';

// You need to get your own API key from: https://developer.wmata.com/
// For demo purposes, using a demo key (limited requests)
const WMATA_API_KEY = process.env.WMATA_API_KEY || 'e13626d03d8e4c03ac07f95541b3091b'; // Replace with your key

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
      // Fetch all routes
      const routes = await busAPI.getRoutes();
      
      // Get a sample of popular routes (limit to avoid rate limiting)
      const popularRoutes = routes.slice(0, 15);
      
      // Fetch positions for all routes in parallel
      const positionsPromises = popularRoutes.map(route => 
        busAPI.getBusPositions(route.RouteID).catch(() => [])
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
      
      // Sort by number of active buses (most active first)
      return destinations.sort((a, b) => b.activeBuses - a.activeBuses);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Return empty array on error
      return [];
    }
  },
  
  getDestinationById: async (id: number) => {
    try {
      // First get all routes to find the one matching the ID
      const routes = await busAPI.getRoutes();
      const route = routes[id - 1]; // ID is 1-indexed
      
      if (!route) {
        throw new Error('Route not found');
      }
      
      // Fetch detailed information
      const [details, positions] = await Promise.all([
        busAPI.getRouteDetails(route.RouteID),
        busAPI.getBusPositions(route.RouteID),
      ]);
      
      return transformBusRouteToDestination(route, id - 1, details, positions);
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  },
};
