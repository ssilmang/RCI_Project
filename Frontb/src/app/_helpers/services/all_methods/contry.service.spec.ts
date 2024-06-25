import { TestBed } from '@angular/core/testing';

import { ContryService } from './contry.service';

describe('ContryService', () => {
  let service: ContryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
