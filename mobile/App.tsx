import React from "react";
import { ActivityIndicator, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import type { RootStackParamList } from "./src/types";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import BrowseScreen from "./src/screens/BrowseScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user, loading } = useAuth();
  const { palette: p, ready } = useSettings();

  const navTheme: Theme = {
    ...DefaultTheme,
    dark: p.mode === "dark",
    colors: {
      ...DefaultTheme.colors,
      background: p.bg,
      card: p.bgElev,
      text: p.text,
      border: p.border,
      primary: p.primary,
    },
  };

  if (loading || !ready) {
    return (
      <View
        style={{ flex: 1, backgroundColor: p.bg, justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color={p.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={p.mode === "dark" ? "light" : "dark"} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: p.bg },
          headerShadowVisible: false,
          headerTintColor: p.text,
          headerTitleStyle: { fontWeight: "800" },
          contentStyle: { backgroundColor: p.bg },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Browse"
              component={BrowseScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
