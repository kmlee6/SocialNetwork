import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'admin/:view'}
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

export class AdminRouting{}