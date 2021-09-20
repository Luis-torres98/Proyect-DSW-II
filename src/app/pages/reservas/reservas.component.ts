import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-reservas',
	templateUrl: './reservas.component.html',
	styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	alerta() {
		console.log("se clikeo!!");
		let btn = document.getElementsByClassName('btn-red')[0] as HTMLElement;
		btn.style.background= "blue";
	}
}
