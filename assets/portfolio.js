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
  const statusMap={ // map payment status to icon data
    paid:{src:'img/paid.png',alt:'Lunas',title:'Lunas'}, // icon for paid
    free:{src:'img/free.png',alt:'Gratis',title:'Gratis'}, // icon for free
    unpaid:{src:'img/unpaid.png',alt:'Belum Bayar',title:'Belum Bayar'} // icon for unpaid
  }; // end of map
  items.forEach(it=>{
    const el=document.createElement('div');
    el.className='portfolio-item';
    const videoUrl=toDrivePreviewLink(it.video); // ensure preview link
    const isDrive=/drive\.google\.com/.test(videoUrl||''); // check gdrive
    const media=isDrive
      ? `<iframe src="${escapeHtml(videoUrl)}" allow="autoplay" allowfullscreen></iframe>` // use drive preview
      : `<video controls src="${escapeHtml(videoUrl)}"></video>`; // no custom poster
    const st=statusMap[it.paymentStatus]||statusMap.unpaid; // resolve icon based on paymentStatus
    el.innerHTML=`
      <div class="video-wrapper">
        ${media}
        <img class="flag" src="${st.src}" alt="${st.alt}" title="${st.title}"> <!-- status icon with tooltip -->
      </div>
      <p class="desc">${escapeHtml(it.description)}</p>
    `; // set card markup with status icon
    if(!isDrive){ // handle non-drive videos
      const v=el.querySelector('video'); // video element
      const w=el.querySelector('.video-wrapper'); // wrapper
      if(v&&w){
        v.addEventListener('error',()=>{
          w.innerHTML=`Video tidak tersedia <a href="${escapeHtml(it.video)}" download>Download video</a>`; // error message
        });
      }
    }
    container.appendChild(el);
  });
}

window.Portfolio = { loadAndRender: loadAndRenderPortfolio };
