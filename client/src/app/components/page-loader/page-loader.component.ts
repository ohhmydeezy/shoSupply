import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageLoaderService } from '../../services/page-loader';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css'],
})
export class PageLoaderComponent implements OnInit, OnDestroy {
  loading = false;
  message: string | null = null;
  progressValue: number | null = null;

  private readonly pageLoaderService = inject(PageLoaderService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.pageLoaderService.loading
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
    this.pageLoaderService.message
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.message = value));
    this.pageLoaderService.progressValue
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.progressValue = value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
