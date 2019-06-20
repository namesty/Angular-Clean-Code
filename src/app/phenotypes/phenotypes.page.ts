import {MenuController} from '@ionic/angular';
import {Patient} from '../models/patient';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PatientService} from '../services/patient.service';
import {map, reduce, switchMap, tap} from 'rxjs/operators';
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {flatMap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Component({
	selector: 'app-phenotypes',
	templateUrl: './phenotypes.page.html',
	styleUrls: ['./phenotypes.page.scss'],
})
export class PhenotypesPage implements OnInit {

	patients = [] as Patient[];
	loading = false;

	constructor(
		private authService: AuthService,
		private patientService: PatientService,
		private router: Router,
		private menuController: MenuController
	) {
		this.menuController.enable(true);
	}

	/**
	 * Gets patient list, based on user ID. Then for each patient, fetchs its phenotypes.
	 * Reduces all patients with phenotypes to a single array
	 * 
	 * @author namesty
	 */

	ngOnInit() {
		const loggedUserId = this.authService.getUserId();
		this.loading = true;
		this.patientService.getPatientList(loggedUserId).pipe(
			switchMap(patients => fromArray(patients)), // Returns an observable emitting every patient
			// Obtains the phenotype of each patient and adds it to the patient object
			flatMap(patient => this.patientService.getPatientPhenotype(patient.sub)
				.pipe(
					tap(phenotype => patient.phenotype = phenotype),
					map(() => patient)
				)
			),
			// Accumulates each patient in array until observable is completed
			reduce<Patient, Patient[]>((patients, patient) => {
				patients.push(patient);
				return patients;
			}, [])
		).subscribe(patients => {
			this.loading = false;
			this.patients = patients;
		});
	}

}
