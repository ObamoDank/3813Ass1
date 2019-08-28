const fs = require("fs");

module.exports = function(app, path){
    app.post("/newUser", function(req, res){
        let newUser = {
            "username" : req.body.newUser,
            "email" : req.body.newEmail,
            "role" : req.body.newRole,
            "isRoomAdmin" : false,
            "isRoomAssis" : false
        }

        let userExists = false;
        let allData = [];
        let users = [];
        console.log("Made it to new User");

        if(!req.body){
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
            allData = JSON.parse(data);
            for(let i = 0; i < allData.users.length; i++){
                if(allData.users[i].username == newUser.username){
                    userExists = true;
                }
            }
            if(!userExists){
                allData.users.push(newUser);
                users = allData.users;
                console.log(allData);
                allDataJson = JSON.stringify(allData);
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    if(err){
                        throw err;
                    }
                });
                res.send(users);
            }else{
                res.send("User exists breh");
            }
        });
    });
}