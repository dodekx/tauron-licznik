import { calculatePrice, priceFactory } from './calculate-price';
import {
  Tariff,
  TariffEnergyAmountData,
  TariffG11Rates,
  TariffG12Rates,
  TariffG12WRates,
  TariffG13Rates,
  TariffZone,
} from './tariff-definitions';

describe('calculatePrice', () => {
  describe('G11calculatePrice', () => {
    const examplePrice: TariffG11Rates = {
      tariff: Tariff.G11,
      zones: {
        [TariffZone.Day]: priceFactory(0.2, 0.5),
      },
    };

    it('should calculate price for G11 tariff', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(70);
    });
  });

  describe('G12calculatePrice', () => {
    const examplePrice: TariffG12Rates = {
      tariff: Tariff.G12,
      zones: {
        [TariffZone.Day]: priceFactory(0.2, 0.5),
        [TariffZone.Night]: priceFactory(0.1, 0.2),
      },
    };

    it('should calculate price for G12 Day', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 0,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(70);
    });

    it('should calculate price for G12 Night', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 0,
          [TariffZone.Night]: 100,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(30);
    });

    it('should calculate price for G12 Sum', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 100,
        },
        totalAmount: 200,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(100);
    });
  });

  describe('G12WcalculatePrice', () => {
    const examplePrice: TariffG12WRates = {
      tariff: Tariff.G12W,
      zones: {
        [TariffZone.Day]: priceFactory(0.2, 0.5),
        [TariffZone.Night]: priceFactory(0.1, 0.2),
      },
    };

    it('should calculate price for G12W Day', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 0,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(70);
    });

    it('should calculate price for G12W Night', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 0,
          [TariffZone.Night]: 100,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(30);
    });

    it('should calculate price for G12W Sum', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 100,
        },
        totalAmount: 200,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(100);
    });
  });

  describe('G13calculatePrice', () => {
    const examplePrice: TariffG13Rates = {
      tariff: Tariff.G13,
      zones: {
        [TariffZone.Day]: priceFactory(0.2, 0.5),
        [TariffZone.Night]: priceFactory(0.1, 0.2),
        [TariffZone.Peak]: priceFactory(0.5, 0.5),
      },
    };

    it('should calculate price for G13 Day', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 0,
          [TariffZone.Peak]: 0,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(70);
    });

    it('should calculate price for G13 Night', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 0,
          [TariffZone.Night]: 100,
          [TariffZone.Peak]: 0,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(30);
    });

    it('should calculate price for G13 Peak', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 0,
          [TariffZone.Night]: 0,
          [TariffZone.Peak]: 100,
        },
        totalAmount: 100,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(100);
    });

    it('should calculate price for G12W Sum', () => {
      const energy: TariffEnergyAmountData = {
        amount: {
          [TariffZone.Day]: 100,
          [TariffZone.Night]: 100,
          [TariffZone.Peak]: 100,
        },
        totalAmount: 300,
      };

      const price = calculatePrice(energy, examplePrice);
      expect(price).toBe(200);
    });
  });
});
