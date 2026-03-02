import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  // Right here we will add the spinner for the loader.
  const [loadingStat, setLoadingStat] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  // This function will for the suthentication to check the auth user.
  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_github",
  ) => {
    // guard against the concurrent
    if (loadingStat) return;

    setLoadingStat(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        const provider =
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_apple"
              ? "Apple"
              : "Github";
        Alert.alert(
          "Sign-in error: ",
          `${provider} sign-in did not complete. Please try again`,
        );
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth: ", error);
      const provider =
        strategy === "oauth_google"
          ? "Google"
          : strategy === "oauth_apple"
            ? "Apple"
            : "Github";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    } finally {
      setLoadingStat(null);
    }
  };

  return {handleSocialAuth, loadingStat};
};
export default useSocialAuth;
