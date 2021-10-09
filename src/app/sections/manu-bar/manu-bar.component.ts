import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-manu-bar',
	templateUrl: './manu-bar.component.html',
	styleUrls: ['./manu-bar.component.scss'],
})
export class ManuBarComponent implements OnInit {
	items: MenuItem[] = [];
	constructor() {}

	ngOnInit(): void {
		this.items = [
			{
				label: 'Home',
				icon: 'pi pi-fw pi-pencil',
				routerLink: '/'
				// items: [
				// 	{ label: 'Delete', icon: 'pi pi-fw pi-trash' },
				// 	{ label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
				// ],
			},
			{
				label: 'Login',
				routerLink: 'login'
				// items: [
				// 	// {
				// 	// 	label: 'New',
				// 	// 	icon: 'pi pi-fw pi-plus',
				// 	// 	items: [{ label: 'Project' }, { label: 'Other' }],
				// 	// },
				// 	// { label: 'Reservas', routerLink: 'reservas' },
				// 	// { label: 'Reservar Ahora', routerLink: 'reserve-now' },
				// ],
			},
			
			
		];
	}
}
