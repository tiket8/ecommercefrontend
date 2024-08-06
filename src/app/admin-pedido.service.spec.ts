import { TestBed } from '@angular/core/testing';

import { AdminPedidoService } from './admin-pedido.service';

describe('AdminPedidoService', () => {
  let service: AdminPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
