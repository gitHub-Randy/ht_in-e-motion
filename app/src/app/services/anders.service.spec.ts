import { TestBed } from '@angular/core/testing';

import { AndersService } from './anders.service';

describe('AndersService', () => {
  let service: AndersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AndersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
