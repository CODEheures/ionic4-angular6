import { TestBed, inject } from '@angular/core/testing';

import { MediasService } from './medias.service';

describe('MediasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediasService]
    });
  });

  it('should be created', inject([MediasService], (service: MediasService) => {
    expect(service).toBeTruthy();
  }));
});
