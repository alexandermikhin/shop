import { Component } from '@angular/core';
import { ActiveView } from './models/active-view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly ActiveView = ActiveView;
  activeView: ActiveView = ActiveView.productsList;

  setView(view: ActiveView) {
    this.activeView = view;
  }
}
