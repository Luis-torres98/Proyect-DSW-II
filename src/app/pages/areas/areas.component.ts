import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../ui.service';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/service.service';

@Component({
	selector: 'app-areas',
	templateUrl: './areas.component.html',
	styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
	showModal = false;
	showModalUpdate = false;
	areaCurrent: any;
	areas: any[] = [];

	subs = new Subscription();
	subsUpdate = new Subscription();

	formArea = new FormGroup({
		nombre: new FormControl('', Validators.required),
	});

	constructor(private uiService: UiService, private _areaSrv: ServiceService) {
		this.subs.add(this.uiService.getShowModal().subscribe(show => (this.showModal = show)));

		this.subsUpdate.add(this.uiService.getShowModalUpdate().subscribe(show => (this.showModalUpdate = show)));
		_areaSrv.getAreas().subscribe(resp => (this.areas = resp));
	}

	ngOnInit(): void {}

	saveArea() {
		// console.log(this.formArea);

		this._areaSrv.postArea(this.formArea.value).subscribe(resp => {
			this.areas.push(resp);
		});
		this.showModal = false;
	}
	editArea(area: any) {
		this.showModalUpdate = true;
		this.areaCurrent = area;
	}

	deleteArea(id: any) {
		this._areaSrv.deleteArea(id).subscribe(resp => {
			let elem: any = this.areas.find((e: any) => e.id_area === id);
			let index = this.areas.indexOf(elem);
			this.areas.splice(index, 1);
		});
	}

	showAddCategoryModal() {
		this.uiService.setShowModal(true);
	}
	actualizarAreas(event: any) {

		this.areas = event;
	}
}
