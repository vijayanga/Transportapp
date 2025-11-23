import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { destinationsAPI } from '../../services/api';
import { toggleFavorite } from '../../store/favoritesSlice';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  country: string;
  rating?: number;
  status?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const user = useAppSelector((state) => state.auth.user);
  const favorites = useAppSelector((state) => state.favorites.items);
  const theme = isDark ? colors.dark : colors.light;

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDestinations = async () => {
    try {
      const data = await destinationsAPI.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDestinations();
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const handleFavoriteToggle = (destination: Destination) => {
    dispatch(toggleFavorite(destination));
  };

  const renderDestinationCard = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => router.push(`/details/${item.id}` as any)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <TouchableOpacity
        style={[styles.favoriteButton, { backgroundColor: theme.background }]}
        onPress={() => handleFavoriteToggle(item)}
      >
        <Feather
          name={isFavorite(item.id) ? 'heart' : 'heart'}
          size={20}
          color={isFavorite(item.id) ? colors.light.error : theme.textSecondary}
          fill={isFavorite(item.id) ? colors.light.error : 'transparent'}
        />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          {item.status && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'Popular'
                      ? theme.success
                      : item.status === 'Upcoming'
                      ? theme.warning
                      : theme.primary,
                },
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        </View>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Feather name="map-pin" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {item.country}
            </Text>
          </View>
          {item.rating && (
            <View style={styles.metaItem}>
              <Feather name="star" size={14} color={theme.warning} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[styles.cardDescription, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.firstName || 'Traveler'}
          </Text>
        </View>
      </View>

      <FlatList
        data={destinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: {
    fontSize: fontSize.sm,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E1E1E1',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    flex: 1,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  metaText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
  cardDescription: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
});
