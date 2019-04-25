import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSettingsService } from './core/services/app-settings.service';
import { AppSettings } from './core/models/app-settings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  settings: AppSettings;
  private settingsSub: Subscription;
  constructor(private appSettingsService: AppSettingsService) {

  }

  ngOnInit() {
    this.settingsSub = this.appSettingsService.loadSettings().subscribe(s => this.settings = s);
  }

  ngOnDestroy() {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }
}
