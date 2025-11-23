import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../../constants/theme";
import { destinationsAPI } from "../../services/api";
import { toggleFavorite } from "../../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Destination {
  id: number;
  stationCode?: string;
  name: string;
  description: string;
  image: string;
  city: string;
  country: string;
  rating?: number;
  status?: string;
  type?: string;
  route?: string;
  lineCode?: string;
  schedule?: string;
  operatingHours?: string;
  fare?: string;
  stops?: number;
  features?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
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
      console.error("Error fetching destinations:", error);
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
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.imageOverlay} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavoriteToggle(item)}
        >
          <Feather
            name={isFavorite(item.id) ? "heart" : "heart"}
            size={22}
            color={isFavorite(item.id) ? colors.light.error : "#fff"}
            fill={isFavorite(item.id) ? colors.light.error : "transparent"}
          />
        </TouchableOpacity>
        {item.status && (
          <View
            style={[
              styles.statusBadgeOverlay,
              {
                backgroundColor:
                  item.status === "Popular"
                    ? theme.success
                    : item.status === "Modern"
                    ? theme.primary
                    : theme.warning,
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text
          style={[styles.cardTitle, { color: theme.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        {item.stationCode && (
          <View
            style={[
              styles.codeContainer,
              { backgroundColor: isDark ? "#333" : "#f0f0f0" },
            ]}
          >
            <Text style={[styles.stationCodeBadge, { color: theme.primary }]}>
              {item.stationCode}
            </Text>
          </View>
        )}

        {/* Route Info */}
        {item.route && (
          <View style={styles.routeContainer}>
            <Feather name="git-branch" size={16} color={theme.primary} />
            <Text
              style={[styles.routeText, { color: theme.text }]}
              numberOfLines={1}
            >
              {item.route}
            </Text>
          </View>
        )}

        {/* Location & Rating Row */}
        <View style={styles.infoRow}>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={14} color={theme.textSecondary} />
            <Text
              style={[styles.locationText, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {item.city}
            </Text>
          </View>
          {item.rating && (
            <View
              style={[
                styles.ratingContainer,
                { backgroundColor: isDark ? "#333" : "#FFF8E1" },
              ]}
            >
              <Feather name="star" size={14} color="#FFB300" />
              <Text style={[styles.ratingText, { color: theme.text }]}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Info Chips */}
        <View style={styles.chipsContainer}>
          {item.fare && (
            <View
              style={[
                styles.chip,
                { backgroundColor: isDark ? "#1a3d1a" : "#E8F5E9" },
              ]}
            >
              <Feather name="dollar-sign" size={12} color={theme.success} />
              <Text style={[styles.chipText, { color: theme.success }]}>
                {item.fare}
              </Text>
            </View>
          )}
          {item.stops && (
            <View
              style={[
                styles.chip,
                { backgroundColor: isDark ? "#1a2d3d" : "#E3F2FD" },
              ]}
            >
              <Feather name="disc" size={12} color={theme.primary} />
              <Text style={[styles.chipText, { color: theme.primary }]}>
                {item.stops} stops
              </Text>
            </View>
          )}
          {item.schedule && (
            <View
              style={[
                styles.chip,
                { backgroundColor: isDark ? "#3d3d1a" : "#FFF9C4" },
              ]}
            >
              <Feather name="clock" size={12} color={theme.warning} />
              <Text
                style={[styles.chipText, { color: theme.warning }]}
                numberOfLines={1}
              >
                Daily
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
      <View
        style={[styles.centerContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.firstName || "Traveler"}
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
    justifyContent: "center",
    alignItems: "center",
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
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardImageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E1E1E1",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  statusBadgeOverlay: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  codeContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  stationCodeBadge: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  routeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  locationText: {
    fontSize: fontSize.xs,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  ratingText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  chipText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  cardDescription: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
});
