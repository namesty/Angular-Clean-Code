import {Lang} from './lang';

export interface User {
	id?: number;
	password?: string;
	email: string;
	userName: string;
	lang: Lang;
	group?: string;
	signupDate?: string;
}
