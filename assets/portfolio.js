// assets/portfolio.js

function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))}

async function loadAndRenderPortfolio(basePath="."){
  try{
    const res = await fetch(`${basePath}/config/portfolio.json?ts=${Date.now()}`);
    const data = await res.json();
    renderPortfolio(data.items || []);
  }catch(e){ console.error("Portfolio load error:",e); }
}

function toDrivePreviewLink(url){
  if(typeof url!=="string" || !/drive\.google\.com/.test(url)) return url;
  const idParam = url.match(/[?&]id=([^&]+)/);
  const idPath = url.match(/\/d\/([^\/]+)/);
  const id = idParam ? idParam[1] : idPath ? idPath[1] : null;
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

function renderPortfolio(items){
  const container = document.getElementById('portfolio');
  if(!container) return;
  container.innerHTML='';
  items.forEach(it=>{
    const el = document.createElement('div');
    el.className='portfolio-item';
    const video = toDrivePreviewLink(it.video);
    const isDrive = /drive\.google\.com/.test(video||'');
    const media = isDrive
      ? `<iframe src="${escapeHtml(video)}" allow="autoplay" allowfullscreen></iframe>`
      : `<video controls src="${escapeHtml(video)}"></video>`;
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
