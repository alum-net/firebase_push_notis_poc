import React from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";

if (Platform.OS === "web") {
  if ("serviceWorker" in navigator)
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => console.log("Service worker registered:", reg))
      .catch((err) =>
        console.error("Service worker registration failed:", err)
      );
}

export default function RootLayout() {
  return <Stack />;
}
