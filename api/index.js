const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_FALLBACK';

app.use(cors());
app.use(express.json());

const MONGO_URL =
  process.env.MONGO_URL ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || process.env.DB_NAME || 'app_db';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// --- Static Fallback Data (Always available) ---
const FALLBACK_SERVICES = [
  {
    id: 's1',
    title: 'AI Integration and Automation',
    category: 'ai',
    description: 'Seamlessly integrate cutting-edge AI technologies into your existing systems.',
    icon_name: 'Cpu',
    timeline: '8-16 weeks',
    image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's2',
    title: 'Custom Software Development',
    category: 'development',
    description: 'Tailored software solutions built with modern technologies.',
    icon_name: 'Code',
    timeline: '12-24 weeks',
    image_url: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's3',
    title: 'Data Analytics and BI',
    category: 'cloud',
    description: 'Transform raw data into actionable insights with advanced analytics.',
    icon_name: 'BarChart',
    timeline: '6-12 weeks',
    image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's4',
    title: 'Cloud Migration and Optimization',
    category: 'cloud',
    description: 'Migrate your applications and data to the cloud with our expert guidance.',
    icon_name: 'Cloud',
    timeline: '8-16 weeks',
    image_url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's5',
    title: 'Mobile App Development',
    category: 'development',
    description: 'We build native and cross-platform mobile apps for iOS and Android.',
    icon_name: 'Smartphone',
    timeline: '12-24 weeks',
    image_url: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's6',
    title: 'Cybersecurity Solution',
    category: 'security',
    description: 'Protect your business from cyber threats with our comprehensive security solutions.',
    icon_name: 'Shield',
    timeline: '6-12 weeks',
    image_url: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's7',
    title: 'Digital Marketing',
    category: 'marketing',
    description: 'We help you reach your target audience and grow your business.',
    icon_name: 'Megaphone',
    timeline: '4-8 weeks',
    image_url: 'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 's8',
    title: 'SEO',
    category: 'marketing',
    description: 'Improve your search engine rankings and drive more traffic to your website.',
    icon_name: 'Search',
    timeline: '4-8 weeks',
    image_url: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }
];

const FALLBACK_JOBS = [
  {
    id: 'j1',
    title: 'Expert AI Engineer',
    category: 'engineering',
    type: 'Full-time',
    location: 'Remote',
    posted_date: 'Recently',
    description: 'Lead the development of cutting-edge AI solutions using deep learning and neural networks.',
    requirements: ['3+ years in AI/ML', 'Python Proficiency'],
    responsibilities: ['Architect AI models']
  },
  {
    id: 'j2',
    title: 'Full Stack Developer',
    category: 'engineering',
    type: 'Full-time',
    location: 'Hybrid / Bhubaneswar',
    posted_date: 'Recently',
    description: 'Build scalable web applications using modern frameworks and cutting-edge tech.',
    requirements: ['3+ years in React/Node', 'Database knowledge'],
    responsibilities: ['Maintain core web features']
  }
];

const FALLBACK_BENEFITS = [
  {
    id: 'b1',
    icon_name: 'Cpu',
    title: 'AI-Powered Systems',
    description: 'Work with the latest AI technologies and stay ahead of the curve.',
  },
  {
    id: 'b2',
    icon_name: 'Rocket',
    title: 'Competitive Pay',
    description: 'Industry-leading salaries and excellence rewards.',
  }
];

const toApiDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  const { _id, ...rest } = obj;
  const out = { id: _id.toString(), ...rest };
  if (out.description !== undefined && out.desc === undefined) out.desc = out.description;
  return out;
};

const normalizeJsonField = (value) => {
  if (value === undefined || value === null) return value;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

// --- Mongoose Schemas & Models ---
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'admins' }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    description: String,
    icon_name: String,
    timeline: String,
    image_url: String,
  },
  { collection: 'services' }
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    type: String,
    location: String,
    posted_date: String,
    description: String,
    requirements: mongoose.Schema.Types.Mixed,
    responsibilities: mongoose.Schema.Types.Mixed,
  },
  { collection: 'jobs' }
);

const benefitSchema = new mongoose.Schema(
  {
    icon_name: String,
    title: { type: String, required: true },
    description: String,
  },
  { collection: 'benefits' }
);

const testimonialSchema = new mongoose.Schema(
  {
    quote: String,
    author: String,
    role: String,
    image_url: String,
  },
  { collection: 'testimonials' }
);

const messageSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    service_interest: String,
    budget_range: String,
    message: String,
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'messages' }
);

const applicationSchema = new mongoose.Schema(
  {
    job_id: String,
    job_title: String,
    full_name: String,
    email: String,
    portfolio_url: String,
    resume_filename: String,
    cover_letter: String,
    applied_at: { type: Date, default: Date.now },
  },
  { collection: 'applications' }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
const Benefit = mongoose.models.Benefit || mongoose.model('Benefit', benefitSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

let dbReady = false;
let dbConnectionPromise = null;

async function connectAndInit() {
  if (dbReady) return;
  if (dbConnectionPromise) return dbConnectionPromise;

  dbConnectionPromise = (async () => {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(MONGO_URL, {
        dbName: MONGO_DB_NAME,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });

      dbReady = true;
      console.log(`Successfully connected to MongoDB via Mongoose (${MONGO_DB_NAME}).`);
    } catch (err) {
      dbReady = false;
      console.error('MongoDB/Mongoose connection/init failed:', err?.message || err);
      throw err;
    } finally {
      dbConnectionPromise = null;
    }
  })();

  return dbConnectionPromise;
}

app.get('/api/health/db', (req, res) => {
  if (dbReady) {
    return res.json({
      ok: true,
      dbReady: true,
      dbName: MONGO_DB_NAME,
    });
  }

  return res.status(200).json({
    ok: false,
    dbReady: false,
    dbName: MONGO_DB_NAME,
    error: 'Database connection is not ready yet.',
    details: 'Serving fallback data for now.',
  });
});

app.use('/api', async (req, res, next) => {
  if (req.path === '/health/db' || !req.path.startsWith('/admin')) {
    if (!dbReady) connectAndInit().catch(() => { });
    return next();
  }

  if (!dbReady) {
    try {
      await connectAndInit();
    } catch (err) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
  }
  next();
});

connectAndInit();

const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.admin = decoded;
    next();
  });
};

// --- Public Content Routes (With Fallback) ---
app.get('/api/services', async (req, res) => {
  try {
    if (!dbReady) throw new Error('Offline');
    const docs = await Service.find({}).exec();
    if (docs.length > 0) return res.json(docs.map(toApiDoc));
    throw new Error('Empty');
  } catch (err) {
    res.json(FALLBACK_SERVICES);
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    if (!dbReady) throw new Error('Offline');
    const docs = await Job.find({}).exec();
    if (docs.length > 0) return res.json(docs.map(toApiDoc));
    throw new Error('Empty');
  } catch (err) {
    res.json(FALLBACK_JOBS);
  }
});

app.get('/api/benefits', async (req, res) => {
  try {
    if (!dbReady) throw new Error('Offline');
    const docs = await Benefit.find({}).exec();
    if (docs.length > 0) return res.json(docs.map(toApiDoc));
    throw new Error('Empty');
  } catch (err) {
    res.json(FALLBACK_BENEFITS);
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    if (!dbReady) throw new Error('Offline');
    const docs = await Testimonial.find({}).exec();
    return res.json(docs.map(toApiDoc));
  } catch (err) {
    res.json([]);
  }
});

module.exports = app;
