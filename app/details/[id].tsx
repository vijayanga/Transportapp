import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
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

const { width } = Dimensions.get("window");

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const favorites = useAppSelector((state) => state.favorites.items);
  const theme = isDark ? colors.dark : colors.light;

  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      const data = await destinationsAPI.getDestinationById(Number(id));
      setDestination(data);
    } catch (error) {
      console.error("Error fetching destination details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite =
    destination && favorites.some((fav) => fav.id === destination.id);

  const handleFavoriteToggle = () => {
    if (destination) {
      dispatch(toggleFavorite(destination));
    }
  };

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!destination) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <Feather name="alert-circle" size={48} color={theme.textSecondary} />
        <Text style={[styles.errorText, { color: theme.text }]}>
          Destination not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Image source={{ uri: destination.image }} style={styles.headerImage} />

      <TouchableOpacity
        style={[styles.favoriteButton, { backgroundColor: theme.background }]}
        onPress={handleFavoriteToggle}
      >
        <Feather
          name="heart"
          size={24}
          color={isFavorite ? colors.light.error : theme.textSecondary}
          fill={isFavorite ? colors.light.error : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: theme.text }]}>
            {destination.name}
          </Text>
          {destination.status && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    destination.status === "Popular"
                      ? theme.success
                      : destination.status === "Upcoming"
                      ? theme.warning
                      : theme.primary,
                },
              ]}
            >
              <Text style={styles.statusText}>{destination.status}</Text>
            </View>
          )}
        </View>

        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <Feather name="map-pin" size={20} color={theme.primary} />
            <Text style={[styles.metaText, { color: theme.text }]}>
              {destination.city}, {destination.country}
            </Text>
          </View>
          {destination.rating && (
            <View style={styles.metaItem}>
              <Feather name="star" size={20} color={theme.warning} />
              <Text style={[styles.metaText, { color: theme.text }]}>
                {destination.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Transport Information Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Transport Details
          </Text>
          <View style={styles.transportGrid}>
            {destination.type && (
              <View
                style={[
                  styles.transportCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Feather name="navigation" size={24} color={theme.primary} />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Type
                </Text>
                <Text style={[styles.transportValue, { color: theme.text }]}>
                  {destination.type}
                </Text>
              </View>
            )}
            {destination.route && (
              <View
                style={[
                  styles.transportCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Feather name="git-branch" size={24} color={theme.primary} />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Route
                </Text>
                <Text style={[styles.transportValue, { color: theme.text }]}>
                  {destination.route}
                </Text>
              </View>
            )}
            {destination.fare && (
              <View
                style={[
                  styles.transportCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Feather name="dollar-sign" size={24} color={theme.success} />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Fare
                </Text>
                <Text style={[styles.transportValue, { color: theme.text }]}>
                  {destination.fare}
                </Text>
              </View>
            )}
            {destination.stops && (
              <View
                style={[
                  styles.transportCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Feather name="disc" size={24} color={theme.primary} />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Stops
                </Text>
                <Text style={[styles.transportValue, { color: theme.text }]}>
                  {destination.stops}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Schedule Section */}
        {(destination.schedule || destination.operatingHours) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Schedule & Operating Hours
            </Text>
            {destination.schedule && (
              <View style={styles.scheduleRow}>
                <Feather name="clock" size={20} color={theme.primary} />
                <View style={styles.scheduleContent}>
                  <Text
                    style={[
                      styles.scheduleLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Frequency
                  </Text>
                  <Text style={[styles.scheduleValue, { color: theme.text }]}>
                    {destination.schedule}
                  </Text>
                </View>
              </View>
            )}
            {destination.operatingHours && (
              <View style={styles.scheduleRow}>
                <Feather name="calendar" size={20} color={theme.primary} />
                <View style={styles.scheduleContent}>
                  <Text
                    style={[
                      styles.scheduleLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Operating Hours
                  </Text>
                  <Text style={[styles.scheduleValue, { color: theme.text }]}>
                    {destination.operatingHours}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {destination.description}
          </Text>
        </View>

        {destination.tags && destination.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {destination.tags.map((tag: string, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    { backgroundColor: theme.card, borderColor: theme.border },
                  ]}
                >
                  <Text style={[styles.tagText, { color: theme.text }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {destination.features && destination.features.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Features & Amenities
            </Text>
            {destination.features.map((feature: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <Feather name="check-circle" size={16} color={theme.success} />
                <Text
                  style={[styles.listItemText, { color: theme.textSecondary }]}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        )}

        {destination.popularStops && destination.popularStops.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Popular Stops
            </Text>
            {destination.popularStops.map((stop: string, index: number) => (
              <View key={index} style={styles.instructionItem}>
                <View
                  style={[
                    styles.stepNumber,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.instructionText,
                    { color: theme.textSecondary },
                  ]}
                >
                  {stop}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: fontSize.lg,
    marginTop: spacing.md,
  },
  headerImage: {
    width: width,
    height: 300,
    backgroundColor: "#E1E1E1",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  content: {
    padding: spacing.lg,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    flex: 1,
    marginRight: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  metaSection: {
    marginBottom: spacing.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  tagText: {
    fontSize: fontSize.sm,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  listItemText: {
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
    flex: 1,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  instructionText: {
    fontSize: fontSize.md,
    flex: 1,
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  infoCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.sm,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  transportGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  transportCard: {
    flex: 1,
    minWidth: "45%",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  transportLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  transportValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  scheduleValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
});
