import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // debugger;
    let request: any;
    let currentUser: any;
    let isLoggedIn: boolean;

    this._authService.isLoggedIn.subscribe(res => {
      isLoggedIn = res;
      if (isLoggedIn) {
        this._authService.CurrentUser.subscribe(res => {
          currentUser = res;

          if (req.headers.has('isFile')) {
            request = req.clone({ headers: req.headers.delete('isFile') });
            request = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${currentUser.token}`
              }
            });
          } else {
            request = req.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
              }
            });
          }
        });
      } else {
        request = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
      }
    });

    return next.handle(request);
  }
}
