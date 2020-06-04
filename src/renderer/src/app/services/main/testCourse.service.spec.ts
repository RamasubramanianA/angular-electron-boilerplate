/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestCourseService } from './testCourse.service';

describe('Service: TestCourse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCourseService]
    });
  });

  it('should ...', inject([TestCourseService], (service: TestCourseService) => {
    expect(service).toBeTruthy();
  }));
});
