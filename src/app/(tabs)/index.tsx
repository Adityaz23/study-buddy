import { useAppContext } from "@/context/AppProvider";
import { getGreetingsForHour } from "@/lib/utils";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/lib/theme";
import { ChannelList } from "stream-chat-expo";
import { Channel } from "stream-chat";
const ChatScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const { setChannel } = useAppContext();
  const [search, setSearch] = useState("");
  const filters = { members: { $in: [user?.id!] }, type: "messaging" };
  const firstName = user?.firstName || "there";
  const channelRenderFilterFn = (channels: Channel[]) => {
    if (!search.trim()) return channels;

    const q = search.toLowerCase();
    return channels.filter((channel) => {
      const name =
        (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
      const cid = channel.cid.toLowerCase();
      return name.includes(q) || cid.includes(q);
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-sm text-foreground-muted mb-0.5">
          {getGreetingsForHour()},{firstName}
        </Text>
      </View>
      {/* Search:- */}
      <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <MaterialIcons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search messages....."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Section Label:- */}
      <View className="flex-row items-center px-5 my-1.5 gap-2">
        <MaterialIcons
          name="chat-bubble"
          size={18}
          color={COLORS.primaryLight}
        />
        <Text className="text-[15px] font-semibold text-primary-light">
          Your Messages
        </Text>
      </View>
      {/* Chat Cards :- */}
      <ChannelList
        filters={filters}
        // State true will fetch initial full date of the channel and watch:true will keep the channel updated on the lastest data.
        options={{ state: true, watch: true }}
        sort={{ last_updated: -1 }}
        channelRenderFilterFn={channelRenderFilterFn}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/channel/${channel.id}`  )
        }}
        additionalFlatListProps={{
          contentContainerStyle: { flexGrow: 1 },
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
