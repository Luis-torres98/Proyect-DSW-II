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
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';
const LIST  =  [
	LandingComponent,
	ReservasComponent,
	EditReserveComponent,
	LoginComponent,
	HomeComponent,
	DashboardComponent,
	CitasComponent,
	BackdropComponent,
	ModalWrapperComponent,
	ModalUpdateComponent
	
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SectionsModule,
		RouterModule
	],
	declarations: LIST,
	exports: LIST,
})
export class PagesModule {}
