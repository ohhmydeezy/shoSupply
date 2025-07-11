import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements AfterViewInit {
  @ViewChild('profileImageContainer', { static: false })
  profileImageContainer!: ElementRef;

  @ViewChildren('profileImage')
  profileImages!: QueryList<ElementRef>;

  @ViewChildren('nameHeading')
  nameHeadings!: QueryList<ElementRef>;

  @ViewChildren('name')
  nameElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nameHeadings.forEach((headingRef) => {
        const heading = headingRef.nativeElement;

        // Prevent re-splitting if already processed
        if (!heading.classList.contains('split-applied')) {
          const split = new SplitText(heading, { type: 'chars' });
          split.chars.forEach((char) => {
            char.classList.add('letter');
          });
          heading.classList.add('split-applied');
        }
      });

      const nameEls = this.nameElements.toArray();
      const defaultLetters =
        nameEls[0].nativeElement.querySelectorAll('.letter');
      gsap.set(defaultLetters, { y: '0%' });

      if (window.innerWidth >= 900) {
        this.profileImages.forEach((imgRef, index) => {
          const img = imgRef.nativeElement;
          const nameElement = nameEls[index + 1]; // skip the first (default)

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
              stagger: {
                each: 0.025,
                from: 'center',
              },
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
              stagger: {
                each: 0.025,
                from: 'center',
              },
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
    }, 0);
  }

  setActiveName(index: number | null) {
    this.nameElements.forEach((nameEl, i) => {
      const native = nameEl.nativeElement;
      if (index === null && i === 0) {
        native.classList.add('active'); // Show 'Our Team'
      } else if (index !== null && i === index) {
        native.classList.add('active'); // Show the correct hovered name
      } else {
        native.classList.remove('active');
      }
    });
  }
}
