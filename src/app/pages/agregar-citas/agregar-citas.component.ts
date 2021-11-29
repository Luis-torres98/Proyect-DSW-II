import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    paciente: any = '';

    formCitasUser = new FormGroup({
        comentario: new FormControl('', Validators.required),
        fecha_cita: new FormControl('', Validators.required),
        sede: new FormControl('', Validators.required),
        // paciente: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        hora: new FormControl('', Validators.required)
    });
    constructor(
        private _citasSrv: ServiceService,

        private _toastr: ToastrService
    ) {
        let user: any = localStorage.getItem('userCurrent');
        const { id_usuario } = JSON.parse(user);

        this._citasSrv.getPacientesById(id_usuario).subscribe((resp: any) => {
            this.paciente = resp[0].id_paciente;
            console.log('ID PACIENTE', this.paciente);
        });
        this._citasSrv.getAreas().subscribe(resp => {
            this.areas = resp;
        });
        this._citasSrv.getPacientes().subscribe(resp => {
            this.pacientes = resp;
        });
        this._citasSrv.getHoras().subscribe(resp => {
            this.horas = resp;
        });
    }

    ngOnInit(): void {
        this._citasSrv.getSede().subscribe(resp => {
            console.log(resp);

            this.sedes = resp;
        });
    }

    saveCita() {
        if (this.formCitasUser.valid) {
            this._citasSrv
                .postCita(this.formCitasUser.value, this.date, this.paciente)
                .subscribe(resp => {
                    console.log(resp);
                    this._toastr.success(
                        `Se guardo su cita para el ${resp.fecha_cita}`,
                        'Cita gerenada'
                    );
                });
        } else {
            this._toastr.error(
                `Asegurese de llenar todos los campos`,
                'Formulario invalido'
            );
        }

        // this._router.navigate(['/index/mis-citas']);
    }
}
