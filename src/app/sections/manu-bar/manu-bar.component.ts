import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { ComunicateComponentsService } from '../../comunicate-components.service';

@Component({
	selector: 'app-manu-bar',
	templateUrl: './manu-bar.component.html',
	styleUrls: ['./manu-bar.component.scss'],
})
export class ManuBarComponent implements OnInit {
	items: MenuItem[] = [];

	userCurrent: string = '';

	constructor(private _comunication: ComunicateComponentsService) {}

	ngOnInit(): void {
		this.items = [
			{
				label: 'Home',
				icon: 'pi pi-fw pi-pencil',
				routerLink: '/',
			},
			{
				label: 'Login',
				routerLink: 'login',
			},
		];

		this._comunication.onChangeUser().subscribe((user : any) => {
			
			
			this.userCurrent = user[0].nombre + ' ' + user[0].apellido;
			// console.log(this.userCurrent);
			this.items = [
				{
					label: 'Home',
					icon: 'pi pi-fw pi-pencil',
					routerLink: '/',
					// items: [
					// 	{ label: 'Delete', icon: 'pi pi-fw pi-trash' },
					// 	{ label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
					// ],
				},
				{
					label: 'Log out',
					routerLink: '/',
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
				{
					label: 'Bienvenido ' + this.userCurrent,
					routerLink: '',
					items: [
						{
							label: 'Mis citas',
							icon: '',
							routerLink: 'reservas',
							// items: [{ label: 'Project' }, { label: 'Other' }],
						},
						{ label: 'Editar Perfil', routerLink: '' },
						{ label: 'Salir', routerLink: '' },
					],
				},
			];
		});
	}
}
