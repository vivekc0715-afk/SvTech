const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function check() {
  console.log('Checking MongoDB Connection...');
  console.log('URI:', process.env.MONGODB_URI);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Successfully connected to MongoDB!');
    
    // Try a simple operation
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (err) {
    console.error('DATABASE CONNECTION ERROR DETAIL:');
    console.error(err);
    process.exit(1);
  }
}

check();
