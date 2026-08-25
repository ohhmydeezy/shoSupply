import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements AfterViewInit {
  @ViewChild('video', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://widget.taggbox.com/embed.min.js';
    script.async = true;

    document.body.appendChild(script);
  }
}
