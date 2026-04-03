const mongoose = require('mongoose');
require('dotenv').config();

// Use the URL from your environment or paste it here
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://vivekc0715_db_user:SolvionTech%40123@solviontech.w6bfm4m.mongodb.net/';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'solvion_db';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  icon_name: String,
  timeline: String,
  image_url: String,
}, { collection: 'services' });

const Service = mongoose.model('Service', serviceSchema);

const services = [
  {
    title: 'AI Integration and Automation',
    category: 'ai',
    description: 'Seamlessly integrate cutting-edge AI technologies into your existing systems.',
    icon_name: 'Cpu',
    timeline: '8-16 weeks',
    image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Custom Software Development',
    category: 'development',
    description: 'Tailored software solutions built with modern technologies.',
    icon_name: 'Code',
    timeline: '12-24 weeks',
    image_url: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Data Analytics and BI',
    category: 'cloud',
    description: 'Transform raw data into actionable insights with advanced analytics.',
    icon_name: 'BarChart',
    timeline: '6-12 weeks',
    image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Cloud Migration and Optimization',
    category: 'cloud',
    description: 'Migrate your applications and data to the cloud with our expert guidance.',
    icon_name: 'Cloud',
    timeline: '8-16 weeks',
    image_url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Mobile App Development',
    category: 'development',
    description: 'We build native and cross-platform mobile apps for iOS and Android.',
    icon_name: 'Smartphone',
    timeline: '12-24 weeks',
    image_url: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Cybersecurity Solution',
    category: 'security',
    description: 'Protect your business from cyber threats with our comprehensive security solutions.',
    icon_name: 'Shield',
    timeline: '6-12 weeks',
    image_url: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Digital Marketing',
    category: 'marketing',
    description: 'We help you reach your target audience and grow your business.',
    icon_name: 'Megaphone',
    timeline: '4-8 weeks',
    image_url: 'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'SEO',
    category: 'marketing',
    description: 'Improve your search engine rankings and drive more traffic to your website.',
    icon_name: 'Search',
    timeline: '4-8 weeks',
    image_url: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URL, { dbName: MONGO_DB_NAME });
    console.log('Connected!');

    console.log('Clearing old data...');
    await Service.deleteMany({});
    
    console.log('Inserting new services...');
    await Service.insertMany(services);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
