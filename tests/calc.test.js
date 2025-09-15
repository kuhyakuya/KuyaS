require('../assets/pricing.js');

describe('perhitungan order', () => {
  test('menghitung base price + overtime + buffer fee', () => {
    const { calcTotal } = window.Pricing;
    const pkg = { price: 1000, overRatePerMin: 50 };
    const cfg = { surcharge: {}, bufferFee: {5: 10} };
    const promo = {};
    const result = calcTotal(pkg, cfg, promo, 10, 'normal');
    expect(result.overCost).toBe(250);
    expect(result.bufVal).toBe(125);
    expect(result.total).toBe(1375);
  });
});
