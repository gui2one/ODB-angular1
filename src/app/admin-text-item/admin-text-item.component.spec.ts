import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextItemComponent } from './admin-text-item.component';

describe('AdminTextItemComponent', () => {
  let component: AdminTextItemComponent;
  let fixture: ComponentFixture<AdminTextItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTextItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
