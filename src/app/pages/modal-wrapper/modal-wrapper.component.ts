import { Component, Input, OnInit } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
	selector: 'app-modal-wrapper',
	templateUrl: './modal-wrapper.component.html',
	styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements OnInit {
	
	@Input() title = '';

	constructor(private uiService: UiService) {}

	ngOnInit(): void {}

	closeModal() {
		this.uiService.setShowModal(false);
		console.log("!!");
		
		this.uiService.setShowModalUpdate(false);
	}
}
