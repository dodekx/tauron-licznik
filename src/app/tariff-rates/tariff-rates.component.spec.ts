import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffRatesComponent } from './tariff-rates.component';

describe('TariffRatesComponent', () => {
  let component: TariffRatesComponent;
  let fixture: ComponentFixture<TariffRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffRatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
