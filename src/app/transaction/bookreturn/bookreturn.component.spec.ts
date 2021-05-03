import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookreturnComponent } from './bookreturn.component';

describe('BookreturnComponent', () => {
  let component: BookreturnComponent;
  let fixture: ComponentFixture<BookreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookreturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
