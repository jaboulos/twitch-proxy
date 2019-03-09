require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const app = require('express')();
const port = process.env.PORT || 3010;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '../src/client')));

app.use(proxy('/users', {target: 'http://ec2-18-191-220-211.us-east-2.compute.amazonaws.com'}));
app.use(proxy('/recent-broadcasts', {target: 'http://ec2-54-211-139-47.compute-1.amazonaws.com'}));
app.use(proxy('/recent-highlights', {target: 'http://ec2-54-211-139-47.compute-1.amazonaws.com'}));
app.use(proxy('/popular-clips', {target: 'http://ec2-54-211-139-47.compute-1.amazonaws.com'}));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

