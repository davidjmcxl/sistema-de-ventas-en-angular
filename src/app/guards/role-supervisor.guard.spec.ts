import { TestBed } from '@angular/core/testing';

import { RoleSupervisorGuard } from './role-supervisor.guard';

describe('RoleSupervisorGuard', () => {
  let guard: RoleSupervisorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleSupervisorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
