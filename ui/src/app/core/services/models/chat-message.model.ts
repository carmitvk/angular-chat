import { User } from "./user-info.model";

export interface ChatMessage{
  chatMessageId: string;
  fromUser?: User;
  createdAt: number;
  text: string;
  roomId: string;
}
