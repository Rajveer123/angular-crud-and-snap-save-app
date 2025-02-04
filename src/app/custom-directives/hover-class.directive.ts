import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {

  constructor(public elementRef: ElementRef) { }
  @Input('hover-class') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.border = '2px solid black';
    this.elementRef.nativeElement.style.backgroundColor = 'cornflowerblue';
    this.elementRef.nativeElement.style.borderRadius = '10px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.border = '2px solid transparent';
    this.elementRef.nativeElement.style.backgroundColor = 'transparent';
    this.elementRef.nativeElement.style.borderRadius = '0px';
  }
}
