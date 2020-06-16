import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCompareComponent } from './event-compare.component';

describe('EventCompareComponent', () => {
  let component: EventCompareComponent;
  let fixture: ComponentFixture<EventCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
