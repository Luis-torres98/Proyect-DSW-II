import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/ui.service';
import { ServiceService } from '../../service.service';

@Component({
	selector: 'app-personal',
	templateUrl: './personal.component.html',
	styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
	subs = new Subscription();
	subsUpdate = new Subscription();

	personal: any[] = [];

	showModal = false;

	showModalUpdate = false;

	areas: any[] = [];

	usuarios: any[] = [];

	date = new Date();

	personalCurrent: any;

	formPersonal = new FormGroup({
		categoria: new FormControl('', Validators.required),
		area: new FormControl('', Validators.required),
		usuario: new FormControl('', Validators.required),
	});

	constructor(private _personalSrv: ServiceService, private uiService: UiService) {
		this._personalSrv.getPersonal().subscribe(resp => {
			this.personal = resp;
		});
		this.subs.add(this.uiService.getShowModal().subscribe(show => (this.showModal = show)));

		this.subsUpdate.add(this.uiService.getShowModalUpdate().subscribe(show => (this.showModalUpdate = show)));

		this._personalSrv.getAreas().subscribe(resp => {
			this.areas = resp;
		});
		this._personalSrv.getUsuarios().subscribe(resp => {
			this.usuarios = resp;
		});
	}

	ngOnInit() {}

	showAddCategoryModal() {
		this.uiService.setShowModal(true);
	}	
	savePersonal() {
		this._personalSrv.postPersonal(this.formPersonal.value, this.date).subscribe(resp => {
			this.personal.push(resp);
		});

		this.showModal = false;
	}

	editCita(personal: any) {
		this.personalCurrent = personal;

		this.showModalUpdate = true;
	}
	deleteCita(id: string) {
		this._personalSrv.deletePersonal(id).subscribe(e => {
			let elem: any = this.personal.find((e: any) => e.id_personal === id);
			let index = this.personal.indexOf(elem);
			this.personal.splice(index, 1);
		});
	}

	actualizarCitas(event: any) {
		this.personal = event;
	}
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
