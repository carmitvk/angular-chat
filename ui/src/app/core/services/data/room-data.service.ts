import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, find, first, map, take, tap } from 'rxjs/operators';
import { RoomService } from '../api/room.service';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomDataService {
  public roomList$: Observable<Array<Room>>;
  private _roomList = new BehaviorSubject<Array<Room>>([]);

  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  public selectedRoom$: Observable<Room|undefined>;
  private _selectedRoom = new BehaviorSubject<Room|undefined>(undefined);

  constructor(private roomService: RoomService) {
    this.roomList$ = this._roomList.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.selectedRoom$ = this._selectedRoom.asObservable();
  }

  public updateData(): void { //loadRooms
    this._isLoading.next(true);
    this.roomService.getRooms().pipe( //take from server???
      tap(values => this._roomList.next(values)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }

  public setSelectedRoom(roomId: string): void {
    this._isLoading.next(true);

    this._roomList.pipe(
      map((roomList: Array<Room>) => roomList.find((room:Room) => {
        return room.roomId === roomId;
      })),
      tap((room: Room | undefined) => this._selectedRoom.next(room)),
      take(1),
      finalize(() => this._isLoading.next(false))
    ).subscribe();
  }
}
