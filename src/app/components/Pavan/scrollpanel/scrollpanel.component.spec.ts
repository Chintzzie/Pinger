import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollpanelComponent } from './scrollpanel.component';

describe('ScrollpanelComponent', () => {
  let component: ScrollpanelComponent;
  let fixture: ComponentFixture<ScrollpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
