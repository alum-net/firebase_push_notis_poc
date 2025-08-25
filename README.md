# Firebase CLI Push Notification Tool

This project demonstrates how to send **Firebase Cloud Messaging (FCM) push notifications** from a **Java 17 CLI application** to a **mobile app built with Expo**.

It’s structured so the Firebase integration can easily be reused in other projects.

---

## ✅ How It Works

1. **Run the mobile app** → It will generate and display the **FCM device token**.
2. **Copy the token** from the app or CLI log.
3. **Run the Java CLI tool** → Send a push notification to that token using Firebase.

---

## ✅ Project Structure

```
firebase_push_poc/
 ├── pom.xml                           # Maven config with dependencies & plugins
 ├── src/
 │    ├── main/java/
 │    │    └── org/alumnet/firebase_push_poc/
 │    │         ├── Main.java          # CLI entry point
 │    │         └── service/
 │    │              └── pushNotificationService.java
 │    └── main/resources/
 │         └── service-account.json    # Firebase service account credentials
```

---

## ✅ Prerequisites

* **Java 17**
* **Maven**
* **Node.js & Expo CLI** for the mobile app
* A **Firebase project** with:

  * Service account JSON (download from Firebase Console → Project Settings → Service Accounts)
  * FCM enabled in your Firebase project

---

## ✅ Step 1: Run the Mobile App (Expo)

1. In your mobile app (Expo), make sure `expo-notifications` is installed and configured with Firebase.
2. Start the app:

   ```bash
   npx expo run:android
   ```
3. The app should:

   * Request notification permissions
   * Register with Firebase
   * Print the **FCM token** in:

     * The app UI
     * The console log (`npx expo start` log)

Copy this **token** for the next step.

---

## ✅ Step 2: Configure and Build the CLI

1. Place your Firebase **service account JSON** in:

   ```
   src/main/resources/service-account.json
   ```
2. Build the CLI tool:

   ```bash
   mvn clean package
   ```

This generates:

```
target/firebase_push_poc-1.0-SNAPSHOT-shaded.jar
```

---

## ✅ Step 3: Send a Notification from CLI

Run:

```bash
java -jar target/firebase_push_poc-1.0-SNAPSHOT-shaded.jar <fcm-token> "<message>"
```

Example:

```bash
java -jar target/firebase_push_poc-1.0-SNAPSHOT-shaded.jar dEviCeToKen123 "Hello from CLI"
```

The notification will appear on your mobile device.