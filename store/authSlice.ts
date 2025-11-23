import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;

// Async actions
export const loginUser = (userData: User) => async (dispatch: any) => {
  try {
    // Ensure token exists before saving
    const token = userData.token || 'demo-token-' + Date.now();
    const userDataWithToken = { ...userData, token };
    
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(userDataWithToken));
    dispatch(setUser(userDataWithToken));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

export const loadUserFromStorage = () => async (dispatch: any) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('user');
    
    if (userToken && userData) {
      dispatch(setUser(JSON.parse(userData)));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
