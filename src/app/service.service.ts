import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from './interfaces/ILogin';
import { Observable } from 'rxjs';
import { User } from '../interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    // url = 'https://citasmedicas2021.herokuapp.com';
    url = 'https://citasmedicas2021angular.herokuapp.com';

    constructor(private _http: HttpClient) {}

    getUsuarios(): Observable<User[]> {
        let dir = `${this.url}/api/usuario`;

        return this._http.get<User[]>(dir);
    }
    getUsuarioById(user: any): Observable<User[]> {
        let dir = `${this.url}/api/usuario/${user}`;

        return this._http.get<User[]>(dir);
    }

    login(user: any): Observable<User> {
        // let dir = `${this.url}/api/usuario/login`;
        let dir = `${this.url}/auth/login`;

        console.log(user);

        return this._http.post(dir, {
            nombreUsuario: user.usuario,
            password: user.password
        });
    }

    loginRegister(user: any): Observable<User> {
        let dir = `${this.url}/api/usuario`;

        return this._http.post(dir, {
            nombre: user.nombre,
            apellidos: user.apellidos,
            fechanacimiento: user.fecha_nacimiento,
            celular: user.celular,
            dni: user.dni,
            contraseña: user.contraseña,
            id_distrito: user.distrito
        });
    }

    getCitas(): Observable<any[]> {
        let dir = `${this.url}/api/cita`;

        return this._http.get<any[]>(dir);
    }
    getCitasById(): Observable<any[]> {
        let dir = `${this.url}/api/cita`;
        return this._http.get<any[]>(dir);
    }
    getCitasByIdUser(id: string): Observable<any[]> {
        let dir = `${this.url}/api/cita/xIdUsuario/${id}`;
        return this._http.get<any[]>(dir);
    }

    getAreas(): Observable<any[]> {
        let dir = `${this.url}/api/area`;
        return this._http.get<any[]>(dir);
    }

    getSede(): Observable<any[]> {
        let dir = `${this.url}/api/sede`;
        return this._http.get<any[]>(dir);
    }
    getPacientes(): Observable<any[]> {
        let dir = `${this.url}/api/paciente`;
        return this._http.get<any[]>(dir);
    }

    getHoras(): Observable<any[]> {
        let dir = `${this.url}/api/hora`;
        return this._http.get<any[]>(dir);
    }

    getPersonal(): Observable<any[]> {
        let dir = `${this.url}/api/personal`;
        return this._http.get<any[]>(dir);
    }

    getDepartamento(): Observable<any[]> {
        let dir = `${this.url}/api/departamento`;
        return this._http.get<any[]>(dir);
    }
    getDepartamentoById(id: string): Observable<any[]> {
        let dir = `${this.url}/api/departamento/${id}`;
        return this._http.get<any[]>(dir);
    }

    getProvinciaById(id: any): Observable<any[]> {
        let dir = `${this.url}/api/provincia/xDepartamento/${id}`;
        return this._http.get<any[]>(dir);
    }

    getDistritoById(id: any): Observable<any[]> {
        let dir = `${this.url}/api/distrito/xProvincia/${id}`;
        return this._http.get<any[]>(dir);
    }

    postCita(cita: any, date: Date): Observable<any> {
        let dir = `${this.url}/api/cita`;

        console.log('Citas desde el servicio', cita);

        return this._http.post<any>(dir, {
            fecha_registro: date,
            comentario: cita.comentario,
            fecha_cita: cita.fecha_cita,
            id_sede: parseInt(cita.sede),
            id_paciente: parseInt(cita.paciente),
            id_area: parseInt(cita.area),
            id_hora: parseInt(cita.hora)
        });
    }

    postArea(area: any): Observable<any> {
        let dir = `${this.url}/api/area`;
        return this._http.post<any>(dir, {
            nombre_area: area.nombre
        });
    }

    postPersonal(personal: any, date: Date): Observable<any> {
        let dir = `${this.url}/api/personal`;
        return this._http.post<any>(dir, {
            fecha_registro: date,
            categoria: personal.categoria,
            id_usuario: personal.usuario,
            id_area: personal.area
        });
    }

    putCita(cita: any, date: Date, id: string): Observable<any> {
        let dir = `${this.url}/api/cita/${id}`;

        return this._http.put<any>(dir, {
            fecha_registro: date,
            comentario: cita.comentario,
            fecha_cita: cita.fecha_cita,
            id_sede: cita.sede,
            id_paciente: cita.paciente,
            id_area: cita.area,
            id_hora: cita.hora
        });
    }

    putArea(id: any, nombre: any): Observable<any> {
        let dir = `${this.url}/api/area`;
        return this._http.put<any>(dir, {
            id_area: id,
            nombre_area: nombre
        });
    }

    putPersonal(personal: any, date: Date, id: string): Observable<any> {
        let dir = `${this.url}/api/personal/${id}`;
        return this._http.put<any>(dir, {
            fecha_registro: date,
            categoria: personal.categoria,
            id_usuario: personal.usuario,
            id_area: personal.area
        });
    }

    putUsuarioById(usuario: any, id: string): Observable<any> {
        let dir = `${this.url}/api/usuario/${id}`;

        return this._http.put<any>(dir, {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            fechanacimiento: usuario.fecha_nacimiento,
            celular: usuario.celular,
            dni: usuario.dni,
            contraseña: usuario.password,
            id_distrito: usuario.distrito
        });
    }

    deleteCita(id: string): Observable<any> {
        let dir = `${this.url}/api/cita/${id}`;
        return this._http.delete<any>(dir);
    }

    deleteArea(id: string): Observable<any> {
        let dir = `${this.url}/api/area/${id}`;
        return this._http.delete<any>(dir);
    }

    deletePersonal(id: string): Observable<any> {
        let dir = `${this.url}/api/personal/${id}`;
        return this._http.delete<any>(dir);
    }
}
