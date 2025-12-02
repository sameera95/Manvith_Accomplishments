// Loads sections.json and renders timeline items
async function loadSections(){
  try{
    const resp = await fetch('./assets/data/sections.json');
    if(!resp.ok) throw new Error('Failed to load sections.json: '+resp.status);
    const sections = await resp.json();
    renderTimeline(sections);
  }catch(err){
    console.error(err);
    const container = document.getElementById('timeline');
    container.innerHTML = '<p style="color:#b00">Error loading content. See console.</p>';
  }
}

function renderTimeline(sections){
  const container = document.getElementById('timeline');
  container.innerHTML = ''; // clear
  sections.forEach((s, idx)=>{
    const side = (idx % 2 === 0) ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = 'item '+side;
    item.innerHTML = `
      <div class="card">
        <div class="media" style="background-image:url('${s.image}')" role="img" aria-label="${escapeHtml(s.title)} image"></div>
        <div class="content">
          <div class="meta">${escapeHtml(s.date)}</div>
          <h3>${escapeHtml(s.title)}</h3>
          <div class="meta">${escapeHtml(s.subtitle || '')}</div>
          <p>${escapeHtml(s.description)}</p>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function escapeHtml(str){
  if(!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// Initialize
document.addEventListener('DOMContentLoaded', ()=>{
  loadSections();
});
