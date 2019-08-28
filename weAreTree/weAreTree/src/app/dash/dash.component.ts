import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  // User Info
  username;
  user = [];

  // Data
  users = [];

  // Create User Variables
  newUser = "";
  newEmail = "";
  newRole = "";

  // Delete User Variable
  killUser = "";

  // Promote User Variable
  boostUser = "";
  boostRole = "";

  // Arbitrary Variables
  error = "";


  constructor(private http: HttpClient) { }

  createUser() {
    let userObj = {
      "newUser": "",
      "newEmail": "",
      "newRole": "",
    }

    userObj.newUser = this.newUser;
    userObj.newEmail = this.newEmail;
    userObj.newRole = this.newRole;
    this.http.post<any>(BACKEND_URL + "/newUser", userObj).subscribe((data) => {
      console.log(data);
      if (data != "User exists breh") {
        console.log(data);
        this.users = data;
        this.trimUser();
      } else {
        console.log(data);
        this.error = data;
      }
    });
  }

  destroyUser() {
    let userObj = { "username": this.killUser };

    this.http.post<any>(BACKEND_URL + "/destroyUser", userObj).subscribe((data) => {
      console.log(data)
      this.users = data;
      this.trimUser();
    });
  }

  promoteUser() {
    if (this.boostUser && this.boostRole) {
      let userObj = {
        "username": this.boostUser,
        "role": this.boostRole
      }

      this.http.post<any>(BACKEND_URL + "/promoteUser", userObj).subscribe((data) => {
        console.log(data);
        this.users = data;
        this.trimUser();
        this.error="";
      });
    }else{
      this.error = "...Just pick an option"
    }
  }

  fetchUser() {
    let userObj = { "username": this.username };
    this.http.post<any>(BACKEND_URL + "/fetchUser", userObj).subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }

  fetchUsers() {
    let userObj = { "username": this.username };
    this.http.post<any>(BACKEND_URL + "/fetchUsers", userObj).subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.fetchUser();
    this.fetchUsers();
    this.error=""
  }

  trimUser() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.username == this.users[i].username) {
        this.users.splice(i, 1);
        console.log(this.users);
      }
    }
  }

}
