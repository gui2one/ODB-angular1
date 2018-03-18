import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollapseComponent } from './admin-collapse.component';

describe('AdminCollapseComponent', () => {
  let component: AdminCollapseComponent;
  let fixture: ComponentFixture<AdminCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
