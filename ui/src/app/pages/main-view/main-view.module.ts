import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';
import { AngularSplitModule } from 'angular-split';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { TypingContainerComponent } from './chat-view/typing-container/typing-container.component';
import { MessagesContainerComponent } from './chat-view/messages-container/messages-container.component';
import { MessageViewComponent } from './chat-view/message-view/message-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatManagerComponent } from './chat-manager/chat-manager.component';
import { HistoryComponent } from './chat-manager/history/history.component';
import { RoomsComponent } from './chat-manager/rooms/rooms.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    MainViewComponent,
    ChatViewComponent,
    TypingContainerComponent,
    MessagesContainerComponent,
    MessageViewComponent,
    ChatManagerComponent,
    HistoryComponent,
    RoomsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    AngularSplitModule,
    SharedModule,
    NgbModule,
  ],
})
export class MainViewModule { }
