import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { messaging } from "../firebase-config";
import { getToken, onMessage } from "firebase/messaging";

export default function Index() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Permission not requested");

  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setStatus("Permission granted");
        getToken(messaging, {
          vapidKey: process.env.EXPO_PUBLIC_VAPID_KEY,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              setToken(currentToken);
            } else {
              console.log("No registration token available.");
              setStatus("No token available");
            }
          })
          .catch((err) => {
            console.error("Error getting token:", err);
            setStatus("Error getting token");
          });
      } else {
        setStatus("Permission denied");
      }
    });
  };

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      alert(`Notification: ${payload?.notification?.title}`);
    });
  }, []);

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Firebase Push Notifications (Web Only)
      </Text>
      <Button title="Enable Notifications" onPress={requestPermission} />
      <Text style={{ marginTop: 20 }}>{status}</Text>
      {token && (
        <Text style={{ marginTop: 20, fontSize: 12 }}>Token: {token}</Text>
      )}
    </View>
  );
}
