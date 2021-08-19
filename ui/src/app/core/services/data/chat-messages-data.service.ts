import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable} from 'rxjs';
import { concatMap, finalize, map, take, tap } from 'rxjs/operators';
import { ChatMessageService } from '../api/chat-messages.service';
import { ChatMessage, ChatMessageToCreate } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesDataService {
  public data$: Observable<Array<ChatMessage>>;
  private _data = new BehaviorSubject<Array<ChatMessage>>([]);

  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;


  constructor(private chatMessageService: ChatMessageService) {
    this.data$ = this._data.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  public updateData(roomId: string): void {
    this._isLoading.next(true);
    this.chatMessageService.getChatMessages(roomId).pipe(
      tap(values => this._data.next(values)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }

  public addChatMessage(chatMessageToCreate: ChatMessageToCreate): Observable<{chatMessage: ChatMessage}> {
    this._isLoading.next(true);
    const tempId = Date.now().toString();
    const candidateMessage : ChatMessage = {...chatMessageToCreate, chatMessageId: tempId, receivedTimestamp: tempId};
    this._data.next([...this._data.value, candidateMessage])
    return this.chatMessageService.addChatMessage(chatMessageToCreate).pipe(
      tap(({chatMessage}) => {
        const dataWithoutCandidate = this._data.value.filter((item: ChatMessage) => {
          return item.chatMessageId !== tempId;
        })
        this._data.next([...dataWithoutCandidate, chatMessage]);
      }),
      finalize(() => this._isLoading.next(false))
    )
  }
 
}
