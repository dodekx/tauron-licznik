import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergySummaryListComponent } from './energy-summary-list.component';

describe('EnergySummaryListComponent', () => {
  let component: EnergySummaryListComponent;
  let fixture: ComponentFixture<EnergySummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergySummaryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergySummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
