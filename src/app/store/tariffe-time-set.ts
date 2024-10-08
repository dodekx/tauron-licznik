import { Tariff, TariffTimeSet, TariffZone } from './tariff-definitions';

export const G11TariffTimeSet: TariffTimeSet = {
  name: Tariff.G11,
  defaultTariffZone: TariffZone.Day,
};

export const G12TariffTimeSet: TariffTimeSet = {
  name: 'G12',
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
  name: 'G12W',
  defaultTariffZone: TariffZone.Night,
  periods: [
    {
      start: 6,
      end: 13,
      TariffZone: TariffZone.Day,
      days: [1, 2, 3, 4, 5],
    },
    {
      start: 15,
      end: 22,
      TariffZone: TariffZone.Day,
      days: [1, 2, 3, 4, 5],
    },
  ],
};
export const G13TariffTimeSet: TariffTimeSet = {
  name: 'G13',
  defaultTariffZone: TariffZone.Night,
  periods: [
    {
      start: 7,
      end: 13,
      TariffZone: TariffZone.Day,
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Wszystkie miesiące
      days: [1, 2, 3, 4, 5], // Dni robocze
    },
    {
      start: 19,
      end: 22,
      TariffZone: TariffZone.Peak,
      months: [3, 4, 5, 6, 7, 8], // Kwiecień-Wrzesień
      days: [1, 2, 3, 4, 5], // Dni robocze
    },
    {
      start: 16,
      end: 21,
      TariffZone: TariffZone.Peak,
      months: [0, 1, 2, 9, 10, 11], // Styczeń-Marzec, Październik-Grudzień
      days: [1, 2, 3, 4, 5], // Dni robocze
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
