import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  signal,
  ChangeDetectorRef,
  HostListener,
  inject,
} from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef); 

  @ViewChild('video', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  isVideoPaused = signal(true);
  currentTime = signal(0);
  videoDuration = signal(0);


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    if (this.videoPlayer?.nativeElement) {
      this.isVideoPaused.set(this.videoPlayer.nativeElement.paused);
    }
  }

  onVideoPlay() {
    this.isVideoPaused.set(false);
  }

  onVideoPause() {
    this.isVideoPaused.set(true);
  }

  onVideoLoaded(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.videoDuration.set(video.duration || 0);
    this.currentTime.set(video.currentTime || 0);
  }

  onTimeUpdate(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.currentTime.set(video.currentTime);
  }

  toggleVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  }

  seekVideo(event: Event) {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      const target = event.target as HTMLInputElement;
      video.currentTime = parseFloat(target.value);
    }
  }

  formatTime(timeInSeconds: number): string {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
