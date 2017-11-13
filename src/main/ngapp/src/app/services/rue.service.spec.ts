import { TestBed, inject } from '@angular/core/testing';

import { RueService } from './rue.service';

describe('RueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RueService]
    });
  });

  it('should be created', inject([RueService], (service: RueService) => {
    expect(service).toBeTruthy();
  }));
});
