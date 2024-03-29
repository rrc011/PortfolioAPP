import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceComponent} from './service.component';
import {RouterModule} from '@angular/router';
import {ManageServiceComponent} from './manage-service/manage-service.component';
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
			{path: '', component: ServiceComponent},
			{
				path: 'management-service',
				component: ManageServiceComponent,
			},
		]),
	],
	declarations: [ServiceComponent, ManageServiceComponent],
})
export class ServiceModule {}
