const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Admin = require('./models/Admin');
const Service = require('./models/Service');

const services = [
  {
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to automate processes, uncover insights, and deliver intelligent solutions tailored to your business needs.',
    icon: 'Cpu',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800',
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    timeline: '6-12 weeks',
  },
  {
    title: 'Custom Software Development',
    description: 'From web apps to enterprise platforms, we build robust, scalable, and maintainable software that solves your unique challenges.',
    icon: 'Code',
    category: 'development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    techStack: ['React', 'Node.js', 'Next.js', 'PostgreSQL'],
    timeline: '8-16 weeks',
  },
  {
    title: 'Cloud & Data Solutions',
    description: 'Migrate, scale, and optimize your infrastructure on the cloud. We design data pipelines and analytics dashboards that drive smarter decisions.',
    icon: 'Cloud',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
    techStack: ['AWS', 'GCP', 'Azure', 'Kafka'],
    timeline: '4-10 weeks',
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with enterprise-grade security audits, penetration testing, and real-time threat monitoring solutions.',
    icon: 'Shield',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800',
    techStack: ['SIEM', 'Zero Trust', 'SOC 2', 'ISO 27001'],
    timeline: '4-8 weeks',
  },
  {
    title: 'Mobile App Development',
    description: 'Beautiful, performant cross-platform mobile apps for iOS and Android that users love. End-to-end — from UX design to App Store launch.',
    icon: 'Smartphone',
    category: 'development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    timeline: '10-20 weeks',
  },
  {
    title: 'Data Analytics & BI',
    description: 'Transform raw data into actionable intelligence. We build interactive dashboards and automated reporting systems that deliver real ROI.',
    icon: 'BarChart',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    techStack: ['Power BI', 'Tableau', 'BigQuery', 'Spark'],
    timeline: '4-8 weeks',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Seed services
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`✅ Seeded ${services.length} services`);

    // Seed admin (only if not exists)
    const existing = await Admin.findOne({ username: 'admin' });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin123', salt);
      await Admin.create({ username: 'admin', password: hash });
      console.log('✅ Admin created: username=admin, password=admin123');
    } else {
      console.log('ℹ️  Admin already exists, skipping.');
    }

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
