import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EditReserveComponent } from './edit-reserve/edit-reserve.component';

const LIST  =  [
	LandingComponent,
	ReservasComponent,
	EditReserveComponent
];

@NgModule({
	imports: [CommonModule],
	declarations: LIST,
	exports: LIST,
})
export class PagesModule {}
