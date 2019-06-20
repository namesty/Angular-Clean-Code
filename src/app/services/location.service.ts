import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../models/country';
import {City} from '../models/city';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Reads countries from JSON file in assets
	 * @author namesty
	 */

	public getCountries() {
		return this.http.get<Country[]>('./assets/locations/countries.json');
	}

	/**
	 * Reads provinces from JSON file, which name is passed as parameter
	 * @param country string which contains filename necessary to look for provinces in the right JSON file 
	 */

	public getProvinces(country: string) {
		return this.http.get<City[]>(`./assets/locations/countries/${country}.json`);
	}
}
