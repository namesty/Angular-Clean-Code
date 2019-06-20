import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {UserToken} from '../models/user-token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() {
	}

	private token: string;
	private userToken = {} as UserToken;

	/**
	 * Decodes token to extract user information with jwt-decode package 
	 * @param token encoded token received from server after authentication
	 * @returns decoded token
	 * @author namesty
	 */

	private static decodeToken(token: string): UserToken {
		return jwtDecode(token);
	}


	/**
	 * Token setter
	 * @param token encoded token received from server after authentication
	 * @author namesty
	 */

	setToken(token: string) {
		this.token = token;
		this.userToken = AuthService.decodeToken(token);
	}

	/**
	 * Token getter
	 * @returns token
	 * @author namesty
	 */

	getToken() {
		return this.token;
	}

	/**
	 * User ID getter
	 * @returns User ID
	 * @author namesty
	 */

	getUserId() {
		return this.userToken.sub;
	}

	/**
	 * Checks if token exists, which tells if user is authenticated
	 * @returns boolean with result
	 * @author namesty
	 */

	isAuthenticated(): boolean {
		return !!this.userToken.sub;
	}

}
