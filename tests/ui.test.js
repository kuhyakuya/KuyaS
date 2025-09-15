const { fireEvent } = require('@testing-library/dom');

describe('UI interactions', () => {
  test('tombol "Tampilkan Portofolio"', () => {
    document.body.innerHTML = `
      <div id="pfToggle" class="portfolio-toggle"><span class="toggle-text">Tampilkan Portofolio</span></div>
      <div id="portfolio" style="display:none"></div>
    `;

    const pfToggle = document.getElementById('pfToggle');
    const pfGrid = document.getElementById('portfolio');

    global.Portfolio = {
      loadAndRender: jest.fn(() => {
        pfGrid.innerHTML = '<div class="portfolio-item"></div>';
        pfGrid.style.display = '';
        pfGrid.querySelector('.portfolio-item').classList.add('show');
      }),
      hide: jest.fn(() => {
        const item = pfGrid.querySelector('.portfolio-item');
        item.classList.remove('show');
        item.classList.add('hide');
        pfGrid.style.display = 'none';
      })
    };

    pfToggle.addEventListener('click', () => {
      const hidden = pfGrid.style.display === 'none';
      if (hidden) {
        pfGrid.style.display = '';
        pfToggle.classList.toggle('active', true);
        Portfolio.loadAndRender();
      } else {
        pfToggle.classList.toggle('active', false);
        Portfolio.hide();
      }
    });

    fireEvent.click(pfToggle);
    expect(Portfolio.loadAndRender).toHaveBeenCalled();
    expect(pfGrid.style.display).not.toBe('none');
    expect(pfGrid.querySelector('.portfolio-item')).toHaveClass('show');

    fireEvent.click(pfToggle);
    expect(Portfolio.hide).toHaveBeenCalled();
    expect(pfToggle).not.toHaveClass('active');
    expect(pfGrid.querySelector('.portfolio-item')).toHaveClass('hide');
  });

  test('tombol "Kebijakan & Panduan"', () => {
    document.body.innerHTML = `
      <button id="policyBtn">Kebijakan & Panduan</button>
      <div id="policyModal" class="modal-overlay" style="backdrop-filter:blur(5px)">
        <div class="modal-box"></div>
        <button id="modalClose">Tutup</button>
      </div>
    `;

    const policyBtn = document.getElementById('policyBtn');
    const policyModal = document.getElementById('policyModal');
    const modalClose = document.getElementById('modalClose');

    function closeModal(){ policyModal.classList.remove('show'); }

    policyBtn.addEventListener('click', () => {
      policyModal.classList.add('show');
    });
    modalClose.addEventListener('click', closeModal);
    policyModal.addEventListener('click', e => {
      if(e.target === policyModal) closeModal();
    });

    fireEvent.click(policyBtn);
    expect(policyModal).toHaveClass('show');
    expect(policyModal.style.backdropFilter).toBe('blur(5px)');

    fireEvent.click(modalClose);
    expect(policyModal).not.toHaveClass('show');

    fireEvent.click(policyBtn);
    expect(policyModal).toHaveClass('show');
    fireEvent.click(policyModal);
    expect(policyModal).not.toHaveClass('show');
  });
});
