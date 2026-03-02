// This file is going to be both the signup and signin :-
import useSocialAuth from "@/hooks/useSocialAuth";
import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const AuthScreen = () => {
  const { handleSocialAuth, loadingStat } = useSocialAuth();
  const isLoading = loadingStat !== null;
  return (
    <View className="flex-1 bg-primary">
      {/* Gradient background. */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#4338CA", "#4F46E5", "#6366F1"]}
          start={{ x: 1.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ width: "100%", height: "100%" }}
          locations={[0, 0.25, 0.5, 0.75, 1]}
        />
      </View>
      <SafeAreaView className="flex-1 justify-between">
        {/* Top Section include the logo and name */}
        <View>
          <View className="items-center pt-10 pb-2">
            <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center border border-primary">
              <MaterialIcons name="school" size={30} color="#A29BFE" />
            </View>
            <Text className="text-3xl font-extrabold text-foreground tracking-tight mt-4 font-mono">
              Study-Buddy
            </Text>
            <Text className="text-foreground-muted text-[15px] mt-1.5 tracking-wide">
              Learn together, grow together
            </Text>
          </View>
          <View className="items-center px-6 mt-4">
            <Image
              source={require("@/assets/images/auth.png")}
              style={{ width: 320, height: 350 }}
              contentFit="cover"
            />
          </View>
          {/* Feature ship arrays :- */}
          <View className="flex-row flex-wrap justify-center gap-3 px-6 mt-5">
            {[
              {
                icon: "videocam" as const,
                label: "Video Calls",
                color: "#10B981", // Emerald-500
                bg: "bg-emerald-500/15 border-emerald-500/40",
              },
              {
                icon: "chat" as const,
                label: "Study Room",
                color: "#4338CA", // Indigo-600 (brand)
                bg: "bg-primary/15 border-primary/40",
              },
              {
                icon: "people" as const,
                label: "Find Partners",
                color: "#F59E0B", // Amber-500
                bg: "bg-amber-500/15 border-amber-500/40",
              },
            ].map((chips) => (
              <View
                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chips.bg}`}
                key={chips.label}
              >
                <MaterialIcons
                  name={chips.icon}
                  size={14}
                  color={chips.color}
                />
                <Text className="text-foreground-muted text-xs font-semibold tracking-wide">
                  {chips.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {/* Authentication buttons: - */}
        <View className="px-8 pb-4">
          <View className="flex-row items-center my-6 px-2">
            <View className="flex-1 h-[1px] bg-zinc-800" />

            <Text className="mx-3 text-black text-xs font-semibold tracking-widest uppercase">
              Continue With
            </Text>

            <View className="flex-1 h-[1px] bg-zinc-800" />
          </View>
          <View className="flex-row justify-center items-center gap-4 mb-5">
            {/* Google button . */}
            <Pressable
              className="size-20 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              onPress={() => !isLoading && handleSocialAuth("oauth_google")}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
            >
              {loadingStat === "oauth_google" ? (
                <ActivityIndicator size={"small"} color={"#6C5CE7"} />
              ) : (
                <Image
                  source={require("../../../assets/images/google.png")}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                />
              )}
            </Pressable>
            {/* Apple button For apple login i need to login in my simulator with my macbook id but i am not doing that right now.*/}
            <Pressable
              className="size-20 rounded-2xl bg-white border border-border-dark items-center justify-center shadow-white/10 active:scale-95"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
            >
              {loadingStat === "oauth_apple" ? (
                <ActivityIndicator size={"small"} color={"#6C5CE7"} />
              ) : (
                <MaterialIcons name="apple" size={30} color={"#000000"} />
              )}
            </Pressable>
            {/* Github Icon */}
            <Pressable
              className="size-20 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              onPress={() => !isLoading && handleSocialAuth("oauth_github")}
              accessibilityRole="button"
              accessibilityLabel="Continue with Github"
            >
              {loadingStat === "oauth_github" ? (
                <ActivityIndicator size={"small"} color={"#6C5CE7"} />
              ) : (
                <FontAwesome name="github" size={30} color={"#FFFFF"} />
              )}
            </Pressable>
          </View>
          <Text className="text-foreground-subtle text-[10px] text-center leading-4">
            By continuing , you agree to our{" "}
            <Text className="text-zinc-800 font-bold underline">
              Terms of Service{" "}
            </Text>{" "}
            and{" "}
            <Text className="text-zinc-800 font-bold underline">
              Privacy Policy
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
