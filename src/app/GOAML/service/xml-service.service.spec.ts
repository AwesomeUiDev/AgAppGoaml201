import { TestBed } from '@angular/core/testing';

import { XmlServiceService } from './xml-service.service';

describe('XmlServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlServiceService = TestBed.get(XmlServiceService);
    expect(service).toBeTruthy();
  });
});
