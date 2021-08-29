import { Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { combineAll, finalize, map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RoomService } from '../api/room.service';
import { ChatMessage } from '../models/chat-message.model';
import { History } from '../models/history.model';
import { Room } from '../models/room.model';
import { User } from '../models/user-info.model';
import { SocketService } from '../socket/socket.service';
import { ChatMessagesDataService } from './chat-messages-data.service';
import { FireBaseService } from './firebase/firebase.service';
import { RoomDataService } from './room-data.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryDataService {
  public historyList$: Observable<Array<History>>;
  private _historyList = new BehaviorSubject<Array<History>>([]);

  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  public selectedHistory$: Observable<History | undefined>;
  private _selectedHistory = new BehaviorSubject<History | undefined>(undefined);


  constructor(public fireBaseService: FireBaseService, 
    public chatMessagesDataService: ChatMessagesDataService,
    public userDataService: UserDataService,
    public roomDataService: RoomDataService) {
    this.historyList$ = this._historyList.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.selectedHistory$ = this._selectedHistory.asObservable();
    // this.loadHistory();
  }

  loadHistory() {
    this.fireBaseService.loadHistory().pipe(
      tap((historyList: Array<History>) => this._historyList.next(historyList)),
    ).subscribe();

    // this.historyTable = firebase.database().ref('history');
    // this.historyTable.on('value', (snapshot) => {
    //   const historyMap = snapshot.val();
    //   console.log(historyMap);
    //   this._historyList.next(historyMap);
    // });
  }

  public setSelectedHistory(historyId: string): void {
    if (this._selectedHistory.value?.historyId === historyId) {
      return;
    }
    this._isLoading.next(true);

    this._historyList.pipe(
      map((historyList: Array<History>) => historyList.find((history: History) => {
        return history.historyId === historyId;
      })),
      tap((history: History | undefined) => this._selectedHistory.next(history)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();

  }

  public saveChatToHistory(){
    combineLatest([
      this.chatMessagesDataService.messages$,
      this.userDataService.user$,
      this.roomDataService.selectedRoom$]
    ).pipe(
      take(1),
      tap(([messages, user, room]) => this.fireBaseService.saveChatToHistoryTable(messages, user, room?.roomId)),
    ).subscribe();
  }
}
