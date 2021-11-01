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

	login(user : any) : Observable<User>{
		let dir = `${this.url}/api/usuario/login`

		return this._http.post(dir, {
			"dni": user.usuario,
			"contraseña": user.password
		});
	}

	getCitas() : Observable <any[]>{
		let dir = `${this.url}/api/cita`
		return this._http.get<any[]>(dir);
	}

	getAreas() : Observable<any[]>{
		let dir = `${this.url}/api/area`
		return this._http.get<any []>(dir);
		
	}

	getSede(): Observable<any[]>{
		let dir = `${this.url}/api/sede`
		return this._http.get<any []>(dir);
	}
	getPacientes(): Observable<any[]>{
		let dir = `${this.url}/api/paciente`
		return this._http.get<any []>(dir);
	}

	getHoras(): Observable<any[]>{
		let dir = `${this.url}/api/hora`
		return this._http.get<any []>(dir);
	}

	postCita(cita : any, date : Date) : Observable<any>{
		let dir = `${this.url}/api/cita`
		return this._http.post<any>(dir,{
			"fecha_registro": date,
			"comentario": cita.comentario,
			"fecha_cita":cita.fecha_cita ,
			"id_sede": cita.sede,
			"id_paciente": cita.paciente,
			"id_area": cita.area,
			"id_hora": cita.hora
		  })
	}

	putCita(cita : any, date : Date, id : string) : Observable<any>{
		let dir = `${this.url}/api/cita/${id}`
		return this._http.put<any>(dir,{
			"fecha_registro": date,
			"comentario": cita.comentario,
			"fecha_cita":cita.fecha_cita ,
			"id_sede": cita.sede,
			"id_paciente": cita.paciente,
			"id_area": cita.area,
			"id_hora": cita.hora
		  })

	}

	deleteCita(id : string): Observable<any>{
		let dir = `${this.url}/api/cita/${id}`
		return this._http.delete<any>(dir);
	}
	
}
