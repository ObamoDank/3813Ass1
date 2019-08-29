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
  userRole = "";
  user = [];

  // Data
  users = [];
  groups = [];

  // Create User Variables
  newUser = "";
  newEmail = "";
  newRole = "";

  // Delete User Variable
  killUser = "";

  // Promote User Variable
  boostUser = "";
  boostRole = "";

  // Create Group Variables
  newGroup = "";
  newAdmin = "";

  // Error variables for display
  error = "";
  createError = "";
  killError = "";
  promoteError = "";
  gCreateError = "";


  constructor(private http: HttpClient) { }

  createUser() {
    if (this.newUser && this.newEmail && this.newRole) {
      let userObj = {
        "newUser": this.newUser,
        "newEmail": this.newEmail,
        "newRole": this.newRole,
      }

      this.http.post<any>(BACKEND_URL + "/newUser", userObj).subscribe((data) => {
        console.log(data);
        if (data != "User exists breh") {
          console.log(data);
          this.users = data;
          this.trimUsers();
        } else {
          console.log(data);
          this.error = data;
        }
        this.createError = "";
        this.newUser = "";
        this.newEmail = "";
        this.newRole = "";
      });
    } else {
      this.createError = "...Just fill in the options " + this.username;
    }
  }

  destroyUser() {
    if (this.killUser) {
      let userObj = { "username": this.killUser };

      this.http.post<any>(BACKEND_URL + "/destroyUser", userObj).subscribe((data) => {
        console.log(data)
        this.users = data;
        this.trimUsers();
        this.killError = ""
        this.killUser = ""
      });
    } else {
      this.killError = "...Just pick an option"
    }
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
        this.trimUsers();
        this.promoteError = "";
        this.boostUser = "";
        this.boostRole = "";
      });
    } else {
      this.promoteError = "...Just pick an option"
    }
  }

  createGroup() {
    if (this.newGroup) {
      let groupObj = {
        "groupName": this.newGroup,
        "groupAdmin": this.newAdmin,
        "user": this.username
      }
      this.http.post<any>(BACKEND_URL + "/newGroup", groupObj).subscribe((data) => {
        console.log(data);
        if (data != "Oy group Exists ay Brah") {
          this.groups = data;
          this.newGroup = "";
          this.newAdmin = "";
          this.gCreateError = "";
        } else {
          this.error = data;
        }
      });
    } else {
      this.gCreateError = "...Mate just pick a name Ay";
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

  fetchGroups() {
    let groupObj = { "message" : "G'day maite could I get some groups over 'ere" };
    this.http.post<any>(BACKEND_URL + "/fetchGroups", groupObj).subscribe((data) => {
      console.log(data);
      this.groups = data;
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.fetchUser();
    this.fetchUsers();
    this.trimUsers();
    this.fetchGroups();
    // this.trimGroups();
    console.log(this.groups);
    this.error = ""
  }



  trimUsers() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.username == this.users[i].username) {
        this.users.splice(i, 1);
        console.log(this.users);
      }
    }
  }

  // trimGroups() {
  //   if (this.user.role != 'super') {
  //     for (let i = 0; i < this.groups.length; i++) {
  //       if (this.groups[i].admin != this.username || !this.groups[i].assis.includes(this.username) || !this.groups[i].users.includes(this.username)) {
  //         this.groups.splice(i, 1);
  //       }
  //       for (let j = 0; j < this.groups[i].channels.length; i++) {
  //         if (!this.groups[i].channels[j].access.includes(this.username)) {
  //           this.groups[i].channels.splice(j, 1);
  //         }
  //       }
  //     }
  //   }
  //   console.log(this.groups);
  // }
}
