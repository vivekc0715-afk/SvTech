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

const Admin = mongoose.model('Admin', adminSchema);
const Service = mongoose.model('Service', serviceSchema);
const Job = mongoose.model('Job', jobSchema);
const Benefit = mongoose.model('Benefit', benefitSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Message = mongoose.model('Message', messageSchema);
const Application = mongoose.model('Application', applicationSchema);

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

  return res.status(500).json({
    ok: false,
    dbReady: false,
    dbName: MONGO_DB_NAME,
    error: 'Database connection is not ready yet.',
    details: 'The connection process is still running or failed. Check Netlify logs for more info.',
  });
});

app.use('/api', async (req, res, next) => {
  if (req.path === '/health/db' || req.path === '/admin/seed') return next();
  
  if (!dbReady) {
    try {
      await connectAndInit();
    } catch (err) {
      return res.status(500).json({
        error: 'Database connection failed',
        details: err.message,
        hint: 'Check Netlify environment variables (MONGO_URL, MONGO_DB_NAME) and MongoDB Atlas IP Whitelist (0.0.0.0/0).',
        env_state: {
          has_url: !!process.env.MONGO_URL || !!process.env.MONGODB_URI || !!process.env.MONGO_URI,
          url_preview: (process.env.MONGO_URL || process.env.MONGODB_URI || process.env.MONGO_URI || '').substring(0, 15) + '...',
          db_name: MONGO_DB_NAME,
        }
      });
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

// --- Auth Routes ---
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};

  try {
    const admin = await Admin.findOne({ username, password }).exec();
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin._id.toString(), username: admin.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({ token, username: admin.username });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Login failed' });
  }
});

// --- Public Content Routes ---
app.get('/api/services', async (req, res) => {
  const docs = await Service.find({}).exec();
  res.json(docs.map(toApiDoc));
});

app.get('/api/jobs', async (req, res) => {
  const docs = await Job.find({}).exec();
  res.json(docs.map(toApiDoc));
});

app.get('/api/benefits', async (req, res) => {
  const docs = await Benefit.find({}).exec();
  res.json(docs.map(toApiDoc));
});

app.get('/api/testimonials', async (req, res) => {
  const docs = await Testimonial.find({}).exec();
  res.json(docs.map(toApiDoc));
});

// --- Contact Form Route (Public) ---
app.post('/api/messages', async (req, res) => {
  const { firstName, lastName, email, service, budget, message } = req.body || {};

  const doc = await Message.create({
    first_name: firstName,
    last_name: lastName,
    email,
    service_interest: service,
    budget_range: budget,
    message,
  });

  res.status(201).json({ success: true, messageId: doc._id.toString() });
});

app.post('/api/applications', async (req, res) => {
  const {
    job_id,
    job_title,
    full_name,
    email,
    portfolio_url,
    resume_filename,
    cover_letter,
  } = req.body || {};

  const doc = await Application.create({
    job_id,
    job_title,
    full_name,
    email,
    portfolio_url,
    resume_filename,
    cover_letter,
  });

  res.status(201).json({ success: true, applicationId: doc._id.toString() });
});

// --- Protected Admin Management Routes ---
app.get('/api/admin/messages', authenticateAdmin, async (req, res) => {
  const docs = await Message.find({}).sort({ created_at: -1 }).exec();
  res.json(docs.map(toApiDoc));
});

app.get('/api/admin/applications', authenticateAdmin, async (req, res) => {
  const docs = await Application.find({}).sort({ applied_at: -1 }).exec();
  res.json(docs.map(toApiDoc));
});

app.get('/api/admin/applications', authenticateAdmin, async (req, res) => {
  const docs = await Application.find({}).sort({ applied_at: -1 }).exec();
  res.json(docs.map(toApiDoc));
});

app.post('/api/admin/services', authenticateAdmin, async (req, res) => {
  const { title, category, description, icon_name, timeline, image_url } = req.body || {};
  const doc = await Service.create({
    title,
    category,
    description,
    icon_name,
    timeline,
    image_url,
  });
  res.json({ success: true, id: doc._id.toString() });
});

app.put('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  const { title, category, description, icon_name, timeline, image_url } = req.body || {};
  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    { title, category, description, icon_name, timeline, image_url },
    { new: true }
  ).exec();

  if (!updated) return res.status(404).json({ error: 'Service not found' });
  res.json({ success: true });
});

app.delete('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id).exec();
  res.json({ success: true });
});

app.post('/api/admin/jobs', authenticateAdmin, async (req, res) => {
  const {
    title,
    category,
    type,
    location,
    posted_date,
    description,
    requirements,
    responsibilities,
  } = req.body || {};

  const doc = await Job.create({
    title,
    category,
    type,
    location,
    posted_date,
    description,
    requirements: normalizeJsonField(requirements),
    responsibilities: normalizeJsonField(responsibilities),
  });

  res.json({ success: true, id: doc._id.toString() });
});

app.delete('/api/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id).exec();
  res.json({ success: true });
});

app.post('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  const { quote, author, role, image_url } = req.body || {};
  const doc = await Testimonial.create({
    quote,
    author,
    role,
    image_url,
  });
  res.json({ success: true, id: doc._id.toString() });
});

app.delete('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id).exec();
  res.json({ success: true });
});

if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
