import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Font from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "@ant-design/react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { PaperProvider, MD3LightTheme as Theme } from "react-native-paper";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = {
  ...Theme,
  colors: {
    ...Theme.colors,
  },
};
export default function RootLayout() {
  const [loaded, error] = Font.useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const exec = async () => {
      await Font.loadAsync(
        "antoutline",
        // eslint-disable-next-line
        require("@ant-design/icons-react-native/fonts/antoutline.ttf")
      );

      await Font.loadAsync(
        "antfill",
        // eslint-disable-next-line
        require("@ant-design/icons-react-native/fonts/antfill.ttf")
      );
      setIsReady(true);
    };
    exec();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !isReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        // staleTime: 30 * 1000,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <Provider locale={enUS} theme={Theme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
            <Toast position="top" topOffset={20} />
          </Provider>
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
