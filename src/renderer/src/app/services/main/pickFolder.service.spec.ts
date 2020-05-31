/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PickFolderService } from './pickFolder.service';

describe('Service: PickFolder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickFolderService]
    });
  });

  it('should ...', inject([PickFolderService], (service: PickFolderService) => {
    expect(service).toBeTruthy();
  }));
});
