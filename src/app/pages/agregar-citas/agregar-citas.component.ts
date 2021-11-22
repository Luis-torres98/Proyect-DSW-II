import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-agregar-citas',
    templateUrl: './agregar-citas.component.html',
    styleUrls: ['./agregar-citas.component.scss']
})
export class AgregarCitasComponent implements OnInit {
    pacientes: any[] = [];
    areas: any[] = [];
    sedes: any[] = [];
    horas: any[] = [];
    date = new Date();

    formCitasUser = new FormGroup({
        comentario: new FormControl('', Validators.required),
        fecha_cita: new FormControl('', Validators.required),
        sede: new FormControl('', Validators.required),
        paciente: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        hora: new FormControl('', Validators.required)
    });
    constructor(private _citasSrv: ServiceService, private _router: Router) {
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

    saveCita() {
        this._citasSrv
            .postCita(this.formCitasUser.value, this.date)
            .subscribe(resp => {});

        this._router.navigate(['/index/mis-citas']);
    }

    editCita(cita: any) {}

    deleteCita(id: string) {}

    actualizarCitas(event: any) {}
}
