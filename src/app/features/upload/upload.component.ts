import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FilePreviewModel} from 'ngx-awesome-uploader';
import {endpoints} from 'src/app/core/constants/endpoints.constants';
import {PersonalInformation} from 'src/app/core/models/personal-information';
import {AlertService} from 'src/app/core/services/alert.service';
import {AuthenticationService} from 'src/app/core/services/authentication.service';
import {PersonalInformationService} from 'src/app/core/services/personal-information.service';
import {environment} from 'src/environments/environment';
import {CustomFilePickerAdapter} from './file-picker.adapter';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
	file: FilePreviewModel;
	adapter: CustomFilePickerAdapter = new CustomFilePickerAdapter(this.http, this._authService);
	pdfSrc: any;
	model: PersonalInformation = new PersonalInformation();
	url: SafeUrl;

	constructor(
		private http: HttpClient,
		private _authService: AuthenticationService,
		public _alertService: AlertService,
		private _infoService: PersonalInformationService,
		private _sanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this.init();
	}

	onFileAdded(event: FilePreviewModel) {
		let reader = new FileReader();
		this.file = event;

		reader.onloadend = (e: any) => {
			this.pdfSrc = e.target.result;
		};

		reader.readAsArrayBuffer(this.file.file);
	}

	onFileRemoved() {
		this.file = undefined;
		this.pdfSrc = '';
	}

	uploadFile() {
		if (!this.file) {
			this._alertService.error('Debe agregar un documento');
			return;
		}
		const form = new FormData();
		form.append('file', this.file.file);

		let headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		let options = {headers: headers, reportProgress: true};

		const api = `${environment.apiUrl}${endpoints.personal_information}/upload/${this._authService.currentUserValue.id}`;
		const req = new HttpRequest('POST', api, form, options);
		return this.http
			.request(req)
			.toPromise()
			.then((r: HttpResponse<any>) => {
				if (r.status == 200) this._alertService.success('Subido exitosamente').then(() => window.location.reload());
			});
	}

	init() {
		this._infoService.getDefaultPersonalInformation().then((r: PersonalInformation) => {
			this.model = r;
			if (this.model.cvPath) {
				this.pdfSrc = this._base64ToArrayBuffer(this.model.cvPath);
			}
		});
	}

	_base64ToArrayBuffer(base64) {
		let binary_string = window.atob(base64);
		let len = binary_string.length;
		let bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}
}
