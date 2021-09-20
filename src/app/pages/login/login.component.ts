import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	singIn = true;
	singUp = false;
	constructor( private _elem : ElementRef) {}

	ngOnInit(): void {}

	signIn() {
		let firstElem = (<HTMLElement> this._elem.nativeElement).getElementsByTagName('h2')[0];
		let secondaryElem = (<HTMLElement> this._elem.nativeElement).getElementsByTagName('h2')[1];
		firstElem.classList.remove('inactive');
		firstElem.classList.add('active');
		secondaryElem.classList.remove('active');
		secondaryElem.classList.add('inactive');	
		
		this.singIn = true;
		this.singUp = false;

	}

	signUp() {
		let firstElem = (<HTMLElement> this._elem.nativeElement).getElementsByTagName('h2')[0];
		let secondaryElem = (<HTMLElement> this._elem.nativeElement).getElementsByTagName('h2')[1];
		secondaryElem.classList.remove('inactive');
		secondaryElem.classList.add('active');
		firstElem.classList.remove('active');
		firstElem.classList.add('inactive');	

		this.singIn = false;
		this.singUp = true;

	}
}
