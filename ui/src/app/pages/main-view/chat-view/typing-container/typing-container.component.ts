import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';
import { ChatMessageToCreate } from 'src/app/core/services/models/chat-message.model';
import { Room } from 'src/app/core/services/models/room.model';
import { User, UserToCreate } from 'src/app/core/services/models/user-info.model';

@Component({
  selector: 'typing-container',
  templateUrl: './typing-container.component.html',
  styleUrls: ['./typing-container.component.scss']
})
export class TypingContainerComponent implements OnDestroy {
  private subscription: Subject<any> = new Subject<any>();
  public messageText: string = '';

  constructor(public chatMessageDataService: ChatMessagesDataService, 
              public roomDataService: RoomDataService) {
  }

  public sendChatMessage(): void {
    this.roomDataService.selectedRoom$.pipe(
      take(1),
      filter((room: any) => !!room),
      map((room: Room) => {
        const fromUser: User  = room.users[0]; //  TODO fix this function //conversation.fromUser;
        const toUsers: Array<User> = [];// conversation.toUsers;
        const text: string = this.messageText;
        const roomId: string  =  room.roomId;
        return {fromUser, toUsers, text, roomId};
      }),
      switchMap((chatMessageToCreate: ChatMessageToCreate) => this.chatMessageDataService.addChatMessage(chatMessageToCreate)),
      takeUntil(this.subscription),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
