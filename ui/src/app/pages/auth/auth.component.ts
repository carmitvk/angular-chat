import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/api/auth.service';
import {User} from '../../core/services/models/user-info.model';
import {UserDataService} from '../../core/services/data/user-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent  implements OnInit {
  public addModelForm!: FormGroup;
  public hidePassword = true;
  public isSignUpMode = false;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private userDataService: UserDataService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.initialize()
  }

  ngOnInit(): void {
    console.log('init AuthComponent');
    this.addModelForm = this.formBuilder.group({
      userName: ['user1@gmail.com', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['111111', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
    });
  }

  public initialize() : void {
    //check if exist in the localStorage
    let user: User | null = this.authService.getUserFromLocalStorage();
    if(user){
      this.authService.login(user).subscribe();
    }

  }

  public setSignUpMode(): void {
    this.isSignUpMode = true;
    this.addModelForm.addControl('nickName', new FormControl('', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30)]));
  }

  public submit(): void {
    let res: Observable<any>;
    if (this.addModelForm.valid) {
      const user: User = this.addModelForm?.getRawValue();
      if(this.isSignUpMode) {
        res = this.authService.signup(user);
      } else { //login
        res = this.authService.login(user);
      }
      res.pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = error?.error?.msg  || error.error || error.message || error ;
          if(errMsg === 'Invalid userName'){
            this.addModelForm.controls['userName'].setErrors({'notExist': true});
          }
          else if(errMsg === 'Invalid password'){
            console.log('wrong pass');
            this.addModelForm.controls['password'].setErrors({'wrongPassword': true});
          }
          else if(errMsg === 'Username already exist'){
            this.addModelForm.controls['userName'].setErrors({'alreadyExist': true});
          }
          else {
            this.snackBar.open('Internal Server Error:' + JSON.stringify(errMsg, null, 2) , 'OK');
            console.log('errMsg', errMsg);
          }
          return EMPTY;
        }),
      ).subscribe();
    }else {
      console.log('form is not valid');

    }
  }
}
