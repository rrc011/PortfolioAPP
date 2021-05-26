import {Component, OnInit} from '@angular/core';
import {PortfolioDto} from 'src/app/core/models/portfolio';
import {PortfolioService} from 'src/app/core/services/portfolio.service';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
	lst: PortfolioDto[] = [];

	constructor(private _portfolioService: PortfolioService) {}

	ngOnInit() {
		this.init();
	}

	init() {
		this._portfolioService.getDefaultService().then((r: PortfolioDto[]) => {
			this.lst = r;
			console.log(r);
		});
	}
}
