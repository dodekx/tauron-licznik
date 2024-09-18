import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEnergyDataTauronComponent } from './load-energy-data-tauron.component';

describe('LoadEnergyDataTauronComponent', () => {
  let component: LoadEnergyDataTauronComponent;
  let fixture: ComponentFixture<LoadEnergyDataTauronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadEnergyDataTauronComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadEnergyDataTauronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
