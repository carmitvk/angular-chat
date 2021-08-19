import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { UserDataService } from 'src/app/core/services/data/user-data.service';
import { User } from 'src/app/core/services/models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
  constructor(private userDataService: UserDataService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userDataService.user$
      .pipe(
        map((user: User | null) => !user),
        tap((value: boolean) => {
          if (!value) {
            this.router.navigate(['']);
          }
        }),
      );
  }
}
