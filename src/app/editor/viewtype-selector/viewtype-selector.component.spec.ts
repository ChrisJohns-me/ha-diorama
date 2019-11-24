import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTypeSelectorComponent } from './viewtype-selector.component';

describe('ViewTypeSelectorComponent', () => {
  let component: ViewTypeSelectorComponent;
  let fixture: ComponentFixture<ViewTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
