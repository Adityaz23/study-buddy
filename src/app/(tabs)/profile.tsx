import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "@/lib/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native";
import * as Sentry from "@sentry/react-native";

// The array for the icons :-
const MENU_ITEMS = [
  {
    icon: "notifications-active",
    label: "Notifications",
    color: COLORS.primary,
  },
  { icon: "bookmarks", label: "Bookmarks", color: COLORS.accent },
  {
    icon: "access-time",
    label: "Study History",
    color: COLORS.accentSecondary,
  },
  { icon: "settings", label: "Settings", color: COLORS.textMuted },
];

const ProfileScreen = () => {
  // importing the sign out method to let the user sign out.
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header of the App :- */}
        <View className="px-5 py-4 flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-foreground tracking-tight">
            Profile
          </Text>

          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-surface">
            <MaterialIcons name="edit" size={20} color={COLORS.primary} />
          </Pressable>
        </View>
        {/* Profile Card :- */}
        <View className="items-center py-6">
          <View className="relative mb-4">
            <Image
              source={user?.imageUrl}
              style={{ width: 104, height: 104, borderRadius: 52 }}
              contentFit="cover"
            />

            <View className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-4 border-background" />
          </View>

          <Text className="text-2xl font-bold text-foreground tracking-tight">
            {user?.fullName || user?.username || "Person"}
          </Text>

          <Text className="mt-1 text-sm text-foreground-muted">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>

          <View className="mt-4 flex-row items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <FontAwesome6
              name="fire-flame-curved"
              size={16}
              color={COLORS.primary}
            />
            <Text className="text-sm font-semibold text-primary">
              7 Day Streak 🔥
            </Text>
          </View>
        </View>
        {/* Stats Card :- */}
        <View className="mt-2 mb-8 flex-row gap-4 px-5">
          {[
            { value: "24", label: "Sessions" },
            { value: "12", label: "Partners" },
            { value: "48h", label: "Study Time" },
          ].map((stat, i) => (
            <View
              key={i}
              className="flex-1 items-center rounded-2xl bg-surface px-4 py-5 shadow-sm"
            >
              <Text className="text-xl font-bold text-primary">
                {stat.value}
              </Text>
              <Text className="mt-1 text-xs text-foreground-muted tracking-wide">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
        {/* Menu Items :- */}
        <View className="gap-3 px-5">
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={i}
              className="flex-row items-center gap-4 rounded-2xl bg-surface px-4 py-4 active:opacity-80"
            >
              <View
                className="h-11 w-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>

              <Text className="flex-1 text-base font-medium text-foreground">
                {item.label}
              </Text>

              <MaterialIcons
                name="chevron-right"
                size={20}
                color={COLORS.textSubtle}
              />
            </Pressable>
          ))}
        </View>
        {/* Sign out Button :- */}
        <Pressable
          onPress={async () => {
            try {
              await signOut();
              Sentry.logger.info("User signed out successfully!", {
                userId: user?.id,
              });
            } catch (error) {
              Sentry.logger.error("Error signing out!", {
                error,
                userId: user?.id,
              });
              Sentry.captureException(error);
              Alert.alert(
                "Error",
                "An error occured while signing out. Please try again later.",
              );
            }
          }}
          className="mt-8 mx-5 flex-row items-center justify-center gap-2 rounded-2xl bg-danger/10 py-4 active:opacity-80"
        >
          <MaterialIcons name="logout" size={20} color={COLORS.danger} />
          <Text className="text-base font-semibold text-danger">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
