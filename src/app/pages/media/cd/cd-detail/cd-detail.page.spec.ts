import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdDetailPage } from './cd-detail.page';

describe('CdDetailPage', () => {
  let component: CdDetailPage;
  let fixture: ComponentFixture<CdDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
