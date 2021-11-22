import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ROUTES } from './app.routing';
import { SectionsModule } from './sections/sections.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttp } from './interceptor/InterceptorHttp';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        PagesModule,
        RouterModule.forRoot(ROUTES),
        SectionsModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorHttp,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
