require('../assets/portfolio.js');

describe('animasi portfolio', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('fade-in menambahkan .show bertahap', () => {
    document.body.innerHTML = `
      <div id="portfolio">
        <div class="portfolio-item"></div>
        <div class="portfolio-item"></div>
      </div>
    `;
    const items = document.querySelectorAll('.portfolio-item');
    window.Portfolio.animate();
    jest.advanceTimersByTime(50);
    jest.advanceTimersByTime(0);
    expect(items[0]).toHaveClass('show');
    expect(items[1]).not.toHaveClass('show');
    jest.advanceTimersByTime(150);
    expect(items[1]).toHaveClass('show');
  });

  test('fade-out menerapkan .hide', () => {
    document.body.innerHTML = `
      <div id="portfolio" style="">
        <div class="portfolio-item show"></div>
        <div class="portfolio-item show"></div>
      </div>
    `;
    const container = document.getElementById('portfolio');
    const items = container.querySelectorAll('.portfolio-item');
    window.Portfolio.hide();
    jest.advanceTimersByTime(0);
    expect(items[0]).toHaveClass('hide');
    jest.advanceTimersByTime(100);
    expect(items[1]).toHaveClass('hide');
    jest.advanceTimersByTime(500);
    expect(container.style.display).toBe('none');
  });
});
