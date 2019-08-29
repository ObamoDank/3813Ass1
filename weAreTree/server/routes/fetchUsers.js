const fs = require("fs");

// Module returns an array containing all user objects

module.exports = function(app, path){
    app.post("/fetchUsers", function(req, res){
        if(!req.body){
            return res.sendstatus(400);
        }

        let username = req.body.username;
        let users = {};

        console.log("Made it to Fetch Users Plural.. Roll a Doobskin.. ");
        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            let allData = JSON.parse(data);
            users = allData.users;
                // Removes active user from user array
            for(let i = 0; i < users.length; i++){
                if(users[i].username == username){
                    users.splice([i], 1);
                }
            }
            res.send(users);
        });
    });
}