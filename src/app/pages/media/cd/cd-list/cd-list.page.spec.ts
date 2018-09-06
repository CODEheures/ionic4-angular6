import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdListPage } from './cd-list.page';

describe('CdListPage', () => {
  let component: CdListPage;
  let fixture: ComponentFixture<CdListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
