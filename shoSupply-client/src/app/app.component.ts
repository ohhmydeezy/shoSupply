import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavComponent } from './components/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected title = 'shoSupply-client';

  backgroundClass = 'bg-sho-supply-home';
  #router = inject(Router);

  ngOnInit(): void {
    this.#router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.setBackgroundClass(url);
      });
  }

  setBackgroundClass(url: string): void {
    switch (true) {
      case url.includes('/home'):
        this.backgroundClass = 'bg-sho-supply-home';
        break;
      case url.includes('/About-Us'):
        this.backgroundClass = 'bg-sho-supply-home';
        break;
      case url.includes('/Contact-Us'):
        this.backgroundClass = 'bg-contact-background';
        break;
      default:
        this.backgroundClass = 'bg-sho-supply-home';
    }
  }
}
