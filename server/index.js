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

app.use(proxy('/menu-users', {target: 'http://test-proxy-lb-stress-522239733.us-east-2.elb.amazonaws.com'}));
app.use(proxy('/users', {target: 'http://twitchchat-418651990.us-west-1.elb.amazonaws.com'}));
app.use(proxy('/recent-broadcasts', {target: 'https://s3.amazonaws.com/kp-misc/bundle.js'}));
app.use(proxy('/api/videos', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));
app.use(proxy('/api/users', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));
app.use(proxy('/api/games', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});