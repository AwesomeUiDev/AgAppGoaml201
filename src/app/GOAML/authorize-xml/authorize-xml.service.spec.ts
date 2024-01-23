import { TestBed } from '@angular/core/testing';

import { AuthorizeXmlService } from './authorize-xml.service';

describe('AuthorizeXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizeXmlService = TestBed.get(AuthorizeXmlService);
    expect(service).toBeTruthy();
  });
});
