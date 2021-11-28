import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EditReserveComponent } from './edit-reserve/edit-reserve.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionsModule } from '../sections/sections.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';
import { AreasComponent } from './areas/areas.component';
import { ModalUpdateAreasComponent } from './modal-update-areas/modal-update-areas.component';
import { PersonalComponent } from './personal/personal.component';
import { ModalUpdatePersonalComponent } from './modal-update-personal/modal-update-personal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PrincipalComponent } from './principal/principal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AgregarCitasComponent } from './agregar-citas/agregar-citas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CitasUserComponent } from './citas user/citas-user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

const LIST = [
    LandingComponent,
    ReservasComponent,
    EditReserveComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    CitasComponent,
    BackdropComponent,
    ModalWrapperComponent,
    ModalUpdateComponent,
    AreasComponent,
    ModalUpdateAreasComponent,
    PersonalComponent,
    ModalUpdatePersonalComponent,
    SpinnerComponent,
    PrincipalComponent,
    AgregarCitasComponent,
    PerfilComponent,
    CitasUserComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SectionsModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        BrowserModule,
        ToastrModule.forRoot({
            timeOut: 1000,
            progressBar: true
        })
    ],
    declarations: LIST,
    exports: LIST
})
export class PagesModule {}
