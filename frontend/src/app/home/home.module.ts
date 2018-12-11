import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'home/:view'}
  ];

@NgModule({
	imports: [
		RouterModule.forChild(
			appRoutes
		)
    ],
    exports:[
        RouterModule
    ]
})

export class HomeRouting{}