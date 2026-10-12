import { projects } from './projects.js';
import { icon, art } from './art.js';
import { sourceNotes } from './source-notes.js';

const book = document.querySelector('#spread');
const bookmarks = document.querySelector('.bookmarks');
const cover = document.querySelector('.book-cover');
const pageTurn = document.querySelector('.page-turn');
const dialog = document.querySelector('.journal-dialog');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
let current = 0;
let variant = 'web';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finishTurn = () => cover.classList.remove('turning-forward', 'turning-backward');
pageTurn.addEventListener('animationend', finishTurn);
reducedMotion.addEventListener('change', finishTurn);
const safe = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

bookmarks.innerHTML = projects.map((p, i) => `<button class="bookmark" data-project="${i}" style="--tab:${p.pale};--tab-strong:${p.color}" aria-label="${p.name}" aria-controls="spread">${icon(p.symbol)}<span>${p.label}</span></button>`).join('');

function route() {
  const [id, mode] = location.hash.slice(1).split('/');
  const index = projects.findIndex(p => p.id === id);
  return { index: index < 0 ? 0 : index, mode: mode === 'mini' && id === 'academy' ? 'mini' : 'web' };
}

function render(animate = false, direction = 1) {
  finishTurn();
  const base = projects[current];
  const p = variant === 'mini' && base.mini ? { ...base, ...base.mini } : base;
  const source = sourceNotes[current];
  const chapter = String(current + 1).padStart(2, '0');
  document.documentElement.style.setProperty('--accent', base.color);
  document.documentElement.style.setProperty('--pale', base.pale);
  document.title = `${p.name} — дневник разработчика Crypton`;
  bookmarks.querySelectorAll('button').forEach((button, i) => {
    if (i === current) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  book.innerHTML = `<section class="paper-page page-left" aria-labelledby="project-title">
    <div class="page-running-head"><span>CRYPTON / ДНЕВНИК РАЗРАБОТЧИКА</span>${icon('spark')}</div>
    <div class="chapter-label">ГЛАВА ${chapter}<span> / </span>${p.category}</div>
    <h1 id="project-title">${p.name}</h1><p class="tagline">${p.tagline}</p>
    ${base.mini ? `<div class="variants" role="group" aria-label="Версия Academy"><button class="variant" data-variant="web" aria-pressed="${variant === 'web'}">Веб-платформа</button><button class="variant" data-variant="mini" aria-pressed="${variant === 'mini'}">Telegram + Base</button></div>` : ''}
    <div class="project-links"><a class="project-link primary" href="${source.deploy}" target="_blank" rel="noopener noreferrer">${icon('arrow')}${variant === 'mini' ? 'Сайт Academy' : 'Открыть проект'}</a>${source.code === 'NDA' ? `<button class="project-link nda" data-action="nda" aria-label="Исходный код закрыт по NDA">${icon('lock')}Код под NDA</button>` : `<a class="project-link secondary" href="${source.code}" target="_blank" rel="noopener noreferrer">${icon('code')}Исходный код</a>`}</div>
    ${art(p)}
    <section class="note about-note tape"><h2>Об этом приключении</h2><p>${p.description}</p></section>
    <section class="stack"><h2 class="stack-heading">${icon('code')}В моём рюкзаке</h2><div class="stack-tags">${p.stack.map(s => `<span>${s}</span>`).join('')}</div></section>
    <div class="page-number"><span>ПОРТФОЛИО / ${p.name.toUpperCase()}</span><span class="folio">${String(current * 2 + 1).padStart(2, '0')}</span></div>
    </section><section class="paper-page page-right" aria-label="Вклад и особенности проекта">
    <div class="page-running-head"><span>ЗАПИСИ С ПОЛЕЙ</span><span class="status ${p.active ? '' : 'archived'}">${p.active ? 'Активный проект' : 'Проект в прошлом'}</span></div>
    <section class="note contribution-note tape"><div class="section-heading">${icon('sword')}<h2>Мой вклад</h2></div><p class="role">${p.role}</p><ul class="contribution-list">${p.contribution.map(c => `<li>${icon('check')}<span>${c}</span></li>`).join('')}</ul></section>
    <section class="note cases-note"><div class="section-heading">${icon('spark')}<h2>Редкие находки</h2></div><ol class="case-list">${p.cases.map(([title, text], i) => `<li><span class="case-number">0${i + 1}</span><div><strong>${title}</strong><p>${text}</p></div></li>`).join('')}</ol></section>
    <button class="all-notes" data-action="notes">Все заметки о проекте ${icon('arrow')}</button><span class="handwritten" aria-hidden="true">За каждым интерфейсом<br>есть своя история.</span>
    <div class="page-number"><span>СОЗДАНО С ВНИМАНИЕМ К ДЕТАЛЯМ</span><span class="folio">${String(current * 2 + 2).padStart(2, '0')}</span></div>
    </section>`;
  previous.disabled = current === 0;
  next.disabled = current === projects.length - 1;
  document.querySelector('.chapter-counter').textContent = `ГЛАВА ${chapter} ИЗ 0${projects.length}`;
  document.querySelector('.progress-dots').innerHTML = projects.map((_, i) => `<i class="${i === current ? 'current' : ''}"></i>`).join('');
  document.querySelector('#announcement').textContent = `Глава ${current + 1} из ${projects.length}: ${p.name}`;
  if (animate && !reducedMotion.matches) {
    void cover.offsetWidth;
    cover.classList.add(direction >= 0 ? 'turning-forward' : 'turning-backward');
  }
}

function navigate(index, mode = 'web', scroll = false) {
  if (index < 0 || index >= projects.length || (index === current && mode === variant)) return;
  const direction = index - current;
  current = index;
  variant = mode;
  const hash = `#${projects[current].id}${mode === 'mini' ? '/mini' : ''}`;
  history.pushState(null, '', hash);
  render(true, direction);
  if (scroll && window.matchMedia('(max-width: 800px)').matches) window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}

function markdown(text) {
  const inline = value => safe(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  let list = false;
  let html = '';
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('- ')) { if (!list) { html += '<ul>'; list = true; } html += `<li>${inline(line.slice(2))}</li>`; continue; }
    if (list) { html += '</ul>'; list = false; }
    if (line === '---') html += '<hr>';
    else if (/^\*\*[^*]+\*\*$/.test(line)) html += `<h3>${inline(line)}</h3>`;
    else html += `<p>${inline(line)}</p>`;
  }
  return html + (list ? '</ul>' : '');
}

function openNotes(nda = false) {
  document.querySelector('#dialog-title').textContent = nda ? 'Исходный код под NDA' : projects[current].name;
  document.querySelector('#dialog-content').innerHTML = nda ? '<p>Исходный код Academy закрыт соглашением о неразглашении. В портфолио доступны описание проекта, мой вклад, интересные задачи и стек технологий.</p><p>Веб-платформу можно посмотреть по кнопке «Открыть проект».</p>' : markdown(sourceNotes[current].body);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

bookmarks.addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b) navigate(Number(b.dataset.project)); });
previous.addEventListener('click', () => navigate(current - 1, 'web', true));
next.addEventListener('click', () => navigate(current + 1, 'web', true));
book.addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button) return;
  if (button.dataset.variant) {
    navigate(current, button.dataset.variant);
    book.querySelector(`[data-variant="${variant}"]`).focus({ preventScroll: true });
  }
  if (button.dataset.action) openNotes(button.dataset.action === 'nda');
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.addEventListener('keydown', e => {
  if (dialog.open || e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const focusedBookmark = e.target.closest?.('.bookmark');
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    navigate(current + (e.key === 'ArrowRight' ? 1 : -1));
    if (focusedBookmark) bookmarks.querySelector(`[data-project="${current}"]`).focus();
  }
});
let touchStart;
book.addEventListener('touchstart', e => { if (e.touches.length === 1 && !e.target.closest('a,button')) touchStart = {x:e.touches[0].clientX, y:e.touches[0].clientY}; else touchStart = null; }, {passive:true});
book.addEventListener('touchend', e => { if (!touchStart || !e.changedTouches.length) return; const dx = e.changedTouches[0].clientX - touchStart.x; const dy = e.changedTouches[0].clientY - touchStart.y; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) navigate(current + (dx < 0 ? 1 : -1), 'web', true); touchStart = null; }, {passive:true});
book.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});
function restoreRoute() { const r = route(); const old = current; current = r.index; variant = r.mode; render(true, current - old); }
window.addEventListener('popstate', restoreRoute);
window.addEventListener('hashchange', restoreRoute);
document.querySelector('.skip-link').addEventListener('click', e => {
  e.preventDefault();
  book.focus();
  book.scrollIntoView({ block: 'start', behavior: 'instant' });
});
const initial = route(); current = initial.index; variant = initial.mode;
render();
