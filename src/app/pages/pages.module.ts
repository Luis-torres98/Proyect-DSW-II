import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EditReserveComponent } from './edit-reserve/edit-reserve.component';
import { LoginComponent } from './login/login.component';

const LIST  =  [
	LandingComponent,
	ReservasComponent,
	EditReserveComponent,
	LoginComponent
];

@NgModule({
	imports: [CommonModule],
	declarations: LIST,
	exports: LIST,
})
export class PagesModule {}
