import axios from 'axios';

// DummyJSON for authentication only
const AUTH_API_BASE_URL = 'https://dummyjson.com';

// TransportAPI - UK Transport Data (Free with registration)
// Sign up at: https://www.transportapi.com/
const TRANSPORT_API_BASE_URL = 'https://transportapi.com/v3/uk';
const TRANSPORT_API_ID = '42d7d1da';
const TRANSPORT_API_KEY = '460657268a71709042d93af1d09de02a';

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

// TransportAPI client for comprehensive UK transport data
const transportAPI = {
  // Get bus services (collection)
  getBusServices: async (params: {
    operator?: string;
    line_name?: string;
    lat?: number;
    lon?: number;
    limit?: number;
  } = {}) => {
    try {
      const response = await axios.get(`${TRANSPORT_API_BASE_URL}/bus/services.json`, {
        params: {
          app_id: TRANSPORT_API_ID,
          app_key: TRANSPORT_API_KEY,
          limit: params.limit || 25,
          ...(params.operator && { operator: params.operator }),
          ...(params.line_name && { line_name: params.line_name }),
          ...(params.lat && { lat: params.lat }),
          ...(params.lon && { lon: params.lon }),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bus services:', error);
      return null;
    }
  },

  // Get train station timetable
  getTrainStationTimetable: async (stationCode: string, params: {
    datetime?: string;
    limit?: number;
    live?: boolean;
  } = {}) => {
    try {
      const response = await axios.get(
        `${TRANSPORT_API_BASE_URL}/train/station_timetables/${stationCode}.json`,
        {
          params: {
            app_id: TRANSPORT_API_ID,
            app_key: TRANSPORT_API_KEY,
            limit: params.limit || 25,
            live: params.live !== false,
            ...(params.datetime && { datetime: params.datetime }),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching train station timetable:', error);
      return null;
    }
  },

  // Get bus stop timetable
  getBusStopTimetable: async (atcocode: string, params: {
    limit?: number;
    live?: boolean;
  } = {}) => {
    try {
      const response = await axios.get(
        `${TRANSPORT_API_BASE_URL}/bus/stop_timetables/${atcocode}.json`,
        {
          params: {
            app_id: TRANSPORT_API_ID,
            app_key: TRANSPORT_API_KEY,
            limit: params.limit || 25,
            live: params.live !== false,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching bus stop timetable:', error);
      return null;
    }
  },

  // Search for places (bus stops, train stations, POIs, etc.)
  searchPlaces: async (query: string, params: {
    type?: string[];
    lat?: number;
    lon?: number;
    limit?: number;
  } = {}) => {
    try {
      const response = await axios.get(`${TRANSPORT_API_BASE_URL}/places.json`, {
        params: {
          app_id: TRANSPORT_API_ID,
          app_key: TRANSPORT_API_KEY,
          query,
          limit: params.limit || 10,
          ...(params.type && { type: params.type.join(',') }),
          ...(params.lat && { lat: params.lat }),
          ...(params.lon && { lon: params.lon }),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching places:', error);
      return null;
    }
  },

  // Get journey plan
  getJourneyPlan: async (from: string, to: string, params: {
    date?: string;
    time?: string;
    modes?: string[];
  } = {}) => {
    try {
      const response = await axios.get(`${TRANSPORT_API_BASE_URL}/public_journey.json`, {
        params: {
          app_id: TRANSPORT_API_ID,
          app_key: TRANSPORT_API_KEY,
          from,
          to,
          ...(params.date && { date: params.date }),
          ...(params.time && { time: params.time }),
          ...(params.modes && { modes: params.modes.join(',') }),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting journey plan:', error);
      return null;
    }
  },
};

// Unique images for different transport types
const getTransportImage = (type: string, lineName?: string): string => {
  // Check for specific line/route names
  if (lineName) {
    const lineImages: { [key: string]: string } = {
      // Major bus routes
      '11': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      '24': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800',
      '38': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      // Train stations
      'PAD': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'VIC': 'https://images.unsplash.com/photo-1520096449544-54ab7d54e8fd?w=800',
      'WAT': 'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=800',
      'KGX': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800',
      'LBG': 'https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=800',
    };
    
    const upperLine = lineName.toUpperCase();
    if (lineImages[upperLine]) return lineImages[upperLine];
  }

  // Default images by transport type
  const typeImages: { [key: string]: string} = {
    'bus_stop': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    'train_station': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    'tube_station': 'https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=800',
    'tram_stop': 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
    'bus': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    'train': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    'metro': 'https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=800',
    'tram': 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
  };

  return typeImages[type] || 'https://images.unsplash.com/photo-1508144322886-3187947d2386?w=800';
};

// Transform TransportAPI bus service to destination format
const transformBusServiceToDestination = (service: any, index: number): any => {
  if (!service) {
    console.warn('Null service passed to transformBusServiceToDestination');
    return null;
  }

  const serviceId = service.id || `service-${index}`;
  const lineName = service.line_name || service.line || 'Unknown';
  const operator = service.operator?.name || 'Bus Operator';
  const description = service.description || `${lineName} Bus Service`;
  
  // Get directions
  const directions = Array.isArray(service.directions) ? service.directions : [];
  const outbound = directions.find((d: any) => d.name === 'outbound');
  const inbound = directions.find((d: any) => d.name === 'inbound');
  
  // Get stops from first direction
  const firstDir = outbound || inbound || directions[0];
  let stops: string[] = [];
  
  if (firstDir?.stops?.member && Array.isArray(firstDir.stops.member)) {
    stops = firstDir.stops.member.slice(0, 5).map((stop: any) => 
      stop.stop_name || stop.name || 'Stop'
    );
  }

  // Build highlights
  const highlights = [
    outbound?.origin?.description || firstDir?.origin?.description || 'Origin',
    ...(stops.length > 0 ? stops : ['Multiple stops', 'Regular service']),
    inbound?.destination?.description || firstDir?.destination?.description || 'Destination',
  ].slice(0, 5);

  // Build tips
  const tips = [
    `Route ${lineName} operated by ${operator}`,
    `From ${outbound?.origin?.description || 'origin'} to ${outbound?.destination?.description || 'destination'}`,
  ];

  if (directions.length > 1) {
    tips.push('Service runs in both directions');
  }

  tips.push('Pay with contactless or travel card');
  tips.push('Check real-time arrivals at bus stops');

  return {
    id: index + 1,
    routeId: serviceId,
    name: `Route ${lineName}`,
    description: `${description}. Operated by ${operator}.`,
    image: getTransportImage('bus', lineName),
    country: 'United Kingdom',
    city: operator.includes('London') ? 'London' : 'UK',
    rating: 4.2 + Math.random() * 0.6,
    status: 'Active',
    transportType: 'Bus',
    duration: 'Varies by route',
    price: 1.75,
    schedule: ['Daily', '5:00 AM - 12:00 AM'],
    tags: ['Bus', 'Public Transit', operator, 'UK Transport'],
    highlights,
    tips,
    reviewCount: Math.floor(Math.random() * 500) + 200,
    operatorCode: service.operator?.code,
    operatorName: operator,
    lineName,
    directions,
  };
};

// Transform TransportAPI train station to destination format
const transformTrainStationToDestination = (station: any, timetable: any, index: number): any => {
  if (!station) {
    console.warn('Null station passed to transformTrainStationToDestination');
    return null;
  }

  const stationCode = station.station_code || station.atcocode || `station-${index}`;
  const stationName = station.name || station.station_name || 'Train Station';
  const description = station.description || `${stationName} railway station`;
  
  // Get departures from timetable
  let departures: any[] = [];
  let operators: string[] = [];
  let destinations: string[] = [];

  if (timetable?.departures?.all && Array.isArray(timetable.departures.all)) {
    departures = timetable.departures.all.slice(0, 5);
    
    operators = [...new Set(departures.map((d: any) => d.operator_name).filter(Boolean))];
    destinations = [...new Set(departures.map((d: any) => d.destination_name).filter(Boolean))];
  }

  // Build highlights
  const highlights = destinations.length > 0 
    ? destinations.slice(0, 5)
    : ['Multiple destinations', 'Regular services', 'Real-time information', 'National Rail', 'City connections'];

  // Build tips
  const tips = [
    `${stationName} serves major destinations across the UK`,
  ];

  if (operators.length > 0) {
    tips.push(`Operated by ${operators.slice(0, 2).join(', ')}`);
  }

  if (departures.length > 0) {
    tips.push(`${departures.length}+ departures available`);
  }

  tips.push('Use National Rail app for live updates');
  tips.push('Purchase tickets in advance for best prices');

  return {
    id: index + 1,
    routeId: stationCode,
    name: stationName,
    description: `${description}. Major railway station providing connections across the UK network.`,
    image: getTransportImage('train_station', stationCode),
    country: 'United Kingdom',
    city: station.locality || 'UK',
    rating: 4.3 + Math.random() * 0.5,
    status: 'Active',
    transportType: 'Train',
    duration: 'Varies by destination',
    price: 15.00,
    schedule: ['Daily', '5:00 AM - 12:00 AM'],
    tags: ['Train', 'Railway', 'National Rail', 'UK Transport', 'Station'],
    highlights,
    tips,
    reviewCount: Math.floor(Math.random() * 1000) + 500,
    stationCode,
    stationName,
    latitude: station.latitude,
    longitude: station.longitude,
    departures,
    operators,
  };
};

// Transform TransportAPI bus stop to destination format
const transformBusStopToDestination = (stop: any, timetable: any, index: number): any => {
  if (!stop) {
    console.warn('Null stop passed to transformBusStopToDestination');
    return null;
  }

  const atcocode = stop.atcocode || `stop-${index}`;
  const stopName = stop.name || stop.stop_name || 'Bus Stop';
  const locality = stop.locality || stop.description || '';
  
  // Get departures from timetable
  let departures: any[] = [];
  let routes: string[] = [];
  let operators: string[] = [];

  if (timetable?.departures?.all && Array.isArray(timetable.departures.all)) {
    departures = timetable.departures.all.slice(0, 5);
    
    routes = [...new Set(departures.map((d: any) => d.line_name || d.line).filter(Boolean))];
    operators = [...new Set(departures.map((d: any) => d.operator_name).filter(Boolean))];
  }

  // Build highlights
  const highlights = routes.length > 0
    ? routes.map(r => `Route ${r}`).slice(0, 5)
    : ['Multiple routes', 'Regular service', 'Real-time arrivals', 'Contactless payment', 'Local connections'];

  // Build tips
  const tips = [
    `${stopName}${locality ? ` in ${locality}` : ''}`,
  ];

  if (routes.length > 0) {
    tips.push(`Routes: ${routes.slice(0, 3).join(', ')}${routes.length > 3 ? '...' : ''}`);
  }

  if (operators.length > 0) {
    tips.push(`Operated by ${operators[0]}`);
  }

  tips.push('Check real-time arrivals on bus stop display');
  tips.push('Pay with contactless card or travel app');

  return {
    id: index + 1,
    routeId: atcocode,
    name: stopName,
    description: `Bus stop${locality ? ` in ${locality}` : ''} serving ${routes.length > 0 ? routes.length : 'multiple'} route${routes.length === 1 ? '' : 's'}.`,
    image: getTransportImage('bus_stop'),
    country: 'United Kingdom',
    city: locality || 'UK',
    rating: 4.0 + Math.random() * 0.6,
    status: 'Active',
    transportType: 'Bus',
    duration: 'Frequent service',
    price: 1.75,
    schedule: ['Daily', 'Varies by route'],
    tags: ['Bus Stop', 'Public Transit', 'UK Transport', 'Local Bus'],
    highlights,
    tips,
    reviewCount: Math.floor(Math.random() * 300) + 100,
    atcocode,
    stopName,
    latitude: stop.latitude,
    longitude: stop.longitude,
    bearing: stop.bearing,
    indicator: stop.indicator,
    routes,
    departures,
  };
};

// Main destinations API
export const destinationsAPI = {
  getDestinations: async () => {
    try {
      console.log('🚌 Fetching UK transport data from TransportAPI...');

      const destinations: any[] = [];

      // 1. Fetch popular bus services (London and other UK cities)
      console.log('📍 Fetching bus services...');
      const busServices = await transportAPI.getBusServices({
        limit: 10,
      });

      if (busServices?.member && Array.isArray(busServices.member)) {
        console.log(`✅ Found ${busServices.member.length} bus services`);
        
        for (let i = 0; i < busServices.member.length; i++) {
          const dest = transformBusServiceToDestination(busServices.member[i], destinations.length);
          if (dest) destinations.push(dest);
        }
      }

      // 2. Fetch major train stations
      console.log('📍 Fetching train stations...');
      const majorStations = ['PAD', 'VIC', 'WAT', 'KGX', 'LBG']; // Paddington, Victoria, Waterloo, Kings Cross, London Bridge

      for (const stationCode of majorStations) {
        try {
          const places = await transportAPI.searchPlaces(stationCode, {
            type: ['train_station'],
            limit: 1,
          });

          if (places?.member && places.member.length > 0) {
            const station = places.member[0];
            
            // Get timetable for the station
            const timetable = await transportAPI.getTrainStationTimetable(`crs:${stationCode}`, {
              limit: 10,
              live: true,
            });

            const dest = transformTrainStationToDestination(station, timetable, destinations.length);
            if (dest) destinations.push(dest);
          }
        } catch (error) {
          console.warn(`Failed to fetch station ${stationCode}:`, error);
        }
      }

      console.log(`✅ Successfully loaded ${destinations.length} UK transport services`);
      
      if (destinations.length === 0) {
        console.warn('⚠️ No destinations loaded, check API credentials');
      }

      return destinations;

    } catch (error: any) {
      console.error('❌ Error fetching destinations:', error.message);
      return [];
    }
  },

  getDestinationById: async (id: number) => {
    try {
      console.log(`🔍 Fetching destination details for ID: ${id}`);
      
      const allDestinations = await destinationsAPI.getDestinations();
      const destination = allDestinations.find((d: any) => d.id === id);

      if (!destination) {
        console.warn(`⚠️ Destination with ID ${id} not found`);
        return null;
      }

      // Fetch additional live data if available
      if (destination.transportType === 'Train' && destination.stationCode) {
        const timetable = await transportAPI.getTrainStationTimetable(
          `crs:${destination.stationCode}`,
          { limit: 20, live: true }
        );
        
        if (timetable?.departures?.all) {
          destination.departures = timetable.departures.all;
        }
      } else if (destination.transportType === 'Bus' && destination.atcocode) {
        const timetable = await transportAPI.getBusStopTimetable(destination.atcocode, {
          limit: 20,
          live: true,
        });
        
        if (timetable?.departures?.all) {
          destination.departures = timetable.departures.all;
        }
      }

      return destination;

    } catch (error: any) {
      console.error(`❌ Error fetching destination by ID ${id}:`, error.message);
      return null;
    }
  },

  searchDestinations: async (query: string) => {
    try {
      console.log(`🔍 Searching for: ${query}`);
      
      const places = await transportAPI.searchPlaces(query, {
        type: ['bus_stop', 'train_station', 'tube_station', 'tram_stop'],
        limit: 20,
      });

      if (!places?.member || !Array.isArray(places.member)) {
        return [];
      }

      const results: any[] = [];

      for (const place of places.member) {
        if (place.type === 'train_station') {
          const timetable = await transportAPI.getTrainStationTimetable(
            place.station_code || `crs:${place.name}`,
            { limit: 5, live: true }
          );
          
          const dest = transformTrainStationToDestination(place, timetable, results.length);
          if (dest) results.push(dest);
          
        } else if (place.type === 'bus_stop') {
          const timetable = await transportAPI.getBusStopTimetable(place.atcocode, {
            limit: 5,
            live: true,
          });
          
          const dest = transformBusStopToDestination(place, timetable, results.length);
          if (dest) results.push(dest);
        }
      }

      console.log(`✅ Found ${results.length} matching destinations`);
      return results;

    } catch (error: any) {
      console.error('❌ Error searching destinations:', error.message);
      return [];
    }
  },

  // Journey planning
  planJourney: async (from: string, to: string, params?: {
    date?: string;
    time?: string;
    modes?: string[];
  }) => {
    try {
      console.log(`🗺️ Planning journey from ${from} to ${to}`);
      
      const journey = await transportAPI.getJourneyPlan(from, to, params);
      
      if (!journey?.routes || !Array.isArray(journey.routes)) {
        console.warn('No journey routes found');
        return null;
      }

      return journey;

    } catch (error: any) {
      console.error('❌ Error planning journey:', error.message);
      return null;
    }
  },
};

export { transportAPI };
