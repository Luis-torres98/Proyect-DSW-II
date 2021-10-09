import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ROUTES } from './app.routing';
import { SectionsModule } from './sections/sections.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule, 
		PagesModule, 
		RouterModule.forRoot(ROUTES),
		SectionsModule,
		
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
