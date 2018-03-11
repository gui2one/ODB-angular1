import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxBackgroundComponent } from './parallax-background.component';

describe('ParallaxBackgroundComponent', () => {
  let component: ParallaxBackgroundComponent;
  let fixture: ComponentFixture<ParallaxBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
