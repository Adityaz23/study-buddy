import { useUser } from "@clerk/clerk-expo";
import type { UserResource } from "@clerk/types";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

const syncUserToStream = async (user: UserResource) => {
  try {
    await fetch("/api/sync-user+api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        name:
          user.fullName ??
          user.username ??
          user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
      }),
    });
  } catch (error) {
    console.error("Error: Failed to sync the user to stream", error);
  }
};
const ChatClient = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResource;
}) => {
  const syncedRef = useRef(false);
  useEffect(() => {
    if (!syncedRef.current) {
      syncedRef.current = true;
      syncUserToStream(user);
    }
  }, [user]);
  //   Providing the token for the user :-
  const tokenProvider = async () => {
    const response = await fetch("/api/token", {
      method: "POST",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await response.json();
    return data.token;
  };
  const chatClient = useCreateChatClient({
    apiKey:STREAM_API_KEY,
    userData:{
      id:user?.id,
      name :user.fullName??user.username??user.emailAddresses[0].emailAddress.split("@")[0],
      image:user.imageUrl
    },
    tokenOrProvider:tokenProvider
  })
  if(!chatClient) return <FullScreenLoader message="Loading...."/>
  return (
    <OverlayProvider value={{style: studyBuddyTheme}}>
      <Chat client={chatClient} style={studyBuddyTheme}>
        {children}
      </Chat>
    </OverlayProvider>
  )
};

import React, { useEffect, useRef } from "react";
import { FullScreenLoader } from "./FullScreenLoader";
import { studyBuddyTheme } from "@/lib/theme";

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <FullScreenLoader message="Loading Chat...." />;
  // if not signed-in directly render the auth screens :-
  if (!user) return <>{children}</>;
  return <ChatClient user={user}>{children}</ChatClient>;
};
export default ChatWrapper;
