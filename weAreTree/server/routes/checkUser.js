const fs = require("fs");

module.exports = function(app, path){
    app.post("/checkUser", function(req, res){
        let username = req.body.username;
        let users = [];
        let userValid = false;
        console.log("Made it to checkUser");

        if(!req.body){
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            let allData = JSON.parse(data);
            users = allData.users;
            for(let i = 0; i < users.length; i++){

                if(username == users[i].username){
                    userValid = true
                }
            }
            res.send(userValid);
        });
    });
}