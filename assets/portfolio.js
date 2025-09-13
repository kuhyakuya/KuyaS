// assets/portfolio.js

function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))}

async function loadAndRenderPortfolio(basePath="."){
  try{
    const res = await fetch(`${basePath}/config/portfolio.json?ts=${Date.now()}`);
    const data = await res.json();
    renderPortfolio(data.items || []);
  }catch(e){ console.error("Portfolio load error:",e); }
}

function renderPortfolio(items){
  const container = document.getElementById('portfolio');
  if(!container) return;
  container.innerHTML='';
  items.forEach(it=>{
    const el = document.createElement('div');
    el.className='portfolio-item';
    const isDrivePreview = /https:\/\/drive\.google\.com\/file\/d\/.+\/preview/.test(it.video||'');
    const media = isDrivePreview
      ? `<iframe src="${escapeHtml(it.video)}" allow="autoplay" allowfullscreen></iframe>`
      : `<video controls src="${escapeHtml(it.video)}"></video>`;
    el.innerHTML=`
      <div class="video-wrapper">
        ${media}
        <img class="flag" src="assets/${it.paid?'paid':'free'}.svg" alt="${it.paid?'Berbayar':'Gratis'}">
      </div>
      <p class="desc">${escapeHtml(it.description)}</p>
    `;
    container.appendChild(el);
  });
}

window.Portfolio = { loadAndRender: loadAndRenderPortfolio };
