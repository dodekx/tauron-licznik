import { Tariff, TariffTimeSet, TariffZone } from './tariff-definitions';
export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export const G11TariffTimeSet: TariffTimeSet = {
  name: Tariff.G11,
  defaultTariffZone: TariffZone.Day,
};

export const G12TariffTimeSet: TariffTimeSet = {
  name: Tariff.G12,
  defaultTariffZone: TariffZone.Night,
  periods: [
    {
      start: 7,
      end: 13,
      TariffZone: TariffZone.Day,
    },

    {
      start: 16,
      end: 22,
      TariffZone: TariffZone.Day,
    },
  ],
};

export const G12WTariffTimeSet: TariffTimeSet = {
  name: Tariff.G12W,
  defaultTariffZone: TariffZone.Night,
  periods: [
    {
      start: 6,
      end: 13,
      TariffZone: TariffZone.Day,
      days: [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
      ],
    },
    {
      start: 15,
      end: 22,
      TariffZone: TariffZone.Day,
      days: [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
      ],
    },
  ],
};

export const G13TariffTimeSet: TariffTimeSet = {
  name: Tariff.G13,
  defaultTariffZone: TariffZone.Night,
  periods: [
    {
      start: 7,
      end: 13,
      TariffZone: TariffZone.Day,
      days: [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
      ],
    },
    {
      start: 19,
      end: 22,
      TariffZone: TariffZone.Peak,
      months: [
        Month.April,
        Month.May,
        Month.June,
        Month.July,
        Month.August,
        Month.September,
      ], // Kwiecień-Wrzesień
      days: [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
      ],
    },
    {
      start: 16,
      end: 21,
      TariffZone: TariffZone.Peak,
      months: [
        Month.January,
        Month.February,
        Month.March,
        Month.October,
        Month.November,
        Month.December,
      ], // Styczeń-Marzec, Październik-Grudzień
      days: [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
      ],
    },
  ],
};
export function getTariffZone(
  tariffTimeSet: TariffTimeSet,
  date: Date
): TariffZone {
  const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = date.getHours();
  const month = date.getMonth(); // 0 (January) to 11 (December)
  if ('periods' in tariffTimeSet) {
    for (const period of tariffTimeSet.periods) {
      if (hour <= period.start || hour > period.end) {
        continue;
      }

      if (period.months && !period.months.includes(month)) continue;
      if (period.days && !period.days.includes(day)) continue;

      return period.TariffZone;
    }
  }

  return tariffTimeSet.defaultTariffZone;
}
