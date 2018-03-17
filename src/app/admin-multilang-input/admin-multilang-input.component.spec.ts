import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMultilangInputComponent } from './admin-multilang-input.component';

describe('AdminMultilangInputComponent', () => {
  let component: AdminMultilangInputComponent;
  let fixture: ComponentFixture<AdminMultilangInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMultilangInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMultilangInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
