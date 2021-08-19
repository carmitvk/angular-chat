import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../services/api/auth.service';
import { UserDataService } from '../../services/data/user-data.service';
import { User } from '../../services/models/user-info.model';

@Component({
  selector: 'chat-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userId?: string;
  public isFullScreen: boolean = false;
  @Output() fullScreenMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public userDataService: UserDataService,
              public authService: AuthService) {
    this.userDataService.user$.pipe(
      take(1),
      tap((user: User | undefined) => this.userId = user?.id),
    ).subscribe();
  }

  ngOnInit(): void {
  }

  public fullScreenClicked() : void {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreenMode.emit(this.isFullScreen);
  }

  public logout(): void{
    this.authService.logout(this.userId).subscribe();
  }
  

}
