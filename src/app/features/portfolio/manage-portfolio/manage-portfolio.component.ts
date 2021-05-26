import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzTableQueryParams, NzUploadFile} from 'ng-zorro-antd';
import {PortfolioDto} from 'src/app/core/models/portfolio';
import {PortfolioService} from 'src/app/core/services/portfolio.service';
import {getBase64, dataURLtoFile} from '@helpers/utils';
import {AlertService} from 'src/app/core/services/alert.service';
import {AuthenticationService} from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-manage-portfolio',
	templateUrl: './manage-portfolio.component.html',
	styleUrls: ['./manage-portfolio.component.scss'],
})
export class ManagePortfolioComponent implements OnInit {
	fileList: NzUploadFile[] = [];
	isVisible = false;
	model: PortfolioDto = new PortfolioDto();
	lst: PortfolioDto[] = [];
	pageIndex: number = 1;
	pageSize: number = 10;
	totalItems: number;

	constructor(
		private _portfolioService: PortfolioService,
		private _alertService: AlertService,
		private _authService: AuthenticationService
	) {}

	ngOnInit() {
		this.init(undefined);
	}

	init(e: NzTableQueryParams) {
		if (e) {
			this.pageSize = e.pageSize;
			this.pageIndex = e.pageIndex;
		}
		this._portfolioService.getAll(this.pageIndex, this.pageSize).then((r: any) => {
			console.log(r);
			this.lst = r['Items'];
			this.totalItems = r['TotalCount'];
		});
	}

	submitForm() {
		if (this.model._id) this.update();
		else this.create();
	}

	create() {
		this._alertService.question(() => {
			this.model.userId = this._authService.currentUserValue.id;
			this.fileList.forEach((file: NzUploadFile) => {
				getBase64(file).then((r: string) => {
					this.model.img = r;
					this._portfolioService.create(this.model).then(() => {
						this._alertService.success('Project created').then(() => {
							this.fileList = [];
							this.model = new PortfolioDto();
							this.isVisible = false;
							this.init(undefined);
						});
					});
				});
			});
		}, 'Estas seguro de guardar este registro');
	}

	update() {
		this._alertService.question(() => {
			this.model.userId = this._authService.currentUserValue.id;
			this.fileList.forEach((file: NzUploadFile) => {
				getBase64(file).then((r: string) => {
					this.model.img = r;
					this._portfolioService.update(this.model._id, this.model).then(() => {
						this._alertService.success('Project updated').then(() => {
							this.isVisible = false;
							this.init(undefined);
						});
					});
				});
			});
		}, 'Estas seguro de editar este registro');
	}

	delete(id: string) {
		this._alertService.question(() => {
			this._portfolioService.hardDelete(id).then(() => {
				this._alertService.success('Registro elminado').then(() => {
					this.isVisible = false;
					this.init(undefined);
				});
			});
		}, 'Estas seguro de eliminar este registro');
	}

	beforeUpload = (file: NzUploadFile): boolean => {
		this.fileList = [file];
		return false;
	};

	showModal(editModel: PortfolioDto): void {
		if (editModel) {
			this.model = editModel;
			let file = dataURLtoFile(this.model.img, 'image.png');
			this.fileList = [
				{
					uid: '1',
					name: file.name,
					filename: file.name,
					size: file.size,
					status: 'done',
					response: 'Server Error 500', // custom error message to show
					url: this.model.img,
				},
			];
		}
		this.isVisible = true;
	}

	handleCancel(): void {
		this.isVisible = false;
		this.model = new PortfolioDto();
		this.fileList = [];
	}
}
