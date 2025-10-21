# Expo vs React Native CLI - PoseTracker Integration

This document compares the two PoseTracker implementations in this repository.

## 📁 Project Structure

```
PoseTracker-Example-ReactNative-Expo/
├── (Expo Project Files)           # Expo version
└── PoseTrackerCLI/                # React Native CLI version (this folder)
```

## 🔄 Key Differences

| Feature | Expo | React Native CLI |
|---------|------|------------------|
| **Setup Complexity** | Easy (managed) | More complex (native code) |
| **Dependencies** | `expo-camera`, `expo-dev-client` | `react-native-permissions` |
| **Permissions** | Via `app.json` + expo plugins | Native files (AndroidManifest.xml, Info.plist) |
| **Build Process** | EAS Build required for camera | Standard React Native build |
| **Development** | Expo Go (limited) or dev build | React Native CLI |
| **File Size** | Larger (Expo SDK) | Smaller |
| **Native Modules** | Limited without dev build | Full access |
| **TypeScript** | Partial | Full support |

## 📋 Implementation Differences

### Expo Version

**Main Dependencies:**
```json
{
  "expo": "^52.0.8",
  "expo-camera": "~16.0.6",
  "expo-dev-client": "~5.0.20",
  "react-native-webview": "13.12.5"
}
```

**Permissions (app.json):**
```json
{
  "plugins": [
    "expo-dev-client",
    "expo-asset",
    ["expo-camera", {
      "cameraPermission": "..."
    }]
  ]
}
```

**Camera Permission:**
```javascript
import { useCameraPermissions } from 'expo-camera';
const [permission, requestPermission] = useCameraPermissions();
```

### React Native CLI Version

**Main Dependencies:**
```json
{
  "react-native": "0.82.0",
  "react-native-webview": "^13.16.0",
  "react-native-permissions": "^5.4.2"
}
```

**Permissions (Android - AndroidManifest.xml):**
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

**Permissions (iOS - Info.plist):**
```xml
<key>NSCameraUsageDescription</key>
<string>Camera access for pose tracking</string>
```

**Camera Permission:**
```typescript
import { PermissionsAndroid } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

// Android
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

// iOS
request(PERMISSIONS.IOS.CAMERA);
```

## 🎯 When to Use Each

### Use Expo When:

✅ You want quick prototyping  
✅ You're new to React Native  
✅ You don't need custom native modules  
✅ You want managed builds via EAS  
✅ Team has limited native development experience  

**Best for:**
- Rapid development
- Cross-platform apps
- Simple apps
- MVP/prototypes

### Use React Native CLI When:

✅ You need full native control  
✅ You want to integrate custom native modules  
✅ You need smaller app size  
✅ You have native development experience  
✅ You need advanced native features  

**Best for:**
- Production apps
- Performance-critical apps
- Apps with complex native requirements
- Full customization needs

## 🚀 Running Each Version

### Expo Version

```bash
# Navigate to Expo project root
cd PoseTracker-Example-ReactNative-Expo

# Start (development build recommended)
npm start

# For Expo Go (limited camera support)
npm start
# Press 's' to switch to Expo Go
```

### React Native CLI Version

```bash
# Navigate to CLI project
cd PoseTrackerCLI

# Start Metro
npm start

# In new terminal - Run Android
npm run android

# Or run iOS (macOS only)
npm run ios
```

## 📦 Build Process

### Expo

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build
eas build --profile development --platform android
```

**Result:** APK/IPA file from Expo servers

### React Native CLI

```bash
# Android
cd android
./gradlew assembleRelease

# iOS (macOS only)
cd ios
xcodebuild -workspace PoseTrackerCLI.xcworkspace -scheme PoseTrackerCLI
```

**Result:** APK/IPA built locally

## 🔧 Configuration Files

### Expo

- `app.json` - Main configuration
- `eas.json` - Build configuration
- `package.json` - Dependencies
- No direct access to native files (unless ejected)

### React Native CLI

- `package.json` - Dependencies
- `android/app/src/main/AndroidManifest.xml` - Android config
- `ios/PoseTrackerCLI/Info.plist` - iOS config
- Direct access to all native files

## 💻 Development Experience

### Expo

**Pros:**
- Hot reload works great
- Easier debugging
- Managed updates
- Over-the-air updates

**Cons:**
- Limited to Expo SDK
- WebView camera needs dev build
- Cannot use all npm packages
- Larger app size

### React Native CLI

**Pros:**
- Full control
- Smaller bundle size
- All npm packages supported
- Direct native debugging

**Cons:**
- More complex setup
- Manual linking sometimes needed
- Requires native build tools
- Steeper learning curve

## 📱 WebView Camera Support

### Expo

⚠️ **Limited in Expo Go**  
✅ **Full support in development build**

Requires:
- `expo-dev-client` installed
- Building with EAS
- Installing custom APK/IPA

### React Native CLI

✅ **Full support out of the box**

Requires:
- `react-native-webview` installed
- Proper permissions configured
- Standard build process

## 🎨 Code Similarities

Both versions share ~90% of the same logic:
- Same PoseTracker API integration
- Same WebView bridge communication
- Same UI components
- Same exercise tracking logic

Main difference is **permission handling**.

## 📊 Performance

| Metric | Expo | React Native CLI |
|--------|------|------------------|
| App Size | ~50-100MB | ~20-30MB |
| Startup Time | Slower | Faster |
| Runtime Performance | Similar | Similar |
| Build Time | Faster (cloud) | Slower (local) |

## 🔐 Permissions Comparison

### Expo
```javascript
// Simple, managed
const [permission, requestPermission] = useCameraPermissions();
```

### React Native CLI
```typescript
// More control, platform-specific
if (Platform.OS === 'android') {
  PermissionsAndroid.request(...);
} else {
  request(PERMISSIONS.IOS.CAMERA);
}
```

## 🎓 Learning Curve

**Expo:** ⭐⭐ (Easy)  
**React Native CLI:** ⭐⭐⭐⭐ (Moderate-Advanced)

## 💰 Cost Considerations

### Expo
- Free tier available
- EAS Build: Limited free builds/month
- Paid plans for production

### React Native CLI
- Completely free
- Build on your own hardware
- No subscription needed

## 🔄 Migration

### From Expo to CLI
1. Copy App.tsx logic
2. Install dependencies
3. Configure native permissions
4. Update permission handling
5. Test thoroughly

### From CLI to Expo
1. `npx expo init` new project
2. Copy App logic
3. Install Expo packages
4. Update to Expo APIs
5. Configure app.json

## ✅ Recommendation

**For PoseTracker specifically:**

- **Learning/Prototyping**: Use Expo
- **Production App**: Use React Native CLI
- **Quick Demo**: Use Expo (with dev build)
- **Full Control**: Use React Native CLI

Both versions work perfectly for PoseTracker! Choose based on your:
- Team expertise
- App requirements
- Development timeline
- Budget

---

**Both implementations are production-ready! 🚀**

