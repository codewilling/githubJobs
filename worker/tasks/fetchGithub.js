
var fetch  = require('node-fetch');
var redis = require('redis');
const {promisify} = require('util');

client = redis.createClient();

const asyncSet = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub(){

    console.log('fetching github');
    let resultCount = 50;
    const allJobs = [];

    //fetch all pages
    while(resultCount === 50){
        const res = await fetch(baseUrl);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = allJobs.length;
        console.log(`got`, allJobs.length, `total jobs`, `!`);
    }
    // filter results
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        let isJunior = true;

        if(jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')||
            jobTitle.includes('director')){
            return false;
        }

        return isJunior;
        
    });

    console.log('filtered down to: ', jrJobs.length);

    //set in redis
    

    const succcess = await asyncSet('github', JSON.stringify(jrJobs));

    console.log({succcess});
}

module.exports = fetchGithub;