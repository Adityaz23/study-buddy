import { useAppContext } from "@/context/AppProvider";
import useStreamUsers from "@/hooks/useStreamUsers";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useChatContext } from "stream-chat-expo";

const ExploreScreen = () => {
  const { channel } = useAppContext();
  const { user } = useUser();
  const { client } = useChatContext();
  const userId = user?.id ?? "";

  // Now two different states for the user creating the new chats.
  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Creating the cutsom hook for the user streaming opetions :-
  const { users, loading } = useStreamUsers(client, userId);
  return (
    <View className="flex-1 bg-background">
      <Text>ExploreScreen</Text>
    </View>
  );
};

export default ExploreScreen;
