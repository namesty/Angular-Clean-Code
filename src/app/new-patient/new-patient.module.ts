import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {NewPatientPage} from './new-patient.page';

const routes: Routes = [
	{path: '', component: NewPatientPage}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [NewPatientPage]
})
export class NewPatientPageModule {
}
