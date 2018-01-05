import { TestBed, inject } from '@angular/core/testing';

import { AuthResolverService } from './auth-resolver.service';

describe('AuthResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthResolverService]
    });
  });

  it('should be created', inject([AuthResolverService], (service: AuthResolverService) => {
    expect(service).toBeTruthy();
  }));
});
