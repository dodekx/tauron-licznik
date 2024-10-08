import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tariffRates } from '../store/calculate-price';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tariff-rates',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './tariff-rates.component.html',
  styleUrl: './tariff-rates.component.scss',
})
export class TariffRatesComponent {
  readonly tariffRates = Object.entries(tariffRates).map(([name, tariff]) => {
    return {
      name,
      lines: Object.entries(tariff).map(([tariffName, values]) => {
        return {
          tariffName,
          values,
        };
      }),
    };
  });
  constructor() {
    console.log(tariffRates);
  }
}
