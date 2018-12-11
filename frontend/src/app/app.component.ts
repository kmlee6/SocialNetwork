import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as express from 'express'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Good Social Network';
	// 0: user, 1: admin
	loginType: number = 0;
}
