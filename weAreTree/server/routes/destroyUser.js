const fs = require("fs");

module.exports = function(app, path){
    app.post("/destroyUser", function(req, res){
        let username = req.body.username;
        let users = [];
        
        if(!req.body){
            return res.sendstatus(400);
        }

        console.log("Made it to Destroy User");
        fs.readFile("./data.json", "utf-8", function(err, data){
            if(err){
                throw err;
            }
            let allData = JSON.parse(data);
            for(let i = 0; i < allData.users.length; i++){
                if(username == allData.users[i].username){
                    allData.users.splice([i], 1);
                    console.log(allData.users[i]);
                }
            }
            users = allData.users;
            // console.log(users);
            let allDataJson = JSON.stringify(allData);
            fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                if(err){
                    throw err;
                }
            });
            res.send(users);
        });
    });
}