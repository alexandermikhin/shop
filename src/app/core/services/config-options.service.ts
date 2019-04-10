import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { ConfigOption } from '../models/config-option';

@Injectable({
  providedIn: CoreModule
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
  getConfig(key: string): string {
    return this.config[key];
  }
}
