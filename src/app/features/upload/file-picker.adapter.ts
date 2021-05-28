import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {FilePickerAdapter, FilePreviewModel} from 'ngx-awesome-uploader';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {endpoints} from 'src/app/core/constants/endpoints.constants';
import {AuthenticationService} from 'src/app/core/services/authentication.service';
import {environment} from 'src/environments/environment';

export class CustomFilePickerAdapter extends FilePickerAdapter {
	constructor(private http: HttpClient, private _authService: AuthenticationService) {
		super();
	}

	uploadFile(fileItem: FilePreviewModel): Observable<any> {
		const form = new FormData();
		form.append('file', fileItem.file);

		let headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		let options = {headers: headers, reportProgress: true};

		const api = `${environment.apiUrl}${endpoints.personal_information}/upload/${this._authService.currentUserValue.id}`;
		const req = new HttpRequest('POST', api, form, options);
		return this.http.request(req).pipe(
			map((res: HttpEvent<any>) => {
				if (res.type === HttpEventType.Response) {
					return res.body.id.toString();
				} else if (res.type === HttpEventType.UploadProgress) {
					// Compute and show the % done:
					const UploadProgress = +Math.round((100 * res.loaded) / res.total);
					return UploadProgress;
				}
			})
		);
	}
	removeFile(fileItem: FilePreviewModel): Observable<any> {
		throw new Error('Method not implemented.');
	}
}
