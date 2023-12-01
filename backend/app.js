const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

app.use(cookieParser());
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(fileUpload());

// Import Routes
const user = require("./routes/userRoutes");
const post = require("./routes/postRoutes");

app.use('/api/v2', user);
app.use('/api/v2', post);

module.exports = app;