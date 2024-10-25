import {Month} from "../model/moth.enum";

interface MonthlyPrice {
  RCEm: number;
}

const RCEM_MONTHLY_PRICE_CONST: Map<number, Map<Month, MonthlyPrice>> = new Map<
  number,
  Map<Month, MonthlyPrice>
>([
  [
    2022,
    new Map<Month, MonthlyPrice>([
      [Month.June, { RCEm: 0.656 }],
      [Month.July, { RCEm: 0.796 }],
      [Month.August, { RCEm: 0.1017 }],
      [Month.September, { RCEm: 0.71 }],
      [Month.October, { RCEm: 0.575 }],
      [Month.November, { RCEm: 0.701 }],
      [Month.December, { RCEm: 0.723 }],
    ]),
  ],

  [
    2023,
    new Map<Month, MonthlyPrice>([
      [Month.January, { RCEm: 0.594 }],
      [Month.February, { RCEm: 0.668 }],
      [Month.March, { RCEm: 0.508 }],
      [Month.April, { RCEm: 0.505 }],
      [Month.May, { RCEm: 0.38 }],
      [Month.June, { RCEm: 0.453 }],
      [Month.July, { RCEm: 0.439 }],
      [Month.August, { RCEm: 0.412 }],
      [Month.September, { RCEm: 0.404 }],
      [Month.October, { RCEm: 0.329 }],
      [Month.November, { RCEm: 0.377 }],
      [Month.December, { RCEm: 0.308 }],
    ]),
  ],
  [
    2024,
    new Map<Month, MonthlyPrice>([
      [Month.January, { RCEm: 0.437 }],
      [Month.February, { RCEm: 0.323 }],
      [Month.March, { RCEm: 0.249 }],
      [Month.April, { RCEm: 0.251 }],
      [Month.May, { RCEm: 0.254 }],
      [Month.June, { RCEm: 0.33 }],
      [Month.July, { RCEm: 0.283 }],
      [Month.August, { RCEm: 0.241 }],
      [Month.September, { RCEm: 0.222 }],
    ]),
  ],
]);

export function getRCEmMonthlyPrice(year: number, month: Month): number {
  return RCEM_MONTHLY_PRICE_CONST.get(year)?.get(month)?.RCEm ?? 0;
}
