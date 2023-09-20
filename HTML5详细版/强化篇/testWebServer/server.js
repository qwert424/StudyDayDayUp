var express = require('express');
const path = require('path');
var app = new express();
app.use(express.static(path.join(__dirname, "public")))
app.listen(12306);//端口号大于8000或者80