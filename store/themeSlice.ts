import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Async actions
export const loadTheme = () => async (dispatch: any) => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    if (theme !== null) {
      dispatch(setTheme(theme === 'dark'));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

export const saveTheme = (isDark: boolean) => async (dispatch: any) => {
  try {
    await AsyncStorage.setItem('theme', isDark ? 'dark' : 'light');
    dispatch(setTheme(isDark));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export default themeSlice.reducer;
