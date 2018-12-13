import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminRouting } from './admin.module';
import * as $ from 'jquery';
import sha256 from 'js-sha256';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) {}

	path: any;
	sub: any;

	eventsList:Array<any> = [];
	usersList: Array<any> = [];

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.path = params; // (+) converts string 'id' to a number
			console.log(this.path);
			switch(this.path['view']){
				case '1':
					this.showFlushDataView();
				break;
				case '2':
					this.showManageEventsView();
				break;
				case '3':
					this.showManageUsersView();
				break;
				case '4':
					this.showObtainEventsView();
				break;
			}
			// In a real app: dispatch action to load the details here.
		});
	}

	loginFlag: boolean = true;
	first: boolean = true;
	show_f_d_v: boolean = false;
	show_m_e_v: boolean = false;
	show_m_u_v: boolean = false;
	show_o_e_v: boolean = false;

	logout(){
		console.log('logout');
	}

	showFlushDataView(){
		console.log('show flush data view');
		this.router.navigate(['admin/1']);
		this.first = false;
		this.show_f_d_v = true;
		this.show_m_e_v = false;
		this.show_m_u_v = false;
		this.show_o_e_v = false;
	}

	showManageEventsView(){
		this.eventsList = [];
		console.log('show manage events view');
		this.router.navigate(['admin/2']);
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = true;
		this.show_m_u_v = false;
		this.show_o_e_v = false;

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
	}

	showManageUsersView(){
		this.usersList = [];
		console.log('show manage users view');
		this.router.navigate(['admin/3']);
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = false;
		this.show_m_u_v = true;
		this.show_o_e_v = false;
		//send post request to get all events
		$.get('http://localhost:3000/getAllUser', (data, status) => {
			console.log(status, data);
			//add all data to local list
			for(let i = 0; i < data.length; i++){
				let newE: any = {};
				newE.uid = data[i].uid;
				newE.name = data[i].name;
				this.usersList.push(newE);
			}
		});
	}

	showObtainEventsView(){
		console.log('show obtain events view');
		this.router.navigate(['admin/4']);
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = false;
		this.show_m_u_v = false;
		this.show_o_e_v = true;	
	}

	reloadData(){
		console.log('reload data from online dataset');

		//send get request
		$.get('http://localhost:3000/flushData', (data, status) => console.log(status));
	}

	pushEvent(event: any){
		console.log('_add event', event);
		let newE: any = {};
		newE.name = event.target.parentElement.parentElement.children[0].children[0].value;
		newE.datetime = event.target.parentElement.parentElement.children[1].children[0].value;
		newE.quota = event.target.parentElement.parentElement.children[2].children[0].value;
		newE.location = event.target.parentElement.parentElement.children[3].children[0].value;
		newE.type = event.target.parentElement.parentElement.children[4].children[0].value;
		// send new event
		$.post('http://localhost:3000/addEvent', {
			name: newE.name,
			datetime: newE.datetime,
			quota: newE.quota,
			location: newE.location,
			type: newE.type
		}, (data, status) => this.eventsList.push(newE));
	}

	pushEventFromScript(name: string, datetime: string, quota: string, location: string, type: string){
		console.log('add event', event);
		let newE: any = {};
		newE.name = name;
		newE.datetime = datetime;
		newE.quota = quota;
		newE.location = location;
		newE.type = type;
		this.eventsList.push(newE);
		console.log(newE);
	}

	updateEvent(event: any, i:any){
		console.log('update event', i);
		this.eventsList[i].name = event.target.parentElement.parentElement.children[0].children[0].children[0].value;
		this.eventsList[i].datetime = event.target.parentElement.parentElement.children[1].children[0].children[0].value;
		this.eventsList[i].quota = event.target.parentElement.parentElement.children[2].children[0].children[0].value;
		this.eventsList[i].location = event.target.parentElement.parentElement.children[3].children[0].children[0].value;
		this.eventsList[i].type = event.target.parentElement.parentElement.children[4].children[0].children[0].value;

		//update
		$.post('http://localhost:3000/editEvent/' + this.eventsList[i].eid, {
			name: this.eventsList[i].name,
			datetime: this.eventsList[i].datetime,
			quota: this.eventsList[i].quota,
			location: this.eventsList[i].location,
			type: this.eventsList[i].type
		}, (data, status) => console.log(data));
	}

	deleteEvent(i: any){
		console.log('delete event', i);
		//delete
		$.get('http://localhost:3000/removeEvent/' + this.eventsList[i].eid, (data, status) => this.eventsList.splice(i, 1));
	}

	pushUser(event: any){
		console.log('add user', event);
		let newE: any = {}
		newE.name = event.target.parentElement.parentElement.children[0].children[0].value;
		newE.password = sha256(event.target.parentElement.parentElement.children[1].children[0].value);

		//add user request
		$.post('http://localhost:3000/addUser', {
			name: newE.name,
			password: newE.password
		}, (data, status) => this.usersList.push(newE));

		console.log(newE);
	}

	updateUser(event: any, i: any){
		console.log('update user', i);
		this.usersList[i].name = event.target.parentElement.parentElement.children[0].children[0].children[0].value;
		this.usersList[i].password = sha256(event.target.parentElement.parentElement.children[1].children[0].children[0].value);

		$.post('http://localhost:3000/editUser/' + this.usersList[i].uid, {
			name: this.usersList[i].name,
			password: this.usersList[i].password
		}, (data, status) => console.log(data));
	}

	deleteUser(i: any){
		console.log('delete user', i);
		$.get('http://localhost:3000/removeUser/' + this.usersList[i].uid, (data, status) => this.usersList.splice(i, 1));
	}

	onFileLoad(event: any){
		const result = event.target.result;
		let lines = result.split(/\r|\n|\r/);
		console.log('loaded result=', lines);
		console.log(lines.length);
		let newEventList: Array<any> = [];
		for(let i = 0; i < lines.length; i++){
			let data: Array<string> = lines[i].split(',');
			console.log(data);
			// this.pushEventFromScript(data[0], data[1], data[2], data[3], data[4]);
			let newE: any = {};
			newE.name = data[0];
			newE.datetime = data[1];
			newE.quota = data[2];
			newE.location = data[3];
			newE.type = data[4];
			newEventList.push(newE);
		}
		console.log(JSON.stringify(newEventList));
		$.post('http://localhost:3000/addEventList',{ 
			eventList: JSON.stringify(newEventList)
	}, (data, status) => console.log(data));
	}

	// learnt from stackoverflow
	selectedFile(event: any){
		console.log(event.target.files);
		if(event.target.files[0].type != 'text/csv'){
			window.alert('Please upload a CSV file.');
		}else{
			const read = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = (e) => this.onFileLoad(e);
			fileReader.readAsText(read, 'UTF-8');
		}
	}
}
