// todo:
// sorting function on all tables

import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HomeRouting } from './home.module';
import * as $ from 'jquery';
// import { sha256 } from 'js-sha256';
import { CookieService } from 'ngx-cookie-service';
import { Cookies } from 'js-cookie';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService) { }

	path: any;
	sub: any;

	eventsList: Array<any> = [];
	favouriteEventsList: Array<any> = [];

	username:string = '';
	userid:string = '';

	first: boolean = true;
	show_e: boolean = false;
	search_e: boolean = false;
	show_f: boolean = false;
	show_e_d: boolean = false;

	ngOnInit() {
		this.userid = this.cookieService.get('login');
		this.username = this.cookieService.get('loginname');
		this.sub = this.route.params.subscribe(params => {
			this.path = params; // (+) converts string 'id' to a number
			console.log(this.path);
			switch(this.path['view']){
				case '0':
					if(this.cookieService.get('login') != ''){
						this.navigate(1);
					}
				break;
				case '1':
					this.showEventsList();
				break;
				case '2':
					this.searchEvents();
				break;
				case '3':
					this.showFavourite();
				break;
			}
			// In a real app: dispatch action to load the details here.
		});
	}

	loginFlag: boolean = false;

	searchField: string = 'name';

	keyword: string = '';

	navigate(page: any){
		this.router.navigate(['home/' + page]);
	}

	login(username: string, userpassword: string){
		let loginOk: boolean = false;

		//check login
		$.post('http://localhost:3000/login', {
			name: username,
			password: Md5.hashStr(userpassword)
		}, (data, status) => {
			console.log(data);
			if(data.login == true){
				this.userid = data.uid;
				loginOk = true;
				// set login ok to cookie
				this.cookieService.set('login', data.uid);
				this.cookieService.set('loginname', username);
				this.username = username;
				this.first = false;
				this.show_e = true;
				this.loginFlag = true;
				this.router.navigate(['home/1']);
			}else{
				alert('login failed');
			}
		})
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
		this.navigate(0);
		this.cookieService.set('login', '');
	}

	showEventsList(){
		this.loginFlag = false;
		this.eventsList = [];
		console.log(this.cookieService.get('login'));
		if(this.cookieService.get('login') != ''){
			this.loginFlag = true;
			console.log(this.cookieService.get('login') != '');
		}
		if(this.loginFlag){
			// this.router.navigate(['home/1']);
			console.log('show events');
			this.first = false;
			this.show_e = true;
			this.search_e = false;
			this.show_f = false;
			this.show_e_d = false;
			//send post request to get all events
			$.get('http://localhost:3000/getAllEvent', (data, status) => {
				console.log(status, data);
				//add all data to local list
				for(let i = 0; i < data.length; i++){
					let newE: any = {};
					newE.eid = data[i].eid;
					newE.name = data[i].name;
					newE.datetime = data[i].datetime;
					newE.quota = data[i].quota;
					newE.location = data[i].location;
					newE.type = data[i].type;
					this.eventsList.push(newE);
				}
			});
		}else{
			window.alert('Please Login!');
			this.router.navigate(['home/0']);
		}
	}

	searchEvents(){
		this.loginFlag = false;
		if(this.cookieService.get('login') != ''){
			this.loginFlag = true;
		}
		if(this.loginFlag){
			// this.router.navigate(['home/2']);
			console.log('search events');
			this.first = false;
			this.show_e = false;
			this.search_e = true;
			this.show_f = false;
			this.show_e_d = false;
		}else{
			window.alert('Please Login!');
			this.router.navigate(['home/0']);
		}
	}

	showFavourite(){
		this.loginFlag = false;
		if(this.cookieService.get('login') != ''){
			this.loginFlag = true;
		}
		if(this.loginFlag){
			this.favouriteEventsList = [];
			// this.router.navigate(['home/3']);
			console.log('show favourite');
			this.first = false;
			this.show_e = false;
			this.search_e = false;
			this.show_f = true;
			this.show_e_d = false;
			$.get('http://localhost:3000/getBookMark/' + this.userid, (data, status) => {
				console.log(status, data);
				//add all data to local list
				for(let i = 0; i < data.length; i++){
					let newE: any = {};
					newE.eid = data[i].eid;
					newE.name = data[i].name;
					newE.datetime = data[i].datetime;
					newE.quota = data[i].quota;
					newE.location = data[i].location;
					newE.type = data[i].type;
					this.favouriteEventsList.push(newE);
				}
			});
		}else{
			window.alert('Please Login!');
			this.router.navigate(['home/0']);
		}
	}

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

	eidClickCount = 0;
	nameClickCount = 0;
	datetimeClickCount = 0;
	quotaClickCount = 0;
	locationClickCount = 0;
	typeClickCount = 0;
	sortEvents(item: string){
		console.log('sort start');
		switch(item){
			case 'eid':
				console.log('sort by eid');
				if(this.eidClickCount % 2 == 0){
					this.eventsList.sort((a,b) => (a.eid > b.eid) ? 1 : ((b.eid > a.eid) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (a.eid > b.eid) ? -1 : ((b.eid > a.eid) ? 1 : 0));
				}
				this.eidClickCount++;
			break;

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
					this.eventsList.sort((a,b) => (parseInt(a.quota) > parseInt(b.quota)) ? 1 : ((parseInt(b.quota) > parseInt(a.quota)) ? -1 : 0));
				}else{
					this.eventsList.sort((a,b) => (parseInt(a.quota) > parseInt(b.quota)) ? -1 : ((parseInt(b.quota) > parseInt(a.quota)) ? 1 : 0));
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
		//send add fav request
		$.post('http://localhost:3000/addBookMark', {
			uid: this.userid,
			bookmark: event.eid
		}, (data, status) => {
			console.log(data);
			this.favouriteEventsList.push(event);
		});
	}

	inputKeyword(event: any){
		console.log('inputKeyword');
		this.keyword = event.target.value;
	}

	resultEventsList: Array<any> = [];

	search(){
		console.log(this.searchField, this.keyword);
		this.resultEventsList = [];
		$.get('http://localhost:3000/getEvent/' + this.searchField + '/' + this.keyword,  (data, status) => {
			{
				console.log(data);
				for(let i = 0; i < data.length; i++){
					let newE: any = {};
					newE.eid = data[i].eid;
					newE.name = data[i].name;
					newE.datetime = data[i].datetime;
					newE.quota = data[i].quota;
					newE.location = data[i].location;
					newE.type = data[i].type;
					this.resultEventsList.push(newE);
				}
			}
		});
	}

	focusedEvent: any = {};
	focusedEventComments: any = [];
	showEventDetail(event: any){
		this.focusedEventComments = [];
		console.log('show event detail');
		this.first = false;
		this.show_e = false;
		this.search_e = false;
		this.show_f = false;
		this.show_e_d = true;
		this.focusedEvent = event;

		//send post comment request
		$.get('http://localhost:3000/getComment/' + this.focusedEvent.eid, (data, status) => {
			console.log(data);
			//list comment
			for(let i = 0; i < data.length; i++){
				let c: any = {};
				c.username = data[i].username;
				c.datetime = data[i].time;
				c.content = data[i].comment;
				this.focusedEventComments.push(c);
			}
		});
	}



	pushComment(content: string){
		console.log(this.userid);
		$.post('http://localhost:3000/saveComment', {
			eid: this.focusedEvent.eid,
			uid: this.userid,
			username: this.username,
			comment: content
		}, (data, status) => {
			console.log(data);
			this.showEventDetail(this.focusedEvent);
		});
	}
}
