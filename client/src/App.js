import fetch from 'node-fetch';
import React from 'react';
import './App.css';
import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3000/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
  console.log({json});
}

function App() {

  const [jobsList, updateJobs] = React.useState([]);

  React.useEffect(()=>{
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList}/>
    </div>
  );
}

export default App;
