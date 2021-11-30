import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../ui.service';

@Component({
    selector: 'app-modal-update-personal',
    templateUrl: './modal-update-personal.component.html',
    styleUrls: ['./modal-update-personal.component.scss']
})
export class ModalUpdatePersonalComponent implements OnInit {
    @Input() personal: any = '';
    @Output() personalCurrent = new EventEmitter();
    subsUpdate = new Subscription();
    showModalUpdate = true;

    mostrarModal: boolean = true;
    loanding: boolean = false;
    areas: any;
    usuarios: any;

    date = new Date();

    formPersonalUpdate = new FormGroup({
        categoria: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        usuario: new FormControl('', Validators.required)
    });

    constructor(
        private _personalSrv: ServiceService,
        private uiService: UiService
    ) {
        this.subsUpdate.add(
            this.uiService
                .getShowModalUpdate()
                .subscribe(show => (this.showModalUpdate = show))
        );

        this._personalSrv.getAreas().subscribe(resp => {
            this.areas = resp;
        });
        this._personalSrv.getUsuarios().subscribe(resp => {
            this.usuarios = resp;
        });
    }

    ngOnInit(): void {
        console.log(this.personal);

        this.formPersonalUpdate.controls['categoria'].setValue(
            this.personal.categoria
        );
        this.formPersonalUpdate.controls['area'].setValue(
            this.personal.area.id_area
        );
        this.formPersonalUpdate.controls['usuario'].setValue(
            this.personal.usuario.id_usuario
        );
    }

    saveCita() {
        let user: any = localStorage.getItem('userCurrent');
        const { id_usuario } = JSON.parse(user);
        this.loanding = true;

        this._personalSrv
            .putPersonal(
                this.formPersonalUpdate.value,
                this.date,
                this.personal.id_personal
            )
            .subscribe(resp => {
                // this.mostrarModal = false;
                this._personalSrv
                    .getCitasByIdUser(id_usuario)
                    .subscribe(resp => {
                        this.personalCurrent.emit(resp);
                        this.loanding = false;
                    });
            });
    }
}
