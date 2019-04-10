import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
  @Input('appBorder') color: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.color = this.color || 'red';
  }

  @HostListener('click')
  onMouseClick() {
    const element: HTMLElement = this.el.nativeElement;
    const originalBorder = element.style.border;
    const originalBoxSizing = element.style.boxSizing;

    this.renderer.setStyle(element, 'outline', `1px solid ${this.color}`);
    this.renderer.setStyle(element, 'box-sizing', 'border-box');

    setTimeout(() => {
      this.renderer.setStyle(element, 'outline', originalBorder);
      this.renderer.setStyle(element, 'box-sizing', originalBoxSizing);
    }, 500);
  }
}
