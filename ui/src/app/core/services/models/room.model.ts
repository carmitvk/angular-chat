import { ChatMessage } from "./chat-message.model";
import { User } from "./user-info.model";

export interface Room {
  roomId: string;
  roomName: string;
  users: Array<User>;
  messages?: ChatMessage[];
  typers: Array<User>;
}

