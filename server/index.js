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

app.use(proxy('/users', {target: 'http://menbar-loadbalancer-v5-1217560034.us-east-2.elb.amazonaws.com'}));
app.use(proxy('/recent-highlights', {target: 'http://twitch-categories-98365751.us-east-1.elb.amazonaws.com'}));
app.use(proxy('/recent-broadcasts', {target: 'http://twitch-categories-98365751.us-east-1.elb.amazonaws.com'}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

