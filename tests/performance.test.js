const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

describe('performansi dasar', () => {
  test('render awal kurang dari 2 detik', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
    const start = performance.now();
    document.body.innerHTML = html;
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(2000);
  });

  test('ukuran bundle JS < 1MB', () => {
    const files = ['assets/pricing.js', 'assets/portfolio.js'];
    const total = files.reduce((sum, f) => {
      return sum + fs.statSync(path.resolve(__dirname, '..', f)).size;
    }, 0);
    expect(total).toBeLessThan(1024 * 1024);
  });
});
