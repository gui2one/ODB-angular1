import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxSpacerComponent } from './parallax-spacer.component';

describe('ParallaxSpacerComponent', () => {
  let component: ParallaxSpacerComponent;
  let fixture: ComponentFixture<ParallaxSpacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxSpacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
