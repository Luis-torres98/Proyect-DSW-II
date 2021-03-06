import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class ComunicateComponentsService {
    private _userSbj = new Subject<User>();

    onChangeUser = () => this._userSbj.asObservable();

    userCurrent(user: any) {
        this._userSbj.next(user);
    }

    private _activarSpinner = new Subject<boolean>();

    onActivarSpiner = () => this._activarSpinner.asObservable();

    changeActivarSpinner(status: boolean) {
        this._activarSpinner.next(status);
    }
}
