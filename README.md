# PoseTracker React Native CLI
This is a React Native CLI project for integrating the [PoseTracker API](https://posetracker.com) to track exercises and count repetitions in real-time.

https://github.com/user-attachments/assets/c4265eca-98d6-48ac-ac2c-84187809ec5a


## Features

- ✅ Real-time pose tracking
- ✅ Exercise repetition counter
- ✅ Posture feedback and placement guidance
- ✅ WebView-based camera integration
- ✅ Works on iOS and Android
- ✅ TypeScript support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 20)
- React Native development environment set up
  - For Android: Android Studio, Android SDK
  - For iOS: Xcode (macOS only)
- PoseTracker API key from [posetracker.com](https://posetracker.com)

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Get your API Key**:
   - Create a free account at [posetracker.com](https://posetracker.com)
   - Copy your API key
   - Replace `YOUR_POSETRACKER_API_KEY_HERE` in `App.tsx` (line 14)

3. **Install iOS dependencies** (macOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android

1. **Start Metro bundler**:
```bash
npm start
```

2. **In a new terminal, run Android**:
```bash
npm run android
```

Or use the combined command:
```bash
npx react-native run-android
```

### iOS (macOS only)

1. **Start Metro bundler**:
```bash
npm start
```

2. **In a new terminal, run iOS**:
```bash
npm run ios
```

Or use the combined command:
```bash
npx react-native run-ios
```

## Configuration

### Change Exercise Settings

In `App.tsx`, you can customize:

```typescript
const exercise = 'squat';    // Exercise type
const difficulty = 'easy';   // Difficulty level
```

### API Configuration

The app connects to PoseTracker using:
```typescript
const API_KEY = 'YOUR_POSETRACKER_API_KEY_HERE';
const POSETRACKER_API = 'https://app.posetracker.com/pose_tracker/tracking';
```

## Project Structure

```
PoseTrackerCLI/
├── App.tsx                    # Main application file
├── android/                   # Android native code
│   └── app/src/main/
│       └── AndroidManifest.xml # Android permissions
├── ios/                       # iOS native code
│   └── PoseTrackerCLI/
│       └── Info.plist         # iOS permissions
├── package.json               # Dependencies
└── README.md                  # This file
```

## Permissions

### Android
The following permissions are configured in `AndroidManifest.xml`:
- `CAMERA` - For camera access
- `INTERNET` - For API communication

### iOS
Camera permission is configured in `Info.plist`:
- `NSCameraUsageDescription` - Explains why camera access is needed

## How It Works

1. **Permission Request**: App requests camera permission on launch
2. **WebView Loading**: WebView loads PoseTracker API endpoint
3. **Camera Access**: Camera feed is accessed through WebView
4. **Real-time Analysis**: PoseTracker analyzes the video stream
5. **Data Bridge**: JavaScript bridge communicates pose data back to React Native
6. **UI Update**: Status, counter, and feedback are displayed

## Dependencies

### Core Dependencies
- `react` (19.1.1)
- `react-native` (0.82.0)
- `react-native-webview` (^13.16.0) - WebView for PoseTracker integration
- `react-native-permissions` (^5.4.2) - Camera permission handling
- `react-native-safe-area-context` (^5.5.2) - Safe area support

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Android Build Errors
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### iOS Build Errors
```bash
# Clean build folder
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx react-native run-ios
```

### Camera Permission Not Working

**Android**:
- Check `AndroidManifest.xml` has camera permissions
- Manually grant permission in device settings

**iOS**:
- Check `Info.plist` has `NSCameraUsageDescription`
- Reset permissions in device settings

### WebView Not Loading

Check:
1. Internet connection
2. API key is valid
3. Console logs for errors
4. Try reloading the app (shake device → Reload)

## Console Logs

The app logs important events to help with debugging:
- `WebView loading started`
- `WebView loading completed`
- `Bridge injected successfully`
- `Permission request: camera`
- `Received infos: {...}`
- `Parsed data: {...}`

**To view logs**:

Android:
```bash
npx react-native log-android
```

iOS:
```bash
npx react-native log-ios
```

## Development

### Enable TypeScript Strict Mode

In `tsconfig.json`, enable strict mode for better type safety:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Debugging

1. **React Native Debugger**:
   - Shake device → "Debug"
   - Opens Chrome DevTools

2. **Flipper** (Recommended):
   - Install Flipper Desktop
   - Automatic connection to running app
   - View network requests, logs, layout

## API Reference

### PoseTracker Events

The app receives the following event types from PoseTracker:

- `initialization` - API initialization status
- `posture` - Posture and placement feedback
- `counter` - Repetition count updates
- `error` - Error messages
- `bridge_ready` - Bridge connection confirmed

## Performance

- Optimized for real-time tracking
- Minimal UI overhead
- Efficient WebView bridge communication

## Known Limitations

- Requires good lighting for accurate tracking
- Front camera recommended
- User must be fully visible in frame
- Works best with plain background

## Support

For PoseTracker API questions:
- Website: [posetracker.com](https://posetracker.com)
- Documentation: Check PoseTracker docs

For React Native issues:
- React Native docs: [reactnative.dev](https://reactnative.dev)

## License

This project is provided as-is for integration with PoseTracker API.

---

**Happy tracking! 🚀🏋️**
