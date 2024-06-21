import { TestBed } from '@angular/core/testing';

import { PaysService } from './_helpers/services/all_methods/pays.service';

describe('PaysService', () => {
  let service: PaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
