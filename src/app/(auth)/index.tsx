// This file is going to be both the signup and signin :-
import useSocialAuth from "@/hooks/useSocialAuth";
import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      <SafeAreaView className="flex-1 ">
        {/* Top Section include the logo and name */}
        <View>
          <View className="items-center pt-10 pb-2">
            <View className="w-16 h-16 rounded-[20px] bg-primary/15 items-center justify-center border border-primary/20">
              <MaterialIcons name="school" size={30} color="#A29BFE" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
