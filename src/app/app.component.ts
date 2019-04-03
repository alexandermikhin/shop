import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActiveView } from './models/active-view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('appTitle') title: ElementRef;

  readonly ActiveView = ActiveView;
  activeView: ActiveView = ActiveView.productsList;

  ngOnInit() {
    const heading: HTMLHeadingElement = this.title.nativeElement;
    heading.innerText = 'Shop application';
  }

  setView(view: ActiveView) {
    this.activeView = view;
  }
}
