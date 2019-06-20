import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {User} from '../models/user';
import {Lang} from '../models/lang';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MenuController, ToastController} from '@ionic/angular';
import {ToastService} from '../services/toast.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	registerForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		private toastController: ToastController,
		private menuController: MenuController,
		private toastService: ToastService
	) {
		this.menuController.enable(false);
	}

	/**
	 * Getter of the register form controls
	 * @author namesty
	 * @returns register form controls object 
	 */

	get formFields() {
		return this.registerForm.controls;
	}

	/**
	 * Builds form group for reactive form validation of register page.
	 * Uses custom form group validators
	 * @author namesty
	 */

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			userName: ['', [
				Validators.required,
				Validators.pattern('^\\S*$')
			]],
			repeatEmail: ['', [
				Validators.required,
				Validators.email
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(16),
				Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
			]],
			repeatPassword: ['', Validators.required]
		}, {
			validators: [
			this.confirmPassword,
			this.confirmEmail
		]});
	}

	/**
	 * Form submit event handler. Sets loading and submitted to true and calls this.signup method
	 * @returns if validation error is found
	 * @author namesty
	 */

	onSubmit() {
		this.submitted = true;
		if (this.registerForm.invalid) {
			console.log('Invalid');
			return;
		}
		this.loading = true;

		const user: User = {
			email: this.formFields.email.value,
			userName: this.formFields.userName.value,
			password: this.formFields.password.value,
			lang: Lang.es
		};
		this.signUp(user);
	}

	/**
	 * Calls user service's signup method to register user.
	 * Handles response, showing errors or success toasts accordingly 
	 * @param user object with register form data
	 * @author namesty
	 */

	private signUp(user: User) {
		this.userService.register(user).subscribe(response => {
			this.loading = false;
			switch (response.message) {
				case 'Account created':
					this.toastService.present('Cuenta creada exitosamente. Le hemos enviado un correo para verificar su cuenta.');
					this.router.navigate(['login'])
					break;
				case 'Fail sending email':
					this.submitted = false;
					this.toastService.present('Error enviando email. Contacte a Health29.');
					break;
				case 'user exists':
					this.submitted = false;
					this.toastService.present('Este usuario ya existe.');
					break;
			}
		});
	}

	/**
	 * Custom validator for password repeat confirmation 
	 * @param group register form group object
	 * @author namesty
	 */

	private confirmPassword(group: FormGroup){
		console.log(group)
		return group.controls.password.value === group.controls.repeatPassword.value ? null : { repeatPassword: true }
	}

	/**
	 * Custom validator for email repeat confirmation 
	 * @param group register form group object
	 * @author namesty
	 */

	private confirmEmail(group: FormGroup){
		return group.controls.email.value === group.controls.repeatEmail.value ? null : { repeatEmail: true }
	}

}
