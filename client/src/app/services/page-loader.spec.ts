import { TestBed } from '@angular/core/testing';

import { PageLoaderService } from './page-loader';

describe('PageLoader', () => {
  let service: PageLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
