import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {RouterModule} from '@angular/router';
import {ManagePortfolioComponent} from './manage-portfolio/manage-portfolio.component';
import {FormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzUploadModule} from 'ng-zorro-antd/upload';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NzModalModule,
		NzFormModule,
		NzInputModule,
		NzButtonModule,
		NzTableModule,
		NzUploadModule,
		RouterModule.forChild([
			{path: '', component: PortfolioComponent},
			{path: 'management-portfolio', component: ManagePortfolioComponent},
		]),
	],
	declarations: [PortfolioComponent, ManagePortfolioComponent],
})
export class PortfolioModule {}
