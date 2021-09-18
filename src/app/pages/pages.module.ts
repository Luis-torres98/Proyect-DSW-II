import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ReservasComponent } from './reservas/reservas.component';

const LIST  =  [
	LandingComponent,
	ReservasComponent
];

@NgModule({
	imports: [CommonModule],
	declarations: LIST,
	exports: LIST,
})
export class PagesModule {}
