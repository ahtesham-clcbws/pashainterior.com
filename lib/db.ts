import Database from 'better-sqlite3';

const dbPath = process.env.DATABASE_PATH || './data/contacts.db';

export const db = new Database(dbPath);

// Initialize tables
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

/**
 * CONSULTATIONS HELPERS
 */
export function createConsultation(data: any) {
  const stmt = db.prepare(`
    INSERT INTO consultations (id, name, email, phone, projectType, budgetRange, description, createdAt)
    VALUES (@id, @name, @email, @phone, @projectType, @budgetRange, @description, @createdAt)
  `);
  return stmt.run(data);
}

export function getConsultations() {
  return db.prepare('SELECT * FROM consultations ORDER BY createdAt DESC').all();
}

export function updateConsultationStatus(id: string, status: string) {
  return db.prepare('UPDATE consultations SET status = ? WHERE id = ?').run(status, id);
}

export function deleteConsultation(id: string) {
  return db.prepare('DELETE FROM consultations WHERE id = ?').run(id);
}

/**
 * CONTACTS HELPERS
 */
export function createContact(data: any) {
  const stmt = db.prepare(`
    INSERT INTO contacts (id, name, email, phone, message, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @createdAt)
  `);
  return stmt.run(data);
}

export function getContacts() {
  return db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC').all();
}

export function markContactAsRead(id: string) {
  return db.prepare('UPDATE contacts SET isRead = 1 WHERE id = ?').run(id);
}

export function deleteContact(id: string) {
  return db.prepare('DELETE FROM contacts WHERE id = ?').run(id);
}

export function getStats() {
  const contactsCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get() as { count: number };
  const contactsUnread = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE isRead = 0').get() as { count: number };
  const consultationsCount = db.prepare('SELECT COUNT(*) as count FROM consultations').get() as { count: number };
  
  return {
    contacts: contactsCount.count,
    unreadContacts: contactsUnread.count,
    consultations: consultationsCount.count
  };
}

export default db;
