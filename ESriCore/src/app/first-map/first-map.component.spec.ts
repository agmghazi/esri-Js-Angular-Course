import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstMapComponent } from './first-map.component';

describe('FirstMapComponent', () => {
  let component: FirstMapComponent;
  let fixture: ComponentFixture<FirstMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
