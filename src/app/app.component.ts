import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppSettings } from './core/models/app-settings';
import { AppSettings$ } from './core/services/app-settings-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  settings: AppSettings;
  private settingsSub: Subscription;
  constructor(
    @Inject(AppSettings$) private appSettings$: Observable<AppSettings>
  ) {}

  ngOnInit() {
    this.settingsSub = this.appSettings$.subscribe(s => (this.settings = s));
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }
}
