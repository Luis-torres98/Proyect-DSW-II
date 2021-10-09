import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from './interfaces/ILogin';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root',
})
export class ServiceService {

	 url = 'http://localhost:8080/personas' 
	
	constructor(private _http: HttpClient) {}

	loginByEmail(form : ILogin):Observable<any>{
		let dir = `${this.url}/listar`

		return this._http.get(dir);
	}
}
