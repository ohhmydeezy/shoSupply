import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit, AfterViewInit {
  workshops: any[] = [];
  #http = inject(HttpClient);
  #cdr = inject(ChangeDetectorRef);
  selectedWorkshop: any = null;

  @ViewChildren('profileImage') profileImages!: QueryList<ElementRef>;
  @ViewChildren('nameHeading') nameHeadings!: QueryList<ElementRef>;
  @ViewChildren('name') nameElements!: QueryList<ElementRef>;

  loadWorkshops() {
    this.#http.get<any[]>('assets/data/workshops.json').subscribe((data) => {
      this.workshops = data;
      this.#cdr.detectChanges();
    });
  }

  onWorkshopClick(index: number, event: Event) {
    event.stopPropagation();
    this.setActiveName(index + 1);
    this.selectedWorkshop = this.workshops[index];
  }

  closePopup() {
    this.selectedWorkshop = null;
  }

  runAnimations() {
    const isMobile = window.innerWidth < 900;

    this.nameHeadings.forEach((headingRef) => {
      const heading = headingRef.nativeElement;

      if (!heading.classList.contains('split-applied')) {
        const split = new SplitText(heading, { type: 'chars' });
        split.chars.forEach((char) => {
          char.classList.add('letter');
        });
        heading.classList.add('split-applied');
      }
    });

    const nameEls = this.nameElements.toArray();
    const defaultLetters = nameEls[0].nativeElement.querySelectorAll('.letter');
    gsap.set(defaultLetters, { y: '0%' });

    if (!isMobile) {
      this.profileImages.forEach((imgRef, index) => {
        const img = imgRef.nativeElement;
        const nameElement = nameEls[index + 1];
        if (!nameElement) return;

        const letters = nameElement.nativeElement.querySelectorAll('.letter');

        img.addEventListener('mouseenter', () => {
          this.setActiveName(index + 1);
          gsap.to(img, {
            width: 200,
            height: 200,
            duration: 0.5,
            ease: 'power4.out',
          });

          gsap.to(defaultLetters, {
            y: '-100%',
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: 0.015, from: 'center' },
          });

          gsap.to(letters, {
            y: '0%',
            ease: 'power4.out',
            duration: 0.75,
            stagger: { each: 0.025, from: 'center' },
          });
        });

        img.addEventListener('mouseleave', () => {
          this.setActiveName(null);
          gsap.to(img, {
            width: 200,
            height: 200,
            duration: 0.5,
            ease: 'power4.out',
          });

          gsap.to(letters, {
            y: '0%',
            ease: 'power4.out',
            duration: 0.75,
            stagger: { each: 0.025, from: 'center' },
          });

          gsap.to(defaultLetters, {
            y: '0%',
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: 0.015, from: 'center' },
          });
        });
      });
    }
  }

  setActiveName(index: number | null) {
    this.nameElements.forEach((nameEl, i) => {
      const native = nameEl.nativeElement;
      if (index === null && i === 0) {
        native.classList.add('active');
      } else if (index !== null && i === index) {
        native.classList.add('active');
      } else {
        native.classList.remove('active');
      }
    });
  }

  ngOnInit(): void {
    this.loadWorkshops();
  }

  ngAfterViewInit(): void {
    const checkAndRun = () => {
      if (
        this.profileImages.length &&
        this.nameHeadings.length &&
        this.nameElements.length
      ) {
        document.fonts.ready.then(() => {
          this.runAnimations();
        });
      } else {
        setTimeout(checkAndRun, 50);
      }
    };

    checkAndRun();
  }
}
