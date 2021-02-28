 const express = require('express');
const app = express();
const port = 3000;
var redis = require('redis');
client = redis.createClient();

const {promisify} = require('util');
const asyncGet = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {

    const jobs = await asyncGet('github');

    res.header('Access-Control-Allow-Origin', "http://localhost:3001");

    return res.send(jobs);
}
 );

app.listen(port, () => console.log(`Example app listening on port ${port}!`));