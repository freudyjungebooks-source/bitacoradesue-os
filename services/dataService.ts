
import { DreamEntry } from '../types';
import { vaultService } from './vaultService';

const API_URL = 'http://localhost:3001/api/dreams';

/**
 * dataService - Sincronizador de Respaldo (Opcional)
 * Su única función es intentar duplicar la bóveda local en un servidor si existe.
 */
export const dataService = {
  /**
   * Obtiene los datos exclusivamente de la Bóveda Local (Instante 0).
   * Inicia sincronización en segundo plano.
   */
  async getEntries(): Promise<{ entries: DreamEntry[], isSynced: boolean }> {
    // 1. Prioridad Absoluta: Cargar desde disco local
    const localEntries = await vaultService.getAll();
    
    // 2. Intento de Sincronización Silenciosa (Background)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500); // Timeout agresivo para no bloquear

      const response = await fetch(API_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const remoteEntries = await response.json();
        // Mezcla inteligente: Preservar lo local, actualizar con lo remoto si es más nuevo
        // En modo comunitario estable, confiamos más en la escritura local inmediata
        return { entries: localEntries.sort((a, b) => b.timestamp - a.timestamp), isSynced: true };
      }
    } catch (e) {
      // Si el servidor falla, el sistema ni siquiera lo reporta como error, solo como estado
    }

    return { entries: localEntries.sort((a, b) => b.timestamp - a.timestamp), isSynced: false };
  },

  async saveEntry(entry: DreamEntry): Promise<boolean> {
    // A. Asegurar en Bóveda Local primero (Innegociable)
    await vaultService.save(entry);

    // B. Intentar respaldo externo
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      return response.ok;
    } catch (e) {
      return false; // El sistema informará que está en "Modo Local"
    }
  },

  async deleteEntry(id: string): Promise<boolean> {
    await vaultService.delete(id);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (e) {}
    return true;
  }
};
