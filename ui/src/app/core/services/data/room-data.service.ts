import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RoomService } from '../api/room.service';
import { Room } from '../models/room.model';
import { User } from '../models/user-info.model';
import { SocketService } from '../socket/socket.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class RoomDataService implements OnDestroy {
  public roomList$: Observable<Array<Room>>;
  private _roomList = new BehaviorSubject<Array<Room>>([]);

  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  private _usersInRoom = new BehaviorSubject<Array<User>>([]);
  public usersInRoom$: Observable<Array<User>>;

  private _typersInRoom = new BehaviorSubject<Array<User>>([]);
  public typersInRoom$: Observable<Array<User>>;

  public selectedRoom$: Observable<Room | undefined>;
  private _selectedRoom = new BehaviorSubject<Room | undefined>(undefined);

  private subscription: Subject<any> = new Subject<any>();

  constructor(private roomService: RoomService, public socketService: SocketService,
    public userDataService: UserDataService) {
    this.roomList$ = this._roomList.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.selectedRoom$ = this._selectedRoom.asObservable();
    this.usersInRoom$ = this._usersInRoom.asObservable();
    this.typersInRoom$ = this._typersInRoom.asObservable();
    this.initListeners();
  }

  private initListeners() {
    this.socketService.getUsers().pipe(
      tap((users) => this._usersInRoom.next(users)),
      tap((typers) => console.log('users in room are: ', typers)),
      takeUntil(this.subscription),
    ).subscribe();

    this.socketService.getTypingUser().pipe(
     
      tap((typer: User) => {
        let typers = this._typersInRoom.value.filter((user: User) => user.id !== typer.id);
        this._typersInRoom.next([...typers, typer]);
      }),
      tap((typer: User) => setTimeout(() => {
        let typers = this._typersInRoom.value.filter((user: User) => user.id !== typer.id);
        this._typersInRoom.next([...typers]);
      }, 3000)),
      tap((typer) => console.log('typer is: ', typer)),
      takeUntil(this.subscription),
    ).subscribe();
  }

  public updateData(): void { //loadRooms
    this._isLoading.next(true);
    this.roomService.getRooms().pipe(
      tap(values => this._roomList.next(values)),
      tap((rooms) => this.setSelectedRoom(rooms[0].roomId)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }

  public setSelectedRoom(roomId: string): void {
    if (this._selectedRoom.value?.roomId === roomId) {
      return;
    }
    this._isLoading.next(true);

    this._roomList.pipe(
      map((roomList: Array<Room>) => roomList.find((room: Room) => {
        return room.roomId === roomId;
      })),
      tap((room: Room | undefined) => this._selectedRoom.next(room)),
      withLatestFrom(this.userDataService.user$),
      tap(([room, userItem]) => this.socketService.joinRoom({ roomId: roomId, user: userItem })),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }

  ngOnDestroy(): void {
    console.log('room data service destroy');
    this.subscription.next();
    this.subscription.complete();
    this.socketService.disconnect();
  }

}
