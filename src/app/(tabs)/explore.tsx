import { useAppContext } from "@/context/AppProvider";
import useStartChat from "@/hooks/useStartChat";
import useStreamUsers from "@/hooks/useStreamUsers";
import { COLORS } from "@/lib/theme";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import type {UserResponse} from "stream-chat"
import ExploreUserCard from "@/components/ExploreUserCard";
const ExploreScreen = () => {
  const { setChannel } = useAppContext();
  const { user } = useUser();
  const { client } = useChatContext();
  const userId = user?.id ?? "";

  // Now two different states for the user creating the new chats.
  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Creating the cutsom hook for the user streaming opetions :-
  const { users, loading } = useStreamUsers(client, userId);
    const { handleStartChat } = useStartChat({ client, userId, setChannel, setCreating });

  const filteredUsers = !search.trim()
    ? users
    : users.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.id.toLowerCase().includes(search.toLowerCase()),
      );

      const renderUserItem = ({item}: {item:UserResponse}) => (
        <ExploreUserCard  item={item} creating={creating} onStartChat={handleStartChat}/>
      )
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header :- */}
      <View className="px-5 pt-3 pb-1">
        <Text className="text-[28px] font-bold text-foreground">
          ExploreScreen
        </Text>
        <Text className="text-sm text-foreground-muted mt-1">
          Find people and start chatting.
        </Text>
      </View>

      {/* Search Bar :- */}
      <View className="flex-row items-center bg-surface mx-5 my-4 px-3.5 py-4 rounded-[14px] gap-2.5 border border-border">
        <MaterialIcons name="search" size={18} color={COLORS.primaryDark} />
        <TextInput
          className="flex-1 text-[15px] text-fuchsia-200"
          placeholder="Search People"
          placeholderTextColor={COLORS.primaryLight}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <MaterialIcons name="close" size={18} color={COLORS.textMuted} />
          </Pressable>
        )}
      </View>

      {/* Users List :- */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComponent />}
        />
      )}
      {/* <ListEmptyComponent /> */}
    </SafeAreaView>
  );
};

export default ExploreScreen;
