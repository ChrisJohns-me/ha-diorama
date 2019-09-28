import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderOutputComponent } from './render-output.component';

describe('RenderOutputComponent', () => {
  let component: RenderOutputComponent;
  let fixture: ComponentFixture<RenderOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
