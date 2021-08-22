import { Component, OnInit } from '@angular/core';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';
import { User } from 'src/app/core/services/models/user-info.model';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(public roomDataService: RoomDataService) { }

  ngOnInit(): void {
    // this.roomDataService.usersInRoom$.pipe().subscribe();

    // this.roomDataService.typersInRoom$.pipe().subscribe();
  }

  public identify(index: number, item: User): string{
    return item.id; 
  }

}
