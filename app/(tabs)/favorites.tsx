import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleFavorite } from '../../store/favoritesSlice';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const favorites = useAppSelector((state) => state.favorites.items);
  const theme = isDark ? colors.dark : colors.light;

  const handleRemoveFavorite = (destination: any) => {
    dispatch(toggleFavorite(destination));
  };

  const renderFavoriteCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => router.push(`/details/${item.id}` as any)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.background }]}
        onPress={() => handleRemoveFavorite(item)}
      >
        <Feather name="heart" size={20} color={colors.light.error} fill={colors.light.error} />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
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
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No Favorites Yet</Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        Start exploring and add your favorite destinations
      </Text>
      <TouchableOpacity
        style={[styles.exploreButton, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/(tabs)/' as any)}
      >
        <Text style={styles.exploreButtonText}>Explore Destinations</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={favorites.length === 0 ? styles.emptyListContent : styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={favorites.length > 0 ? styles.row : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    width: '48%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E1E1E1',
  },
  removeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
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
    padding: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  cardMeta: {
    flexDirection: 'column',
    gap: spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  exploreButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});
