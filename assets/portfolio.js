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
    const el=document.createElement('div');
    el.className='portfolio-item';
    const videoUrl=toDrivePreviewLink(it.video);
    const isDrive=/drive\.google\.com/.test(videoUrl||'');
    const thumb=it.thumbnail||'img/placeholder.svg'; // thumbnail fallback
    const media=isDrive
      ? `<img class="thumb" src="${escapeHtml(thumb)}" alt="thumbnail"><iframe src="${escapeHtml(videoUrl)}" allow="autoplay" allowfullscreen></iframe>`
      : `<video controls src="${escapeHtml(videoUrl)}" poster="${escapeHtml(thumb)}"></video>`; // apply thumb
    el.innerHTML=`
      <div class="video-wrapper">
        ${media}
        <img class="flag" src="assets/${it.paid?'paid':'free'}.svg" alt="${it.paid?'Berbayar':'Gratis'}">
      </div>
      <p class="desc">${escapeHtml(it.description)}</p>
    `;
    if(isDrive){
      const t=el.querySelector('.thumb');
      if(t){t.addEventListener('error',()=>{t.src='img/placeholder.svg';});}
      const f=el.querySelector('iframe');
      if(f&&t){f.addEventListener('load',()=>{t.remove();});}
    }else{
      const v=el.querySelector('video');
      const w=el.querySelector('.video-wrapper');
      const chk=new Image();
      chk.src=thumb;
      chk.onerror=()=>{v.setAttribute('poster','img/placeholder.svg');}; // ensure thumb exists
      if(v&&w){
        v.addEventListener('error',()=>{
          w.innerHTML=`Video tidak tersedia <a href="${escapeHtml(it.video)}" download>Download video</a>`;
        });
      }
    }
    container.appendChild(el);
  });
}

window.Portfolio = { loadAndRender: loadAndRenderPortfolio };
