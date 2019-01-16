const express = require('express');
const path = require('path');
const cors = require('cors');
const proxy = require('express-http-proxy');
const app = require('express')();
const port = process.env.PORT || 3010;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '../src/client')));


// app.use('/users', proxy('http://127.0.0.1:3028/users'));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});