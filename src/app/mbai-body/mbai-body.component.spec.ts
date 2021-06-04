import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbaiBodyComponent } from './mbai-body.component';

describe('MbaiBodyComponent', () => {
  let component: MbaiBodyComponent;
  let fixture: ComponentFixture<MbaiBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbaiBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbaiBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
