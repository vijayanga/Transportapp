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

export const destinationsAPI = {
  getDestinations: async () => {
    // Using Recipe API as a proxy for destinations
    // In production, you'd use a real travel/transport API
    const response = await axios.get(`${API_BASE_URL}/recipes?limit=30`);
    
    // Transform recipes into destinations
    const destinations = response.data.recipes.map((recipe: any) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.instructions?.[0] || recipe.tags?.join(', ') || 'Explore this amazing destination',
      image: recipe.image,
      country: recipe.cuisine || 'Various',
      rating: recipe.rating,
      status: recipe.difficulty === 'Easy' ? 'Popular' : recipe.difficulty === 'Medium' ? 'Upcoming' : 'Active',
      cuisine: recipe.cuisine,
      prepTime: recipe.prepTimeMinutes,
      cookTime: recipe.cookTimeMinutes,
      servings: recipe.servings,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      caloriesPerServing: recipe.caloriesPerServing,
      reviewCount: recipe.reviewCount,
      mealType: recipe.mealType,
    }));
    
    return destinations;
  },
  
  getDestinationById: async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
    const recipe = response.data;
    
    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.instructions?.[0] || recipe.tags?.join(', ') || 'Explore this amazing destination',
      image: recipe.image,
      country: recipe.cuisine || 'Various',
      rating: recipe.rating,
      status: recipe.difficulty === 'Easy' ? 'Popular' : recipe.difficulty === 'Medium' ? 'Upcoming' : 'Active',
      cuisine: recipe.cuisine,
      prepTime: recipe.prepTimeMinutes,
      cookTime: recipe.cookTimeMinutes,
      servings: recipe.servings,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      caloriesPerServing: recipe.caloriesPerServing,
      reviewCount: recipe.reviewCount,
      mealType: recipe.mealType,
    };
  },
};
