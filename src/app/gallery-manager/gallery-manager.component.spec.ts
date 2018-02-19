import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryManagerComponent } from './gallery-manager.component';

describe('GalleryManagerComponent', () => {
  let component: GalleryManagerComponent;
  let fixture: ComponentFixture<GalleryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
