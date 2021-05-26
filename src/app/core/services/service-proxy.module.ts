import {NgModule} from '@angular/core';
import {environment} from 'src/environments/environment';
import * as ApiServiceProxies from './service-proxies';
import {API_BASE_URL} from './service-proxies';

@NgModule({
	providers: [
		ApiServiceProxies.PortfolioControllerServiceProxy,
		{provide: API_BASE_URL, useValue: environment.baseApiUrl},
	],
})
export class ServiceProxyModule {}
