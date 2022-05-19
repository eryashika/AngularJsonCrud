import { TestBed } from '@angular/core/testing';

import { ProductInterceptorInterceptor } from './product-interceptor.interceptor';

describe('ProductInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProductInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProductInterceptorInterceptor = TestBed.inject(ProductInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
