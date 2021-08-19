import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iif, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap} from 'rxjs/operators';
import { InterceptorSkipHeader } from './http-error.header';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hasSkipHeader = request.headers.has(InterceptorSkipHeader);
    let interceptedRequest = request;

    if (hasSkipHeader) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      interceptedRequest = request.clone({ headers });
    }

    return next.handle(interceptedRequest)
      .pipe(
        catchError((response: HttpErrorResponse) =>
          of(this.getErrorMessage(response))
            .pipe(
              switchMap((errorMessage: string) => iif(
                () => hasSkipHeader,
                of(errorMessage),
                of(errorMessage).pipe(tap(() => this.snackBar.open(errorMessage, 'OK'))),
              )),
              switchMap(() => throwError(response)),
            ),
        ),
      );
    }
    
    private getErrorMessage(response: HttpErrorResponse): string {
      let error = response.error;
      error = typeof error === 'object' ? error: JSON.parse(error);
      const status = error.status ?  `(status: ${error.status})` : '';
      let errMsg = error?.error?.msg  || error.error || error.message || error;
      return 'Internal Server Error:' + status  + JSON.stringify(errMsg, null, 2);
    }
}
