import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
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
    loanding: boolean = false;

    psw: boolean = false;

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
    constructor(
        private _service: ServiceService,
        private _toastr: ToastrService
    ) {
        let user: any = localStorage.getItem('userCurrent');
        this.usuario = JSON.parse(user);

        this.getDepartamento();
        let { id_distrito, provincia } = this.usuario.distrito;
        let {
            id_provincia,
            departamento: { id_departamento }
        } = provincia;
        this.formPerfil.patchValue({
            departamento: id_departamento,
            provincia: id_provincia,
            distrito: id_distrito
        });

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

    getDepartamento() {
        this.provincias = [];
        this._service.getDepartamento().subscribe(resp => {
            this.departamentos = resp;
        });
    }
    getProvincia(value: any) {
        this.distrito = [];

        this._service.getProvinciaById(value).subscribe(resp => {
            this.provincias = resp;
        });

        return this.provincias;
    }

    getDistrito(value: any) {
        this._service.getDistritoById(value || value.value).subscribe(resp => {
            this.distrito = resp;
        });
    }

    changeDepartamento(value: string) {
        this.distrito = [''];
        this.getProvincia(value);
    }

    changeProvincia(value: any) {
        this.distrito = [''];
        this.getDistrito(value);
    }

    save() {
        this.loanding = true;

        if (this.formPerfil.controls['password'].value === '') {
            this.loanding = false;

            this.psw = true;
        }
        if (this.formPerfil.valid) {
            this._service
                .putUsuarioById(this.formPerfil.value, this.usuario.id_usuario)
                .subscribe(resp => {
                    console.log('respuesta desde perfil', resp);

                    localStorage.setItem('userCurrent', JSON.stringify(resp));

                    this.loanding = false;
                    this.psw = false;
                    this._toastr.success(
                        'Se actualizó sus datos',
                        'Datos actualizados'
                    );
                });
        }
    }
}
