import {Component, OnInit} from '@angular/core';
import {PersonalInformation} from 'src/app/core/models/personal-information';
import {PersonalInformationService} from 'src/app/core/services/personal-information.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	model: PersonalInformation = new PersonalInformation();

	constructor(private _infoService: PersonalInformationService) {}

	ngOnInit() {
		this.init();
	}

	init() {
		this._infoService.getDefaultPersonalInformation().then((r: PersonalInformation) => {
			this.model = r;
		});
	}

	getCV() {
		const linkSource = `data:application/pdf;base64,${this.model.cvPath}`;
		const downloadLink = document.createElement('a');
		const fileName = 'CV.pdf';
		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
	}
}
