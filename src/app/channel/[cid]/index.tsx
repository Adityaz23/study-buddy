import { EmptyState } from "@/components/EmptyState";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useAppContext } from "@/context/AppProvider";
import { COLORS } from "@/lib/theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { Image } from "expo-image";

const UserChannelScreen = () => {
  const { channel, setThread } = useAppContext();
  const { client } = useChatContext();
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  let displayName = "";
  let avatarUrl = "";

  if (channel) {
    const members = Object.values(channel.state.members);
    const otherMembers = members.find(
      (member) => member.user_id !== client.userID,
    );
    displayName = otherMembers?.user?.name || "Unkown user";
    avatarUrl = otherMembers?.user?.image || "";
  }

  //   using the useLayoutEffect hook here because this will help us to run it before the screen even rendered this is the synchronous function.
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

  if (!channel) return <FullScreenLoader message="Loading the study room." />;

  return (
    <View className="flex-1 bg-background">
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        EmptyStateIndicator={() => (
          <EmptyState
            title="No messages yet"
            subTitle="Be the first to start the conversation"
            icon="book-outline"
          />
        )}
      >
        <MessageList
          onThreadSelect={(thread) => {
            setThread(thread);
            router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
          }}
        />
        <View className="pb-5 bg-surface">
          <MessageInput />
        </View>
      </Channel>
    </View>
  );
};

export default UserChannelScreen;
