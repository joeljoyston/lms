import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdeleteComponent } from './bookdelete.component';

describe('BookdeleteComponent', () => {
  let component: BookdeleteComponent;
  let fixture: ComponentFixture<BookdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookdeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
