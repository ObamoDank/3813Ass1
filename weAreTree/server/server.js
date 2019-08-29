const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyparser = require("body-parser");
const path = require("path");

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname + '../weAreTree/dist/weAreTree')));

require("./listen.js")(app, path);
require("./routes/checkUser.js")(app, path);
require("./routes/newUser.js")(app, path);
require("./routes/destroyUser.js")(app, path);
require("./routes/promoteUser.js")(app, path);
require("./routes/fetchUser.js")(app, path);
require("./routes/fetchRole.js")(app, path);
require("./routes/fetchUsers.js")(app, path);
require("./routes/newGroup.js")(app, path);
require("./routes/destroyGroup.js")(app, path);
require("./routes/fetchGroups.js")(app, path);
require("./routes/newChannel.js")(app, path);
require("./routes/destroyChannel.js")(app, path);