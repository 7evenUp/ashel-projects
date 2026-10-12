const paths = {
  key: '<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9m-3-3 3-3m-6 0 3-3"/>',
  spark: '<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z"/>',
  crown: '<path d="m3 6 4 4 5-6 5 6 4-4-2 13H5ZM5 16h14"/>',
  gift: '<path d="M3 10h18v4H3zm2 4v7h14v-7M12 10v11"/><path d="M12 10C3 10 4 2 8 4c2 1 4 6 4 6Zm0 0s2-5 4-6c4-2 5 6-4 6Z"/>',
  sword: '<path d="m5 19 3-3m-4-3 7 7m-3-6L18 3h3v3L10 16M3 19l2 2"/>',
  leaf: '<path d="M20 3C9 1 2 6 5 14s16 4 15-11ZM4 21 15 9M8 16v-6m0 6h6"/>',
  book: '<path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-2-10 1Z"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
export function icon(type, cls='') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type] || paths.spark}</svg>`; }

const pixelKey = `<g stroke="#67527e" stroke-width="3"><path fill="#aa90c6" d="M30 3h27v8h9v27h-9v8H42v17h-9v13H20V63h-9V51h19V38h-9V11h9Z"/><path fill="#eae0f0" d="M37 14h16v20H37Z"/><path d="M34 48v12h-8" fill="none"/></g>`;
const pixelStar = `<path d="M24 0h8v16h16v8h16v8H48v16H32v16h-8V48H8V32H0v-8h16V8h8Z" fill="#d6b65e" stroke="#9e834a" stroke-width="2"/>`;
function pixel(type) {
 if(type==='passport') return `<svg class="pixel-key" viewBox="0 0 82 90" aria-hidden="true">${pixelKey}</svg>`;
 if(type==='crown') return `<svg viewBox="0 0 180 125" aria-hidden="true"><path d="M18 99V31h18v18h18V31h18V13h18v18h18v18h18V31h18v68Z" fill="#e9c867" stroke="#806441" stroke-width="5"/><path d="M18 89h126v20H18Z" fill="#bb9550" stroke="#806441" stroke-width="5"/><path d="M69 57h24v25H69Z" fill="#a477a1"/><path d="M29 57h11v12H29Zm93 0h11v12h-11" fill="#fff1bb"/></svg>`;
 if(type==='gift') return `<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M39 66h102v69H39Z" fill="#82a79d" stroke="#3f6a65" stroke-width="4"/><path d="M29 52h122v26H29Z" fill="#abd0bd" stroke="#3f6a65" stroke-width="4"/><path d="M78 52h23v83H78Z" fill="#dc9a91" stroke="#8c605d" stroke-width="4"/><path d="M80 52H51V37H39V24h27v13h14Zm21 0h28V37h12V24h-26v13h-14Z" fill="#db9b93" stroke="#8c605d" stroke-width="4"/></svg>`;
 if(type==='tree') return `<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M46 36h27V20h34v16h29v20h17v36h-20v17H48V92H28V59h18Z" fill="#a5b679" stroke="#5c754e" stroke-width="4"/><path d="M76 90h29v45H76Z" fill="#b78c61" stroke="#786043" stroke-width="4"/><path d="M62 135h59v10H62Z" fill="#91a564"/><path d="M49 57h12v12H49Zm61-14h12v12h-12Zm-9 39h12v12h-12Z" fill="#e9d076"/></svg>`;
 if(type==='academy') return `<svg viewBox="0 0 180 140" aria-hidden="true"><path d="M20 33h51l19 13 19-13h51v84h-51l-19 11-19-11H20Z" fill="#e8ddc4" stroke="#5d7088" stroke-width="4"/><path d="M90 47v79M31 51h31m-31 14h41m-41 14h33m-33 15h40m39-43h34m-34 14h34m-34 14h34" stroke="#8b9fae" stroke-width="4"/><path d="M118 32V8h16v34l-8-7-8 7Z" fill="#ab859b"/></svg>`;
 if(type==='nutcracker') return `<svg viewBox="0 0 180 160" aria-hidden="true"><path d="M60 6h60v46H60Z" fill="#6e686f" stroke="#544650" stroke-width="4"/><path d="M52 38h76v14H52Z" fill="#b78575"/><path d="M60 54h60v43H60Z" fill="#e3c5a6" stroke="#8e6b61" stroke-width="4"/><path d="M60 95h60v45H60Z" fill="#b57375" stroke="#794e5b" stroke-width="4"/><path d="M37 100h20v38H37Zm87 0h20v38h-20" fill="#b57375" stroke="#794e5b" stroke-width="4"/><path d="M62 140h22v16H62Zm36 0h22v16H98Z" fill="#6e686f"/><path d="M70 64h9v9h-9m31-9h9v9h-9M76 85h29M90 99v33M70 111h39m-39 13h39" stroke="#544650" stroke-width="4"/><path d="M83 16h14v14H83Z" fill="#d4b772"/></svg>`;
 return `<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M41 57h29l59-32v90L70 84H41Z" fill="#cd9377" stroke="#865e50" stroke-width="4"/><path d="M68 86h22l15 47H83Z" fill="#b57f63" stroke="#865e50" stroke-width="4"/><path d="m140 42 17-10m-14 36h23m-26 27 17 10" stroke="#ba8d62" stroke-width="5"/><path d="M45 62h21v17H45Z" fill="#eed9c4"/></svg>`;
}
export function art(project) {
 const passport = project.illustration === 'passport';
 return `<div class="illustration illustration-${project.illustration}" aria-hidden="true"><span class="sketch-star star-one">✦</span><span class="sketch-star star-two">✧</span><div class="art-orbit"></div>${passport ? `<div class="passport-card"><div class="passport-top"><span>CRYPTON</span>${icon('spark')}</div><div class="passport-body"><div class="avatar-pixel"><i></i><i></i></div><div><strong>EXPLORER ID</strong><span>your key to the ecosystem</span><div class="card-lines"></div></div></div><div class="passport-bottom"><span>◆ VERIFIED ADVENTURER</span><span>•••• 0001</span></div></div><div class="key-sticker">${pixel('passport')}</div>` : `<div class="artifact-ticket"><span class="artifact-label">CRYPTON COLLECTION</span><div class="artifact-pixel">${pixel(project.illustration)}</div><span class="artifact-name">${project.seal}</span></div><div class="mini-star">${pixelStar ? `<svg viewBox="0 0 66 66">${pixelStar}</svg>` : ''}</div>`}<span class="art-annotation">${project.note}</span><svg class="sketch-arrow" viewBox="0 0 90 40"><path d="M4 10c24 30 44 29 73 3m-16 1 18-4-4 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>`;
}
