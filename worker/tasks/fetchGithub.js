
var fetch  = require('node-fetch');
var redis = require('redis');
const {promisify} = require('util');

client = redis.createClient();

const asyncSet = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub(){

    console.log('fetching github');
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    //fetch all pages
    while(resultCount > 0){
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log(`got`, resultCount, `jobs!`); 
        onPage++;
    }
    console.log(`Got`, allJobs.length, `jobs total!`)
    // filter results
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        if(jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')||
            jobTitle.includes('director')){
            return false;
        }

        return true;
        
    });

    console.log('filtered down to: ', jrJobs.length);

    
    
    //save in redis
    const succcess = await asyncSet('github', JSON.stringify(jrJobs));

    console.log({succcess});
}

fetchGithub();

module.exports = fetchGithub;