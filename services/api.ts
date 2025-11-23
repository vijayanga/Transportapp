import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

// WMATA API Configuration (Washington DC Metro)
// Sign up at https://developer.wmata.com/signup to get your API key
// Free tier: 10 calls per second, 50,000 calls per day
const WMATA_API_BASE = 'https://api.wmata.com';
const WMATA_API_KEY = '2072f9dede7a40c1b050c0f84f059207'; // Your WMATA API key

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    // DummyJSON returns accessToken, we need to transform it to token
    const data = response.data;
    return {
      ...data,
      token: data.accessToken || data.token || 'demo-token-' + Date.now(),
    };
  },
  
  register: async (userData: any) => {
    // For demo purposes, we'll simulate registration
    // In a real app, you'd call a proper registration endpoint
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

// Metro line colors for visual representation
const METRO_LINE_COLORS: { [key: string]: string } = {
  RD: '#E51937', // Red Line
  BL: '#1E88E5', // Blue Line
  YL: '#FFD700', // Yellow Line
  OR: '#FF8C00', // Orange Line
  GR: '#00B140', // Green Line
  SV: '#9D9D9D', // Silver Line
};

// DC Metro and Railway Station photos (USA railway stations) - 8 unique photos cycling through 91 stations
const METRO_IMAGES = [
  'https://www.railway-technology.com/wp-content/uploads/sites/13/2023/09/Image-1-Brightlines-Orlando-Station.jpg',
  'https://media.timeout.com/images/106026540/750/562/image.jpg',
  'https://thetravelwomen.com/wp-content/uploads/2017/10/4-Denver.jpg',
  'https://www.shutterstock.com/image-photo/denver-colorado-usa-2-june-260nw-2645289739.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ935voqJNkCmm-FAKwcmnJFe2CwmZMQ-WQoA&s',
  'https://www.railway-technology.com/wp-content/uploads/sites/13/2023/09/Image-1-Brightlines-Orlando-Station.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfOSLE4YgkC6GPicBrgfGc2JOthyp2Xa3lw&s',
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwAh_UFpfRj-RmLcaqw3uKoSaWgiCUkjPwxw&s'
  
];

// Helper function to transform WMATA station data to app format
const transformStationToDestination = (station: any, index: number): any => {
  const lineCode = station.LineCode1 || station.LineCode2 || 'RD';
  const lineCode2 = station.LineCode2;
  const lineCode3 = station.LineCode3;
  const lineCode4 = station.LineCode4;
  
  // Build route string with all lines
  const lines = [lineCode, lineCode2, lineCode3, lineCode4]
    .filter(code => code && code.trim())
    .map(code => getLineName(code));
  const routeString = lines.join(', ');
  
  // Determine if transfer station
  const isTransferStation = lines.length > 1;
  
  // Generate unique rating based on station name
  const nameHash = station.Name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const rating = 3.8 + ((nameHash % 100) / 100) * 1.4; // Range: 3.8 - 5.2
  
  // Determine status based on station characteristics
  let status = 'Active';
  if (isTransferStation) {
    status = 'Popular';
  } else if (lines.some(l => l.includes('Silver'))) {
    status = 'Modern';
  }
  
  // Vary fare based on line and station position (simulating zone pricing)
  const baseFare = 2.00 + ((nameHash % 5) * 0.25); // Range: $2.00 - $3.00
  const maxFare = 5.00 + ((index % 8) * 0.25); // Range: $5.00 - $6.75
  const fareMin = baseFare.toFixed(2);
  const fareMax = maxFare.toFixed(2);
  const fare = `$${fareMin}-$${fareMax}`;
  
  // Vary schedule based on line and station - random first/last train times
  const hasWeekendService = !lines.some(l => l.includes('Yellow'));
  
  // Random first train time (4:30am - 5:30am on weekdays)
  const firstTrainHour = 4 + Math.floor(nameHash % 2);
  const firstTrainMinute = (nameHash % 4) * 15; // 0, 15, 30, 45
  const firstTrainWeekday = `${firstTrainHour}:${firstTrainMinute.toString().padStart(2, '0')}`;
  
  // Random last train time (11:00pm - 12:30am)
  const lastTrainHour = (nameHash % 2) === 0 ? 23 : 0; // 11pm or 12am
  const lastTrainMinute = ((nameHash + index) % 4) * 15;
  const lastTrainWeekday = lastTrainHour === 0 
    ? `12:${lastTrainMinute.toString().padStart(2, '0')} AM`
    : `11:${lastTrainMinute.toString().padStart(2, '0')} PM`;
  
  // Weekend times (if applicable) - start later, end same or earlier
  const firstTrainWeekend = hasWeekendService 
    ? `${6 + Math.floor((nameHash + 1) % 2)}:${((nameHash + 2) % 4) * 15}`.replace(':0', ':00')
    : '';
  
  const schedule = hasWeekendService 
    ? `Weekdays: ${firstTrainWeekday}am-${lastTrainWeekday}, Weekends: ${firstTrainWeekend}am-${lastTrainWeekday}`
    : `Weekdays: ${firstTrainWeekday}am-${lastTrainWeekday}, Limited Weekend Service`;
  
  const operatingHours = hasWeekendService 
    ? `${firstTrainWeekday.toUpperCase()} AM - ${lastTrainWeekday}` 
    : `${firstTrainWeekday.toUpperCase()} AM - ${lastTrainWeekday}`;
  
  // Build unique description
  let description = `${routeString} station serving ${station.Name} area in Washington DC Metro.`;
  if (isTransferStation) {
    description += ` Major transfer hub connecting ${lines.length} metro lines.`;
  } else if (station.Name.toLowerCase().includes('airport')) {
    description += ' Direct access to airport terminals.';
  } else if (station.Name.toLowerCase().includes('university') || station.Name.toLowerCase().includes('college')) {
    description += ' Serves educational institutions and student community.';
  } else {
    description += ' Convenient access to local attractions and businesses.';
  }
  
  // Build unique features list
  const features = ['SmarTrip Card', 'Real-time Train Predictions'];
  
  if (isTransferStation) {
    features.push('Transfer Hub');
    features.push('Multiple Lines');
  } else {
    features.push('Direct Line');
  }
  
  // Add station-specific amenities
  const nameLC = station.Name.toLowerCase();
  if (nameLC.includes('airport')) {
    features.push('Airport Access', 'Luggage Assistance');
  } else if (nameLC.includes('union') || nameLC.includes('center')) {
    features.push('Elevator Access', 'Escalators', 'Retail Shops');
  } else if (lines.some(l => l.includes('Silver'))) {
    features.push('Modern Facilities', 'Digital Displays');
  } else {
    features.push('Elevator Access', 'Bike Racks');
  }
  
  // Get actual station count for the primary Metro line
  const stops = LINE_STATION_COUNTS[lineCode] || 0;
  
  return {
    id: index + 1,
    stationCode: station.Code,
    name: station.Name,
    description,
    image: METRO_IMAGES[index % METRO_IMAGES.length],
    city: 'Washington DC',
    country: 'United States',
    rating: Math.round(rating * 10) / 10, // Round to 1 decimal
    status,
    type: 'Metro Station',
    route: routeString,
    lineCode: lineCode,
    schedule,
    operatingHours,
    fare,
    stops,
    features,
    popularStops: [],
    latitude: station.Lat,
    longitude: station.Lon,
    address: station.Address?.Street || '',
  };
};

// Helper function to get line name from code
const getLineName = (code: string): string => {
  const lines: { [key: string]: string } = {
    RD: 'Red Line',
    BL: 'Blue Line',
    YL: 'Yellow Line',
    OR: 'Orange Line',
    GR: 'Green Line',
    SV: 'Silver Line',
  };
  return lines[code] || 'Metro Line';
};

// Fallback data - DC Metro popular stations
const FALLBACK_DESTINATIONS = [
  {
    id: 1,
    stationCode: 'A01',
    name: 'Metro Center',
    description: 'Major transfer hub in downtown DC. Transfer between Red, Blue, Orange, and Silver lines. One of the busiest stations in the system.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.6,
    status: 'Active',
    type: 'Metro Station',
    route: 'Red, Blue, Orange, Silver Lines',
    lineCode: 'RD',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Transfer Station', 'SmarTrip Card', 'Elevator Access', 'Real-time Predictions'],
    popularStops: [],
  },
  {
    id: 2,
    stationCode: 'C01',
    name: 'Union Station',
    description: 'Historic train station and major transportation hub. Access to Amtrak, MARC, VRE, and Red Line Metro services.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.8,
    status: 'Active',
    type: 'Metro Station',
    route: 'Red Line',
    lineCode: 'RD',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Rail Connection', 'Shopping', 'Dining', 'Historic Building'],
    popularStops: [],
  },
  {
    id: 3,
    stationCode: 'D03',
    name: 'Foggy Bottom',
    description: 'Serves George Washington University and State Department. Access to Kennedy Center and Watergate complex.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.4,
    status: 'Active',
    type: 'Metro Station',
    route: 'Blue, Orange, Silver Lines',
    lineCode: 'BL',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['University Access', 'Tourist Attractions', 'SmarTrip Card', 'Elevator'],
    popularStops: [],
  },
  {
    id: 4,
    stationCode: 'F01',
    name: 'Gallery Place-Chinatown',
    description: 'Entertainment district station near Capital One Arena. Transfer between Red, Green, and Yellow lines.',
    image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.7,
    status: 'Active',
    type: 'Metro Station',
    route: 'Red, Green, Yellow Lines',
    lineCode: 'RD',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Transfer Station', 'Entertainment District', 'Restaurants', 'Sports Arena'],
    popularStops: [],
  },
  {
    id: 5,
    stationCode: 'D01',
    name: 'Federal Triangle',
    description: 'Serves federal government buildings and National Mall. Close to museums and monuments.',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.5,
    status: 'Active',
    type: 'Metro Station',
    route: 'Blue, Orange, Silver Lines',
    lineCode: 'BL',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Government Buildings', 'Museums', 'National Mall', 'Tourist Access'],
    popularStops: [],
  },
  {
    id: 6,
    stationCode: 'C07',
    name: 'Dupont Circle',
    description: 'Vibrant neighborhood station with shops, restaurants, and nightlife. Features unique curved escalators.',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.6,
    status: 'Active',
    type: 'Metro Station',
    route: 'Red Line',
    lineCode: 'RD',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Long Escalators', 'Shopping', 'Dining', 'Nightlife'],
    popularStops: [],
  },
  {
    id: 7,
    stationCode: 'K01',
    name: 'McPherson Square',
    description: 'Downtown station near White House and business district. Serves K Street corridor.',
    image: 'https://images.unsplash.com/photo-1517093602132-73ef7e6c8dc0?w=800',
    city: 'Washington DC',
    country: 'United States',
    rating: 4.3,
    status: 'Active',
    type: 'Metro Station',
    route: 'Blue, Orange, Silver Lines',
    lineCode: 'BL',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Business District', 'Near White House', 'SmarTrip Card', 'Peak Service'],
    popularStops: [],
  },
  {
    id: 8,
    stationCode: 'A11',
    name: 'Bethesda',
    description: 'Major suburban station in Maryland. Shopping, dining, and office district.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800',
    city: 'Bethesda, MD',
    country: 'United States',
    rating: 4.5,
    status: 'Active',
    type: 'Metro Station',
    route: 'Red Line',
    lineCode: 'RD',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Suburban Hub', 'Shopping Center', 'Restaurants', 'Parking'],
    popularStops: [],
  },
  {
    id: 9,
    stationCode: 'C10',
    name: 'Arlington Cemetery',
    description: 'Access to Arlington National Cemetery and Pentagon. Solemn and historic location.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    city: 'Arlington, VA',
    country: 'United States',
    rating: 4.7,
    status: 'Active',
    type: 'Metro Station',
    route: 'Blue Line',
    lineCode: 'BL',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Historic Site', 'Cemetery Access', 'Pentagon Nearby', 'Visitor Center'],
    popularStops: [],
  },
  {
    id: 10,
    stationCode: 'N03',
    name: 'Tysons Corner',
    description: 'Modern Silver Line station serving major shopping center and business district in Northern Virginia.',
    image: 'https://images.unsplash.com/photo-1557848540-6bccf1c39588?w=800',
    city: 'Tysons, VA',
    country: 'United States',
    rating: 4.4,
    status: 'Active',
    type: 'Metro Station',
    route: 'Silver Line',
    lineCode: 'SV',
    schedule: 'Weekdays: 5am-12am',
    operatingHours: '5:00 AM - 12:00 AM',
    fare: '$2.00-$6.00',
    stops: 0,
    features: ['Shopping Mall', 'Business Center', 'Modern Design', 'Free Parking'],
    popularStops: [],
  },
];

// Station counts per Metro line (actual WMATA data)
const LINE_STATION_COUNTS: { [key: string]: number } = {
  RD: 27, // Red Line - 27 stations
  BL: 28, // Blue Line - 28 stations
  YL: 17, // Yellow Line - 17 stations
  OR: 26, // Orange Line - 26 stations
  GR: 21, // Green Line - 21 stations
  SV: 28, // Silver Line - 28 stations (shares with Blue/Orange)
};

// WMATA API Integration
export const destinationsAPI = {
  getDestinations: async () => {
    try {
      console.log('🚇 Fetching DC Metro stations from WMATA API...');
      
      // Fetch all Metro stations
      const url = `${WMATA_API_BASE}/Rail.svc/json/jStations?api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      
      if (response.data && response.data.Stations) {
        console.log(`✅ Fetched ${response.data.Stations.length} Metro stations from WMATA`);
        
        // Shuffle stations randomly to mix all lines together
        const shuffledStations = response.data.Stations.sort(() => Math.random() - 0.5);
        
        const destinations = shuffledStations.map(transformStationToDestination);
        return destinations.length > 0 ? destinations : FALLBACK_DESTINATIONS;
      }
      
      console.warn('⚠️ No data returned from WMATA API. Using fallback.');
      return FALLBACK_DESTINATIONS;
      
    } catch (error: any) {
      console.error('❌ Error fetching destinations from WMATA API:', error.message);
      if (error.response) {
        console.error('API Response:', error.response.status, error.response.data);
      }
      // Return fallback data on error
      return FALLBACK_DESTINATIONS;
    }
  },
  
  getDestinationById: async (id: number) => {
    try {
      // First try to get from API
      const destinations = await destinationsAPI.getDestinations();
      const destination = destinations.find((d: any) => d.id === id);
      
      if (!destination) {
        throw new Error('Destination not found');
      }
      
      return destination;
    } catch (error) {
      console.error('Error fetching destination details:', error);
      throw error;
    }
  },
  
  // Get real-time train predictions for a station
  getTrainPredictions: async (stationCode: string) => {
    try {
      const url = `${WMATA_API_BASE}/StationPrediction.svc/json/GetPrediction/${stationCode}?api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Trains || [];
    } catch (error: any) {
      console.error('Error fetching train predictions:', error.message);
      return [];
    }
  },
  
  // Get station information by code
  getStationInfo: async (stationCode: string) => {
    try {
      const url = `${WMATA_API_BASE}/Rail.svc/json/jStationInfo?StationCode=${stationCode}&api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching station info:', error.message);
      return null;
    }
  },
  
  // Get parking information for a station
  getStationParking: async (stationCode: string) => {
    try {
      const url = `${WMATA_API_BASE}/Rail.svc/json/jStationParking?StationCode=${stationCode}&api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.StationsParking || [];
    } catch (error: any) {
      console.error('Error fetching parking info:', error.message);
      return [];
    }
  },
  
  // Get rail line information
  getLines: async () => {
    try {
      const url = `${WMATA_API_BASE}/Rail.svc/json/jLines?api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Lines || [];
    } catch (error: any) {
      console.error('Error fetching lines:', error.message);
      return [];
    }
  },

  // Get path between two stations
  getPath: async (fromStationCode: string, toStationCode: string) => {
    try {
      const url = `${WMATA_API_BASE}/Rail.svc/json/jPath?FromStationCode=${fromStationCode}&ToStationCode=${toStationCode}&api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Path || [];
    } catch (error: any) {
      console.error('Error fetching path:', error.message);
      return [];
    }
  },

  // Get station timings (first/last trains)
  getStationTimings: async (stationCode: string) => {
    try {
      const url = `${WMATA_API_BASE}/Rail.svc/json/jStationTimes?StationCode=${stationCode}&api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching station timings:', error.message);
      return null;
    }
  },

  // Get station entrances (exits/entrances with GPS)
  getStationEntrances: async (latitude?: number, longitude?: number, radius?: number) => {
    try {
      let url = `${WMATA_API_BASE}/Rail.svc/json/jStationEntrances?api_key=${WMATA_API_KEY}`;
      
      if (latitude && longitude) {
        url += `&Lat=${latitude}&Lon=${longitude}`;
        if (radius) {
          url += `&Radius=${radius}`;
        }
      }
      
      const response = await axios.get(url);
      return response.data.Entrances || [];
    } catch (error: any) {
      console.error('Error fetching station entrances:', error.message);
      return [];
    }
  },

  // Get elevator/escalator incidents
  getElevatorIncidents: async (stationCode?: string) => {
    try {
      let url = `${WMATA_API_BASE}/Incidents.svc/json/ElevatorIncidents?api_key=${WMATA_API_KEY}`;
      
      if (stationCode) {
        url += `&StationCode=${stationCode}`;
      }
      
      const response = await axios.get(url);
      return response.data.ElevatorIncidents || [];
    } catch (error: any) {
      console.error('Error fetching elevator incidents:', error.message);
      return [];
    }
  },

  // Get rail incidents (delays, alerts)
  getRailIncidents: async () => {
    try {
      const url = `${WMATA_API_BASE}/Incidents.svc/json/Incidents?api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Incidents || [];
    } catch (error: any) {
      console.error('Error fetching rail incidents:', error.message);
      return [];
    }
  },

  // Get bus routes
  getBusRoutes: async () => {
    try {
      const url = `${WMATA_API_BASE}/Bus.svc/json/jRoutes?api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Routes || [];
    } catch (error: any) {
      console.error('Error fetching bus routes:', error.message);
      return [];
    }
  },

  // Get bus stops
  getBusStops: async (latitude?: number, longitude?: number, radius?: number) => {
    try {
      let url = `${WMATA_API_BASE}/Bus.svc/json/jStops?api_key=${WMATA_API_KEY}`;
      
      if (latitude && longitude) {
        url += `&Lat=${latitude}&Lon=${longitude}`;
        if (radius) {
          url += `&Radius=${radius}`;
        }
      }
      
      const response = await axios.get(url);
      return response.data.Stops || [];
    } catch (error: any) {
      console.error('Error fetching bus stops:', error.message);
      return [];
    }
  },

  // Get bus positions (real-time)
  getBusPositions: async (routeId?: string) => {
    try {
      let url = `${WMATA_API_BASE}/Bus.svc/json/jBusPositions?api_key=${WMATA_API_KEY}`;
      
      if (routeId) {
        url += `&RouteID=${routeId}`;
      }
      
      const response = await axios.get(url);
      return response.data.BusPositions || [];
    } catch (error: any) {
      console.error('Error fetching bus positions:', error.message);
      return [];
    }
  },

  // Get bus predictions for a stop
  getBusPredictions: async (stopId: string) => {
    try {
      const url = `${WMATA_API_BASE}/NextBusService.svc/json/jPredictions?StopID=${stopId}&api_key=${WMATA_API_KEY}`;
      
      const response = await axios.get(url);
      return response.data.Predictions || [];
    } catch (error: any) {
      console.error('Error fetching bus predictions:', error.message);
      return [];
    }
  },
};
