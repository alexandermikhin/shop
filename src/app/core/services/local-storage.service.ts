import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {
  private storage = localStorage;

  /**
   * Set item into local storage.
   * @param key Item key.
   * @param value Item value.
   */
  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  /**
   * Get item from local storage by key.
   * @param key Item key.
   */
  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  /**
   * Removes item from local storage.
   * @param key Item key.
   */
  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
