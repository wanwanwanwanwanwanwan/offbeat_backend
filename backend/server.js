var express = require('express');
var app = express(),
//set listen port
port = process.env.port || 8888;
app.use(express.json());
require("./api/routes/promontion.routes")(app);
//start server
app.listen(port);

