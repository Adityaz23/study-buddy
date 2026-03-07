import { useRouter } from "expo-router";
import { Alert } from "react-native";
import type { Channel, StreamChat } from "stream-chat";
type UseStartChatParams = {
  client: StreamChat;
  userId: string;
  setChannel: (channel: Channel) => void;
  setCreating: (value: string | null) => void;
};
const useStartChat = ({
  client,
  userId,
  setCreating,
  setChannel,
}: UseStartChatParams) => {
  const router = useRouter();
  const handleStartChat = async (targetId: string) => {
    setCreating(targetId);
    try {
      const channel = client.channel("messaging", {
        members: [userId, targetId],
      });
      await channel.watch();

      setChannel(channel);
      // TODO => Need to create the channel screen
      // router.push(`/channel/${channel.cid}`);
    } catch (error) {
      console.log("Error creating the channel :", error);
      Alert.alert("Error, Could not create chat. Please try again.");
    } finally {
      setCreating(null);
    }
  };
  return {handleStartChat};
};

export default useStartChat;
