import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePanelComponent } from './mode-panel.component';

describe('ModePanelComponent', () => {
  let component: ModePanelComponent;
  let fixture: ComponentFixture<ModePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
