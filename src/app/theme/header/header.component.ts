import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/core/models/user';
import {AuthenticationService} from 'src/app/core/services/authentication.service';

interface IMenu {
	name: string;
	url: string;
	submenus?: IMenu[];
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	menus: IMenu[] = [];
	user: User = new User();
	constructor(private router: Router, private authService: AuthenticationService) {}

	ngOnInit() {
		this.init();
	}

	init() {
		this.user = this.authService.currentUserValue;
		this.menus = [
			{
				name: 'Home',
				url: '/',
			},
			{
				name: 'About',
				url: '/about',
			},
			{
				name: 'Skills',
				url: '/skills',
			},
			{
				name: 'Services',
				url: '/services',
			},
			{
				name: 'Portfolio',
				url: '/portfolio',
			},
			{
				name: 'Contact',
				url: '/contact',
			},
		];
		if (this.user) {
			this.menus.push({
				name: 'Admin',
				url: '#',
				submenus: [
					{
						name: 'Personal Information',
						url: '/personal-information',
					},
					{
						name: 'Upload CV',
						url: '/upload',
					},
					{
						name: 'Management Skills',
						url: 'skills/manageSkills',
					},
					{
						name: 'Management Social Media',
						url: 'social-media/management-social-media',
					},
					{
						name: 'Management Services',
						url: 'services/management-service',
					},
					{
						name: 'Management Portfolio',
						url: 'portfolio/management-portfolio',
					},
				],
			});
		}
	}

	goToLogin() {
		this.router.navigateByUrl('auth', {state: {showHeader: false, showFooter: false}});
	}

	logout() {
		this.authService.logout();
		this.user = new User();
		this.init();
	}
}
