import { TariffZone } from './tariff-definitions';
import {
  getTariffZone,
  G11TariffTimeSet,
  G12TariffTimeSet,
  G12WTariffTimeSet,
  G13TariffTimeSet,
} from './tariffe-time-set';

describe('getTariffZone', () => {
  describe('G11TariffTimeSet', () => {
    it('workday in July at 12:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T12:00:00');
      const result = getTariffZone(G11TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });
  });

  describe('G12TariffTimeSet', () => {
    it('workday in July at 07:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T07:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in July at 08:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T08:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 13:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T13:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T14:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in July at 16:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T16:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in July at 17:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T17:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 22:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T22:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 23:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T23:00:00');
      const result = getTariffZone(G12TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });
  });

  describe('G12WTariffTimeSet', () => {
    it('workday in July at 06:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T06:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in July at 07:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T07:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 13:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T13:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T14:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in July at 15:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T16:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 22:00 should be TariffZone.Day', () => {
      const date = new Date('2024-07-01T22:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in July at 23:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-01T23:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('weekend in July at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-06T12:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('weekend in July at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-06T14:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('weekend in July at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-07T12:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('weekend in July at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-07-07T14:00:00');
      const result = getTariffZone(G12WTariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });
  });

  describe('G13TariffTimeSet', () => {
    it('workday in January at 07:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-01T07:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in January at 08:00 should be TariffZone.Day', () => {
      const date = new Date('2024-01-01T08:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in January at 13:00 should be TariffZone.Day', () => {
      const date = new Date('2024-01-01T13:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Day);
    });

    it('workday in January at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-01T14:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in January at 17:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-01-01T17:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in January at 21:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-01-01T21:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in January at 22:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-01T22:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in April at 20:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-04-01T20:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in April at 22:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-04-01T22:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in April at 23:00 should be TariffZone.Night', () => {
      const date = new Date('2024-04-01T23:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    // Saturday tests
    it('Saturday in January at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-06T12:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('Saturday in January at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-06T14:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    // Sunday tests
    it('Sunday in January at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-07T12:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('Sunday in January at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-01-07T14:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    // Peak hours tests for September
    it('workday in September at 19:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-09-02T19:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in September at 20:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-09-02T20:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in September at 22:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-09-02T22:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in September at 23:00 should be TariffZone.Night', () => {
      const date = new Date('2024-09-02T23:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in October at 16:00 should be TariffZone.Night', () => {
      const date = new Date('2024-10-01T16:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('workday in October at 17:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-10-01T17:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in October at 21:00 should be TariffZone.Peak', () => {
      const date = new Date('2024-10-01T21:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Peak);
    });

    it('workday in October at 22:00 should be TariffZone.Night', () => {
      const date = new Date('2024-10-01T22:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    // Saturday tests for April
    it('Saturday in April at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-04-06T12:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('Saturday in April at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-04-06T14:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    // Sunday tests for April
    it('Sunday in April at 12:00 should be TariffZone.Night', () => {
      const date = new Date('2024-04-07T12:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });

    it('Sunday in April at 14:00 should be TariffZone.Night', () => {
      const date = new Date('2024-04-07T14:00:00');
      const result = getTariffZone(G13TariffTimeSet, date);
      expect(result).toBe(TariffZone.Night);
    });
  });
});
