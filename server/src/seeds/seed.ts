import db from '../config/connection.js'; // Adjusted relative path
import User from '../models/User.js'; // Adjusted relative path
import bcrypt from 'bcrypt';

// Seed data
const seedUser = {
  username: 'seededuser',
  email: 'seededuser@example.com',
  password: 'password123', // Plaintext password to hash
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await db();

    console.log('✅ Connected to MongoDB');

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(seedUser.password, saltRounds);

    // Add hashed password to the seed user data
    const userToInsert = { ...seedUser, password: hashedPassword };

    // Check if the user already exists
    const existingUser = await User.findOne({ email: seedUser.email });
    if (existingUser) {
      console.log('⚠️ User already exists, skipping seeding.');
    } else {
      // Insert the user into the database
      await User.create(userToInsert);
      console.log('✅ Seeded user added to the database.');
    }

    // Close the connection
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0); // Exit script successfully
  } catch (err) {
    console.error('❌ Error seeding the database:', err);
    process.exit(1); // Exit script with an error
  }
};

seedDatabase();
