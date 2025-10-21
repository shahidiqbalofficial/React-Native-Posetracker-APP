import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

const API_KEY = '98c79f35-bf1a-4930-97d2-dcb3016f4e61'; // Replace with your API key
const POSETRACKER_API = 'https://app.posetracker.com/pose_tracker/tracking';
const {width, height} = Dimensions.get('window');

interface PoseTrackerInfo {
  type: string;
  message?: string;
  ready?: boolean;
  direction?: string;
  current_count?: number;
  error?: string;
  postureDirection?: string;
}

export default function App() {
  const [poseTrackerInfos, setPoseTrackerInfos] = useState<PoseTrackerInfo>();
  const [repsCounter, setRepsCounter] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const exercise = 'squat';
  const difficulty = 'easy';

  const posetracker_url = `${POSETRACKER_API}?token=${API_KEY}&exercise=${exercise}&difficulty=${difficulty}&width=${Math.floor(
    width,
  )}&height=${Math.floor(height)}`;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'This app needs camera access to track your exercise form and count repetitions.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        setHasPermission(result === RESULTS.GRANTED);
      }
    } catch (err) {
      console.warn('Camera permission error:', err);
      setHasPermission(false);
    }
  };

  const jsBridge = `
    (function() {
      console.log('Bridge injected successfully');
      
      window.addEventListener('message', function(event) {
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
        } catch (e) {
          console.error('Error in message listener:', e);
        }
      });

      window.webViewCallback = function(data) {
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        } catch (e) {
          console.error('Error in webViewCallback:', e);
        }
      };

      const originalPostMessage = window.postMessage;
      window.postMessage = function(data) {
        try {
          window.ReactNativeWebView.postMessage(typeof data === 'string' ? data : JSON.stringify(data));
        } catch (e) {
          console.error('Error in postMessage:', e);
        }
      };

      // Signal that injection is complete
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'bridge_ready' }));
      
      return true;
    })();
  `;

  const webViewCallback = (info: PoseTrackerInfo) => {
    if (info?.type === 'counter') {
      handleCounter(info.current_count || 0);
    } else if (info?.type === 'bridge_ready') {
      console.log('Bridge is ready');
    } else {
      handleInfos(info);
    }
  };

  const handleCounter = (count: number) => {
    setRepsCounter(count);
  };

  const handleInfos = (infos: PoseTrackerInfo) => {
    setPoseTrackerInfos(infos);
    console.log('Received infos:', infos);
  };

  const onMessage = (event: any) => {
    try {
      let parsedData;
      if (typeof event.nativeEvent.data === 'string') {
        parsedData = JSON.parse(event.nativeEvent.data);
      } else {
        parsedData = event.nativeEvent.data;
      }

      console.log('Parsed data:', parsedData);
      webViewCallback(parsedData);
    } catch (error) {
      console.error('Error processing message:', error);
      console.log('Problematic data:', event.nativeEvent.data);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>📷 Camera Access Required</Text>
        <Text style={styles.permissionText}>
          This app needs camera access to track your exercise form and count
          repetitions.
        </Text>
        <Button
          title="Grant Camera Permission"
          onPress={requestCameraPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsCamera={true}
        mediaCapture="camera"
        style={styles.webView}
        source={{uri: posetracker_url}}
        originWhitelist={['*']}
        injectedJavaScript={jsBridge}
        onMessage={onMessage}
        onPermissionRequest={request => {
          console.log('WebView Permission request:', request.nativeEvent);
          request.grant();
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setWebViewError(`WebView Error: ${nativeEvent.description}`);
          setIsLoading(false);
        }}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.error('HTTP error:', nativeEvent);
          setWebViewError(`HTTP Error: ${nativeEvent.statusCode}`);
          setIsLoading(false);
        }}
        onLoadStart={() => {
          console.log('WebView loading started');
          setIsLoading(true);
          setWebViewError(null);
        }}
        onLoadEnd={() => {
          console.log('WebView loading completed');
          setIsLoading(false);
        }}
        onLoadProgress={({nativeEvent}) => {
          console.log('Loading progress:', nativeEvent.progress);
        }}
        renderError={errorName => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Error Loading</Text>
            <Text style={styles.errorText}>{errorName}</Text>
          </View>
        )}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading PoseTracker...</Text>
        </View>
      )}

      {webViewError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{webViewError}</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Status: {!poseTrackerInfos ? 'Loading AI...' : 'AI Running ✓'}
        </Text>
        <Text style={styles.infoText}>Counter: {repsCounter}</Text>
        {poseTrackerInfos?.ready === false ? (
          <>
            <Text style={styles.warningText}>⚠️ Placement: Not Ready</Text>
            <Text style={styles.infoText}>
              Move {poseTrackerInfos?.postureDirection || 'to position'}
            </Text>
          </>
        ) : poseTrackerInfos?.ready === true ? (
          <>
            <Text style={styles.successText}>✓ Placement: Ready</Text>
            <Text style={styles.infoText}>Start doing squats!</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d32f2f',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  errorBanner: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    zIndex: 10,
  },
  errorBannerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  infoContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  successText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});
