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

// app.use(proxy('/menu-users', {target: 'http://test-proxy-lb-stress-522239733.us-east-2.elb.amazonaws.com'}));
// app.use(proxy('/users', {target: 'http://twitchchat-418651990.us-west-1.elb.amazonaws.com'}));
// app.use(proxy('/recent-broadcasts', {target: 'https://s3.amazonaws.com/kp-misc/bundle.js'}));
// app.use(proxy('/api/videos', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));
// app.use(proxy('/api/users', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));
// app.use(proxy('/api/games', {target: 'http://video-player-1531420554.us-west-1.elb.amazonaws.com'}));


app.use(proxy('/users', {target: 'http://ec2-13-59-141-181.us-east-2.compute.amazonaws.com'}));
app.use(proxy('/chat', {target: 'http://ec2-18-221-253-38.us-east-2.compute.amazonaws.com'}));
app.use(proxy('/recent-broadcasts', {target: 'http://ec2-52-207-247-179.compute-1.amazonaws.com', changeOrigin: true}));
// app.use(proxy('/', {target: 'http://ec2-35-174-168-96.compute-1.amazonaws.com'}));
app.use(proxy('/api/videos', {target: 'http://ec2-18-224-184-152.us-east-2.compute.amazonaws.com', changeOrigin: true}));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});