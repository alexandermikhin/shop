import { Injectable } from '@angular/core';
import { ConfigOption } from '../models/config-option';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private config: ConfigOption = {};

  /**
   * Sets configuration option.
   * @param option Configuration option.
   */
  setConfig(option: ConfigOption) {
    this.config = {
      ...this.config,
      ...option
    };
  }

  /**
   * Gets configuration option by key.
   * @param key Configuration key.
   */
  getConfig(key: string): ConfigOption {
    return {
      [key]: this.config[key]
    };
  }
}
