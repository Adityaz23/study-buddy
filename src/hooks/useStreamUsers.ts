import type { StreamChat, UserResponse } from "stream-chat";

import { useEffect, useState } from "react";

const useStreamUsers = (client: StreamChat, userId: string) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // do not fetch myself and the admin :-
        const response = await client.queryUsers(
          { id: { $nin: [userId] }, role: { $nin: ["admin"] } } as any,
          { last_active: -1 },
          { limit: 50 },
        );
        setUsers(response.users);
      } catch (error) {
        console.log("Failed to fetch the users: ", error);
        // TODO => To add the sentry errors and capture the exception.
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUsers();
  }, [client, userId]);

  return { users, loading };
};

export default useStreamUsers;
