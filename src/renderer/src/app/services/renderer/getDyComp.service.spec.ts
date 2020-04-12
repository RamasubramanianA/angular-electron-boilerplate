/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDyCompService } from './getDyComp.service';

describe('Service: GetDyComp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDyCompService]
    });
  });

  it('should ...', inject([GetDyCompService], (service: GetDyCompService) => {
    expect(service).toBeTruthy();
  }));
});
