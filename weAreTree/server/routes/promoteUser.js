const fs = require("fs")

module.exports = function(app, path){
    app.post("/promoteUser", function(req, res){
        if(!req.body){
            return res.sendstatus(400);
        }

        let username = req.body.username;
        let newRole = req.body.role;

        console.log("Made it to Promote User.. Feel Free to relax..");
        fs.readFile("./data.json", "utf-8", function(err, data){
            if(err){
                throw err;
            }
            allData = JSON.parse(data)
            for(let i = 0; i < allData.users.length; i++){
                if(username == allData.users[i].username){
                    allData.users[i].role = newRole; 
                }
            }
            users = allData.users;
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