import { async, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from './material-lib.module';

describe('MaterialLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MaterialLibModule).toBeDefined();
  });
});
