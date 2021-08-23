import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { HistoryDataService } from 'src/app/core/services/data/history-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent {


  constructor(public roomDataService: RoomDataService,
              public historyDataService:HistoryDataService,
    public chatMessagesDataService: ChatMessagesDataService) { }

  public saveChatToHistory(): void {
    this.historyDataService.saveChatToHistory();
  }

}
