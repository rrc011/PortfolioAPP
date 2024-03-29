import {Component, OnInit} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Skill} from 'src/app/core/models/skill';
import {AlertService} from 'src/app/core/services/alert.service';
import {AuthenticationService} from 'src/app/core/services/authentication.service';
import {SkillService} from 'src/app/core/services/skill.service';

@Component({
	selector: 'app-manage-skills',
	templateUrl: './manage-skills.component.html',
	styleUrls: ['./manage-skills.component.scss'],
})
export class ManageSkillsComponent implements OnInit {
	isVisible = false;
	formatterPercent = (value: number) => `${value} %`;
	parserPercent = (value: string) => value.replace(' %', '');
	model: Skill = new Skill();
	lst: Skill[] = [];
	pageIndex: number = 1;
	pageSize: number = 10;
	totalItems: number;

	constructor(
		private _skillService: SkillService,
		private _alertService: AlertService,
		private _authService: AuthenticationService
	) {
		this.model.percent = 0;
	}

	ngOnInit() {
		this.init(undefined);
	}

	init(e: NzTableQueryParams) {
		if (e) {
			this.pageSize = e.pageSize;
			this.pageIndex = e.pageIndex;
		}
		this._skillService.getAll(this.pageIndex, this.pageSize).then((r) => {
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
			this._skillService.create(this.model).then(() => {
				this._alertService.success('Skill creado').then(() => {
					this.isVisible = false;
					this.init(undefined);
				});
			});
		}, 'Estas seguro de guardar este registro');
	}

	update() {
		this._alertService.question(() => {
			this.model.userId = this._authService.currentUserValue.id;
			this._skillService.update(this.model._id, this.model).then(() => {
				this._alertService.success('Skill actualizado').then(() => {
					this.isVisible = false;
					this.init(undefined);
				});
			});
		}, 'Estas seguro de editar este registro');
	}

	delete(id: string) {
		this._alertService.question(() => {
			this._skillService.hardDelete(id).then(() => {
				this._alertService.success('Registro elminado').then(() => {
					this.isVisible = false;
					this.init(undefined);
				});
			});
		}, 'Estas seguro de eliminar este registro');
	}

	showModal(editModel: Skill): void {
		if (editModel) this.model = editModel;
		this.isVisible = true;
	}

	handleCancel(): void {
		this.isVisible = false;
		this.model = new Skill();
		this.model.percent = 0;
	}
}
