import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { ChatMessageService } from '../api/chat-messages.service';
import { ChatMessage } from '../models/chat-message.model';
import { SocketService } from '../socket/socket.service';
import { RoomDataService } from './room-data.service';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesDataService implements OnDestroy{
  
  public messages$: Observable<Array<ChatMessage>>;
  private _messages = new BehaviorSubject<Array<ChatMessage>>([]);

  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  private subscription: Subject<any> = new Subject<any>();

  constructor(private chatMessageService: ChatMessageService,
              public socketService: SocketService,
              public roomDataService: RoomDataService) {
    this.messages$ = this._messages.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.initSocketListener();
    this.roomDataService.selectedRoom$.pipe(
      tap(() => this._messages.next([])),
    ).subscribe();
  }

  private initSocketListener() {
    this.socketService.getMessage().pipe(
      tap((newMessage: ChatMessage) => console.log('addChatMessage', newMessage)),
      tap((newMessage: ChatMessage) => this._messages.next([...this._messages.value, newMessage])),
      takeUntil(this.subscription),
    ).subscribe();
  }

  public updateData(roomId: string): void {
    this._isLoading.next(true);
    this.chatMessageService.getChatMessages(roomId).pipe(
      tap(values => this._messages.next(values)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }

  public addChatMessage(chatMessage: ChatMessage): void {
    // this._isLoading.next(true);
    // const messageId = Date.now().toString();
    // const newMessage : ChatMessage = {...chatMessage, chatMessageId: messageId: messageId};
    // this._messages.next([...this._messages.value, newMessage]);
    console.log('addChatMessage');
    this.socketService.sendMessage(chatMessage);
    // this._isLoading.next(false);
  }
 
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
