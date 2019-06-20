import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthorizationGuard} from './authorization.guard';

const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'login'},
	{path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
	{path: 'login', loadChildren: './login/login.module#LoginPageModule'},
	{
		path: '',
		canActivate: [AuthorizationGuard],
		children: [
			{path: 'new-patient', loadChildren: './new-patient/new-patient.module#NewPatientPageModule'},
			{path: 'phenotypes', loadChildren: './phenotypes/phenotypes.module#PhenotypesPageModule'}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
