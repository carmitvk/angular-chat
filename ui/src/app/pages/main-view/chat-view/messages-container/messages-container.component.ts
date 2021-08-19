import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';
import { ChatMessage } from 'src/app/core/services/models/chat-message.model';
import { MessageViewComponent } from '../message-view/message-view.component';

@Component({
  selector: 'messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subject<void> = new Subject<void>();
  @ViewChildren(MessageViewComponent, { read: ElementRef }) messages: QueryList<ElementRef<MessageViewComponent>>;


  constructor(public chatMessagesDataService: ChatMessagesDataService, 
              public roomDateService:RoomDataService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.chatMessagesDataService.messages$.pipe(
      filter((messages: Array<ChatMessage>) => messages.length > 1),
      tap((messages: Array<ChatMessage>) => {
        const element: ElementRef = this.messages.toArray()[messages.length];
        if (element) {
          element.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }),
      takeUntil(this.subscription),
    ).subscribe();
  }

  public identify(index: number, item: ChatMessage): string{
    return item.chatMessageId; 
  }
  
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
