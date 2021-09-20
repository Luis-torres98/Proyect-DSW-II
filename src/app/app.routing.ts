import {  Routes } from "@angular/router";
import { EditReserveComponent } from "./pages/edit-reserve/edit-reserve.component";
import { LandingComponent } from './pages/landing/landing.component';
import { ReservasComponent } from "./pages/reservas/reservas.component";
import { ReserveNowComponent } from "./pages/reserve-now/reserve-now.component";

export const ROUTES : Routes =[
	{
		path: '',
		component: LandingComponent

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
		path: '**', redirectTo : '/', pathMatch: 'full'
	}
];