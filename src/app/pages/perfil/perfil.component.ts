import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
    pacientes: any[] = [];
    areas: any[] = [];
    sedes: any[] = [];
    horas: any[] = [];
    departamento: any;
    departamentos: any;
    provincias: any;
    distrito: any;

    usuario: any;
    formPerfil = new FormGroup({
        nombre: new FormControl('', Validators.required),
        apellidos: new FormControl('', Validators.required),
        fecha_nacimiento: new FormControl('', Validators.required),
        celular: new FormControl('', Validators.required),
        dni: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        departamento: new FormControl('', Validators.required),
        provincia: new FormControl('', Validators.required),
        distrito: new FormControl('', Validators.required)
    });
    constructor(private _service: ServiceService) {
        let user: any = localStorage.getItem('userCurrent');
        this.usuario = JSON.parse(user);
        _service.getDepartamento().subscribe(resp => {
            this.departamentos = resp;
        });

        this.formPerfil.controls['departamento'].setValue(
            this.usuario.distrito.provincia.departamento.id_departamento
        );
        this.formPerfil.controls['provincia'].setValue(
            this.usuario.distrito.provincia.id_provincia
        );
        this.formPerfil.controls['distrito'].setValue(
            this.usuario.distrito.id_distrito
        );
        _service
            .getDepartamentoById(this.usuario.distrito.cod_departamento)
            .subscribe(resp => {
                this.departamento = resp;
            });

        this.getProvincia(
            this.usuario.distrito.provincia.departamento.id_departamento
        );
        this.getDistrito(this.usuario.distrito.provincia.id_provincia);
    }

    ngOnInit(): void {
        this.formPerfil.controls['nombre'].setValue(this.usuario.nombre);
        this.formPerfil.controls['apellidos'].setValue(this.usuario.apellidos);
        this.formPerfil.controls['fecha_nacimiento'].setValue(
            this.usuario.fechanacimiento
        );
        this.formPerfil.controls['celular'].setValue(this.usuario.celular);
        this.formPerfil.controls['dni'].setValue(this.usuario.dni);
    }

    getProvincia(value: string) {
        this._service.getProvinciaById(value).subscribe(resp => {
            this.provincias = resp;
        });
    }

    getDistrito(value: string) {
        this._service.getDistritoById(value).subscribe(resp => {
            this.distrito = resp;
        });
    }

    save() {}
}
