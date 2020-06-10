/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeScreenAlertService } from './homeScreenAlert.service';

describe('Service: HomeScreenAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeScreenAlertService]
    });
  });

  it('should ...', inject([HomeScreenAlertService], (service: HomeScreenAlertService) => {
    expect(service).toBeTruthy();
  }));
});
