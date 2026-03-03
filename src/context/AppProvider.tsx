// This file is the global file which will be used to define in the channels, chats and more now we need to pass this to the root layout.
import React, { useState, createContext } from "react";
import { Channel, LocalMessage } from "stream-chat";
type AppContextType = {
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
  thread: LocalMessage | null;
  setThread: (localmessage: LocalMessage | null) => void;
};
export const AppContext = React.createContext<AppContextType>({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<LocalMessage|null>(null);

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
