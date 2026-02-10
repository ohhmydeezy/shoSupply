import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() enterClass = 'animate-fade-in-up';

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, this.enterClass);
          this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(this.el.nativeElement);
  }
}
