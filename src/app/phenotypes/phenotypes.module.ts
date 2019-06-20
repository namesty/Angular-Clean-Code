import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PhenotypesPage} from './phenotypes.page';

const routes: Routes = [
	{path: '', component: PhenotypesPage}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [PhenotypesPage]
})
export class PhenotypesPageModule {
}
