import { Component, Inject, Optional } from '@angular/core';
import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { ConstantsService } from 'src/app/core/services/constants.service';
import { Generator15 } from 'src/app/core/services/generator-factory';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  appVer: string;
  appName: string;
  id: string;
  errorMessages: string[] = [];

  constructor(
    @Optional() private configService: ConfigOptionsService,
    @Optional() private constantsService: ConstantsService,
    @Optional() private localStorageService: LocalStorageService,
    @Inject(Generator15) @Optional() private generator: string
  ) {
    this.initConfiguration();
    this.initAppInfo();
    this.saveToStorage();
  }

  private initConfiguration() {
    let hasErrors = false;
    if (!this.configService) {
      this.errorMessages.push('No configuration service');
      hasErrors = true;
    }

    if (!this.generator) {
      this.errorMessages.push('No generator');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    this.configService.setConfig({ id: this.generator });
    this.id = this.configService.getConfig('id');
  }

  private initAppInfo() {
    if (!this.constantsService) {
      this.errorMessages.push('No constants service');
      return;
    }

    this.appName = this.constantsService.app;
    this.appVer = this.constantsService.ver;
  }

  private saveToStorage() {
    if (!this.localStorageService) {
      this.errorMessages.push('No local storage service');
      return;
    }

    this.localStorageService.setItem('id', this.id);
  }
}
