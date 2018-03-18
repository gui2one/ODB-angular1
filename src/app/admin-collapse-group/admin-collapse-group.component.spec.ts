import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollapseGroupComponent } from './admin-collapse-group.component';

describe('AdminCollapseComponent', () => {
  let component: AdminCollapseGroupComponent;
  let fixture: ComponentFixture<AdminCollapseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollapseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollapseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
