import { TestBed } from '@angular/core/testing';

import { DeliveryLeadTimeService } from './delivery-lead-time.service';

describe('DeliveryLeadTimeService', () => {
  let service: DeliveryLeadTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryLeadTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
