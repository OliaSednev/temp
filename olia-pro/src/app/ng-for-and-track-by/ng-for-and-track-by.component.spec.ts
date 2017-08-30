import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgForAndTrackByComponent } from './ng-for-and-track-by.component';

describe('NgForAndTrackByComponent', () => {
  let component: NgForAndTrackByComponent;
  let fixture: ComponentFixture<NgForAndTrackByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgForAndTrackByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgForAndTrackByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
