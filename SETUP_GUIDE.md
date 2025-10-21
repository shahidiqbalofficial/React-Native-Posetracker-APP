# Quick Setup Guide - PoseTracker React Native CLI

## ✅ What's Already Done

Your React Native CLI project is ready with:
- ✅ React Native WebView installed
- ✅ React Native Permissions installed
- ✅ Android permissions configured
- ✅ iOS permissions configured
- ✅ Complete PoseTracker integration code
- ✅ TypeScript support

## 📝 Required Steps

### 1. Add Your API Key

Open `App.tsx` and replace:
```typescript
const API_KEY = 'YOUR_POSETRACKER_API_KEY_HERE';
```

With your actual PoseTracker API key from [posetracker.com](https://posetracker.com).

### 2. Setup for Android (Windows/macOS/Linux)

**You're ready to run!**

```bash
# Start Metro
npm start

# In a new terminal
npm run android
```

That's it! The app will:
1. Request camera permission
2. Load PoseTracker in WebView
3. Start tracking squats

### 3. Setup for iOS (macOS only)

If you're on macOS or plan to run on iOS:

```bash
# Navigate to iOS folder
cd ios

# Install CocoaPods dependencies
pod install

# Go back to project root
cd ..

# Run on iOS
npm run ios
```

## 🚀 Quick Start

### First Time Setup

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start Metro bundler
npm start
```

### Run on Android

In a **new terminal**:
```bash
npm run android
```

Or:
```bash
npx react-native run-android
```

### Run on iOS (macOS only)

In a **new terminal**:
```bash
npm run ios
```

Or:
```bash
npx react-native run-ios
```

## 📱 Testing the App

1. **Grant Camera Permission** when prompted
2. **Position yourself** in front of the camera
3. **Follow placement guidance** on screen
4. **Start doing squats** when ready
5. **Watch the counter** increment!

## 🎯 Expected Behavior

### On Launch:
- Shows permission request screen
- Asks for camera access

### After Permission:
- Shows loading overlay
- Connects to PoseTracker API
- Displays status: "Loading AI..."

### When Ready:
- Status changes to: "AI Running ✓"
- Shows placement guidance
- Counts repetitions

### During Exercise:
- Counter updates in real-time
- Posture feedback shows placement status
- Ready indicator turns green when positioned correctly

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Kill the process using port 8081
# Windows:
npx react-native start --port 8082

# macOS/Linux:
lsof -ti:8081 | xargs kill
```

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache
```

### Android Build Errors

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Camera Not Working

1. Check permissions in device settings
2. Restart the app
3. Check console logs for errors

### WebView Shows Blank Screen

1. Verify API key is correct
2. Check internet connection
3. Look at Metro bundler logs
4. Check React Native logs:
   ```bash
   npx react-native log-android
   ```

## 📊 Console Logs

You should see logs like:
```
LOG  WebView loading started
LOG  Bridge is ready
LOG  Received infos: {"type":"initialization","message":"checking you plan and access"}
LOG  Received infos: {"message": "accessing webcam", "type": "initialization"}
LOG  Received infos: {"message": "running", "ready": true, "type": "initialization"}
LOG  Parsed data: {"direction": "in-frame", "message": "ready", "ready": true, "type": "posture"}
LOG  Parsed data: {"current_count": 1, "type": "counter"}
```

## 🎨 Customization

### Change Exercise

In `App.tsx`:
```typescript
const exercise = 'squat';    // Try: 'pushup', 'plank', etc.
const difficulty = 'easy';   // Try: 'medium', 'hard'
```

### Adjust UI

Modify the `styles` object in `App.tsx` to customize:
- Info container position
- Colors
- Font sizes
- Layout

## 📦 Project Files

```
PoseTrackerCLI/
├── App.tsx                           # ✅ Main app (configured)
├── android/
│   └── app/src/main/
│       └── AndroidManifest.xml       # ✅ Permissions added
├── ios/
│   └── PoseTrackerCLI/
│       └── Info.plist                # ✅ Permissions added
├── package.json                      # ✅ Dependencies installed
└── README.md                         # Full documentation
```

## ✨ Next Steps

1. **Get your API key** from posetracker.com
2. **Add it to App.tsx** (line 14)
3. **Run the app**: `npm start` then `npm run android`
4. **Start tracking!** 🏋️

## 💡 Tips

- Use good lighting for best results
- Keep your whole body in frame
- Use a plain background if possible
- Front camera works best
- Stay within the detection frame

## 🆘 Need Help?

- **API Issues**: Contact PoseTracker support
- **React Native Issues**: Check [reactnative.dev](https://reactnative.dev)
- **Build Issues**: Check React Native troubleshooting docs

---

**You're all set! Happy tracking! 🚀**

