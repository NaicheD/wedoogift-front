import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class WedoogiftInterceptor implements HttpInterceptor {

  get token(): string {
    // TODO A voir comment vous voulez récup le token.
    return 'tokenTest123';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `${this.token}`,
      },
    });
    return next.handle(req);
  }
}
