import { TestBed } from '@angular/core/testing';

import { DogService } from './dog.service';

describe('DogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogService = TestBed.get(DogService);
    expect(service).toBeTruthy();
  });
});
