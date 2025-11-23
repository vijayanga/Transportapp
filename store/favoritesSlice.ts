import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  country: string;
  rating?: number;
  status?: string;
}

interface FavoritesState {
  items: Destination[];
  isLoading: boolean;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: true,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Destination[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    addFavorite: (state, action: PayloadAction<Destination>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFavoritesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, setFavoritesLoading } = favoritesSlice.actions;

// Async actions
export const loadFavorites = () => async (dispatch: any) => {
  try {
    const favoritesData = await AsyncStorage.getItem('favorites');
    if (favoritesData) {
      dispatch(setFavorites(JSON.parse(favoritesData)));
    } else {
      dispatch(setFavoritesLoading(false));
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
    dispatch(setFavoritesLoading(false));
  }
};

export const toggleFavorite = (destination: Destination) => async (dispatch: any, getState: any) => {
  try {
    const { favorites } = getState();
    const isFavorite = favorites.items.find((item: Destination) => item.id === destination.id);
    
    if (isFavorite) {
      dispatch(removeFavorite(destination.id));
      const updatedFavorites = favorites.items.filter((item: Destination) => item.id !== destination.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      dispatch(addFavorite(destination));
      const updatedFavorites = [...favorites.items, destination];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

export default favoritesSlice.reducer;
