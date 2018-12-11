import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	constructor() {}

	ngOnInit() {
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
		this.first = false;
		this.show_f_d_v = true;
		this.show_m_e_v = false;
		this.show_m_u_v = false;
		this.show_o_e_v = false;
	}

	showManageEventsView(){
		console.log('show manage events view');
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = true;
		this.show_m_u_v = false;
		this.show_o_e_v = false;
	}

	showManageUsersView(){
		console.log('show manage users view');
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = false;
		this.show_m_u_v = true;
		this.show_o_e_v = false;
	}

	showObtainEventsView(){
		console.log('show obtain events view');
		this.first = false;
		this.show_f_d_v = false;
		this.show_m_e_v = false;
		this.show_m_u_v = false;
		this.show_o_e_v = true;	
	}

	reloadData(){
		console.log('reload data from online dataset');
	}

	eventsList:Array<any> = [];
	pushEvent(event: any){
		console.log('add event', event);
		let newE: any = {};
		newE.name = event.target.parentElement.parentElement.children[0].children[0].value;
		newE.datetime = event.target.parentElement.parentElement.children[1].children[0].value;
		newE.quota = event.target.parentElement.parentElement.children[2].children[0].value;
		newE.location = event.target.parentElement.parentElement.children[3].children[0].value;
		newE.type = event.target.parentElement.parentElement.children[4].children[0].value;
		this.eventsList.push(newE);
		console.log(newE);
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
	}

	deleteEvent(i: any){
		console.log('delete event', i);
		this.eventsList.splice(i, 1);
	}

	usersList: Array<any> = [];
	pushUser(event: any){
		console.log('add user', event);
		let newE: any = {}
		newE.name = event.target.parentElement.parentElement.children[0].children[0].value;
		newE.password = event.target.parentElement.parentElement.children[1].children[0].value;
		this.usersList.push(newE);
		console.log(newE);
	}

	updateUser(event: any, i: any){
		console.log('update user', i);
		this.usersList[i].name = event.target.parentElement.parentElement.children[0].children[0].children[0].value;
		this.usersList[i].password = event.target.parentElement.parentElement.children[1].children[0].children[0].value;
	}

	deleteUser(i: any){
		console.log('delete user', i);
		this.usersList.splice(i, 1);
	}

	onFileLoad(event: any){
		const result = event.target.result;
		let lines = result.split(/\r|\n|\r/);
		console.log('loaded result=', lines);
		console.log(lines.length);
		for(let i = 0; i < lines.length; i++){
			let data: Array<string> = lines[i].split(',');
			console.log(data);
			this.pushEventFromScript(data[0], data[1], data[2], data[3], data[4]);
		}
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
