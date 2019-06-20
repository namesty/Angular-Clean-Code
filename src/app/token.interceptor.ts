import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

	constructor(
		public authService: AuthService
	) {
	}

	/**
	 * Intercepts HTTP requests and adds Authorization header with token
	 * @param req HTTP request to be intercepted
	 * @param next HTTP request handler
	 * @returns observable which emits request header to be used for HTTP request
	 * @author namesty
	 */

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.authService.isAuthenticated()) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${this.authService.getToken()}`
				}
			});
		}
		return next.handle(req);
	}
}
