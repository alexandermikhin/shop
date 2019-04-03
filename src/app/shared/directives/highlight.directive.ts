import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') highlightColor: string;

  private originalColor: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.highlightColor = this.highlightColor || 'cyan';
  }

  @HostListener('mouseenter')
  onmouseenter() {
    const element: HTMLElement = this.el.nativeElement;
    this.originalColor = element.style.backgroundColor;
    element.style.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    (this.el
      .nativeElement as HTMLElement).style.backgroundColor = this.originalColor;
  }
}
