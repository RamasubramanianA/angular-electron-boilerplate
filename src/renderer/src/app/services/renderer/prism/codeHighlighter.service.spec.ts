/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodeHighlighterService } from './codeHighlighter.service';

describe('Service: CodeHighlighter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeHighlighterService]
    });
  });

  it('should ...', inject([CodeHighlighterService], (service: CodeHighlighterService) => {
    expect(service).toBeTruthy();
  }));
});
