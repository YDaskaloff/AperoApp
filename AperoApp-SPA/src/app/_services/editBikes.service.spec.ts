/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditBikesService } from './editBikes.service';

describe('Service: EditBikes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditBikesService]
    });
  });

  it('should ...', inject([EditBikesService], (service: EditBikesService) => {
    expect(service).toBeTruthy();
  }));
});
