import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/authSlice';
import { toggleTheme } from '../../store/themeSlice';
import { saveTheme } from '../../store/themeSlice';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? colors.dark : colors.light;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await dispatch(logoutUser());
          router.replace('/login' as any);
        },
      },
    ]);
  };

  const handleThemeToggle = async (value: boolean) => {
    await dispatch(saveTheme(value));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Text>
        </View>
        <Text style={[styles.name, { color: theme.text }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email}</Text>
        <Text style={[styles.username, { color: theme.textSecondary }]}>@{user?.username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
        
        <View style={[styles.settingItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.settingInfo}>
            <Feather name={isDark ? 'moon' : 'sun'} size={24} color={theme.text} />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Toggle dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleThemeToggle}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT</Text>
        
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <Feather name="user" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Edit Profile</Text>
          <Feather name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <Feather name="settings" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Settings</Text>
          <Feather name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <Feather name="help-circle" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Help & Support</Text>
          <Feather name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <Feather name="info" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>About</Text>
          <Feather name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.error }]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Feather name="log-out" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: theme.textSecondary }]}>
          GoMate v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  email: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  username: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  settingDescription: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  menuText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.md,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  version: {
    fontSize: fontSize.xs,
  },
});
