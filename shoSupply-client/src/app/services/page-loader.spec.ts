import { TestBed } from '@angular/core/testing';

import { PageLoader } from './page-loader';

describe('PageLoader', () => {
  let service: PageLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
