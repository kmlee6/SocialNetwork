import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
	{ path: 'admin/:view', component: AdminComponent },
	{ path: 'home/:view', component: HomeComponent },
	{ path: '**', redirectTo: 'home/0' }
  ];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AboutComponent,
		NavComponent,
		AdminComponent
	],
	imports: [
		RouterModule.forRoot(
			appRoutes
		),
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { 
	
}
