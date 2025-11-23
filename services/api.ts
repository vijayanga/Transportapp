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

// Transport for London (TfL) API - Free, no authentication required
const TFL_API_BASE_URL = 'https://api.tfl.gov.uk';

// TfL Line API to get London Underground/Bus lines
const tflAPI = {
  getLines: async (mode: string = 'tube,bus') => {
    try {
      const response = await axios.get(`${TFL_API_BASE_URL}/Line/Mode/${mode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching TfL lines:', error);
      return [];
    }
  },

  getLineStatus: async (lineId: string) => {
    try {
      const response = await axios.get(`${TFL_API_BASE_URL}/Line/${lineId}/Status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching TfL line status:', error);
      return [];
    }
  },

  getArrivals: async (lineId: string) => {
    try {
      const response = await axios.get(`${TFL_API_BASE_URL}/Line/${lineId}/Arrivals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching TfL arrivals:', error);
      return [];
    }
  },
};

// Transform TfL line to destination format
const transformTfLLineToDestination = (line: any, index: number): any => {
  const lineId = line.id || '';
  const lineName = line.name || 'Unknown Line';
  const modeName = line.modeName || 'Transport';
  
  const transportTypeMap: any = {
    'tube': 'Metro',
    'bus': 'Bus',
    'overground': 'Train',
    'dlr': 'Light Rail',
    'tram': 'Tram',
    'river-bus': 'Boat',
  };

  const transportType = transportTypeMap[modeName] || 'Transport';
  
  const lineStatuses = line.lineStatuses || [];
  const statusSeverity = lineStatuses[0]?.statusSeverity || 10;
  const statusDescription = lineStatuses[0]?.statusSeverityDescription || 'Good Service';
  
  let status = 'Active';
  if (statusSeverity >= 10) status = 'Popular';
  else if (statusSeverity >= 6) status = 'Active';
  else status = 'Delayed';

  const routeSections = line.routeSections || [];
  const highlights = routeSections.length > 0
    ? routeSections.slice(0, 5).map((section: any) => section.name || 'Station')
    : [lineName, 'Multiple stops', 'Real-time updates', 'Regular service', 'City transport'];

  const tips = [
    `${lineName} provides regular service across London`,
    `Current status: ${statusDescription}`,
    'Use contactless payment or Oyster card',
    'Check TfL app for real-time updates',
  ];

  return {
    id: index + 1,
    routeId: lineId,
    name: lineName,
    description: `${lineName} - ${modeName} service in London. Status: ${statusDescription}. Part of Transport for London network.`,
    image: modeName === 'tube' 
      ? 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
      : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    country: 'United Kingdom',
    city: 'London',
    rating: Math.min(5, 4.0 + (statusSeverity / 10)),
    status,
    transportType,
    duration: 'Varies by route',
    price: 2.80,
    schedule: ['Daily', '5:00 AM - 1:00 AM'],
    tags: [transportType, 'Public Transit', 'TfL', 'London'],
    highlights,
    tips,
    reviewCount: Math.floor(Math.random() * 1000) + 500,
    tflLineId: lineId,
    lineStatus: statusDescription,
    statusSeverity,
    modeName,
  };
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
    // Try WMATA first
    try {
      console.log('Fetching WMATA bus routes...');
      
      const routes = await busAPI.getRoutes();
      
      if (routes && routes.length > 0) {
        console.log(`Found ${routes.length} WMATA routes, getting positions for top 15...`);
        
        const popularRoutes = routes.slice(0, 15);
        
        const positionsPromises = popularRoutes.map(route => 
          busAPI.getBusPositions(route.RouteID).catch(err => {
            console.log(`No positions for route ${route.RouteID}`);
            return [];
          })
        );
        const allPositions = await Promise.all(positionsPromises);
        
        const destinations = popularRoutes.map((route, index) => 
          transformBusRouteToDestination(
            route,
            index,
            undefined,
            allPositions[index]
          )
        );
        
        console.log(`Successfully loaded ${destinations.length} WMATA routes`);
        return destinations.sort((a, b) => (b.activeBuses || 0) - (a.activeBuses || 0));
      }
    } catch (error: any) {
      console.warn('WMATA API failed:', error.message);
    }

    // Fallback to TfL API (free, no authentication)
    try {
      console.log('Fetching Transport for London (TfL) routes as fallback...');
      
      const lines = await tflAPI.getLines('tube,bus,overground');
      
      if (lines && lines.length > 0) {
        console.log(`Found ${lines.length} TfL lines`);
        
        const popularLines = lines.slice(0, 15);
        
        const destinations = popularLines.map((line: any, index: number) => 
          transformTfLLineToDestination(line, index)
        );
        
        console.log(`Successfully loaded ${destinations.length} TfL routes`);
        return destinations;
      }
    } catch (error: any) {
      console.error('TfL API also failed:', error.message);
    }

    throw new Error('Unable to fetch transport data from any API');
  },
  
  getDestinationById: async (id: number) => {
    // Try WMATA first
    try {
      console.log(`Fetching WMATA details for destination ID: ${id}`);
      
      const routes = await busAPI.getRoutes();
      const route = routes[id - 1];
      
      if (route) {
        const [details, positions] = await Promise.all([
          busAPI.getRouteDetails(route.RouteID).catch(() => undefined),
          busAPI.getBusPositions(route.RouteID).catch(() => []),
        ]);
        
        return transformBusRouteToDestination(route, id - 1, details, positions);
      }
    } catch (error: any) {
      console.warn(`WMATA failed for ID ${id}:`, error.message);
    }

    // Fallback to TfL API
    try {
      console.log(`Fetching TfL details for destination ID: ${id}`);
      
      const lines = await tflAPI.getLines('tube,bus,overground');
      const line = lines[id - 1];
      
      if (line) {
        const statusData = await tflAPI.getLineStatus(line.id).catch(() => []);
        if (statusData.length > 0) {
          line.lineStatuses = statusData[0].lineStatuses;
        }
        
        return transformTfLLineToDestination(line, id - 1);
      }
    } catch (error: any) {
      console.error(`TfL also failed for ID ${id}:`, error.message);
    }

    throw new Error('Destination not found in any API');
  },
};
