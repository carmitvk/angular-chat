import { Component, OnInit } from '@angular/core';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';
import { Room } from 'src/app/core/services/models/room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(public roomDataService: RoomDataService) { }

  ngOnInit(): void {
  }

  public roomSelected(roomId: string){
    this.roomDataService.setSelectedRoom(roomId);
  }

  public identify(index: number, room: Room): string{
    return room.roomId; 
  }

}
