package org.alumnet.firebase_push_poc;

import org.alumnet.firebase_push_poc.services.PushNotificationService;

public class Main {
  public static void main(String[] args) {
    if (args.length < 2) {
      System.out.println("Usage: java -jar firebase_push_poc.jar <fcm-token> <message>");
      return;
    }

    String token = args[0];
    String message = args[1];

    String serviceAccountPath = "src/main/resources/service-account.json";

    PushNotificationService firebaseService = new PushNotificationService();
    try {
      firebaseService.initialize(serviceAccountPath);
      String response = firebaseService.sendNotification(token, "CLI Notification", message);
      System.out.println("Notification sent successfully: " + response);
    } catch (Exception e) {
      System.err.println("Error sending notification: " + e.getMessage());
    }
  }
}
