import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;


        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.access_token}`
                }
            });
        }else{
          request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        return next.handle(request);
    }
}
