export interface Phenotype {
	_id: string;
	data: Array<{
		id: string;
		name: string;
	}>;
	date: string;
	validated: boolean;
}
