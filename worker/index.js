var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetchGithub');

new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');