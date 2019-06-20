import {Phenotype} from './phenotype';

export interface Patient {
	sub?: string;
	patientName: string;
	surname: string;
	phenotype?: Phenotype;
	gender?: string;
	phone1?: string;
	phone2?: string;
	country?: string;
	province?: string;
	city?: string;
	postalCode?: string;
	street?: string;
	countrybirth?: string;
	provincebirth?: string;
	citybirth?: string;
	birthdate?: string;
	parents?: any[];
	siblings?: any[];
}
