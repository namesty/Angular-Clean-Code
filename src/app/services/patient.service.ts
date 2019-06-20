import {Phenotype} from '../models/phenotype';
import {Patient} from '../models/patient';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PatientService {

	constructor(
		private http: HttpClient
	) {
	}

	/**
	 * Gets user's patient list from server
	 * @param userId string with ID of patient
	 * @returns observable that emits an array of patients
	 * @author namesty
	 */

	getPatientList(userId: string): Observable<Patient[]> {
		return this.http.get<{ listpatients: Patient[] }>('https://health29.org/api/patients-all/' + userId).pipe(
			map(response => response.listpatients)
		);
	}

	/**
	 * Gets phenotypes from a patient
	 * @param patientId string with ID of patient
	 * @returns observable that emits phenotypes
	 * @author namesty
	 */

	getPatientPhenotype(patientId: string): Observable<Phenotype> {
		return this.http.get<{ phenotype: Phenotype }>('https://health29.org/api/phenotypes/' + patientId).pipe(
			map(response => response.phenotype ? response.phenotype : null)
		);
	}

	/**
	 * Registers new patient in server
	 * @param patient object with patient data
	 * @param userId string with User ID
	 * @returns observable that emits patient object with the new patient info
	 * @author namesty
	 */

	newPatient(patient: Patient, userId: string): Observable<Patient> {
		return this.http.post<{ patientInfo: Patient }>('https://health29.org/api/patients/' + userId, {patient}).pipe(
			map(response => response.patientInfo)
		);
	}
}
