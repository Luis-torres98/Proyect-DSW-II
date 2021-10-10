import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from './interfaces/ILogin';
import { Observable } from 'rxjs';
import { User } from '../interfaces/IUser';


@Injectable({
	providedIn: 'root',
})
export class ServiceService {

	 url = 'https://citasmedicas2021.herokuapp.com' 
	
	constructor(private _http: HttpClient) {}

	loginByEmail():Observable<User[]>{
		let dir = `${this.url}/api/usuario`

		return this._http.get<User[]>(dir);
	}
}
