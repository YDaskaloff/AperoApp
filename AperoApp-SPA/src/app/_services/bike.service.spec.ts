/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BikeService } from './bike.service';

describe('Service: Bike', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BikeService]
    });
  });

  it('should ...', inject([BikeService], (service: BikeService) => {
    expect(service).toBeTruthy();
  }));
});
