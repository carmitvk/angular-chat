import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, tap, takeUntil } from 'rxjs/operators';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy{
  private subscription: Subject<void> = new Subject<void>();

  constructor(public roomDataService: RoomDataService,
    private activatedRoute: ActivatedRoute,
    private chatMessagesDataService: ChatMessagesDataService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData('');
    // this.activatedRoute.paramMap
    //   .pipe(
    //     map(params => (params.get('containerId') || '')),
    //     filter((containerId: string) => !!containerId),
    //     tap((containerId: string) => this.containerId = containerId ),
    //     tap((containerId: string) => this.loadData(containerId)),
    //     takeUntil(this.subscription),
    //   ).subscribe();
  }

  private loadData(containerId: string): void {
    this.roomDataService.updateData(); //loadRooms
    // const conversation = this.conversationDataService.selectConversation(containerId);
    // if(conversation && conversation.conversationsIds.length > 0){
    //   this.chatMessagesDataService.updateData(conversation.conversationsIds[conversation.conversationsIds.length - 1]);
    // }
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
