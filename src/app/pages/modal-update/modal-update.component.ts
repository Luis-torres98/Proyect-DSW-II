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
    selector: 'app-modal-update',
    templateUrl: './modal-update.component.html',
    styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent implements OnInit {
    @Input() cita: any = '';
    @Output() citasCurrent = new EventEmitter();
    subsUpdate = new Subscription();
    showModalUpdate = true;

    mostrarModal: boolean = true;

    areas: any[] = [];
    sedes: any[] = [];
    pacientes: any[] = [];
    horas: any[] = [];

    date = new Date();
    header = new Headers();

    formCitasUpdate = new FormGroup({
        comentario: new FormControl('', Validators.required),
        fecha_cita: new FormControl('', Validators.required),
        sede: new FormControl('', Validators.required),
        paciente: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        hora: new FormControl('', Validators.required)
    });

    constructor(
        private _citasSrv: ServiceService,
        private uiService: UiService
    ) {
        this.subsUpdate.add(
            this.uiService
                .getShowModalUpdate()
                .subscribe(show => (this.showModalUpdate = show))
        );

        this._citasSrv.getAreas().subscribe(resp => {
            this.areas = resp;
        });
        this._citasSrv.getSede().subscribe(resp => {
            this.sedes = resp;
        });
        this._citasSrv.getPacientes().subscribe(resp => {
            this.pacientes = resp;
        });
        this._citasSrv.getHoras().subscribe(resp => {
            this.horas = resp;
        });
    }

    ngOnInit(): void {
        this.formCitasUpdate.controls['comentario'].setValue(
            this.cita.comentario
        );
        this.formCitasUpdate.controls['fecha_cita'].setValue(
            this.cita.fecha_cita
        );
        this.formCitasUpdate.controls['sede'].setValue(this.cita.sede.id_sede);
        this.formCitasUpdate.controls['paciente'].setValue(
            this.cita.paciente.id_paciente
        );
        this.formCitasUpdate.controls['area'].setValue(this.cita.area.id_area);
        this.formCitasUpdate.controls['hora'].setValue(this.cita.hora.id_hora);
    }

    saveCita() {
        this._citasSrv
            .putCita(this.formCitasUpdate.value, this.date, this.cita.id_cita)
            .subscribe(resp => {
                this.mostrarModal = false;
                this._citasSrv.getCitas().subscribe(resp => {
                    console.log(resp);
                    this.citasCurrent.emit(resp);
                });
            });
    }
}
