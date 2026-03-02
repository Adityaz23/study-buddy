// this is for the storing the user call logs and user info :-

import { StreamChat } from "stream-chat";
import * as Sentry from "@sentry/react-native";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const SECRET_KEY = process.env.STREAM_SECRET_KEY!;

export async function POST(request: Request) {
  const client = StreamChat.getInstance(API_KEY, SECRET_KEY);
  const body = await request.json();
  const { userId, name, image } = body;

  if (!userId) {
    return Response.json({ error: "UserId is required!" }, { status: 400 });
  }
  try {
    await client.upsertUser({
      id: userId,
      name: name || "GUEST",
      image: image,
    });
    return Response.json({ success: true, userId });
  } catch (error) {
    console.log("Error syncing user to the stream: ", error);
    Sentry.captureException(error, {
      extra: { userId, name, image },
    });
    return Response.json({erro:"Failed to sync the user"},{status:500})
  }
}
