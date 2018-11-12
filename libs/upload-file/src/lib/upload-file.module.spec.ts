import { async, TestBed } from '@angular/core/testing';
import { UploadFileModule } from './upload-file.module';

describe('UploadFileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UploadFileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UploadFileModule).toBeDefined();
  });
});
