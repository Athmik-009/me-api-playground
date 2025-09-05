const express = require('express');
const router = express.Router();
const Profile = require('./Profile');

// GET /health
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// GET /profile (API + UI render)
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (req.headers['accept'] === 'application/json') {
      res.json(profile || { msg: 'Profile not found' });
    } else {
      res.render('index', { profile: profile || null });  // Pass null if not found
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /profile (create/update)
router.post('/profile', async (req, res) => {
  try {
    const profileData = req.body;
    const profile = await Profile.findOneAndUpdate({}, profileData, { upsert: true, new: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /projects?skill=... (API + UI render)
router.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    if (!profile) {
      if (req.headers['accept'] === 'application/json') {
        res.json({ msg: 'Profile not found' });
      } else {
        res.render('index', { projects: null, filteredProjects: null });
      }
      return;
    }
    let projects = profile.projects || [];
    if (skill) {
      const filteredProjects = projects.filter(p => p.skills && p.skills.includes(skill.toLowerCase()));
      if (req.headers['accept'] === 'application/json') {
        res.json(filteredProjects);
      } else {
        res.render('index', { filteredProjects, projects: null });
      }
    } else {
      if (req.headers['accept'] === 'application/json') {
        res.json(projects);
      } else {
        res.render('index', { projects, filteredProjects: null });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /skills/top
router.get('/skills/top', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    const skills = profile.skills ? profile.skills.sort() : [];
    res.json(skills);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /search?query=...
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ msg: 'Query required' });
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    const results = {
      nameMatch: profile.name ? profile.name.toLowerCase().includes(query.toLowerCase()) : false,
      skills: profile.skills ? profile.skills.filter(s => s.toLowerCase().includes(query.toLowerCase())) : [],
      projects: profile.projects ? profile.projects.filter(p => 
        (p.title && p.title.toLowerCase().includes(query.toLowerCase())) || 
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      ) : []
    };
    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Home route for UI
router.get('/', (req, res) => {
  res.render('index', { profile: null, projects: null, filteredProjects: null });  // Explicitly pass null values
});

module.exports = router;