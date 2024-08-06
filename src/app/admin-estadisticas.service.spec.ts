import { TestBed } from '@angular/core/testing';

import { AdminEstadisticasService } from './admin-estadisticas.service';

describe('AdminEstadisticasService', () => {
  let service: AdminEstadisticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEstadisticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
