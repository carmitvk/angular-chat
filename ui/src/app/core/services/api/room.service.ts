import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room} from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) { }

  public getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(`api/room`);
  }

 

}
