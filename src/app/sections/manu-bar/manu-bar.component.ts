import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { ComunicateComponentsService } from '../../comunicate-components.service';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-manu-bar',
    templateUrl: './manu-bar.component.html',
    styleUrls: ['./manu-bar.component.scss']
})
export class ManuBarComponent {
    // items: MenuItem[] = [];

    userCurrent: any = '';

    userExiste: boolean = false;
    constructor(
        private _router: Router,
        private _comunication: ComunicateComponentsService,
        private _service: ServiceService
    ) {
        this._comunication.onChangeUser().subscribe((resp: any) => {
            this.userCurrent = '';

            this.getUser(resp.nombreUsuario);
            console.log(resp);
        });
    }

    ngOnInit() {
        let token = localStorage.getItem('token');
        let user: any = localStorage.getItem('user');

        if (token !== null) {
            // this.userExiste = true;

            this.getUser(JSON.parse(user).nombreUsuario);
        }
    }

    getUser(user: string) {
        this.userExiste = true;
        setTimeout(() => {
            this._service.getUsuarioById(user).subscribe((resp: any) => {
                console.log(resp);
                localStorage.setItem('userCurrent', JSON.stringify(resp));

                this.userCurrent = resp.nombre + ' ' + resp.apellidos;
            });
        }, 0);
    }

    ngAfterViewInit(): void {
        console.log(this.userCurrent);
    }
    navigate(path: string) {
        this._router.navigate([path]);
    }
    cerrarSesion(value: string) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userExiste = false;

        this._router.navigate([value]);
    }
}
