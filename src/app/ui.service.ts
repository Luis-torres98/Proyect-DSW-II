import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UiService {
	private showModal: BehaviorSubject<boolean>;
	private showModalUpdate: BehaviorSubject<boolean>;

	constructor() {
		this.showModal = new BehaviorSubject(Boolean(false));
		this.showModalUpdate = new BehaviorSubject(Boolean(false));
	}

	setShowModal(value: boolean) {
		this.showModal.next(value);
	}
	setShowModalUpdate(value: boolean) {
		this.showModalUpdate.next(value);
	}

	getShowModal() {
		return this.showModal.asObservable();
	}

	getShowModalUpdate() {
		return this.showModalUpdate.asObservable();
	}
}
