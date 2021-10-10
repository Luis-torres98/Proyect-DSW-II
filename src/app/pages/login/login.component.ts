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



	loginForm = new FormGroup({
		usuario: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	constructor(
		private _elem: ElementRef, 
		private srv: ServiceService, 
		private router: Router,
		private _comunications : ComunicateComponentsService
	) {}

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
		this.srv.loginByEmail().subscribe(data => {
			
			data.forEach(user=>{
				if (user.username === this.loginForm.value.usuario 
					&& user.password === this.loginForm.value.password ) {
					
					this._comunications.userCurrent(user);
					
					this.router.navigate(['home']);
					return
					
				}else{
					console.log("usuario incorrecto");
					this.password = true;
					return
					
				}
				
			})
			

		});
	}
}

