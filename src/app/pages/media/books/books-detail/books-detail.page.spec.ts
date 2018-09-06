import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailPage } from './books-detail.page';

describe('LivresDetailPage', () => {
  let component: BooksDetailPage;
  let fixture: ComponentFixture<BooksDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
