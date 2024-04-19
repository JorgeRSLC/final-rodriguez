import { TestBed } from '@angular/core/testing';

import { AiPlayerService } from './ai-player.service';

describe('AiPlayerService', () => {
  let service: AiPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
