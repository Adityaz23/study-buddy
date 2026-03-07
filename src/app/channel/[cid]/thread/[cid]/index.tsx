import { EmptyState } from "@/components/EmptyState";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useAppContext } from "@/context/AppProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/lib/theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, Thread } from "stream-chat-expo";
import { Image } from "expo-image";

const ThreadScreen = () => {
  const { channel, thread, setThread } = useAppContext();
  const headerHeight = useHeaderHeight();
  if (channel === null) return <FullScreenLoader message="Loading thread..." />;

  useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerTintColor: COLORS.text,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            className="ml-0.7 flex-row items-center"
          >
            <MaterialIcons
              name="arrow-back"
              color={COLORS.primaryLight}
              size={24}
            />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View className="flex-row items-center">
            {avatarUrl ? (
              <Image
                source={avatarUrl}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 10,
                }}
              />
            ) : (
              <View
                className="mr-2.5 h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Text className="text-base font-semibold text-foreground">
                  {displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="font-semibold text-foreground">{displayName}</Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // TODO => Add the video call functionality
              //     router.push({ pathname: "/call[/callId]",params:{callId: channel?.id} });
            }}
          >
            <MaterialIcons name="videocam" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ),
      });
    }, [navigation, displayName, avatarUrl, channel?.cid, channel?.id, router]);
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
        threadList
        EmptyStateIndicator={() => (
          <EmptyState
            title="No messages yet"
            subTitle="Be the first to start the conversation"
            icon="book-outline"
          />
        )}
      >
        <View className="justify-start flex-1">
          <Thread onThreadDismount={() => setThread(null)} />
        </View>
      </Channel>
    </SafeAreaView>
  );
};

export default ThreadScreen;
