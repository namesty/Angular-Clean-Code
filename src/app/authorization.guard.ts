import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}

	/**
	 * Redirects user to login page if not authenticated
	 * @returns observable which emits boolean with authentication check result
	 * @author namesty
	 */

	canActivate(): Observable<boolean> | boolean {
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(['login']);
			return false;
		}
		return true;
	}

}
