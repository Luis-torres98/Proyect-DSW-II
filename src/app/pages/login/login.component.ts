import { Component, ElementRef, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';

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

	constructor(private _elem: ElementRef, private srv: ServiceService, private router : Router) {}

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
		

		// this.srv.loginByEmail(form).subscribe(data => {
			// console.log(data);

			// if (data[0].user==form.usuario && data[0].password==form.password ) {
			// 	console.log("usuario correcto");
				this.router.navigate(['home']);
				
			// }else{
			// 	console.log("usuario incorrecto");
			// 	this.password = true;
				
			// }
		// });

	}
}
