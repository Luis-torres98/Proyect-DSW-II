import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/IUser';
import { ComunicateComponentsService } from 'src/app/comunicate-components.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	singIn = true;
	singUp = false;

	resultado = [];
	password = false;

	departamentos: any[] = [];
	provincias: any[] = [];
	distritos: any[] = [];

	loginForm = new FormGroup({
		usuario: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	singUpForm = new FormGroup({
		nombre: new FormControl('', Validators.required),
		apellidos: new FormControl('', Validators.required),
		fecha_nacimiento: new FormControl('', Validators.required),
		celular: new FormControl('', Validators.required),
		departamento: new FormControl('', Validators.required),
		provincia: new FormControl('', Validators.required),
		distrito: new FormControl('', Validators.required),
		dni: new FormControl('', Validators.required),
		contraseña: new FormControl('', Validators.required),
		confirmarContraseña: new FormControl('', Validators.required),
	});

	constructor(private _elem: ElementRef, private loginSrv: ServiceService, private router: Router, private _comunications: ComunicateComponentsService) {
		loginSrv.getDepartamento().subscribe(resp => (this.departamentos = resp));
	}

	ngOnInit(): void {}

	signIn() {
		let firstElem = (<HTMLElement>this._elem.nativeElement).getElementsByTagName('h2')[0];
		let secondaryElem = (<HTMLElement>this._elem.nativeElement).getElementsByTagName('h2')[1];
		firstElem.classList.remove('inactive');
		firstElem.classList.add('active');
		secondaryElem.classList.remove('active');
		secondaryElem.classList.add('inactive');

		this.singIn = true;
		this.singUp = false;
	}

	signUp() {
		let firstElem = (<HTMLElement>this._elem.nativeElement).getElementsByTagName('h2')[0];
		let secondaryElem = (<HTMLElement>this._elem.nativeElement).getElementsByTagName('h2')[1];
		secondaryElem.classList.remove('inactive');
		secondaryElem.classList.add('active');
		firstElem.classList.remove('active');
		firstElem.classList.add('inactive');

		this.singIn = false;
		this.singUp = true;
	}

	onLogin(form: any) {
		this.loginSrv.login(form).subscribe(resp => {
			if (resp != '') {
				this._comunications.userCurrent(resp);
				this.router.navigate(['dashboard']);
			} else {
				this.password = true;
				return;
			}
		});
	}

	registerUser() {
		console.log(this.singUpForm.value);

		this.loginSrv.loginRegister(this.singUpForm.value).subscribe(resp =>{})
		this.singUp = false;
		this.singIn = true;
	}

	obtenerDep(event : any){

		this.loginSrv.getProvinciaById(event.target.value).subscribe(resp =>{ 
			this.provincias = resp;
		})

		
	}

	obtenerProv(event : any){

		this.loginSrv.getDistritoById(event.target.value).subscribe(resp =>{ 
			this.distritos = resp;
		})

		
	}
}
