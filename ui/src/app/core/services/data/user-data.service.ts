import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public user$: Observable<User|null>;

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor() {
    this.user$ = this.user.asObservable();
  }

  public setUserData(value: User | null): void {
    this.user.next(value);
  }
  
}
