import { openDB } from 'idb';

export async function initDB() {
  const config = window.config;
  const db = await openDB('awesome-todo', config.version, {
    upgrade(db) {
      const store = db.createObjectStore('todos', {
        keyPath: 'id'
      });

      store.createIndex('id', 'id');
      store.createIndex('date', 'date');
    }
  });
  return db;
}

export async function setTodos(data) {
  const db = await initDB();
  const tx = db.transaction('todos', 'readwrite');
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return await db.getAllFromIndex('todos', 'date');
}


export async function getTodos() {
  const db = await initDB();
  return await db.getAllFromIndex('todos', 'date');
} 