# 3813-Software Frameworks Asssignment One  
## We Are Tree

## Git Repository  

My Git repository is very simple, I’ve cloned my angular project directly into the repository in the same format it was created in. I have stored my Angular folder separate from my Server side files files and the two are linked together with help from cors. My Server side holds my server.js file along with all of my routes.  

I’ve been using my Github as a basic storage location. I did have a few minor problems, when I first created my assignment it was located inside my 3813ICT coursework folder along with all of my weekly workshops. I needed to copy the file and create a dedicated Git Repository for it so I lost all of the commits I did before that.  

My approach to version control was simple, I committed after every few routes I created. Furthermore, I did need to create a test branch when I decided to test out changes to my data structure and did not want to ruin my entire assignment. This test was successful so I merged the branch back into my master.  

## Data Structure

### Server Side

My server side data structure is stored in a JSON file. There are two entities within this file. __Groups__ and __Users:__

#### Users

-	Username - String
-	Email - String
-	Role – String (‘Super’, ‘Admin’, ‘Assis’, ‘User’)

#### Groups

-	Name – String
-	Admin – String (User)
-	Assis – Array (Array of Users)
-	Users – Array (Array of Users)
	__Channels__ – Array (Array of Channel Objects
	-Access – Array (Array of Users)
	- Name – String
	
My User array stores the required information about the users including their roles.

My Groups Array stores information about the members in each group along with their role in that particular group. It also contains an array which stores all of the channels within that group. These channels each contain an array documenting the users who have access to that array.

Users are represented in the user array.

Groups are represented in the groups array.

Channels are represented within the groups array

#### Client Side

Data is fetched from the server side and then it is stored on the client side. Once received, the client runs a number of functions on the data to prepare it before storing it in variables. The data is stored in the following arrays:

- __Groups__ – This variable holds all of the groups and channels which are relevant to the user. This is the groups which user is apart of.
- __Users__ – This variables holds all of the users except for the current User
- __User__ – This variable holds all information for current user
- __Username__ – Holds the current user’s username
- __UserRole__ – Holds the current user’s role
- __GroupData__ – Holds data for the current group which user is in
- __Channel__ – Holds data for the current Channel User is in

This is how data is stored once it is retrieved from the server, additionally, there are variables which represent the user’s current state including:

- __IsInRoom__ – If User is currently in a room.
- __IsInChannel__ – If user is currently in a channel.
- __IsRoomAdmin__ – If User is Admin of current room.
- __IsRoomAssis__ – If User is Assis of current room.
- __CurrentGroup__ – Name of Current Group user is in.
- __CurrentChannel__ – Name of Current Channel user is in.

The rest of the variables on the angular side are for inputs made by the user along with errors to be output to the user.

## Angular Architecture

### Components

This project could have been divided into many components based on the required functionality, however, only two components were utilized. These components are __Login__ and __Dash__.

__Login__ Component simple takes a username as an input and grants access to the website upon verification.

__Dash__ Component contains all of the functionality for the chat system. This includes all of the post requests to the server and all of the data needed to run the system. Since the whole chat system is run from a single component, it is quite heavy. 

### Services

The reason no services have been used is because there is only a single component handling all of the functionality for the project. The dash function is quite heavy as described above and a service could alleviate this, however, there is no use for a service in terms of reusability of functions when there is only a single component. Perhaps in future iterations, a service will be utilized for the simple measure of aiding the main component in processing.

###Models

There is a single view which is manipulated by the functionality of the html script in conjunction with the model stored in the typescript file. The data being stored in the typescript file is being displayed throughout the view and aspects of the view are altered based on the data being stored in the model. 

#### Fetch

Fetching Data from the server side. These are generally used upon initialisation of the component. 

#### Manipulate Users

Used to manipulate the Users within the database including creation of new users, deletion of users and altering the role of a current user

#### Manipulate Group

Used to manipulate groups within the database. Includes creation and deletion of groups along with granting and revoking access rights to groups.

#### Manipulating Channels

As above, used to manipulate channels. This includes creating and deleting channels along with granting and revoking access rights to channels.

## Node Server Architecture

### Modules

My Node server has a total of 18 modules, each corresponding to a given route. The server is queried by the client side via http post requests and forms on the angular template are used to specify data. This data is sent through to the Node server which manipulates the database. The data is stored as a JSON file which is read by the server, altered if necessary and rewritten to the data file. Data is also extracted by the server and returned to the client side for display. Modules are as follows:

- __Check User__: This module is used to check the user credentials in order to authenticate their login. The route checks a username against the database and if the username exists, the user is granted access.
- __Fetch User__: This module takes a username parameter and returns the user object which is stored in the database.
- __Fetch Role__: This module takes a username parameter and returns that users role.
- __Fetch Users__: This Module returns all dats about users.
- __Fetch Groups__: This module returns all data about groups.
- __New Channel__: This route takes a group name and a channel name and creates a new channel within the specified group. It also checks to see if the channel name already exists within the group and returns the updated data about groups.
- __New Group__: Module takes a group name as input along with an optional input of group admin. The route creates a new group object with empty arrays for Assis, Users and Channels, if an admin is specified, the group is created with that admin receiving privilege over it. Returns the updated list of groups.
- __New User__: Module take username, email and role input and creates a new user object based on the specifications. Returns an updated list of users.
- __New Admin__: Module takes a user as input and adds that user as an admin to a group – assuming that user has admin privileges. Returns updated list of groups.
- __New Assis__: Module takes a user as input and adds that user as an Assis to the specified channel. If user is not an Assis, they are promoted to Assis as well as being added. Returns updated list of groups and updated user list.
- __Destroy Group__: Module takes a group name as input and removes that group from the database. Returns updated list of groups.
- __Destroy User__: Module takes a username as input and removes that group from the database. Returns updates list of users.
- __Destroy Channel__: Module takes a channel name as input and removes that group from the database. Returns updated list of groups.
- __Promote User__: Module takes a username and role. The User is granted that role. Updated user data is returned.
- __Invite Channel__: Module takes a username, group and channel as input. Module loops through groups to find the group which contains the specified channel. User is added to this channel. Updated groups list is returned.
- __Invite Group__: Module takes a username and a group name as input. If user is not already a member of this group (admin, assis or user), user is added to group list. Updated group list is returned.
- __Revoke Channel__: Module takes a username, group and channel. Module finds the group which corresponds to channel and removes user from that channel. Updated group list is returned.
- __Revoke Group__: Module takes a username and a group. Module removes user from group and all channels within that group.

### Functions

Only one function has been created called remove(). This function takes an array and a user as parameters. Function checks if user is in the array and if user does exist, user is removed from array.

### Files

There are a total of 18 files within the Routes folder. These are described above.

Besides this, there is a server.js file which holds the express app along with its dependencies and houses all of the routes. There is a listen.js file which specifies the port which the route runs through. There is also a data.json file which holds all of the data for the application. There is also a package file and a node_module folder which holds all of the dependencies and npm packages for the application. There are no global variables.

## REST API and division of labour

The server acts as an API and interfaces with the angular client. The client sends http post requests to the server at port 3000 via http methods. The API interfaces with the JSON file which holds all of the data necessary for the system. Access to the database is via routes. The responsibility of the server side is essentially to take queries from the client side in the form of data. The routes hold functionality which processes the data based on requirements by the client and whole data objects are returned to the client for display and use. The data acts as a model in the standard model, view controller paradigm and the client and server share the role of controller. The server retrieves data from the data file and either returns the data directly to the client or it alters the data and writes it back to the file.

The Client takes input from the view. This input is then packaged appropriately to send to the server for processing. The server processes this data and returns and object – generally being the list of users, groups or in some cases, both. The client holds a trim function for groups and users. The trim users function takes a list of all users and removes the current user from that list. In this way, the current user is not displayed in forms. The current users data is retrieved separately and stored separately for use. The trim groups function takes a list of all groups from the server. It then removes the groups and channels within those groups which the user is not apart of. In this way, the data which is held by the user is only data which is relevant. Eg. A normal user has all groups which they do not have access to trimmed from the list of groups. As data is processed by the client side in this manner, the responsibilities of controller are shared between client and server.

Finally, the view which displays all of the data simultaneously act as a view, moderate security and input validation. As users are only able to input predetermined values into most fields, the inputs are very safe. Aside from this, only correct data will be revealed inside of those fields so it will not be possible for users to be granted access to incorrect groups or granted access privileges which were not intended.

##Client side display alterations

The html client is running a mass of angular templating. The most prominent of this templating correlates with the role of the current user. This will alter the display of the entire page. The user is only able to access various components within the view if they have the correct privilege. This data is stored in the server and retrieved upon user login. When users roles are changed, the state is changed in the view and different components are displayed for each user. 
