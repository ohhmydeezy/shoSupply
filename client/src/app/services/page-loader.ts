import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageLoaderService {
  constructor() {}

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private message$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private progressValue$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  show(message: string | null = null, progressValue: number | null = null) {
    this.loading$.next(true);
    this.message$.next(message);
    this.progressValue$.next(progressValue);
  }

  hide() {
    this.loading$.next(false);
    this.message$.next(null);
    this.progressValue$.next(null);
  }

  get loading() {
    return this.loading$.asObservable();
  }

  get message() {
    return this.message$.asObservable();
  }

  setMessage(value: string | null) {
    this.message$.next(value);
  }

  get progressValue() {
    return this.progressValue$.asObservable();
  }

  setProgressValue(value: number | null) {
    this.progressValue$.next(value);
  }
}
