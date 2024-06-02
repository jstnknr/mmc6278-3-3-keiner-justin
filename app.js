require('dotenv').config()
const express = require('express')

const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
const { getJobs, getCityInfo } = require('./util');
// TODO: Statically serve the public folder

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
app.get('/api/jobs', async (req, res) => {
    const { location } = req.query;
    if (!location) return res.status(400).send({ error: "Location is required" });
  
    const jobs = await getJobs(location);
    if (jobs) return res.status(200).json(jobs);
    return res.status(404).send({ error: "No jobs found" });
  });
  
  app.get('/api/cityinfo', async (req, res) => {
    const { location } = req.query;
    if (!location) return res.status(400).send({ error: "Location is required" });
  
    const cityInfo = await getCityInfo(location);
    if (cityInfo) return res.status(200).json(cityInfo);
    return res.status(404).send({ error: "City info not found" });
  });
  
module.exports = app
