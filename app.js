require('dotenv').config();
const express = require('express');
const path = require('path');
const { getJobs, getCityInfo } = require('./util');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/city/:city', async (req, res) => {
  const { city } = req.params;
  if (!city) return res.status(400).send({ error: "City is required" });

  const cityInfo = await getCityInfo(city);
  const jobs = await getJobs(city);

  if (cityInfo && jobs) {
    return res.status(200).json({ cityInfo, jobs });
  }

  return res.status(404).send({ error: "City info or jobs not found" });
});

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

module.exports = app;
