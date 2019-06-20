import {MenuController} from '@ionic/angular';
import {PatientService} from '../services/patient.service';
import {Patient} from '../models/patient';
import {AuthService} from '../services/auth.service';
import {LocationService} from '../services/location.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../models/country';
import {City} from '../models/city';
import {ToastService} from '../services/toast.service';

@Component({
	selector: 'app-new-patient',
	templateUrl: './new-patient.page.html',
	styleUrls: ['./new-patient.page.scss'],
})
export class NewPatientPage implements OnInit {

	patientForm: FormGroup;
	loading = false;
	submitted = false;

	countries = [] as Country[];
	provinces = [] as City[];
	birthProvinces = [] as City[];

	private noProvince = {
		name: 'Sin provincias',
		code: 'n/a'
	};

	today: string = new Date().toISOString();

	constructor(
		private formBuilder: FormBuilder,
		private locationService: LocationService,
		private authService: AuthService,
		private patientService: PatientService,
		private menuController: MenuController,
		private toastService: ToastService
	) {
		this.menuController.enable(true);
	}

	/**
	 * Getter of the patient form controls
	 * @returns patient form controls object
	 * @author namesty
	 */

	get formFields() {
		return this.patientForm.controls;
	}

	/**
	 * Builds form group for reactive form validation of New Patient page.
	 * Makes call to location service to fetch countries from JSON file
	 * @author namesty
	 */

	ngOnInit() {

		this.getCountries();

		this.patientForm = this.formBuilder.group({
			patientName: ['', Validators.required],
			surname: ['', Validators.required],
			gender: ['', Validators.required],
			phone1: ['', [
				Validators.required,
				Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
			]],
			phone2: ['', [
				Validators.required,
				Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
			]],
			country: ['', Validators.required],
			province: ['', Validators.required],
			city: ['', Validators.required],
			postalCode: [''],
			street: [''],
			countrybirth: ['', Validators.required],
			provincebirth: ['', Validators.required],
			citybirth: ['', Validators.required],
			birthdate: ['', Validators.required]
		});
	}

	/**
	 * Form submit event handler. Sets loading and submitted to true and calls patient service
	 * @returns if validation error is found
	 * @author namesty
	 */

	onSubmit() {
		this.submitted = true;
		if (this.patientForm.invalid) {
			return;
		}

		this.loading = true;

		const userId = this.authService.getUserId();

		const patient: Patient = {
			patientName: this.formFields.patientName.value,
			surname: this.formFields.surname.value,
			gender: this.formFields.gender.value,
			phone1: this.formFields.phone1.value,
			phone2: this.formFields.phone2.value,
			country: this.formFields.country.value.name,
			province: this.formFields.province.value.name,
			city: this.formFields.city.value,
			postalCode: this.formFields.postalCode.value,
			street: this.formFields.street.value,
			countrybirth: this.formFields.countrybirth.value.name,
			provincebirth: this.formFields.provincebirth.value.name,
			citybirth: this.formFields.citybirth.value,
			birthdate: this.formFields.birthdate.value,
			parents: [],
			siblings: []
		};

		this.newPatient(patient, userId);
	}

	/**
	 * Calls location service to fetch countries from JSON file
	 * @author namesty
	 */

	getCountries() {
		this.locationService.getCountries().subscribe(countries => {
			this.countries = countries;
		});
	}

	 /**
	 * Gets provinces from JSON file, through location service when country is selected
	 * @param country object with filename to look for provinces in JSON file
	 * @author namesty
	 */

	getProvinces(country: Country) {
		if (country) {
			this.locationService.getProvinces(country.filename).subscribe(
				data => {
					this.formFields.province.setValue(data[0]);
					this.provinces = data;
				}, () => {
					this.formFields.province.setValue(this.noProvince);
					this.provinces = [this.noProvince];
				}
			);
		}
	}

	 /**
	 * Gets provinces from JSON file, through location service when country is selected
	 * @param country object with filename to look for provinces in JSON file
	 * @author namesty
	 */

	getBirthProvinces(country: Country) {
		if (country) {
			this.locationService.getProvinces(country.filename).subscribe(
				data => {
					this.formFields.province.setValue(data[0]);
					this.birthProvinces = data;
				}, () => {
					this.formFields.provincebirth.setValue(this.noProvince);
					this.birthProvinces = [this.noProvince];
				}
			);
		}
	}

	/**
	 * 
	 * @param patient object with data from patient form
	 * @param userId string identifier for user, retrieved from decoded token
	 * @author namesty
	 */

	newPatient(patient: Patient, userId: string) {
		this.patientService.newPatient(patient, userId).subscribe(() => {
			this.loading = false;
			this.toastService.present('Paciente agregado con exito');
		});
	}


}
