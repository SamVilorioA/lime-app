import { TestBed } from '@angular/core/testing';

import { OptionsInterceptor } from './options.interceptor';

describe('OptionsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OptionsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OptionsInterceptor = TestBed.inject(OptionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
