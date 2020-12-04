import { TestBed } from '@angular/core/testing';

import { GifServiceService } from './gif-service.service';

describe('GifServiceService', () => {
  let service: GifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
