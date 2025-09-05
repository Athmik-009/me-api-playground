const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('./Profile');

const seedData = {
  name: 'Athmik H Sooda',
  email: 'athmiksooda9@gmail.com',
  enrollmentNo: '23CSE1007',
  dob: '17-05-2005',
  mobileNo: '+91-9113039603',
  education: [
    {
      degree: 'B.Tech CSE',
      institute: 'National Institute of Technology, Goa',
      cgpa: '8.78',
      year: '2027'
    },
    {
      degree: 'Class XII (HSC)',
      institute: 'Expert PU College',
      cgpa: '97',
      year: '2023'
    },
    {
      degree: 'Class X (CBSE)',
      institute: 'Mount Carmel Central School',
      cgpa: '96.6',
      year: '2021'
    }
  ],
  skills: [
    'C', 'C++', 'Java', 'Python', 'JavaScript',
    'Data Structures and Algorithms',
    'Object Oriented Programming',
    'version Control using git and github',
    'AWS', 'Render',
    'React',
    'MySQL', 'MongoDB', 'Mongoose',
    'HTML', 'CSS', 'ejs', 'Express.js', 'Bootstrap', 'Node.js', 'Web Development',
    'Pandas', 'Rasterio', 'NumPy', 'Machine Learning', 'Remote Sensing',
    'Jupyter Notebook', 'QGIS', 'Google Earth Engine', 'Hugging Face'
  ],
  projects: [
    {
      title: 'Location Based Soil Moisture Prediction',
      description: 'Built a system to predict soil moisture levels at specific locations using satellite and environmental data. Designed the workflow to integrate multiple datasets (rainfall, soil properties, elevation, reflectance) and deployed the solution as a user-friendly web application with real-time access.',
      links: ['https://hrsm-prediction.onrender.com'],
      skills: ['Python', 'Remote Sensing', 'JavaScript', 'Node.js', 'Google Earth Engine', 'Hugging Face', 'Render', 'Web Development']
    },
    {
      title: 'Library Management System with Database',
      description: 'Developed a responsive and user-friendly library management system using Java swing in the front-end, integrated with a MySQL database for efficient data storage and retrieval, including features such as staff login, book issuance tracking, and administrative management tools.',
      links: ['https://github.com/Athmik-009/Library-management'],
      skills: ['Java', 'MySQL', 'Database Management', 'Java Swing']
    },
    {
      title: 'Multiplayer Battleship Game in C++',
      description: 'Created a console-based multiplayer Battleship game in C++ that allows two players to compete by strategically placing ships and guessing opponent ship locations, featuring turn-based gameplay, input validation, and a scoring system to enhance user engagement.',
      links: ['https://github.com/Athmik-009/Battleship-game-using-c-'],
      skills: ['C++', 'Game Development', 'Object-Oriented Programming']
    }
  ],
  work: [
    {
      title: 'Department of Information Technology Internship',
      description: 'Completed an eight-week internship at the Department of Information Technology, NITK Surathkal. Worked on \'Assessment of High-Resolution Soil Moisture from SMAP Using Machine Learning,\' downscaling SMAP data from 10 km to 500 m using MODIS, MERIT DEM, OpenLandMap, and temporal features. Key highlights: Developed a data pipeline with Google Earth Engine, geemap, and QGIS for feature engineering, using Python libraries like rasterio, pandas, and geopandas for dataset creation. Deployed a web application built with Leaflet.js, HTML, CSS, Bootstrap, JavaScript, and Node.js/Express, featuring real-time soil moisture forecasts for Karnataka (2015-2022) with Hugging Face Spaces for model inference. Honed skills in machine learning, remote sensing, geospatial analysis, and full-stack development, while mastering team collaboration with GitHub.',
      links: ['https://hrsm-prediction.onrender.com', 'https://nitk.ac.in']
    }
  ],
  links: {
    github: 'https://github.com/Athmik-009',
    linkedin: 'https://www.linkedin.com/in/athmik-sooda-076b3b289',
  },
  achievements: [
    'JEE Mains 2023: Secured a rank of 14,953 out of 1.1 million participants',
    'NEET 2023: Secured a rank of 17,936 out of 2 million participants'
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      console.log('Profile exists, updating...');
      await Profile.updateOne({}, seedData, { upsert: true, new: true });
    } else {
      console.log('Creating new profile...');
      await Profile.create(seedData);
    }
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedDatabase();