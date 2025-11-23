import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

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

// Transport/Travel Destinations Data
const TRANSPORT_DESTINATIONS = [
  {
    id: 1,
    name: 'Paris Metro Line 1',
    description: 'Automated metro line connecting La Défense to Château de Vincennes. One of the busiest lines in Paris.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    city: 'Paris',
    country: 'France',
    rating: 4.6,
    status: 'Active',
    type: 'Metro',
    route: 'Line 1',
    schedule: 'Every 2-3 minutes',
    operatingHours: '05:30 - 01:15',
    fare: '€1.90',
    stops: 25,
    features: ['Automated trains', 'Air-conditioned', 'Wheelchair accessible', 'Real-time information'],
    popularStops: ['Louvre-Rivoli', 'Champs-Élysées-Clemenceau', 'La Défense'],
  },
  {
    id: 2,
    name: 'Tokyo Yamanote Line',
    description: 'Loop line connecting all major districts in Tokyo. Essential for commuters and tourists alike.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    city: 'Tokyo',
    country: 'Japan',
    rating: 4.8,
    status: 'Popular',
    type: 'Train',
    route: 'Yamanote Line',
    schedule: 'Every 2-4 minutes',
    operatingHours: '04:30 - 01:00',
    fare: '¥140-200',
    stops: 30,
    features: ['High frequency', 'Always on time', 'Women-only cars', 'English announcements'],
    popularStops: ['Shibuya', 'Shinjuku', 'Tokyo Station'],
  },
  {
    id: 3,
    name: 'London Underground Victoria Line',
    description: 'Fast and frequent tube line running from north to south London through central stations.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    city: 'London',
    country: 'United Kingdom',
    rating: 4.4,
    status: 'Active',
    type: 'Underground',
    route: 'Victoria Line',
    schedule: 'Every 2-3 minutes',
    operatingHours: '05:00 - 00:30',
    fare: '£2.50-6.70',
    stops: 16,
    features: ['Contactless payment', 'Step-free access', 'Mobile coverage', 'Night service weekends'],
    popularStops: ['Kings Cross', 'Oxford Circus', 'Victoria'],
  },
  {
    id: 4,
    name: 'NYC Subway L Train',
    description: 'Connects Manhattan and Brooklyn, serving trendy neighborhoods and business districts.',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800',
    city: 'New York',
    country: 'USA',
    rating: 4.2,
    status: 'Active',
    type: 'Subway',
    route: 'L Line',
    schedule: 'Every 4-8 minutes',
    operatingHours: '24/7',
    fare: '$2.75',
    stops: 24,
    features: ['24-hour service', 'Air-conditioned', 'Security cameras', 'WiFi at stations'],
    popularStops: ['Union Square', 'Bedford Avenue', '14th St'],
  },
  {
    id: 5,
    name: 'Singapore MRT North-South Line',
    description: 'First MRT line connecting northern suburbs to city center and southern regions.',
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800',
    city: 'Singapore',
    country: 'Singapore',
    rating: 4.9,
    status: 'Popular',
    type: 'MRT',
    route: 'North-South Line',
    schedule: 'Every 2-5 minutes',
    operatingHours: '05:30 - 00:30',
    fare: 'S$0.92-2.16',
    stops: 27,
    features: ['Extremely clean', 'Air-conditioned', 'Priority seats', 'Platform screen doors'],
    popularStops: ['Marina Bay', 'Orchard', 'Jurong East'],
  },
  {
    id: 6,
    name: 'Barcelona Metro L3',
    description: 'Green line crossing Barcelona from north to south through historic districts.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    city: 'Barcelona',
    country: 'Spain',
    rating: 4.5,
    status: 'Active',
    type: 'Metro',
    route: 'Line 3 (Green)',
    schedule: 'Every 3-5 minutes',
    operatingHours: '05:00 - 00:00',
    fare: '€2.40',
    stops: 26,
    features: ['Modern trains', 'Accessible', 'Integrated ticketing', 'Tourist friendly'],
    popularStops: ['Passeig de Gràcia', 'Liceu', 'Diagonal'],
  },
  {
    id: 7,
    name: 'Berlin U-Bahn U6',
    description: 'Historic line running through central Berlin connecting major attractions.',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800',
    city: 'Berlin',
    country: 'Germany',
    rating: 4.3,
    status: 'Active',
    type: 'U-Bahn',
    route: 'U6',
    schedule: 'Every 5-10 minutes',
    operatingHours: '24 hours (weekends)',
    fare: '€3.00',
    stops: 29,
    features: ['Historic stations', 'Night service', 'Bike-friendly', 'Heated platforms'],
    popularStops: ['Friedrichstraße', 'Naturkundemuseum', 'Hallesches Tor'],
  },
  {
    id: 8,
    name: 'Mumbai Local - Western Line',
    description: 'Lifeline of Mumbai carrying millions daily along the western suburbs.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    city: 'Mumbai',
    country: 'India',
    rating: 4.0,
    status: 'Popular',
    type: 'Commuter Rail',
    route: 'Western Line',
    schedule: 'Every 3-5 minutes',
    operatingHours: '04:00 - 01:30',
    fare: '₹10-70',
    stops: 40,
    features: ['High frequency', 'Ladies compartments', 'First class option', 'Mobile ticketing'],
    popularStops: ['Churchgate', 'Mumbai Central', 'Andheri'],
  },
  {
    id: 9,
    name: 'Seoul Metro Line 2',
    description: 'Circular line connecting all major business and shopping districts in Seoul.',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
    city: 'Seoul',
    country: 'South Korea',
    rating: 4.7,
    status: 'Popular',
    type: 'Metro',
    route: 'Line 2 (Loop)',
    schedule: 'Every 2-4 minutes',
    operatingHours: '05:30 - 00:30',
    fare: '₩1,250-2,150',
    stops: 51,
    features: ['WiFi available', 'Heated seats', 'Screen doors', 'Transfer convenience'],
    popularStops: ['Gangnam', 'Hongdae', 'City Hall'],
  },
  {
    id: 10,
    name: 'Amsterdam Tram Line 5',
    description: 'Scenic tram route through Amsterdam city center and residential areas.',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
    city: 'Amsterdam',
    country: 'Netherlands',
    rating: 4.5,
    status: 'Active',
    type: 'Tram',
    route: 'Line 5',
    schedule: 'Every 7-10 minutes',
    operatingHours: '06:00 - 00:30',
    fare: '€3.20',
    stops: 23,
    features: ['Contactless payment', 'Bike-friendly', 'Frequent service', 'Tourist card accepted'],
    popularStops: ['Central Station', 'Leidseplein', 'Amstelveen'],
  },
  {
    id: 11,
    name: 'Toronto TTC Line 1',
    description: 'Main subway line connecting downtown Toronto with northern suburbs.',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800',
    city: 'Toronto',
    country: 'Canada',
    rating: 4.1,
    status: 'Active',
    type: 'Subway',
    route: 'Yonge-University Line',
    schedule: 'Every 3-6 minutes',
    operatingHours: '06:00 - 01:30',
    fare: 'C$3.25',
    stops: 38,
    features: ['Presto card', 'Accessible', 'WiFi at stations', 'Bus connections'],
    popularStops: ['Union Station', 'Bloor-Yonge', 'Finch'],
  },
  {
    id: 12,
    name: 'Dubai Metro Red Line',
    description: 'Fully automated metro connecting major landmarks and Dubai International Airport.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    city: 'Dubai',
    country: 'UAE',
    rating: 4.8,
    status: 'Popular',
    type: 'Metro',
    route: 'Red Line',
    schedule: 'Every 3-7 minutes',
    operatingHours: '05:00 - 00:00',
    fare: 'AED 3-8.5',
    stops: 29,
    features: ['Gold class', 'Driverless', 'Premium cooling', 'Women & children cabins'],
    popularStops: ['Burj Khalifa', 'Mall of Emirates', 'Airport'],
  },
  {
    id: 13,
    name: 'São Paulo Metro Line 3',
    description: 'Red line serving east-west corridor through São Paulo metropolitan area.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    city: 'São Paulo',
    country: 'Brazil',
    rating: 4.2,
    status: 'Active',
    type: 'Metro',
    route: 'Line 3 (Red)',
    schedule: 'Every 3-5 minutes',
    operatingHours: '04:40 - 00:00',
    fare: 'R$4.40',
    stops: 18,
    features: ['High capacity', 'Security presence', 'Integration', 'Peak hour frequency'],
    popularStops: ['Sé', 'República', 'Palmeiras-Barra Funda'],
  },
  {
    id: 14,
    name: 'Sydney Light Rail L1',
    description: 'Modern light rail connecting CBD to Inner West through historic neighborhoods.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    city: 'Sydney',
    country: 'Australia',
    rating: 4.4,
    status: 'Active',
    type: 'Light Rail',
    route: 'L1 Dulwich Hill',
    schedule: 'Every 8-15 minutes',
    operatingHours: '05:00 - 00:00',
    fare: 'A$3.61',
    stops: 23,
    features: ['Modern trams', 'Opal card', 'Accessible', 'Air-conditioned'],
    popularStops: ['Central', 'The Star', 'Dulwich Hill'],
  },
  {
    id: 15,
    name: 'Hong Kong MTR Island Line',
    description: 'Essential line serving Hong Kong Island from east to west through business districts.',
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800',
    city: 'Hong Kong',
    country: 'Hong Kong',
    rating: 4.9,
    status: 'Popular',
    type: 'MTR',
    route: 'Island Line',
    schedule: 'Every 2-3 minutes',
    operatingHours: '05:50 - 01:15',
    fare: 'HK$5-12',
    stops: 17,
    features: ['Octopus card', 'Extremely efficient', 'Clean', 'Integrated shopping'],
    popularStops: ['Central', 'Admiralty', 'Causeway Bay'],
  },
];

export const destinationsAPI = {
  getDestinations: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Return transport destinations data
      return TRANSPORT_DESTINATIONS;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return TRANSPORT_DESTINATIONS; // Fallback to local data
    }
  },
  
  getDestinationById: async (id: number) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const destination = TRANSPORT_DESTINATIONS.find(d => d.id === id);
      if (!destination) {
        throw new Error('Destination not found');
      }
      return destination;
    } catch (error) {
      console.error('Error fetching destination details:', error);
      throw error;
    }
  },
};
