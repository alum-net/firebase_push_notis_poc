package org.alumnet.firebase_push_poc.services;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import java.io.FileInputStream;
import java.io.IOException;

public class PushNotificationService {

  private boolean initialized = false;

  public void initialize(String serviceAccountPath) throws IOException {
    if (!initialized) {
      try (FileInputStream serviceAccount = new FileInputStream(serviceAccountPath)) {
        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(com.google.auth.oauth2.GoogleCredentials.fromStream(serviceAccount))
            .build();
        FirebaseApp.initializeApp(options);
        initialized = true;
      }
    }
  }

  public String sendNotification(String fcmToken, String title, String body) throws Exception {
    Message message = Message.builder()
        .setToken(fcmToken)
        .setNotification(Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build())
        .build();

    return FirebaseMessaging.getInstance().send(message);
  }
}
