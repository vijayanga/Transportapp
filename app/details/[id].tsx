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
              {destination.city
                ? `${destination.city}, ${destination.country}`
                : destination.country}
            </Text>
          </View>
          {destination.transportType && (
            <View style={styles.metaItem}>
              <Feather name="navigation" size={20} color={theme.primary} />
              <Text style={[styles.metaText, { color: theme.text }]}>
                {destination.transportType}
              </Text>
            </View>
          )}
          {destination.rating && (
            <View style={styles.metaItem}>
              <Feather name="star" size={20} color={theme.warning} />
              <Text style={[styles.metaText, { color: theme.text }]}>
                {destination.rating.toFixed(1)} ({destination.reviewCount || 0}{" "}
                reviews)
              </Text>
            </View>
          )}
        </View>

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

        {destination.highlights && destination.highlights.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Highlights
            </Text>
            {destination.highlights.map((item: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <Feather name="check-circle" size={16} color={theme.success} />
                <Text
                  style={[styles.listItemText, { color: theme.textSecondary }]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}

        {destination.tips && destination.tips.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Travel Tips
            </Text>
            {destination.tips.map((tip: string, index: number) => (
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
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        )}

        {destination.schedule && destination.schedule.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Schedule
            </Text>
            {destination.schedule.map((time: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <Feather name="calendar" size={16} color={theme.primary} />
                <Text
                  style={[styles.listItemText, { color: theme.textSecondary }]}
                >
                  {time}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.infoGrid}>
          {destination.duration && (
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Feather name="clock" size={24} color={theme.primary} />
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {destination.duration}
              </Text>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Duration
              </Text>
            </View>
          )}
          {destination.price && (
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Feather name="dollar-sign" size={24} color={theme.primary} />
              <Text style={[styles.infoValue, { color: theme.text }]}>
                ${destination.price}
              </Text>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Price
              </Text>
            </View>
          )}
          {destination.reviewCount && (
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Feather name="users" size={24} color={theme.primary} />
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {destination.reviewCount}
              </Text>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Reviews
              </Text>
            </View>
          )}
        </View>

        {/* Real-time Bus Information */}
        {destination.routeId && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Real-time Bus Information
            </Text>
            <View style={[styles.busInfoCard, { backgroundColor: theme.card }]}>
              <View style={styles.busInfoRow}>
                <Feather name="map-pin" size={20} color={theme.primary} />
                <Text
                  style={[styles.busInfoLabel, { color: theme.textSecondary }]}
                >
                  Route ID:
                </Text>
                <Text style={[styles.busInfoValue, { color: theme.text }]}>
                  {destination.routeId}
                </Text>
              </View>

              {destination.activeBuses !== undefined && (
                <View style={styles.busInfoRow}>
                  <Feather name="truck" size={20} color={theme.success} />
                  <Text
                    style={[
                      styles.busInfoLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Active Buses:
                  </Text>
                  <Text style={[styles.busInfoValue, { color: theme.text }]}>
                    {destination.activeBuses}
                  </Text>
                </View>
              )}

              {destination.avgDeviation !== undefined && (
                <View style={styles.busInfoRow}>
                  <Feather
                    name="activity"
                    size={20}
                    color={
                      destination.avgDeviation > 5
                        ? theme.warning
                        : theme.success
                    }
                  />
                  <Text
                    style={[
                      styles.busInfoLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Avg Delay:
                  </Text>
                  <Text style={[styles.busInfoValue, { color: theme.text }]}>
                    {destination.avgDeviation > 0 ? "+" : ""}
                    {destination.avgDeviation} min
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Live Bus Positions */}
        {destination.busPositions && destination.busPositions.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Live Bus Positions ({destination.busPositions.length})
            </Text>
            {destination.busPositions
              .slice(0, 5)
              .map((bus: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.busPositionCard,
                    { backgroundColor: theme.card, borderColor: theme.border },
                  ]}
                >
                  <View style={styles.busPositionHeader}>
                    <View style={styles.busPositionLeft}>
                      <Feather name="truck" size={20} color={theme.primary} />
                      <Text
                        style={[styles.busVehicleId, { color: theme.text }]}
                      >
                        Bus #{bus.VehicleID}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.deviationBadge,
                        {
                          backgroundColor:
                            bus.Deviation > 5
                              ? theme.error + "20"
                              : bus.Deviation < -5
                              ? theme.success + "20"
                              : theme.warning + "20",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.deviationText,
                          {
                            color:
                              bus.Deviation > 5
                                ? theme.error
                                : bus.Deviation < -5
                                ? theme.success
                                : theme.warning,
                          },
                        ]}
                      >
                        {bus.Deviation > 0 ? "+" : ""}
                        {bus.Deviation} min
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[styles.busHeadsign, { color: theme.textSecondary }]}
                  >
                    <Feather
                      name="navigation"
                      size={14}
                      color={theme.textSecondary}
                    />{" "}
                    {bus.DirectionText} to {bus.TripHeadsign}
                  </Text>

                  <View style={styles.busPositionDetails}>
                    <Text
                      style={[
                        styles.busDetailText,
                        { color: theme.textSecondary },
                      ]}
                    >
                      <Feather
                        name="map"
                        size={12}
                        color={theme.textSecondary}
                      />{" "}
                      Lat: {bus.Lat.toFixed(4)}, Lon: {bus.Lon.toFixed(4)}
                    </Text>
                    <Text
                      style={[
                        styles.busDetailText,
                        { color: theme.textSecondary },
                      ]}
                    >
                      <Feather
                        name="clock"
                        size={12}
                        color={theme.textSecondary}
                      />{" "}
                      Updated: {new Date(bus.DateTime).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>
              ))}

            {destination.busPositions.length > 5 && (
              <Text style={[styles.moreText, { color: theme.textSecondary }]}>
                + {destination.busPositions.length - 5} more buses on this route
              </Text>
            )}
          </View>
        )}

        {/* Route Stops */}
        {destination.routeDetails && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Route Stops
            </Text>
            {(
              destination.routeDetails.Direction0?.Stops ||
              destination.routeDetails.Direction1?.Stops ||
              []
            )
              .slice(0, 8)
              .map((stop: any, index: number) => (
                <View key={index} style={styles.stopItem}>
                  <View
                    style={[styles.stopDot, { backgroundColor: theme.primary }]}
                  />
                  <View style={styles.stopContent}>
                    <Text style={[styles.stopName, { color: theme.text }]}>
                      {stop.Name}
                    </Text>
                    {stop.StopID && stop.StopID !== "0" && (
                      <Text
                        style={[styles.stopId, { color: theme.textSecondary }]}
                      >
                        Stop ID: {stop.StopID}
                      </Text>
                    )}
                  </View>
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
  busInfoCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  busInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  busInfoLabel: {
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
  },
  busInfoValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  busPositionCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  busPositionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  busPositionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  busVehicleId: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing.sm,
  },
  deviationBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  deviationText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  busHeadsign: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  busPositionDetails: {
    gap: spacing.xs,
  },
  busDetailText: {
    fontSize: fontSize.xs,
  },
  moreText: {
    fontSize: fontSize.sm,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: spacing.sm,
  },
  stopItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: spacing.md,
  },
  stopContent: {
    flex: 1,
  },
  stopName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  stopId: {
    fontSize: fontSize.xs,
  },
});
