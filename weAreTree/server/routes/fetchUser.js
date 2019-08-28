const fs = require("fs");

module.exports = function(app, path){
    app.post("/fetchUser", function(req, res){
        let username = req.body.username;
        let user = {};
        
        console.log("Made it to fetchUser singular");

        if(!req.body){
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            let allData = JSON.parse(data);
            for(let i = 0; i < allData.users.length; i++){
                if(allData.users[i].username == username){
                    user = allData.users[i];
                }
            }
            res.send(user);
        });
    });
}