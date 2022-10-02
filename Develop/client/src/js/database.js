import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const result = await db.transaction('jate', 'readwrite').objectStore('jate').put({ id: 1, content });
};

export const getDb = async () => {
  const db = await initdb();
  const result = await db.transaction('jate').objectStore('jate').get(1);

  return result ? result.content : null;
}

initdb();
