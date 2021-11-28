import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../ui.service';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-areas',
    templateUrl: './areas.component.html',
    styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
    showModal = false;
    showModalUpdate = false;
    areaCurrent: any;
    areas: any[] = [];

    loanding = false;

    subs = new Subscription();
    subsUpdate = new Subscription();

    formArea = new FormGroup({
        nombre: new FormControl('', Validators.required)
    });

    constructor(
        private uiService: UiService,
        private _areaSrv: ServiceService,
        private _toastr: ToastrService
    ) {
        this.subs.add(
            this.uiService
                .getShowModal()
                .subscribe(show => (this.showModal = show))
        );

        this.subsUpdate.add(
            this.uiService
                .getShowModalUpdate()
                .subscribe(show => (this.showModalUpdate = show))
        );

        this.loanding = true;

        _areaSrv.getAreas().subscribe(resp => {
            this.areas = resp;
            this.loanding = false;
        });
    }

    saveArea() {
        this.loanding = true;

        this._areaSrv.postArea(this.formArea.value).subscribe(resp => {
            this.areas.push(resp);
            this.loanding = false;
            this._toastr.success('Se agregó area', 'Area registrada');
        });
        this.showModal = false;
    }
    editArea(area: any) {
        this.showModalUpdate = true;
        this.areaCurrent = area;
        // this.showModalUpdate = false;
    }

    deleteArea(id: any) {
        this.loanding = true;
        this._areaSrv.deleteArea(id).subscribe(resp => {
            let elem: any = this.areas.find((e: any) => e.id_area === id);
            let index = this.areas.indexOf(elem);
            this.areas.splice(index, 1);
            this.loanding = false;
            this._toastr.success('Se eliminó area', 'Area eliminada');
        });
    }

    showAddCategoryModal() {
        this.uiService.setShowModal(true);
    }
    actualizarAreas(event: any) {
        // this.showModal = false;
        this.areas = event;
        this.showModalUpdate = false;
        this._toastr.success('Se actializó area', 'Area actualizada');
    }
}
