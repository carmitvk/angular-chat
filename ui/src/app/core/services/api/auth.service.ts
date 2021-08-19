import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject,  Observable, Subject } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { UserDataService } from '../data/user-data.service';
// import { AuthState, DEFAULT_AUTH_STATE } from '../models/auth-state.model';
import { User } from '../models/user-info.model';

const LOCAL_STORAGE_USER_KEY: string = 'chat-app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  
  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  private subscription: Subject<any> = new Subject<any>();
  
  constructor(private http: HttpClient,
    private userDataService: UserDataService,
              private router: Router) {
    this.isLoading$ = this._isLoading.asObservable();
  }

  public getUserFromLocalStorage() : User | undefined{
    //check if exist in the localStorage
    let user: string | null= localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return user? JSON.parse(user) : null;

  }

  public login(user: User): Observable<User> {
    console.log('inside signIn', JSON.stringify(user));
    this._isLoading.next(true);
    let headers: HttpHeaders = new HttpHeaders({'X-Skip-Interceptor': 'true'});
    return this.http.post<User>(`auth/login`, user, {headers}).pipe(
      take(1),
      tap((user: User) => localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))),
      tap((res: User) => {
        this.userDataService.setUserData(res);
        this.router.navigate(['']); // TODO nevigate to the page that redirect to auth
      }),
      finalize(() => this._isLoading.next(false))
    );
  }

  public signup(user: User): Observable<User> {
    console.log('inside signup', JSON.stringify(user));
    this._isLoading.next(true);
    return this.http.post<User>(`auth/signup`, user).pipe(
      take(1),
      tap((user: User) => localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))),
      tap((res: User) => {
        this.userDataService.setUserData(res);
        this.router.navigate(['']); // TODO nevigate to the page that redirect to auth
      }),
      finalize(() => this._isLoading.next(false))
    );
  }

  public logout(userId?: string): Observable<User>  {
    console.log('inside logout', userId);
    this._isLoading.next(true);
    return this.http.post<User>(`auth/logout`, {userId}).pipe(
      take(1),
      tap(() => localStorage.removeItem(LOCAL_STORAGE_USER_KEY)),
      tap(() => this.userDataService.setUserData(undefined)),
      tap(() => this.router.navigate(['auth'])),
      finalize(() => this._isLoading.next(false))
    );
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}

function user<T>(arg0: string, user: any) {
  throw new Error('Function not implemented.');
}

