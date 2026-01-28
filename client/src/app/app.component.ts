import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PageLoaderComponent } from "./components/page-loader/page-loader.component";
import { PageLoaderService } from './services/page-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    CommonModule,
    RouterOutlet,
    FooterComponent,
    PageLoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  protected title = 'shoSupply-client';

  backgroundClass = 'bg-sho-supply-home';
  #router = inject(Router);
  #pageLoaderService = inject(PageLoaderService);
  #viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.#pageLoaderService.show('Loading...');
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.#pageLoaderService.hide();
      }

      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.#viewportScroller.scrollToPosition([0, 0]);
        this.setBackgroundClass(url);
      }
    });
  }

  pageLoad() {
    let progress = 0;
    this.#pageLoaderService.show('Loading', 0);

    const increment = setInterval(() => {
      progress++;
      if (progress === 100) {
        this.#pageLoaderService.hide();
        clearInterval(increment);
      }
      let msg =
        progress < 25
          ? 'Loading started'
          : progress < 50
          ? 'Going strong'
          : progress < 75
          ? 'Any minute now'
          : 'Almost there';

      this.#pageLoaderService.setMessage(msg);
      this.#pageLoaderService.setProgressValue(progress);
    }, 50);
  }

  setBackgroundClass(url: string): void {
    switch (true) {
      case url.includes('/home'):
        this.backgroundClass = 'bg-sho-supply-home';
        break;
      case url.includes('/About-Us'):
        this.backgroundClass = 'bg-about-background';
        break;
      case url.includes('/Contact-Us'):
        this.backgroundClass = 'bg-contact-background';
        break;
      case url.includes('/Teachers'):
        this.backgroundClass = 'bg-about-background';
        break;
      case url.includes('/Workshops'):
        this.backgroundClass = 'bg-about-background';
        break;
      default:
        this.backgroundClass = 'bg-sho-supply-home';
    }
  }
}
