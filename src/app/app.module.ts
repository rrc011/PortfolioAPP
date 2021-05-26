import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ThemeModule} from './theme/theme.module';
import {HomeModule} from './features/home/home.module';
import {AboutModule} from './features/about/about.module';
import {ServiceModule} from './features/service/service.module';
import {PortfolioModule} from './features/portfolio/portfolio.module';
import {AuthModule} from './auth/auth.module';
import {BasicAuthInterceptor} from './helpers/basic-auth.interceptor';
import {PersonalInformationModule} from './features/personal-information/personal-information.module';
import {UploadModule} from './features/upload/upload.module';
import {ContactModule} from './features/contact/contact.module';
import {SocialMediaModule} from './features/social-media/social-media.module';
import {ServiceProxyModule} from './core/services/service-proxy.module';

registerLocaleData(en);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot([]),
		HttpClientModule,
		NgHttpLoaderModule.forRoot(),
		AppRoutingModule,
		ThemeModule,
		HomeModule,
		AboutModule,
		ServiceModule,
		PortfolioModule,
		AuthModule,
		PersonalInformationModule,
		UploadModule,
		FormsModule,
		BrowserAnimationsModule,
		ContactModule,
		SocialMediaModule,
		ServiceProxyModule,
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
		{provide: NZ_I18N, useValue: en_US},
		// { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
