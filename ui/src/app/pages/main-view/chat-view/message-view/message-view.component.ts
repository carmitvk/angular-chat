import { Component, Input, OnInit } from '@angular/core';
import { ChatMessagesDataService } from 'src/app/core/services/data/chat-messages-data.service';
import { ChatMessage } from 'src/app/core/services/models/chat-message.model';

@Component({
  selector: 'message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {
  @Input() data: ChatMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
