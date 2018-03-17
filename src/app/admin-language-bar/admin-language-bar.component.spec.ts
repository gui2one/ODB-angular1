import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLanguageBarComponent } from './admin-language-bar.component';

describe('AdminLanguageBarComponent', () => {
  let component: AdminLanguageBarComponent;
  let fixture: ComponentFixture<AdminLanguageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLanguageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLanguageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
