const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data store path
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Mock Data
const services = [
  {
    id: 1,
    title: 'Building Project Service',
    description: 'Industrial engineering this Construction branch building this template.',
    features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
    indexText: '01'
  },
  {
    id: 2,
    title: 'Experienced of Team',
    description: 'Industrial engineering this Construction branch building this template.',
    features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
    indexText: '02'
  },
  {
    id: 3,
    title: 'Calculations Service',
    description: 'Industrial engineering this Construction branch building this template.',
    features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
    indexText: '03'
  }
];

const projects = [
  {
    id: 1,
    title: 'Modern Highrise Crane',
    category: 'Building',
    subtitle: 'Business / Growing',
    image: '/images/project_1.png',
    size: 'tall' // layout styling
  },
  {
    id: 2,
    title: 'Site Engineering Review',
    category: 'Architecture',
    subtitle: 'Business / Growing',
    image: '/images/project_2.png',
    size: 'square'
  },
  {
    id: 3,
    title: 'Corporate HQ Planning',
    category: 'Client Satisfied',
    subtitle: 'Business / Growing',
    image: '/images/project_3.png',
    size: 'square'
  },
  {
    id: 4,
    title: 'Structural Reinforcement',
    category: 'Support',
    subtitle: 'Business / Growing',
    image: '/images/project_4.png',
    size: 'square'
  },
  {
    id: 5,
    title: 'Urban Center Scaffold',
    category: 'Building',
    subtitle: 'Business / Growing',
    image: '/images/project_5.png',
    size: 'square'
  },
  {
    id: 6,
    title: 'Eco-Friendly Construction',
    category: 'Architecture',
    subtitle: 'Business / Growing',
    image: '/images/project_6.png',
    size: 'wide'
  }
];

const team = [
  {
    id: 1,
    name: 'Rebar Butae',
    role: 'Manager',
    image: '/images/team_1.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  },
  {
    id: 2,
    name: 'Latar Bara',
    role: 'Founder',
    image: '/images/team_2.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  },
  {
    id: 3,
    name: 'Rasel Kart',
    role: 'Manager',
    image: '/images/team_3.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  },
  {
    id: 4,
    name: 'Poral Meta',
    role: 'Manager',
    image: '/images/team_4.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  },
  {
    id: 5,
    name: 'Karl Werner',
    role: 'Senior Engineer',
    image: '/images/team_5.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  },
  {
    id: 6,
    name: 'Sarah Jenkins',
    role: 'Site Inspector',
    image: '/images/team_6.png',
    socials: { facebook: '#', twitter: '#', google: '#', instagram: '#' }
  }
];

const blogs = [
  {
    id: 1,
    title: 'Work in the Vulnerable Building Commercial of blog',
    description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
    author: 'Admin',
    date: 'Agu 02, 2023',
    comments: 2,
    rating: 5,
    category: 'ENGINEER',
    image: '/images/blog_1.png'
  },
  {
    id: 2,
    title: 'Work in the Vulnerable Building Commercial of blog',
    description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
    author: 'Admin',
    date: 'Agu 02, 2023',
    comments: 2,
    rating: 5,
    category: 'BUILDING',
    image: '/images/blog_2.png'
  },
  {
    id: 3,
    title: 'Work in the Vulnerable Building Commercial of blog',
    description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
    author: 'Admin',
    date: 'Agu 02, 2023',
    comments: 2,
    rating: 5,
    category: 'ENGINEER',
    image: '/images/blog_3.png'
  },
  {
    id: 4,
    title: 'Work in the Vulnerable Building Commercial of blog',
    description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
    author: 'Admin',
    date: 'Agu 02, 2023',
    comments: 2,
    rating: 5,
    category: 'BUILDING',
    image: '/images/blog_4.png'
  }
];

// Endpoints
app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/team', (req, res) => {
  res.json(team);
});

app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const newSubmission = {
    id: Date.now(),
    name: name || 'Anonymous',
    email,
    phone: phone || '',
    message,
    timestamp: new Date().toISOString()
  };

  // Read existing, append, write back
  let submissions = [];
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
      submissions = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading contacts file:', err);
  }

  submissions.push(newSubmission);

  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(submissions, null, 2));
    res.status(201).json({ success: true, message: 'Message submitted successfully.', data: newSubmission });
  } catch (err) {
    console.error('Error writing contacts file:', err);
    res.status(500).json({ error: 'Failed to save submission.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
