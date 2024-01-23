import { TestBed } from '@angular/core/testing';

import { XmlserviceService } from './xmlservice.service';

describe('XmlserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlserviceService = TestBed.get(XmlserviceService);
    expect(service).toBeTruthy();
  });
});
