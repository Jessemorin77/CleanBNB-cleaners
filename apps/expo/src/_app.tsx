import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer } from "@react-navigation/native";
import { SignInSignUpScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import { TabNavigation } from "./navigation/UserStack";
import { NativeBaseProvider } from "native-base";
import supabase from "./config/supabase.conf";

const SignedInApp = () => {
  const { getToken } = useAuth();

  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken({ template: "supabase" });
        if (token) {
          console.log("Fetched token:", token);
        } else {
          console.error("Unable to get Clerk token");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <TabNavigation />
          </NativeBaseProvider>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn>
        <SignedInApp />
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
};


