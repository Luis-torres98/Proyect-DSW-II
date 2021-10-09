import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EditReserveComponent } from './edit-reserve/edit-reserve.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SectionsModule } from '../sections/sections.module';
import { HomeComponent } from './home/home.component';
const LIST  =  [
	LandingComponent,
	ReservasComponent,
	EditReserveComponent,
	LoginComponent,
	HomeComponent
	
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SectionsModule
	],
	declarations: LIST,
	exports: LIST,
})
export class PagesModule {}
