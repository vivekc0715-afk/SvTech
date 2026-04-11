const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const Admin = require('./models/Admin');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);

    const result = await Admin.findOneAndUpdate(
      { username: 'admin' },
      { password: hash },
      { upsert: true, new: true }
    );

    console.log('✅ Admin password reset successfully!');
    console.log('   Username:', result.username);
    console.log('   Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

resetAdmin();
