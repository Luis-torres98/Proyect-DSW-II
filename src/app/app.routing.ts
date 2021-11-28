import { Routes } from '@angular/router';
import { AreasComponent } from './pages/areas/areas.component';
import { CitasComponent } from './pages/citas/citas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditReserveComponent } from './pages/edit-reserve/edit-reserve.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { ReserveNowComponent } from './pages/reserve-now/reserve-now.component';
import { AgregarCitasComponent } from './pages/agregar-citas/agregar-citas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CitasUserComponent } from './pages/citas user/citas-user.component';

export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: LandingComponent
    },
    {
        path: 'index',
        component: PrincipalComponent,
        children: [
            {
                path: 'citas',
                component: AgregarCitasComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            },
            {
                path: 'mis-citas',
                component: CitasUserComponent
            }
        ]
    },
    {
        path: 'reservas',
        component: ReservasComponent
    },
    {
        path: 'reserve-now',
        component: ReserveNowComponent
    },
    {
        path: 'edit-reserve',
        component: EditReserveComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'citas',
                component: CitasComponent
            },
            {
                path: 'areas',
                component: AreasComponent
            },
            {
                path: 'personal',
                component: PersonalComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
