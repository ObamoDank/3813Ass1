const fs = require("fs");

// Module returns an array containing all user objects

module.exports = function(app, path){
    app.post("/fetchUsers", function(req, res){
        let username = req.body.username;
        let users = {};
        console.log("Made it to fetchUsers plural");
        console.log(username);

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            users = allData.users;
                // Removes active user from user array
            for(let i = 0; i < users.length; i++){
                if(users[i].username == username){
                    console.log(users[i]);
                    users.splice([i], 1);
                }
            }
            console.log(users);
            res.send(users);
        });
    });
}