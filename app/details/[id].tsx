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

// Helper function to get Metro line colors
const getLineColor = (line: string): string => {
  const colors: { [key: string]: string } = {
    RD: "#E51937", // Red Line
    BL: "#1E88E5", // Blue Line
    YL: "#FFD700", // Yellow Line
    OR: "#FF8C00", // Orange Line
    GR: "#00B140", // Green Line
    SV: "#9D9D9D", // Silver Line
  };
  return colors[line] || "#666666";
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const favorites = useAppSelector((state) => state.favorites.items);
  const theme = isDark ? colors.dark : colors.light;

  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trainPredictions, setTrainPredictions] = useState<any[]>([]);
  const [loadingTrains, setLoadingTrains] = useState(false);
  const [stationTimings, setStationTimings] = useState<any>(null);
  const [elevatorIncidents, setElevatorIncidents] = useState<any[]>([]);
  const [railIncidents, setRailIncidents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "arrivals" | "timings" | "alerts" | "route"
  >("arrivals");

  useEffect(() => {
    fetchDestinationDetails();
    fetchRailIncidents();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      const data = await destinationsAPI.getDestinationById(Number(id));
      setDestination(data);

      // Fetch real-time train arrivals if station code exists
      if (data.stationCode) {
        fetchTrainArrivals(data.stationCode);
        fetchStationTimings(data.stationCode);
        fetchElevatorIncidents(data.stationCode);
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrainArrivals = async (stationCode: string) => {
    try {
      setLoadingTrains(true);
      const trains = await destinationsAPI.getTrainPredictions(stationCode);
      setTrainPredictions(trains);
    } catch (error) {
      console.error("Error fetching train predictions:", error);
    } finally {
      setLoadingTrains(false);
    }
  };

  const fetchStationTimings = async (stationCode: string) => {
    try {
      const timings = await destinationsAPI.getStationTimings(stationCode);
      setStationTimings(timings);
    } catch (error) {
      console.error("Error fetching station timings:", error);
    }
  };

  const fetchElevatorIncidents = async (stationCode: string) => {
    try {
      const incidents = await destinationsAPI.getElevatorIncidents(stationCode);
      setElevatorIncidents(incidents);
    } catch (error) {
      console.error("Error fetching elevator incidents:", error);
    }
  };

  const fetchRailIncidents = async () => {
    try {
      const incidents = await destinationsAPI.getRailIncidents();
      setRailIncidents(incidents);
    } catch (error) {
      console.error("Error fetching rail incidents:", error);
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
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>
              {destination.name}
            </Text>
            {destination.stationCode && (
              <Text
                style={[styles.stationCode, { color: theme.textSecondary }]}
              >
                Station Code: {destination.stationCode}
              </Text>
            )}
          </View>
          {destination.status && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    destination.status === "Popular"
                      ? theme.success
                      : destination.status === "Modern"
                      ? theme.primary
                      : theme.warning,
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

        {/* Tab Navigation */}
        {destination.stationCode && (
          <>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "arrivals" && styles.activeTab,
                  activeTab === "arrivals" && {
                    borderBottomColor: theme.primary,
                  },
                ]}
                onPress={() => setActiveTab("arrivals")}
              >
                <Feather
                  name="activity"
                  size={18}
                  color={
                    activeTab === "arrivals"
                      ? theme.primary
                      : theme.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === "arrivals"
                          ? theme.primary
                          : theme.textSecondary,
                    },
                  ]}
                >
                  Live Arrivals
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "timings" && styles.activeTab,
                  activeTab === "timings" && {
                    borderBottomColor: theme.primary,
                  },
                ]}
                onPress={() => setActiveTab("timings")}
              >
                <Feather
                  name="clock"
                  size={18}
                  color={
                    activeTab === "timings"
                      ? theme.primary
                      : theme.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === "timings"
                          ? theme.primary
                          : theme.textSecondary,
                    },
                  ]}
                >
                  Schedule
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "alerts" && styles.activeTab,
                  activeTab === "alerts" && {
                    borderBottomColor: theme.primary,
                  },
                ]}
                onPress={() => setActiveTab("alerts")}
              >
                <Feather
                  name="alert-circle"
                  size={18}
                  color={
                    activeTab === "alerts" ? theme.primary : theme.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === "alerts"
                          ? theme.primary
                          : theme.textSecondary,
                    },
                  ]}
                >
                  Alerts
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "route" && styles.activeTab,
                  activeTab === "route" && { borderBottomColor: theme.primary },
                ]}
                onPress={() => setActiveTab("route")}
              >
                <Feather
                  name="map"
                  size={18}
                  color={
                    activeTab === "route" ? theme.primary : theme.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === "route"
                          ? theme.primary
                          : theme.textSecondary,
                    },
                  ]}
                >
                  Info
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.tabContent}>
              {/* Live Arrivals Tab */}
              {activeTab === "arrivals" && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                      Next Trains
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        fetchTrainArrivals(destination.stationCode)
                      }
                    >
                      <Feather
                        name="refresh-cw"
                        size={20}
                        color={theme.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  {loadingTrains ? (
                    <ActivityIndicator size="small" color={theme.primary} />
                  ) : trainPredictions.length > 0 ? (
                    <View style={styles.trainsContainer}>
                      {trainPredictions
                        .slice(0, 8)
                        .map((train: any, index: number) => (
                          <View
                            key={index}
                            style={[
                              styles.trainCard,
                              {
                                backgroundColor: theme.card,
                                borderColor: theme.border,
                              },
                            ]}
                          >
                            <View style={styles.trainHeader}>
                              <View style={styles.trainLineInfo}>
                                <View
                                  style={[
                                    styles.lineBadge,
                                    {
                                      backgroundColor: getLineColor(train.Line),
                                    },
                                  ]}
                                >
                                  <Text style={styles.lineText}>
                                    {train.Line}
                                  </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <Text
                                    style={[
                                      styles.trainDestination,
                                      { color: theme.text },
                                    ]}
                                  >
                                    {train.DestinationName || train.Destination}
                                  </Text>
                                  {train.Group && (
                                    <Text
                                      style={[
                                        styles.trainGroup,
                                        { color: theme.textSecondary },
                                      ]}
                                    >
                                      Track {train.Group}
                                    </Text>
                                  )}
                                </View>
                              </View>
                              <View style={styles.trainMeta}>
                                <Text
                                  style={[
                                    styles.trainTime,
                                    { color: theme.primary },
                                  ]}
                                >
                                  {train.Min === "ARR" || train.Min === "BRD"
                                    ? train.Min
                                    : `${train.Min} min`}
                                </Text>
                                {train.Car && (
                                  <Text
                                    style={[
                                      styles.trainCars,
                                      { color: theme.textSecondary },
                                    ]}
                                  >
                                    {train.Car} cars
                                  </Text>
                                )}
                              </View>
                            </View>
                          </View>
                        ))}
                    </View>
                  ) : (
                    <View style={styles.emptyState}>
                      <Feather
                        name="info"
                        size={32}
                        color={theme.textSecondary}
                      />
                      <Text
                        style={[
                          styles.noTrainsText,
                          { color: theme.textSecondary },
                        ]}
                      >
                        No train arrivals available
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Schedule Tab */}
              {activeTab === "timings" && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    First & Last Trains
                  </Text>
                  {stationTimings ? (
                    <View style={styles.timingsContainer}>
                      <View
                        style={[
                          styles.timingCard,
                          {
                            backgroundColor: theme.card,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Feather
                          name="sunrise"
                          size={24}
                          color={theme.success}
                        />
                        <Text
                          style={[
                            styles.timingLabel,
                            { color: theme.textSecondary },
                          ]}
                        >
                          First Train (Weekday)
                        </Text>
                        <Text
                          style={[styles.timingValue, { color: theme.text }]}
                        >
                          {stationTimings.StationTimes?.[0]?.Monday
                            ?.OpeningTime || "5:00 AM"}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.timingCard,
                          {
                            backgroundColor: theme.card,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Feather name="sunset" size={24} color={theme.error} />
                        <Text
                          style={[
                            styles.timingLabel,
                            { color: theme.textSecondary },
                          ]}
                        >
                          Last Train (Weekday)
                        </Text>
                        <Text
                          style={[styles.timingValue, { color: theme.text }]}
                        >
                          {stationTimings.StationTimes?.[0]?.Monday
                            ?.LastTrainTime || "12:00 AM"}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.emptyState}>
                      <Feather
                        name="clock"
                        size={32}
                        color={theme.textSecondary}
                      />
                      <Text
                        style={[
                          styles.noTrainsText,
                          { color: theme.textSecondary },
                        ]}
                      >
                        Schedule information not available
                      </Text>
                    </View>
                  )}

                  <View
                    style={[styles.divider, { backgroundColor: theme.border }]}
                  />

                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Operating Hours
                  </Text>
                  <View
                    style={[
                      styles.scheduleCard,
                      {
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View style={styles.infoRow}>
                      <Feather
                        name="calendar"
                        size={18}
                        color={theme.primary}
                      />
                      <Text style={[styles.infoText, { color: theme.text }]}>
                        {destination.schedule}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Feather name="clock" size={18} color={theme.primary} />
                      <Text style={[styles.infoText, { color: theme.text }]}>
                        {destination.operatingHours}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Alerts Tab */}
              {activeTab === "alerts" && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Service Status
                  </Text>

                  {railIncidents.length > 0 ? (
                    <View style={styles.alertsList}>
                      {railIncidents.map((incident: any, index: number) => (
                        <View
                          key={index}
                          style={[
                            styles.simpleAlertCard,
                            {
                              backgroundColor: theme.card,
                              borderLeftColor: "#FF9800",
                            },
                          ]}
                        >
                          <View style={styles.alertLeft}>
                            <Feather
                              name="alert-circle"
                              size={20}
                              color="#FF9800"
                            />
                          </View>
                          <View style={styles.alertRight}>
                            <Text
                              style={[
                                styles.alertLineText,
                                { color: theme.text },
                              ]}
                            >
                              {incident.LinesAffected}
                            </Text>
                            <Text
                              style={[
                                styles.alertMessage,
                                { color: theme.textSecondary },
                              ]}
                              numberOfLines={3}
                            >
                              {incident.Description}
                            </Text>
                            {incident.DateUpdated && (
                              <Text
                                style={[
                                  styles.alertTimestamp,
                                  { color: theme.textSecondary },
                                ]}
                              >
                                {new Date(
                                  incident.DateUpdated
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.emptyAlertState,
                        { backgroundColor: isDark ? "#1a2d1a" : "#E8F5E9" },
                      ]}
                    >
                      <Feather
                        name="check-circle"
                        size={28}
                        color={theme.success}
                      />
                      <Text
                        style={[styles.emptyAlertText, { color: theme.text }]}
                      >
                        No service alerts
                      </Text>
                    </View>
                  )}

                  {elevatorIncidents.length > 0 && (
                    <>
                      <View
                        style={[
                          styles.divider,
                          { backgroundColor: theme.border },
                        ]}
                      />
                      <Text
                        style={[styles.sectionTitle, { color: theme.text }]}
                      >
                        Equipment Status
                      </Text>
                      <View style={styles.alertsList}>
                        {elevatorIncidents.map(
                          (incident: any, index: number) => (
                            <View
                              key={index}
                              style={[
                                styles.simpleAlertCard,
                                {
                                  backgroundColor: theme.card,
                                  borderLeftColor: "#F44336",
                                },
                              ]}
                            >
                              <View style={styles.alertLeft}>
                                <Feather
                                  name="tool"
                                  size={20}
                                  color="#F44336"
                                />
                              </View>
                              <View style={styles.alertRight}>
                                <Text
                                  style={[
                                    styles.alertLineText,
                                    { color: theme.text },
                                  ]}
                                >
                                  {incident.UnitType}
                                </Text>
                                <Text
                                  style={[
                                    styles.alertMessage,
                                    { color: theme.textSecondary },
                                  ]}
                                >
                                  {incident.UnitName} - {incident.UnitStatus}
                                </Text>
                              </View>
                            </View>
                          )
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}

              {/* Route Info Tab */}
              {activeTab === "route" && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Station Information
                  </Text>
                  <View style={styles.transportGrid}>
                    <View
                      style={[
                        styles.transportCard,
                        {
                          backgroundColor: theme.card,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Feather
                        name="navigation"
                        size={24}
                        color={theme.primary}
                      />
                      <Text
                        style={[
                          styles.transportLabel,
                          { color: theme.textSecondary },
                        ]}
                      >
                        Type
                      </Text>
                      <Text
                        style={[styles.transportValue, { color: theme.text }]}
                      >
                        {destination.type}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.transportCard,
                        {
                          backgroundColor: theme.card,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Feather
                        name="git-branch"
                        size={24}
                        color={theme.primary}
                      />
                      <Text
                        style={[
                          styles.transportLabel,
                          { color: theme.textSecondary },
                        ]}
                      >
                        Route
                      </Text>
                      <Text
                        style={[styles.transportValue, { color: theme.text }]}
                        numberOfLines={2}
                      >
                        {destination.route}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.transportCard,
                        {
                          backgroundColor: theme.card,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Feather
                        name="dollar-sign"
                        size={24}
                        color={theme.success}
                      />
                      <Text
                        style={[
                          styles.transportLabel,
                          { color: theme.textSecondary },
                        ]}
                      >
                        Fare
                      </Text>
                      <Text
                        style={[styles.transportValue, { color: theme.text }]}
                      >
                        {destination.fare}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.transportCard,
                        {
                          backgroundColor: theme.card,
                          borderColor: theme.border,
                        },
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
                      <Text
                        style={[styles.transportValue, { color: theme.text }]}
                      >
                        {destination.stops}
                      </Text>
                    </View>
                  </View>

                  {destination.features && destination.features.length > 0 && (
                    <>
                      <View
                        style={[
                          styles.divider,
                          { backgroundColor: theme.border },
                        ]}
                      />
                      <Text
                        style={[styles.sectionTitle, { color: theme.text }]}
                      >
                        Amenities & Features
                      </Text>
                      <View style={styles.featuresGrid}>
                        {destination.features.map(
                          (feature: string, index: number) => (
                            <View
                              key={index}
                              style={[
                                styles.featureChip,
                                {
                                  backgroundColor: theme.card,
                                  borderColor: theme.border,
                                },
                              ]}
                            >
                              <Feather
                                name="check"
                                size={14}
                                color={theme.success}
                              />
                              <Text
                                style={[
                                  styles.featureText,
                                  { color: theme.text },
                                ]}
                              >
                                {feature}
                              </Text>
                            </View>
                          )
                        )}
                      </View>
                    </>
                  )}

                  <View
                    style={[styles.divider, { backgroundColor: theme.border }]}
                  />

                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Description
                  </Text>
                  <Text
                    style={[styles.description, { color: theme.textSecondary }]}
                  >
                    {destination.description}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

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
    marginBottom: spacing.xs,
  },
  stationCode: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    fontFamily: "monospace",
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  trainsContainer: {
    gap: spacing.sm,
  },
  trainCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  trainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trainLineInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.sm,
  },
  lineBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    minWidth: 32,
    alignItems: "center",
  },
  lineText: {
    color: "#FFFFFF",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  trainDestination: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  trainMeta: {
    alignItems: "flex-end",
  },
  trainTime: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  trainCars: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  noTrainsText: {
    fontSize: fontSize.md,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    gap: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    textAlign: "center",
  },
  tabContent: {
    minHeight: 200,
  },
  trainGroup: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  timingsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  timingCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: "center",
    gap: spacing.sm,
  },
  timingLabel: {
    fontSize: fontSize.xs,
    textAlign: "center",
  },
  timingValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  infoCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  scheduleCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.md,
    flex: 1,
  },
  alertsContainer: {
    gap: spacing.md,
  },
  alertsList: {
    gap: spacing.sm,
  },
  simpleAlertCard: {
    flexDirection: "row",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    gap: spacing.md,
  },
  alertLeft: {
    paddingTop: 2,
  },
  alertRight: {
    flex: 1,
    gap: spacing.xs,
  },
  alertLineText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  alertMessage: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  alertTimestamp: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  emptyAlertState: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  emptyAlertText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  alertCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: "#FFF",
    borderLeftWidth: 4,
    gap: spacing.sm,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  alertTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    flex: 1,
  },
  alertDescription: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: fontSize.xs,
    fontStyle: "italic",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    gap: spacing.xs,
  },
  featureText: {
    fontSize: fontSize.sm,
  },
});
