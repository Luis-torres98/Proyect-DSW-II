import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/ui.service';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
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
    loanding = false;

    formPersonal = new FormGroup({
        categoria: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        usuario: new FormControl('', Validators.required)
    });

    constructor(
        private _personalSrv: ServiceService,
        private uiService: UiService,
        private _toastr: ToastrService
    ) {
        this.loanding = true;

        // this._personalSrv.getPersonal().subscribe(resp => {

        // 	this.personal = resp;
        // 	this.loanding = false;
        // });

        this.getPersonal();

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
        this.loanding = true;

        this._personalSrv
            .postPersonal(this.formPersonal.value, this.date)
            .subscribe(resp => {
                // this.personal.push(resp);
                this.getPersonal();
                // this.loanding = false;
                this._toastr.success('Se agregó personal', 'Personal agregado');
            });

        this.showModal = false;
    }

    getPersonal() {
        this._personalSrv.getPersonal().subscribe(resp => {
            this.personal = resp;
            this.loanding = false;
        });
    }
    editPersonal(personal: any) {
        this.showModalUpdate = true;
        this.personalCurrent = personal;
        // this.showModalUpdate = false;
    }
    deleteCita(id: string) {
        this.loanding = true;

        this._personalSrv.deletePersonal(id).subscribe(e => {
            let elem: any = this.personal.find(
                (e: any) => e.id_personal === id
            );
            let index = this.personal.indexOf(elem);
            this.personal.splice(index, 1);
            this.loanding = false;
            this._toastr.success('Se elimino personal', 'Personal eliminado');
        });
    }

    actualizarCitas(event: any) {
        this.personal = event;
        this.showModalUpdate = false;
        this._toastr.success('Se actualizó personal', 'Personal actualizado');
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
