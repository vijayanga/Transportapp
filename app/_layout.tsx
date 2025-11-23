import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadUserFromStorage } from '../store/authSlice';
import { loadFavorites } from '../store/favoritesSlice';
import { loadTheme } from '../store/themeSlice';
import { ActivityIndicator, View } from 'react-native';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([
        dispatch(loadUserFromStorage()),
        dispatch(loadFavorites()),
        dispatch(loadTheme()),
      ]);
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="details/[id]" 
            options={{
              headerShown: true,
              title: 'Details',
              headerBackTitle: 'Back',
            }}
          />
        </Stack>
      </AppInitializer>
    </Provider>
  );
}
