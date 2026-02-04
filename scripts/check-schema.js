const Database = require('better-sqlite3');
const fs = require('fs');

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
if (!fs.existsSync(dbPath)) {
  console.log('Database file does not exist.');
  process.exit(0);
}

const db = new Database(dbPath);

try {
  console.log('--- Contacts Table Info ---');
  const contactsInfo = db.prepare('PRAGMA table_info(contacts)').all();
  console.log(JSON.stringify(contactsInfo, null, 2));

  console.log('--- Consultations Table Info ---');
  const consultationsInfo = db.prepare('PRAGMA table_info(consultations)').all();
  console.log(JSON.stringify(consultationsInfo, null, 2));
} catch (error) {
  console.error('Error:', error);
} finally {
  db.close();
}
