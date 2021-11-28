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
    selector: 'app-modal-update-areas',
    templateUrl: './modal-update-areas.component.html',
    styleUrls: ['./modal-update-areas.component.scss']
})
export class ModalUpdateAreasComponent implements OnInit {
    @Input() area: any = '';
    @Output() areaCurrent = new EventEmitter();
    subsUpdate = new Subscription();
    showModalUpdate = true;

    mostrarModal: boolean = true;

    loanding: boolean = false;

    date = new Date();

    formAreaUpdate = new FormGroup({
        nombre: new FormControl('', Validators.required)
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
    }

    ngOnInit(): void {
        console.log(this.area);

        this.formAreaUpdate.controls['nombre'].setValue(this.area.nombre_area);
    }

    saveCita() {
        this.loanding = true;

        this._citasSrv
            .putArea(this.area.id_area, this.formAreaUpdate.value.nombre)
            .subscribe(resp => {
                this.mostrarModal = false;
                this._citasSrv.getAreas().subscribe(resp => {
                    this.areaCurrent.emit(resp);
                    this.loanding = false;
                });
            });
    }
}
