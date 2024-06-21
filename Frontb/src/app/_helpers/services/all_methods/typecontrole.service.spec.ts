import { TestBed } from '@angular/core/testing';

import { TypecontroleService } from './_helpers/services/all_methods/typecontrole.service';

describe('TypecontroleService', () => {
  let service: TypecontroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypecontroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
