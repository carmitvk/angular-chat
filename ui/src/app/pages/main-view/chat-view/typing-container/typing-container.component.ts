import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';
import { UserDataService } from 'src/app/core/services/data/user-data.service';
import { ChatMessage } from 'src/app/core/services/models/chat-message.model';
import { Room } from 'src/app/core/services/models/room.model';
import { User } from 'src/app/core/services/models/user-info.model';

@Component({
  selector: 'typing-container',
  templateUrl: './typing-container.component.html',
  styleUrls: ['./typing-container.component.scss']
})
export class TypingContainerComponent implements OnDestroy {
  private subscription: Subject<any> = new Subject<any>();
  public messageText: string = '';
  private user: User | undefined;

  constructor(public chatMessageDataService: ChatMessagesDataService, 
              public roomDataService: RoomDataService,
              public userDataService: UserDataService) {
    this.userDataService.user$.pipe(
      tap((user: User | undefined) => this.user = user)
    ).subscribe()
  }

  public sendChatMessage(): void {
    this.roomDataService.selectedRoom$.pipe(
      take(1),
      filter((room: any) => !!room),
      map((room) => {
        const chatMessageId: string =  Date.now().toString(); 
        const fromUser: User | undefined  = this.user ; 
        const createdAt: number = Date.now();
        const text: string = this.messageText;
        const roomId: string  =  room.roomId;
        return {chatMessageId, fromUser, createdAt, text, roomId};
      }),
      tap((chatMessage: ChatMessage) => this.chatMessageDataService.addChatMessage(chatMessage)),
      tap(() => this.messageText = ''),
      takeUntil(this.subscription),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
