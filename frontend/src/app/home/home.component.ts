// todo:
// sorting function on all tables

import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	loginFlag: boolean = false;

	first: boolean = true;
	show_e: boolean = false;
	search_e: boolean = false;
	show_f: boolean = false;
	show_e_d: boolean = false;

	username:string = '';

	searchField: string = 'Program Name';

	keyword: string = '';

	login(username: string, password: string){
		let loginOk: boolean = true;
		console.log(username + password);
		if(loginOk){
			this.loginFlag = true;
			this.username = username;
			this.first = false;
			this.show_e = true;
		}
	}

	logout(){
		this.username = '';
		this.loginFlag = false;
		this.first = true;
		this.show_e = false;
		this.search_e = false;
		this.show_f = false;
		this.show_e_d = false;
		console.log('logout');
	}

	showEventsList(){
		if(this.loginFlag){
			console.log('show events');
			this.first = false;
			this.show_e = true;
			this.search_e = false;
			this.show_f = false;
			this.show_e_d = false;
		}else{
			window.alert('Please Login!');
		}
	}

	searchEvents(){
		if(this.loginFlag){
			console.log('search events');
			this.first = false;
			this.show_e = false;
			this.search_e = true;
			this.show_f = false;
			this.show_e_d = false;
		}else{
			window.alert('Please Login!');
		}
	}

	showFavourite(){
		if(this.loginFlag){
			console.log('show favourite');
			this.first = false;
			this.show_e = false;
			this.search_e = false;
			this.show_f = true;
			this.show_e_d = false;
		}else{
			window.alert('Please Login!');
		}
	}

	// data structures for showing all events
	eventsList: Array<any> = [];
	favouriteEventsList: Array<any> = [];

	pushEventToShow(name: string, datetime: string, quota: string, location: string, type: string){
		let newE: any = {}
		newE.name = 'E3';
		newE.datetime = '2018';
		newE.quota = 'CSE';
		newE.location = '924';
		newE.type = 'fun';
		this.eventsList.push(newE);

		let newE1: any = {}
		newE1.name = 'E2';
		newE1.datetime = '2019';
		newE1.quota = 'CSE';
		newE1.location = '924';
		newE1.type = 'fun';
		this.eventsList.push(newE1);
	}

	nameClickCount = 0;
	datetimeClickCount = 0;
	quotaClickCount = 0;
	locationClickCount = 0;
	typeClickCount = 0;
	sortEvents(item: string){
		console.log('sort start');
		switch(item){
			case 'name':
				console.log('sort by name');
				if(this.nameClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
				}
				this.nameClickCount++;
			break;

			case 'datetime':
				console.log('sort by datetime');
				if(this.datetimeClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.datetime > b.datetime) ? 1 : ((b.datetime > a.datetime) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.datetime > b.datetime) ? -1 : ((b.datetime > a.datetime) ? 1 : 0));
				}
				this.datetimeClickCount++;
			break;

			case 'quota':
				console.log('sort by quota');
				if(this.quotaClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.quota > b.quota) ? 1 : ((b.quota > a.quota) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.quota > b.quota) ? -1 : ((b.quota > a.quota) ? 1 : 0));
				}
				this.quotaClickCount++;
			break;

			case 'location':
				console.log('sort by location');
				if(this.locationClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.location > b.location) ? 1 : ((b.location > a.location) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.location > b.location) ? -1 : ((b.location > a.location) ? 1 : 0));
				}
				this.locationClickCount++;
			break;

			case 'type':
				console.log('sort by type');
				if(this.typeClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.type > b.type) ? -1 : ((b.type > a.type) ? 1 : 0));
				}
				this.typeClickCount++;
			break;
		}
	}

	addEventToFavourite(event: any){
		console.log(event)
		this.favouriteEventsList.push(event);
	}

	inputKeyword(event: any){
		console.log('inputKeyword');
		this.keyword = event.target.value;
	}

	resultEventsList: Array<any> = [];

	search(){
		console.log('search');
		let newE: any = {}
		newE.name = 'E3';
		newE.datetime = '2018';
		newE.quota = 'CSE';
		newE.location = '924';
		newE.type = 'fun';
		this.resultEventsList.push(newE);
	}

	focusedEvent: any = {};
	focusedEventComments: any = [];
	showEventDetail(event: any){
		console.log('show event detail');
		this.first = false;
		this.show_e = false;
		this.search_e = false;
		this.show_f = false;
		this.show_e_d = true;
		this.focusedEvent = event;
	}



	pushComment(content: string){
		let comment: any = {};
		comment.username = this.username;
		comment.datetime = '2015';
		comment.content = content;
		this.focusedEventComments.push(comment);
	}
}
