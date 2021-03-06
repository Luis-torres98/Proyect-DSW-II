import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/ui.service';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-citas-user',
    templateUrl: './citas-user.component.html',
    styleUrls: ['./citas-user.component.scss']
})
export class CitasUserComponent {
    subs = new Subscription();
    subsUpdate = new Subscription();
    citas: any[] = [];
    showModal = false;
    showModalUpdate = false;
    areas: any[] = [];
    sedes: any[] = [];
    pacientes: any[] = [];
    horas: any[] = [];
    date = new Date();

    loanding = false;

    citaCurrent: any;

    idUser: any = '';

    formCitas = new FormGroup({
        comentario: new FormControl('', Validators.required),
        fecha_cita: new FormControl('', Validators.required),
        sede: new FormControl('', Validators.required),
        paciente: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        hora: new FormControl('', Validators.required)
    });
    header = new Headers();

    constructor(
        private _citasSrv: ServiceService,
        private uiService: UiService,
        private _toastr: ToastrService
    ) {
        let user: any = localStorage.getItem('userCurrent');
        const { id_usuario } = JSON.parse(user);

        this.loanding = true;

        console.log('ID USUARIO', id_usuario);

        this.idUser = id_usuario;

        this._citasSrv.getCitasByIdUser(`${id_usuario}`).subscribe(resp => {
            this.citas = resp;
            console.log(resp);

            this.loanding = false;
        });
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

        this._citasSrv.getAreas().subscribe(resp => {
            this.areas = resp;
        });
        this._citasSrv.getSede().subscribe(resp => {
            this.sedes = resp;
        });
        this._citasSrv.getPacientes().subscribe(resp => {
            this.pacientes = resp;
        });
        this._citasSrv.getHoras().subscribe(resp => {
            this.horas = resp;
        });
    }

    ngOnInit(): void {}

    showAddCategoryModal() {
        this.uiService.setShowModal(true);
    }
    saveCita() {
        this.loanding = true;
        this._citasSrv
            .postCita(this.formCitas.value, this.date, this.idUser)
            .subscribe(resp => {
                this.getCitas();

                this._toastr.success(
                    'Cita guardada satisfactoriamente',
                    'Cita generada'
                );
            });
        this.loanding = false;

        this.showModal = false;
    }

    getCitas() {
        this._citasSrv.getCitasByIdUser(`${this.idUser}`).subscribe(resp => {
            this.citas = resp;
            console.log(resp);

            this.loanding = false;
        });
    }
    editCita(cita: any) {
        this.citaCurrent = cita;

        this.showModalUpdate = true;
    }
    deleteCita(id: string) {
        this._citasSrv.deleteCita(id).subscribe(e => {
            let elem: any = this.citas.find((e: any) => e.id_cita === id);
            let index = this.citas.indexOf(elem);
            this.citas.splice(index, 1);
            this._toastr.success(
                'Cita eliminada satisfactoriamente',
                'Cita eliminada'
            );
        });
    }

    actualizarCitas(event: any) {
        this.citas = event;
        this._toastr.success(
            'Cita actualizada satisfactoriamente',
            'Cita actualizada'
        );
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
