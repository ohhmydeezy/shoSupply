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

  isVideoPaused = true;
  currentTime = 0;
  videoDuration = 0; 


  ngAfterViewInit() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.isVideoPaused = this.videoPlayer.nativeElement.paused;
    }
  }



  onVideoPlay() {
    this.isVideoPaused = false;
  }

  onVideoPause() {
    this.isVideoPaused = true;
  }

  onVideoLoaded(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.videoDuration = video.duration || 0;
    this.currentTime = video.currentTime || 0;
  }

  onTimeUpdate(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.currentTime = video.currentTime;
  }

  toggleVideo() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const video = this.videoPlayer.nativeElement;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  seekVideo(event: Event) {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const video = this.videoPlayer.nativeElement;
      const target = event.target as HTMLInputElement;
      const seekTime = parseFloat(target.value);
      video.currentTime = seekTime;
    }
  }

  formatTime(timeInSeconds: number): string {
    if (isNaN(timeInSeconds)) return '0:00';

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
