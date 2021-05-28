import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Observer} from '../core/models/observer';
import {Responses} from '../core/models/responses';

export class BaseApiService<T> {
	genericError = '';
	constructor(public http: HttpClient) {
		this.genericError = `Some Error occcured, Please contact Administrator for the Errors`;
	}

	get<T>(url: string): Observable<T> {
		let response = this.http.get<Responses & T>(url);

		return Observable.create((observer: Observer) => {
			response.subscribe(
				(response) => {
					if (response.result.error) observer.error(response.result.error);
					else {
						observer.next(response.result.response);
					}
					observer.complete();
				},
				(error) => {
					observer.error([{title: error.name, detail: this.genericError, error}]);
				}
			);
		});
	}

	post(url: string, body: object): Observable<Responses[]> {
		let response = this.http.post<Responses>(url, body);

		return Observable.create((observer: Observer) => {
			response.subscribe(
				(res) => {
					if (res.result.error) observer.error(res.result.error);
					else observer.next(res.result);
					observer.complete();
				},
				(error) => {
					observer.error([{title: error.name, detail: this.genericError, error}]);
				}
			);
		});
	}

	put(url: string, body: object): Observable<Responses[]> {
		let response = this.http.put<Responses>(url, body);

		return Observable.create((observer: Observer) => {
			response.subscribe(
				(res) => {
					if (res.result.error) observer.error(res.result.error);
					else observer.next(res.result.response);
					observer.complete();
				},
				(error) => {
					observer.error([{title: error.name, detail: this.genericError, error}]);
				}
			);
		});
	}

	delete(url: string): Observable<Responses[]> {
		let response = this.http.delete<Responses>(url);

		return Observable.create((observer: Observer) => {
			response.subscribe(
				(res) => {
					if (res.result.error) observer.error(res.result.error);
					else observer.next(res.result);
					observer.complete();
				},
				(error) => {
					observer.error([{title: error.name, detail: this.genericError, error}]);
				}
			);
		});
	}
}
