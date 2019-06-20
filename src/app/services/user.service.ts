import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {sha512} from 'js-sha512';
import {tap} from 'rxjs/operators';
import {User} from '../models/user';
import {AuthResponse} from '../models/auth-response';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private userSubject$ = new ReplaySubject(1);
	public user$ = this.userSubject$.asObservable();

	constructor(
		private http: HttpClient
	) {
	}

	/**
	 * Sends user credentials to server for authentication
	 * Password encoded in sha512
	 * @param email string with email from user for authentication
	 * @param password string with password from user for authentication
	 * @returns observable which emits auth response with token and language
	 * @author namesty
	 */

	login(email: string, password: string): Observable<AuthResponse> {
		password = sha512(password);
		return this.http.post<AuthResponse>('https://health29.org/api/signin', {email, password});
	}

	/**
	 * Gets user information from server with User ID
	 * @param userId string with User ID
	 * @returns observable which emits user data
	 * @author namesty
	 */

	getUser(userId: string): Observable<User> {
		return this.http.get<User>('https://health29.org/api/users/' + userId).pipe(
			tap(user => this.userSubject$.next(user))
		);
	}

	/**
	 * Registers new user
	 * @param user object with user form data
	 * @returns response message string
	 * @author namesty
	 */

	register(user: User) {
		user.password = sha512(user.password);
		return this.http.post<{ message: string }>('https://health29.org/api/signUp', user);
	}
}
