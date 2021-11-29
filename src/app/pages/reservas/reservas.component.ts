import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reservas',
	templateUrl: './reservas.component.html',
	styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
	constructor( private _router : Router) {}

	ngOnInit(): void {}

	navigate() {
	
		this._router.navigate(['/edit-reserve'])
	}
}
