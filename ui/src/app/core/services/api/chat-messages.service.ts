import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatMessage} from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  constructor(private http: HttpClient) { }

  public getChatMessages(roomId: string): Observable<Array<ChatMessage>> {
    return this.http.get<Array<ChatMessage>>(`api/chat-message/${roomId}`);
  }

  public addChatMessage(chatMessage: ChatMessage): Observable<{chatMessage: ChatMessage}> {
    return this.http.post<{chatMessage: ChatMessage}>(`api/chat-message`, chatMessage);
  }
}
