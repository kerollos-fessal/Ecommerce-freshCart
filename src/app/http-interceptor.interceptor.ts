import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
this._loaderService.show();
  let newReq =  request.clone({
      headers: request.headers.set('token', `${localStorage.getItem('token')}`)
    })
    return next.handle(newReq).pipe(
      finalize(() => this._loaderService.hide())
    );
  }
}
