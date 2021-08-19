import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public user$: Observable<User|undefined>;

  private _user: BehaviorSubject<User|undefined> = new BehaviorSubject<User|undefined>(undefined);

  constructor() {
    this.user$ = this._user.asObservable();
  }

  public setUserData(value: User | undefined): void {
    this._user.next(value);
  }
  
}
