
import { ChatMessage } from "./chat-message.model";
import { User } from "./user-info.model";

export interface History {
  historyId: string;
  user: User|undefined;
  messages: Array<ChatMessage>;
  roomId: string|undefined;
  savedAt: number;
}