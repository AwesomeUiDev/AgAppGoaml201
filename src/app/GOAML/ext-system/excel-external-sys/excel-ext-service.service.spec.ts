import { TestBed } from '@angular/core/testing';

import { ExcelExtServiceService } from './excel-ext-service.service';

describe('ExcelExtServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelExtServiceService = TestBed.get(ExcelExtServiceService);
    expect(service).toBeTruthy();
  });
});
