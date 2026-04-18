# 🧺 Badaa Dhobi - IoT Laundry Counter Dashboard

## 📖 Project Overview

The Badaa Dhobi system bridges edge-level hardware detection with a mobile frontend. It eliminates the need for complex machine learning models at the edge by utilizing a lightweight, image-processing approach on a low-cost microcontroller. Whenever a piece of clothing is dropped into the laundry box, the hardware detects the event, updates the cloud, and the mobile application (distributed as a standalone APK) instantly reflects the new count.

## 🏗️ System Architecture & Working Principle

The ecosystem operates through a streamlined three-tier architecture:

### 1. Hardware & Edge Processing (ESP32-CAM)
* **Camera Module:** An ESP32-CAM is mounted at the top of the laundry box, continuously capturing frames of the interior.
* **Pixel Intensity Detection:** Instead of heavy object detection, the microcontroller processes the raw images using pixel intensity comparison. 
* **The Algorithm:** The system establishes a baseline image of the empty (or static) box. It then compares the pixel intensity of subsequent live frames against this baseline. A significant, sudden delta in pixel intensity thresholds indicates that a new item has passed through the camera's field of view, registering as a "drop".

### 2. Cloud Synchronization (Firebase Realtime Database)
* Once the ESP32-CAM confirms a drop event via the intensity delta, it triggers a network request.
* It connects directly to a **Firebase Realtime Database** via Wi-Fi and increments a designated counter node.
* Firebase acts as the central state manager, retaining the current laundry count and the timestamp of the last update.

### 3. Mobile Dashboard (React Native)
* **The App:** A standalone Android application (APK) built with React Native.
* **Real-time Listeners:** The application maintains an active websocket connection to the Firebase Realtime Database.
* **Instant UI:** The moment the ESP32 increments the database, Firebase pushes the update to the app, updating the dashboard's UI instantaneously without requiring manual refreshes.

## 🚀 Key Advantages
* **Edge-Efficient:** Pixel comparison avoids the memory and processing bottlenecks of running neural networks on an ESP32.
* **Low Latency:** The direct ESP32 -> Firebase -> App pipeline ensures the user sees the count update the moment the clothes hit the box.
* **Plug & Play:** As a packaged APK, the frontend requires no complex local environment setup for the end user.
