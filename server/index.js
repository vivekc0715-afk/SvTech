const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'solvion_secret_key';

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || process.env.DB_NAME || 'solvion_db';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

let dbReady = false;

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
    password: { type: String, required: true }, // plaintext for now to match existing behavior
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

async function seedIfNeeded() {
  await Admin.updateOne(
    { username: ADMIN_USERNAME },
    { $set: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } },
    { upsert: true }
  );

  const [jobsCount, benefitsCount, testimonialsCount] = await Promise.all([
    Job.countDocuments({}),
    Benefit.countDocuments({}),
    Testimonial.countDocuments({}),
  ]);

  // Services are always re-seeded
  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: 'AI Integration and Automation',
      category: 'ai',
      description:
        'Seamlessly integrate cutting-edge AI technologies into your existing systems. From machine learning models to natural language processing, we automate complex workflows and enhance decision-making capabilities.',
      icon_name: 'Cpu',
      timeline: '8-16 weeks',
      image_url:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Custom Software Development',
      category: 'development',
      description:
        'Tailored software solutions built with modern technologies to meet your unique business requirements. We deliver scalable, maintainable applications that grow with your business needs.',
      icon_name: 'Code',
      timeline: '12-24 weeks',
      image_url: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Data Analytics and BI',
      category: 'cloud',
      description:
        'Transform raw data into actionable insights with advanced analytics and visualization tools. We help you make informed decisions through comprehensive business intelligence solutions.',
      icon_name: 'BarChart',
      timeline: '6-12 weeks',
      image_url:
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Cloud Migration and Optimization',
      category: 'cloud',
      description:
        'Migrate your applications and data to the cloud with our expert guidance. We optimize your cloud infrastructure for performance, security, and cost-effectiveness.',
      icon_name: 'Cloud',
      timeline: '8-16 weeks',
      image_url:
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Mobile App Development',
      category: 'development',
      description:
        'We build native and cross-platform mobile apps for iOS and Android. Our apps are designed to be user-friendly, performant, and scalable.',
      icon_name: 'Smartphone',
      timeline: '12-24 weeks',
      image_url: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Cybersecurity Solution',
      category: 'security',
      description:
        'Protect your business from cyber threats with our comprehensive security solutions. We offer a range of services, including penetration testing, vulnerability assessments, and security audits.',
      icon_name: 'Shield',
      timeline: '6-12 weeks',
      image_url:
        'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Digital Marketing',
      category: 'marketing',
      description:
        'We help you reach your target audience and grow your business with our digital marketing services. We offer a range of services, including SEO, content marketing, and social media marketing.',
      icon_name: 'Megaphone',
      timeline: '4-8 weeks',
      image_url:
        'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'SEO',
      category: 'marketing',
      description:
        'Improve your search engine rankings and drive more traffic to your website with our SEO services. We offer a range of services, including keyword research, on-page optimization, and link building.',
      icon_name: 'Search',
      timeline: '4-8 weeks',
      image_url: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]);

  if (jobsCount === 0) {
    await Job.insertMany([
      {
        title: 'Expert AI Engineer',
        category: 'engineering',
        type: 'Full-time',
        location: 'Remote',
        posted_date: '2 days ago',
        description:
          'Lead the development of cutting-edge AI solutions using deep learning and neural networks.',
        requirements: [
          '3+ years experience in AI/ML development',
          'Proficiency in Python, TensorFlow, PyTorch',
        ],
        responsibilities: [
          'Design and implement AI/ML solutions',
          'Lead technical architecture decisions',
        ],
      },
      {
        title: 'Full Stack Developer',
        category: 'engineering',
        type: 'Full-time',
        location: 'Hybrid / Bhubaneswar',
        posted_date: '5 days ago',
        description:
          'Build scalable web applications using modern frameworks and cutting-edge tech.',
        requirements: [
          '3+ years of full-stack development experience',
          'Proficiency in React, Node.js, and databases',
        ],
        responsibilities: [
          'Develop and maintain web applications',
          'Write clean, maintainable code',
        ],
      },
    ]);
  }

  if (benefitsCount === 0) {
    await Benefit.insertMany([
      {
        icon_name: 'Cpu',
        title: 'AI-Powered Systems',
        description:
          'Work with the latest AI technologies and stay ahead of the curve with premium resources.',
      },
      {
        icon_name: 'Rocket',
        title: 'Competitive Pay',
        description:
          'Industry-leading salaries, performance bonuses, and equity options for excellence.',
      },
    ]);
  }

  if (testimonialsCount === 0) {
    await Testimonial.insertMany([
      {
        quote:
          'SolvionTech built the BB Chhatoi website with stunning design, smooth performance, reliable functionality, and seamless navigation, delivering powerful digital presence that exceeded.',
        author: 'Mamata Maharana',
        role: 'Principal, BB Chhatoi',
        image_url:
          'https://img.rocket.new/generatedImages/rocket_gen_img_1663c79be-1763294482755.png',
      },
    ]);
  }
}

async function connectAndInit() {
  try {
    if (!dbReady) {
      await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`);
    }
    await seedIfNeeded();
    dbReady = true;
    console.log(`Successfully connected to MongoDB via Mongoose (${MONGO_DB_NAME}).`);
  } catch (err) {
    dbReady = false;
    console.error('MongoDB/Mongoose connection/init failed:', err?.message || err);
  }
}

app.use('/api', (req, res, next) => {
  if (!dbReady) {
    return res.status(500).json({
      error:
        'Database unavailable. Please start MongoDB and verify MONGO_URL/MONGO_DB_NAME in server/.env.',
    });
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
