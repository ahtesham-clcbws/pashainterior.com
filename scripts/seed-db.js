const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Simple .env.local parser
function getDbPath() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const match = envContent.match(/DATABASE_PATH=(.+)/);
    return match ? match[1].trim() : './data/contacts.db';
  } catch (e) {
    return './data/contacts.db';
  }
}

const dbPath = getDbPath();
const db = new Database(dbPath);

console.log(`Seeding database at: ${dbPath}`);

const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Renovation', 'Furniture'];
const budgetRanges = ['Under ₹5L', '₹5L - ₹15L', '₹15L - ₹50L', '₹50L+'];
const statuses = ['new', 'contacted', 'resolved'];

const names = [
  'Arjun Sharma', 'Priya Gupta', 'Rajesh Kumar', 'Anjali Desai', 'Vikram Singh',
  'Neha Reddy', 'Rahul Verma', 'Sanjay Malhotra', 'Aditi Rao', 'Amit Patel',
  'Meera Nair', 'Suresh Iyer', 'Kavita Joshi', 'Rohan Mehra', 'Ishaan Kapoor',
  'Zara Khan', 'Kabir Bose', 'Tanvi Shah', 'Abhishek Mukherjee', 'Divya Pandey'
];

const messages = [
  "I'm looking for a complete interior redesign for my 3BHK apartment in Gurgaon.",
  "Interested in commercial office space planning and execution.",
  "Need premium furniture customization for my luxury villa.",
  "Looking for an architect for a new hospitality project.",
  "Requesting a quote for living room renovation.",
  "Heard about your KFC project, looking for similar design for my restaurant.",
  "I want to integrate a modern glassmorphism aesthetic into my penthouse.",
  "Budget is not an issue, I want the best luxury brand experience for my home.",
  "Can you help with lighting design and smart home integration?",
  "Interested in your residential services for my new villa in Delhi."
];

function seedContacts() {
  console.log('Seeding contacts...');
  const stmt = db.prepare(`
    INSERT INTO contacts (id, name, email, phone, message, createdAt, isRead)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 0; i < 15; i++) {
    const name = names[i];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const phone = `+91 987${Math.floor(1000000 + Math.random() * 9000000)}`;
    const message = messages[i % messages.length];
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString();
    const isRead = Math.random() > 0.5 ? 1 : 0;

    stmt.run(crypto.randomUUID(), name, email, phone, message, createdAt, isRead);
  }
}

function seedConsultations() {
  console.log('Seeding consultations...');
  const stmt = db.prepare(`
    INSERT INTO consultations (id, name, email, phone, projectType, budgetRange, description, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 5; i < 20; i++) {
    const name = names[i];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const phone = `+91 987${Math.floor(1000000 + Math.random() * 9000000)}`;
    const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const budgetRange = budgetRanges[Math.floor(Math.random() * budgetRanges.length)];
    const description = messages[i % messages.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString();

    stmt.run(crypto.randomUUID(), name, email, phone, projectType, budgetRange, description, status, createdAt);
  }
}

try {
  console.log('Resetting schema...');
  db.prepare('DROP TABLE IF EXISTS contacts').run();
  db.prepare('DROP TABLE IF EXISTS consultations').run();

  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isRead INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      projectType TEXT,
      budgetRange TEXT,
      description TEXT,
      status TEXT DEFAULT 'new',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  seedContacts();
  seedConsultations();
  console.log('Database seeded successfully!');
} catch (error) {
  console.error('Error seeding database:', error);
} finally {
  db.close();
}
