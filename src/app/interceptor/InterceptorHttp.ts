import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComunicateComponentsService } from '../comunicate-components.service';

@Injectable()
export class InterceptorHttp implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let request = this._requestToken(req);

        //TODO: intercepta las peticiones HTTP

        return next.handle(request);
    }

    private _requestToken(req: HttpRequest<any>): HttpRequest<any> {
        let token = localStorage.getItem('token')?.slice(1, -1);

        if (!token) return req;

        let requestClone = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return requestClone;
    }
}
