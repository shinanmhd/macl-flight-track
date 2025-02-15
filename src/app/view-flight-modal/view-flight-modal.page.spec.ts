import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFlightModalPage } from './view-flight-modal.page';

describe('ViewFlightModalPage', () => {
  let component: ViewFlightModalPage;
  let fixture: ComponentFixture<ViewFlightModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlightModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
