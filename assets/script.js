// Loads sections.json and renders timeline/achievement items.
// The page can specify a category to filter by placing `data-category` on the #timeline element
// e.g. <section id="timeline" data-category="achievement"> will show only achievement items.
async function loadSections(){
  try{
    const resp = await fetch('./assets/data/sections.json');
    if(!resp.ok) throw new Error('Failed to load sections.json: '+resp.status);
    let sections = await resp.json();

    const container = document.getElementById('timeline');
    const category = container?.dataset?.category;
    if(category){
      sections = sections.filter(s => String(s.category).toLowerCase() === String(category).toLowerCase());
    }
    renderTimeline(sections);
  }catch(err){
    console.error(err);
    const container = document.getElementById('timeline');
    if(container) container.innerHTML = '<p style="color:#b00">Error loading content. See console.</p>';
  }
}

function renderTimeline(sections){
  const container = document.getElementById('timeline');
  if(!container) return;
  container.innerHTML = ''; // clear
  sections.forEach((s, idx)=>{
    const side = (idx % 2 === 0) ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = 'item '+side;
    item.innerHTML = `
      <div class="dot" aria-hidden="true"></div>
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
