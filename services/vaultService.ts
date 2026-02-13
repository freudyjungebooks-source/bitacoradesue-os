
import { DreamEntry } from '../types';

const DB_NAME = 'BitacoraComunitariaDB';
const STORE_NAME = 'memorias';
const DB_VERSION = 2;

/**
 * vaultService - El Corazón del Sistema (Bóveda Profunda)
 * Fuente primaria absoluta de verdad.
 */
export const vaultService = {
  privateDb: null as IDBDatabase | null,

  async init(): Promise<IDBDatabase> {
    if (this.privateDb) return this.privateDb;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.privateDb = request.result;
        resolve(request.result);
      };
      
      request.onerror = () => {
        console.error("Fallo crítico en el acceso a la Bóveda Local.");
        reject(request.error);
      };
    });
  },

  async save(entry: DreamEntry): Promise<void> {
    try {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.warn("Memoria local llena o inaccesible.");
    }
  },

  async getAll(): Promise<DreamEntry[]> {
    try {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      return [];
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("No se pudo eliminar el registro de la bóveda.");
    }
  }
};
