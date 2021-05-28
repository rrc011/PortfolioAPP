import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../core/services/authentication.service';
import {catchError} from 'rxjs/operators';
import {AlertService} from '../core/services/alert.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService, private _alertService: AlertService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// add authorization header with basic auth credentials if available
		const currentToken = this.authenticationService.currentTokenValue;

		if (currentToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentToken}`,
				},
			});
		} else {
			request = request.clone({
				setHeaders: {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*',
				},
			});
		}

		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				const error = err.error.message || 'Ocurrio un error inesperado';
				if (err.url.includes('download-cv')) {
					return throwError(error);
				}

				switch (err.status) {
					case 401:
						debugger;
						this._alertService
							.error('Es necesario autenticar para obtener la respuesta solicitada.')
							.then(() => {
								debugger;
								this.authenticationService.logout();
							});
						break;

					case 400:
						this._alertService.error('El servidor no pudo interpretar la solicitud.');
						break;

					case 403:
						this._alertService.error('No tienes permiso para realizar esta accion.');
						break;

					case 404:
						this._alertService.error('Recurso no encontrado');
						break;

					default:
						this._alertService.error(error);
						break;
				}

				return throwError(error);
			})
		);
	}
}
