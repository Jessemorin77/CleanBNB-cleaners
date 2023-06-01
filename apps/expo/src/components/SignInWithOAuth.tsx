import { useOAuth } from "@clerk/clerk-expo";
import * as React from "react";
import { Button, View } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });

        console.log("User data stored successfully");
      } else {
        // Modify this code to handle any missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modify this else to handle them",
        );
      }
    } catch (err) {
      console.log("Error signing in", err);
    }
  }, []);

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign in with Discord"
        onPress={handleSignInWithDiscordPress}
      />
    </View>
  );
};

export default SignInWithOAuth;
