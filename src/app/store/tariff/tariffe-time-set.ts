import {Period, Tariff, TariffTimeSet, TariffZone} from './tariff-definitions';
import {WeekDay} from "../../model/week-day.enum";
import {Month} from "../../model/moth.enum";



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
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hourOfDay = date.getHours();
    const monthOfYear = date.getMonth(); // 0 (January) to 11 (December)

    const isPeriodActive = (period:Period): boolean => {
        const isHourInRange = hourOfDay > period.start && hourOfDay <= period.end;
        const isMonthIncluded = !period.months || period.months.includes(monthOfYear);
        const isDayIncluded = !period.days || period.days.includes(dayOfWeek);
        return isHourInRange && isMonthIncluded && isDayIncluded;
    };

    if ('periods' in tariffTimeSet) {
        for (const period of tariffTimeSet.periods) {
            if (isPeriodActive(period)) {
                return period.TariffZone;
            }
        }
    }

    return tariffTimeSet.defaultTariffZone;
}
