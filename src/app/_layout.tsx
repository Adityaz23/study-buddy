import { Stack } from "expo-router";
import "../../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://00c29f8afaf7987d3f83d2857e97423f@o4510975572115456.ingest.de.sentry.io/4510975581225041",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default function RootLayout() {
  // fetch("/token",{
  //   method: "POST",
  //   headers:{
  //     "Content-Type": "applications/json"
  //   },
  //   body: JSON.stringify({userId:"user-id"})
  // })
  return (
    // This token is to keep the info of the user even if they close the app.
    <ClerkProvider tokenCache={tokenCache}>
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
