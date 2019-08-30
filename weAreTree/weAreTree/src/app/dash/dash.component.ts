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
  isInRoom = false;
  isRoomAdmin = false;
  isRoomAssis = false;

  // Data
  users = [];
  groups = [];

  // Create User Variables
  newUser = "";
  newEmail = "";
  newRole = "";
  createError = "";

  // Delete User Variable
  killUser = "";
  killError = ""

  // Promote User Variable
  boostUser = "";
  boostRole = "";
  promoteError = "";

  // Create Group Variables
  newGroup = "";
  newAdmin = "";
  gCreateError = "";

  // Destroy Group Variables
  killGroup = "";
  gKillError = "";

  // Create Channel Variables
  newChanGroup = "";
  newChan = "";
  cCreateError = "";

  // Destroy Channel Variables
  killChanGroup = ""
  killChan = "";
  cKillError = "";

  // Invite to Group Variables
  inviteGroupName = "";
  inviteGroupUser = "";
  inviteGroupRole = "";
  iGroupError = "";

  // Revoke from Group Variables
  revokeGroupName = "";
  revokeGroupUser = "";
  rGroupError = "";

  // Invite to Channel Variables
  inviteChanGroupName = "";
  inviteChanName = "";
  inviteChanUser = "";
  iChanError = "";

  // Revoke from Channel Variables
  revokeChanGroupName = "";
  revokeChanName = "";
  revokeChanUser = "";
  rChanError = "";

  // Error variables for display
  error = "";

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
        this.users = data.users;
        this.groups = data.groups;
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
          this.trimGroups();
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

  destroyGroup() {
    if (this.killGroup) {
      let groupObj = { "name": this.killGroup };

      this.http.post<any>(BACKEND_URL + "/destroyGroup", groupObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.killGroup = "";
        this.gKillError = "";
      });
    } else {
      this.gKillError = "...Just pick a room mate";
    }
  }

  createChannel() {
    if (this.newChanGroup && this.newChan) {
      let chanObj = {
        "channelGroup": this.newChanGroup,
        "channelName": this.newChan
      }

      this.http.post<any>(BACKEND_URL + "/newChannel", chanObj).subscribe((data) => {
        console.log(data);
        if (data != "Oy channel Exists ay Brah") {
          this.groups = data;
          this.trimGroups();
          this.newChanGroup = "";
          this.newChan = "";
          this.cCreateError = "";
        } else {
          this.error = data;
        }
      });
    } else {
      this.cCreateError = "...Mate just pick a name Ay";
    }
  }

  destroyChannel() {
    if (this.killChanGroup && this.killChan) {
      let chanObj = {
        "channelGroup": this.killChanGroup,
        "channelName": this.killChan
      };

      this.http.post<any>(BACKEND_URL + "/destroyChannel", chanObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.killChan = "";
        this.killChanGroup = "";
        this.cKillError = "";
      });
    } else {
      this.cKillError = "...Just pick a room mate";
    }
  }

  inviteGroup() {
    if (this.inviteGroupName && this.inviteGroupUser) {
      let invObj = {
        "groupName": this.inviteGroupName,
        "username": this.inviteGroupUser,
        "role": this.inviteGroupRole
      };

      if (!this.inviteGroupRole) {
        invObj.role = "user";
      }

      this.http.post<any>(BACKEND_URL + "/inviteGroup", invObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.inviteGroupName = "";
        this.inviteGroupUser = "";
        this.inviteGroupRole = "";
        this.iGroupError = "";
      });
    } else {
      this.iGroupError = "...Just pick a dude mate";
    }
  }

  revokeGroup() {
    if (this.revokeGroupName && this.revokeGroupUser) {
      let invObj = {
        "groupName": this.revokeGroupName,
        "username": this.revokeGroupUser,
        "role": this.inviteGroupRole
      };

      this.http.post<any>(BACKEND_URL + "/revokeGroup", invObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.revokeGroupName = "";
        this.revokeGroupUser = "";
        this.rGroupError = "";
      });
    } else {
      this.rGroupError = "...Just pick a dude mate";
    }
  }

  inviteChannel() {
    if (this.inviteChanGroupName && this.inviteChanName && this.inviteChanUser) {
      let invObj = {
        "groupName": this.inviteChanGroupName,
        "channelName": this.inviteChanName,
        "username": this.inviteChanUser
      };

      this.http.post<any>(BACKEND_URL + "/inviteChannel", invObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.inviteChanGroupName = "";
        this.inviteChanName = "";
        this.inviteChanUser = "";
        this.iChanError = "";
      });
    } else {
      this.iChanError = "...Just pick a dude mate";
    }
  }

  revokeChannel() {
    if (this.revokeChanGroupName && this.revokeChanName && this.revokeChanUser) {
      let invObj = {
        "groupName": this.revokeChanGroupName,
        "channelName": this.revokeChanName,
        "username": this.revokeChanUser
      };

      this.http.post<any>(BACKEND_URL + "/revokeChannel", invObj).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.trimGroups();
        this.revokeChanGroupName = "";
        this.revokeChanName = "";
        this.revokeChanUser = "";
        this.rChanError = "";
      });
    } else {
      this.rChanError = "...Just pick a dude mate";
    }
  }

  fetchUser() {
    let userObj = { "username": this.username };
    this.http.post<any>(BACKEND_URL + "/fetchUser", userObj).subscribe((data) => {
      console.log(data)
      this.user = data;
    });
  }

  fetchRole() {
    let userObj = { "username": this.username };
    this.http.post<any>(BACKEND_URL + "/fetchRole", userObj).subscribe((data) => {
      this.userRole = data.role;
      console.log(this.userRole);
    });
  }

  fetchUsers() {
    let userObj = { "username": this.username };
    this.http.post<any>(BACKEND_URL + "/fetchUsers", userObj).subscribe((data) => {
      this.users = data;
      this.trimUsers();
    });
  }

  fetchGroups() {
    let groupObj = { "message": "G'day maite could I get some groups over 'ere" };
    this.http.post<any>(BACKEND_URL + "/fetchGroups", groupObj).subscribe((data) => {
      this.groups = data;
      this.trimGroups();
      console.log(this.groups)
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.fetchUser();
    this.fetchRole();
    this.fetchUsers();
    this.fetchGroups();
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

  trimGroups() {
    if (this.userRole != 'super') {
      console.log(this.userRole);
      for (let i = this.groups.length - 1; i >= 0; i--) {
        if (this.groups[i].admin != this.username && !this.groups[i].assis.includes(this.username) && !this.groups[i].users.includes(this.username)) {
          this.groups.splice(i, 1);
        } else {
          if (this.groups[i].admin != this.username && !this.groups[i].assis.includes(this.username)) {
            if (this.groups[i].channels != []) {
              for (let j = this.groups[i].channels.length - 1; j >= 0; j--) {
                if (!this.groups[i].channels[j].access.includes(this.username)) {
                  this.groups[i].channels.splice(j, 1);
                }
              }
            }
          }
        }
      }
      console.log(this.groups);
    }
  }
}
