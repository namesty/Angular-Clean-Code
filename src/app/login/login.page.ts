import {MenuController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../services/toast.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


	loginForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		private menuController: MenuController,
		private toastService: ToastService
	) {
		this.menuController.enable(false);
	}

	/**
	 * Getter of the login form controls
	 * @author namesty
	 * @returns login form controls object 
	 */

	get formFields() {
		return this.loginForm.controls;
	}

	/**
	 * Builds form group for reactive form validation of login page
	 * @author namesty
	 */

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	/**
	 * Form submit event handler. Sets loading and submitted to true and calls user service's login method
	 * @returns if validation error is found
	 * @author namesty
	 */

	onSubmit() {
		this.submitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.loading = true;

		const email = this.formFields.email.value;
		const password = this.formFields.password.value;
		this.login(email, password);
	}

	/**
	 * Makes login request to server through login service method call.
	 * If succesful, sets token through auth service method call and navigates to phenotypes
	 * @author namesty
	 */

	private login(email: string, password: string) {
		this.userService.login(email, password).subscribe(response => {
			this.loading = false;
			if (response.token) {
				this.authService.setToken(response.token);
				this.router.navigate(['phenotypes']);
			} else {
				this.toastService.present('Email or Password invalid.');
			}
		});
	}

}
