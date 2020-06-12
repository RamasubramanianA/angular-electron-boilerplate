/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseListService } from './courseList.service';

describe('Service: CourseList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseListService]
    });
  });

  it('should ...', inject([CourseListService], (service: CourseListService) => {
    expect(service).toBeTruthy();
  }));
});
