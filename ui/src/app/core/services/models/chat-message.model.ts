import { User } from "./user-info.model";

export interface ChatMessage extends ChatMessageToCreate{
  chatMessageId: string;
  receivedTimestamp: string;
}

export interface ChatMessageToCreate{
  fromUser: User;
  toUsers: Array<User>;
  text: string;
  roomId: string;
}

