import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TariffG11Price,
  TariffG12Price,
  TariffG12WPrice,
  TariffG13Price,
} from '../store/calculate-price';
import { MatCardModule } from '@angular/material/card';
import {
  G11TariffTimeSet,
  G12TariffTimeSet,
  G12WTariffTimeSet,
  G13TariffTimeSet,
} from '../store/tariffe-time-set';
import { TariffRates, TariffTimeSet } from '../store/tariff-definitions';

@Component({
  selector: 'app-tariff-rates',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './tariff-rates.component.html',
  styleUrl: './tariff-rates.component.scss',
})
export class TariffRatesComponent {
  readonly tariffTimes: TariffTimeSet[] = [
    G11TariffTimeSet,
    G12TariffTimeSet,
    G12WTariffTimeSet,
    G13TariffTimeSet,
  ];
  readonly tariffPrices = (
    [
      TariffG11Price,
      TariffG12Price,
      TariffG12WPrice,
      TariffG13Price,
    ] as TariffRates[]
  ).map((tariff) => {
    return {
      tariff: tariff.tariff,
      zones: Object.entries(tariff.zones).map(([zone, value]) => {
        return {
          name: zone,
          price: value,
        };
      }),
    };
  });
}
