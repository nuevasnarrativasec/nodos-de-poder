// ─── DATA ─────────────────────────────────────────────────────────────────
const DATA = {"global":{"AMAZONAS":{"contratos":6,"monto":4640.0,"familiares":2,"congresistas":["Infantes Eliana","Miguel Ciccia","Torres Rosio"]},"ANCASH":{"contratos":75,"monto":2384080.53,"familiares":3,"congresistas":["Chacon Nilza","Juarez Patricia","Portalatino Roxana","Torres Rosio"]},"APURIMAC":{"contratos":44,"monto":854780.92,"familiares":4,"congresistas":["Bellido Guido","Cruz Mamani","Medina Esdras","Portalatino Roxana","Taipe Maria"]},"AREQUIPA":{"contratos":57,"monto":800968.25,"familiares":8,"congresistas":["Amuruz Rosselli","Chacon Nilza","Cueto Jose","Gonzales Diana","Juarez Patricia","Medina Esdras","Paredes Alex","Quito Jaime","Victor Cutipa"]},"AYACUCHO":{"contratos":4,"monto":141000.0,"familiares":2,"congresistas":["Palacios Margot","Paredes Francis"]},"CAJAMARCA":{"contratos":21,"monto":81659.5,"familiares":2,"congresistas":["Ramirez Tania"]},"CALLAO":{"contratos":13,"monto":78773.0,"familiares":5,"congresistas":["Chacon Nilza","Chiabra Roberto","Chirinos Rosa","Medina Esdras","Obando Ana","Soto Alejandro"]},"CUSCO":{"contratos":112,"monto":1227494.26,"familiares":4,"congresistas":["Aragon Angel","Bellido Guido","Juarez Patricia","Luque Ruth","Quito Jaime","Soto Alejandro"]},"HUANCAVELICA":{"contratos":11,"monto":2030634.4,"familiares":2,"congresistas":["Orue Ariana","Paredes Francis","Zegarra Zadith"]},"HUANUCO":{"contratos":2,"monto":851.8,"familiares":1,"congresistas":["Medina Sara"]},"ICA":{"contratos":479,"monto":2621396.39,"familiares":7,"congresistas":["Barbaran Rosangella","Huaman Raul","Juarez Patricia","Marticorena Alfonso","Muñante Alejandro","Paredes Francis","Torres Rosio"]},"JUNIN":{"contratos":2,"monto":2279556.45,"familiares":2,"congresistas":["Torres Rosio"]},"LA LIBERTAD":{"contratos":4,"monto":337365.99,"familiares":1,"congresistas":["Miguel Ciccia","Padilla Rommel"]},"LAMBAYEQUE":{"contratos":21,"monto":219386.5,"familiares":2,"congresistas":["Chacon Nilza","Echaiz Margot","Miguel Ciccia","Soto Alejandro"]},"LIMA":{"contratos":224,"monto":3866936.12,"familiares":9,"congresistas":["Amuruz Rosselli","Arriola Alberto","Bustamante Ernesto","Chacon Nilza","Chiabra Roberto","Gonza Américo","Juarez Patricia","Luna Leon","Medina Esdras","Miguel Ciccia","Muñante Alejandro","Padilla Rommel","Reyes Augusto","Sanchez Helbert","Soto Alejandro","Taipe Maria","Tello Edgar","Torres Rosio","Valer Hector","Zegarra Zadith"]},"LORETO":{"contratos":237,"monto":5110166.19,"familiares":7,"congresistas":["Flores Seferino","Ramirez Tania","Torres Rosio","Zegarra Zadith"]},"MOQUEGUA":{"contratos":16,"monto":58800.0,"familiares":1,"congresistas":["Victor Cutipa"]},"PASCO":{"contratos":3,"monto":22500.0,"familiares":2,"congresistas":["Davila Neomias","Robles Emperatriz"]},"PIURA":{"contratos":169,"monto":1578344.51,"familiares":4,"congresistas":["Chacon Nilza","Miguel Ciccia","Padilla Rommel","Revilla Cesar"]},"PUNO":{"contratos":8,"monto":32881.0,"familiares":4,"congresistas":["Cruz Mamani","Luque Ruth","Quito Jaime"]},"SAN MARTIN":{"contratos":28,"monto":133144.61,"familiares":2,"congresistas":["Flores Seferino","Medina Sara","Torres Rosio","Trigozo Cheryl"]},"TACNA":{"contratos":18,"monto":48150.0,"familiares":3,"congresistas":["Limachi Esmeralda","Mita Alanoca","Victor Cutipa"]},"UCAYALI":{"contratos":9,"monto":19972.5,"familiares":2,"congresistas":["Davila Neomias","Lopez Luz","Medina Sara"]}},"por_congresista":{"Torres Rosio":{"AMAZONAS":{"contratos":1,"monto":1000.0,"familiares":1},"ANCASH":{"contratos":1,"monto":1921129.92,"familiares":1},"ICA":{"contratos":1,"monto":1054339.97,"familiares":1},"JUNIN":{"contratos":2,"monto":2279556.45,"familiares":2},"LIMA":{"contratos":11,"monto":1520343.73,"familiares":2},"LORETO":{"contratos":51,"monto":3511184.27,"familiares":5},"SAN MARTIN":{"contratos":1,"monto":14771.61,"familiares":1}},"Chiabra Roberto":{"CALLAO":{"contratos":2,"monto":32000.0,"familiares":1},"LIMA":{"contratos":2,"monto":20580.0,"familiares":1}},"Juarez Patricia":{"ANCASH":{"contratos":1,"monto":14000.0,"familiares":1},"AREQUIPA":{"contratos":14,"monto":474399.99,"familiares":1},"CUSCO":{"contratos":24,"monto":626679.96,"familiares":1},"ICA":{"contratos":6,"monto":106000.0,"familiares":1},"LIMA":{"contratos":21,"monto":362333.33,"familiares":2}},"Chacon Nilza":{"ANCASH":{"contratos":70,"monto":444251.61,"familiares":1},"AREQUIPA":{"contratos":1,"monto":7000.0,"familiares":1},"CALLAO":{"contratos":2,"monto":2940.0,"familiares":1},"LAMBAYEQUE":{"contratos":1,"monto":3091.5,"familiares":1},"LIMA":{"contratos":53,"monto":1033849.6,"familiares":2},"PIURA":{"contratos":1,"monto":14546.7,"familiares":1}},"Cruz Mamani":{"APURIMAC":{"contratos":4,"monto":20500.0,"familiares":2},"PUNO":{"contratos":4,"monto":25881.0,"familiares":2}},"Zegarra Zadith":{"HUANCAVELICA":{"contratos":7,"monto":38534.0,"familiares":1},"LIMA":{"contratos":1,"monto":15753.6,"familiares":1},"LORETO":{"contratos":166,"monto":1529191.52,"familiares":2}},"Miguel Ciccia":{"AMAZONAS":{"contratos":4,"monto":560.0,"familiares":1},"LA LIBERTAD":{"contratos":3,"monto":327465.99,"familiares":1},"LAMBAYEQUE":{"contratos":8,"monto":53045.0,"familiares":1},"LIMA":{"contratos":4,"monto":48335.0,"familiares":1},"PIURA":{"contratos":157,"monto":1500568.78,"familiares":2}},"Taipe Maria":{"APURIMAC":{"contratos":14,"monto":559160.97,"familiares":2},"LIMA":{"contratos":1,"monto":40820.86,"familiares":1}},"Bellido Guido":{"APURIMAC":{"contratos":22,"monto":263619.95,"familiares":1},"CUSCO":{"contratos":27,"monto":310494.8,"familiares":1}},"Paredes Francis":{"AYACUCHO":{"contratos":2,"monto":129200.0,"familiares":1},"HUANCAVELICA":{"contratos":3,"monto":1989600.4,"familiares":1},"ICA":{"contratos":36,"monto":348714.03,"familiares":1}},"Reyes Augusto":{"LIMA":{"contratos":21,"monto":39500.0,"familiares":1}},"Medina Esdras":{"APURIMAC":{"contratos":3,"monto":8500.0,"familiares":1},"AREQUIPA":{"contratos":20,"monto":90876.99,"familiares":2},"CALLAO":{"contratos":4,"monto":25000.0,"familiares":2},"LIMA":{"contratos":29,"monto":155850.0,"familiares":2}},"Sanchez Helbert":{"LIMA":{"contratos":10,"monto":72800.0,"familiares":2}},"Trigozo Cheryl":{"SAN MARTIN":{"contratos":21,"monto":105533.0,"familiares":1}},"Soto Alejandro":{"CALLAO":{"contratos":2,"monto":10633.0,"familiares":1},"CUSCO":{"contratos":3,"monto":6500.0,"familiares":1},"LAMBAYEQUE":{"contratos":9,"monto":126000.0,"familiares":1},"LIMA":{"contratos":19,"monto":220903.7,"familiares":1}},"Quito Jaime":{"AREQUIPA":{"contratos":2,"monto":20000.0,"familiares":1},"CUSCO":{"contratos":49,"monto":260619.5,"familiares":1},"PUNO":{"contratos":3,"monto":6000.0,"familiares":1}},"Limachi Esmeralda":{"TACNA":{"contratos":5,"monto":9450.0,"familiares":1}},"Revilla Cesar":{"PIURA":{"contratos":10,"monto":41829.03,"familiares":2}},"Palacios Margot":{"AYACUCHO":{"contratos":2,"monto":11800.0,"familiares":1}},"Paredes Alex":{"AREQUIPA":{"contratos":5,"monto":25000.0,"familiares":1}},"Padilla Rommel":{"LA LIBERTAD":{"contratos":1,"monto":9900.0,"familiares":1},"LIMA":{"contratos":12,"monto":68190.0,"familiares":2},"PIURA":{"contratos":1,"monto":21400.0,"familiares":1}},"Gonzales Diana":{"AREQUIPA":{"contratos":4,"monto":15500.0,"familiares":2}},"Barbaran Rosangella":{"ICA":{"contratos":6,"monto":4200.0,"familiares":1}},"Medina Sara":{"HUANUCO":{"contratos":2,"monto":851.8,"familiares":1},"SAN MARTIN":{"contratos":2,"monto":7040.0,"familiares":1},"UCAYALI":{"contratos":3,"monto":1448.0,"familiares":1}},"Luque Ruth":{"CUSCO":{"contratos":6,"monto":12700.0,"familiares":1},"PUNO":{"contratos":1,"monto":1000.0,"familiares":1}},"Ramirez Tania":{"CAJAMARCA":{"contratos":21,"monto":81659.5,"familiares":2},"LORETO":{"contratos":12,"monto":52908.4,"familiares":1}},"Valer Hector":{"LIMA":{"contratos":3,"monto":26000.0,"familiares":1}},"Portalatino Roxana":{"ANCASH":{"contratos":3,"monto":4699.0,"familiares":1},"APURIMAC":{"contratos":1,"monto":3000.0,"familiares":1}},"Flores Seferino":{"LORETO":{"contratos":8,"monto":16882.0,"familiares":1},"SAN MARTIN":{"contratos":4,"monto":5800.0,"familiares":1}},"Arriola Alberto":{"LIMA":{"contratos":7,"monto":23450.0,"familiares":1}},"Huaman Raul":{"ICA":{"contratos":15,"monto":26865.0,"familiares":1}},"Mita Alanoca":{"TACNA":{"contratos":5,"monto":10700.0,"familiares":1}},"Obando Ana":{"CALLAO":{"contratos":2,"monto":3200.0,"familiares":1}},"Bustamante Ernesto":{"LIMA":{"contratos":8,"monto":35624.3,"familiares":2}},"Gonza Américo":{"LIMA":{"contratos":3,"monto":30000.0,"familiares":1}},"Robles Emperatriz":{"PASCO":{"contratos":1,"monto":12500.0,"familiares":1}},"Tello Edgar":{"LIMA":{"contratos":6,"monto":18000.0,"familiares":1}},"Lopez Luz":{"UCAYALI":{"contratos":4,"monto":12524.5,"familiares":1}},"Davila Neomias":{"PASCO":{"contratos":2,"monto":10000.0,"familiares":1},"UCAYALI":{"contratos":2,"monto":6000.0,"familiares":1}},"Chirinos Rosa":{"CALLAO":{"contratos":1,"monto":5000.0,"familiares":1}},"Victor Cutipa":{"AREQUIPA":{"contratos":3,"monto":78630.0,"familiares":1},"MOQUEGUA":{"contratos":16,"monto":58800.0,"familiares":1},"TACNA":{"contratos":8,"monto":28000.0,"familiares":1}},"Infantes Eliana":{"AMAZONAS":{"contratos":1,"monto":3080.0,"familiares":1}},"Luna Leon":{"LIMA":{"contratos":7,"monto":24000.0,"familiares":1}},"Echaiz Margot":{"LAMBAYEQUE":{"contratos":3,"monto":37250.0,"familiares":1}},"Muñante Alejandro":{"ICA":{"contratos":1,"monto":2700.0,"familiares":1},"LIMA":{"contratos":3,"monto":10922.0,"familiares":1}},"Marticorena Alfonso":{"ICA":{"contratos":414,"monto":1078577.39,"familiares":2}},"Aragon Angel":{"CUSCO":{"contratos":3,"monto":10500.0,"familiares":1}},"Orue Ariana":{"HUANCAVELICA":{"contratos":1,"monto":2500.0,"familiares":1}},"Amuruz Rosselli":{"AREQUIPA":{"contratos":7,"monto":87175.0,"familiares":1},"LIMA":{"contratos":1,"monto":41400.0,"familiares":1}},"Cueto Jose":{"AREQUIPA":{"contratos":1,"monto":2386.27,"familiares":1}}}};

// Map SVG region IDs to DATA keys
const ID_TO_DEPT = {
  'PE-AMA': 'AMAZONAS',
  'PE-ANC': 'ANCASH',
  'PE-APU': 'APURIMAC',
  'PE-ARE': 'AREQUIPA',
  'PE-AYA': 'AYACUCHO',
  'PE-CAJ': 'CAJAMARCA',
  'PE-CAL': 'CALLAO',
  'PE-CUS': 'CUSCO',
  'PE-HUC': 'HUANUCO',
  'PE-HUV': 'HUANCAVELICA',
  'PE-ICA': 'ICA',
  'PE-JUN': 'JUNIN',
  'PE-LAL': 'LA LIBERTAD',
  'PE-LAM': 'LAMBAYEQUE',
  'PE-LIM': 'LIMA',
  'PE-LMA': 'LIMA',       // Lima Metropolitana → same data bucket
  'PE-LOR': 'LORETO',
  'PE-MDD': 'MADRE DE DIOS',
  'PE-MOQ': 'MOQUEGUA',
  'PE-PAS': 'PASCO',
  'PE-PIU': 'PIURA',
  'PE-PUN': 'PUNO',
  'PE-SAM': 'SAN MARTIN',
  'PE-TAC': 'TACNA',
  'PE-TUM': 'TUMBES',
  'PE-UCA': 'UCAYALI',
  'PE-LKT': null           // Lake Titicaca – no data
};

// ─── HELPERS ──────────────────────────────────────────────────────────────
const fmtS = v => v >= 1e6
  ? 'S/ ' + (v/1e6).toFixed(2) + 'M'
  : v >= 1e3
    ? 'S/ ' + Math.round(v/1e3) + 'K'
    : 'S/ ' + Math.round(v).toLocaleString('es-PE');

const fmtFull = v => 'S/ ' + Math.round(v).toLocaleString('es-PE');

function lerp(a, b, t) { return a + (b - a) * t; }

// Color scale: sequential slate/blue-gray
function choroplethColor(t) {
  const stops = [
    [196,205,214],  // map-0 very light slate
    [166,179,190],  // map-1
    [135,153,166],  // map-2
    [96,120,136],   // map-3
    [62,90,110],    // map-4
    [30,58,80]      // map-5 deep slate
  ];
  const n = stops.length - 1;
  const i = Math.min(Math.floor(t * n), n - 1);
  const f = t * n - i;
  const c0 = stops[i], c1 = stops[i+1];
  const r = Math.round(lerp(c0[0], c1[0], f));
  const g = Math.round(lerp(c0[1], c1[1], f));
  const b2 = Math.round(lerp(c0[2], c1[2], f));
  return `rgb(${r},${g},${b2})`;
}

// ─── STATE ────────────────────────────────────────────────────────────────
let currentCong = '__all__';

// ─── BUILD COLOR SWATCHES ─────────────────────────────────────────────────
(function buildSwatches() {
  const container = document.getElementById('choro-swatches');
  const N = 8;
  for (let i = 0; i < N; i++) {
    const div = document.createElement('div');
    div.className = 'swatch';
    div.style.background = choroplethColor(i / (N - 1));
    container.appendChild(div);
  }
})();

// ─── GET DISPLAY DATA ─────────────────────────────────────────────────────
function getDisplayData(cong) {
  if (cong === '__all__') return DATA.global;
  const raw = DATA.por_congresista[cong];
  if (!raw) return {};
  const out = {};
  Object.entries(raw).forEach(([dept, d]) => {
    out[dept] = { contratos: d.contratos, monto: d.monto, familiares: d.familiares, congresistas: [cong] };
  });
  return out;
}

// ─── SVG SETUP ────────────────────────────────────────────────────────────
const svg = document.getElementById('map-svg');
const regionsG = document.getElementById('regions-g');

// Apply classes to paths
Array.from(regionsG.querySelectorAll('path')).forEach(p => {
  const id = p.getAttribute('id');
  if (id === 'PE-LKT') {
    p.classList.add('region', 'lake');
  } else {
    p.classList.add('region');
    p.addEventListener('mouseenter', e => onRegionEnter(e, id));
    p.addEventListener('mousemove', onMouseMove);
    p.addEventListener('mouseleave', onMouseOut);
    p.addEventListener('click', e => onRegionEnter(e, id));
  }
});

// ─── GLOBAL MAX ───────────────────────────────────────────────────────────
const globalMax = Math.max(...Object.values(DATA.global).map(d => d.monto));

// ─── RENDER ───────────────────────────────────────────────────────────────
function render(cong) {
  const dd = getDisplayData(cong);

  // Color regions + dim inactive
  Array.from(regionsG.querySelectorAll('path')).forEach(p => {
    const id = p.getAttribute('id');
    if (id === 'PE-LKT') return;
    const dept = ID_TO_DEPT[id];
    const info = dept ? dd[dept] : null;

    if (info) {
      const t = Math.pow(info.monto / globalMax, 0.55);
      p.style.fill = choroplethColor(t);
      p.classList.remove('dimmed');
    } else {
      p.style.fill = '#d8dde4';
      p.classList.add('dimmed');
    }
  });

  updateStats(cong, dd);
  updateTopList(dd);
}

// ─── STATS ────────────────────────────────────────────────────────────────
function updateStats(cong, dd) {
  const vals = Object.values(dd);
  document.getElementById('s-name').textContent =
    cong === '__all__' ? 'Todos los congresistas' : cong;
  document.getElementById('s-regs').textContent = vals.length;
  document.getElementById('s-contratos').textContent =
    vals.reduce((s, d) => s + d.contratos, 0).toLocaleString('es-PE');
  document.getElementById('s-monto').textContent =
    fmtS(vals.reduce((s, d) => s + d.monto, 0));
  document.getElementById('s-fam').textContent =
    cong === '__all__'
      ? vals.reduce((s, d) => s + d.familiares, 0)
      : (vals[0] ? vals[0].familiares : 0);
}

function updateTopList(dd) {
  const sorted = Object.entries(dd)
    .sort((a, b) => b[1].monto - a[1].monto)
    .slice(0, 5);
  document.getElementById('top-list').innerHTML = sorted.map(([dept, info]) =>
    `<li class="top-row">
      <span class="top-name">${dept}</span>
      <span class="top-monto">${fmtS(info.monto)}</span>
    </li>`
  ).join('');
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────
const tip = document.getElementById('tip');

function restoreTipStructure() {
  tip.innerHTML =
    `<div class="tip-region" id="t-region"></div>` +
    `<div class="tip-row"><span class="tip-val" id="t-contratos"></span><span>&nbsp;contratos / servicios</span></div>` +
    `<div class="tip-row"><span class="tip-val" id="t-monto"></span></div>` +
    `<div class="tip-row"><span class="tip-val" id="t-fam"></span><span>&nbsp;familiares vinculados</span></div>` +
    `<hr class="tip-hr">` +
    `<div class="tip-congs" id="t-congs"></div>`;
}

function showTip(event, dept, info, dd) {
  if (!info) return;
  if (!document.getElementById('t-contratos')) restoreTipStructure();
  document.getElementById('t-region').textContent = dept;
  document.getElementById('t-contratos').textContent =
    info.contratos.toLocaleString('es-PE');
  document.getElementById('t-monto').textContent = fmtFull(info.monto);
  document.getElementById('t-fam').textContent = info.familiares;

  const congs = info.congresistas || [];
  const el = document.getElementById('t-congs');
  el.innerHTML = congs.length
    ? `<b>Congresistas vinculados</b>${congs.slice(0,12).join(', ')}${congs.length > 12 ? ` y ${congs.length-12} más…` : ''}`
    : '';

  tip.style.display = 'block';
  moveTip(event);
}

function moveTip(e) {
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  const vw = window.innerWidth, vh = window.innerHeight;
  let x = e.clientX + 18, y = e.clientY - 18;
  if (x + tw > vw - 10) x = e.clientX - tw - 18;
  if (y + th > vh - 10) y = vh - th - 10;
  if (y < 8) y = 8;
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
}

function onRegionEnter(e, id) {
  const dept = ID_TO_DEPT[id];
  if (!dept) return;
  const dd = getDisplayData(currentCong);
  const info = dd[dept];
  if (!info) {
    showNoDataTip(e, dept);
    return;
  }
  showTip(e, dept, info, dd);
}

function showNoDataTip(event, dept) {
  tip.innerHTML =
    `<div class="tip-region" id="t-region">${dept}</div>` +
    `<div class="tip-row tip-nodata">No se detectaron contratos u órdenes de servicios en esta región.</div>`;
  tip.style.display = 'block';
  moveTip(event);
}

function onMouseMove(e) {
  if (tip.style.display === 'block') moveTip(e);
}

function onMouseOut() {
  tip.style.display = 'none';
}

// ─── CUSTOM DROPDOWN ──────────────────────────────────────────────────────
const congInput    = document.getElementById('cong-input');
const dropList     = document.getElementById('dropdown-list');
const chevron      = document.getElementById('search-chevron');
const searchWrap   = document.getElementById('search-wrap');
const ALL_NAMES    = Object.keys(DATA.por_congresista).sort((a, b) => a.localeCompare(b, 'es'));

let dropOpen = false;

function buildDropItems(filter) {
  dropList.innerHTML = '';

  // "Todos" reset option
  const reset = document.createElement('div');
  reset.className = 'dropdown-item reset-item';
  reset.textContent = '— Todos los congresistas —';
  reset.addEventListener('mousedown', e => { e.preventDefault(); selectCong(null); });
  dropList.appendChild(reset);

  const q = (filter || '').toLowerCase().trim();
  const matches = q ? ALL_NAMES.filter(n => n.toLowerCase().includes(q)) : ALL_NAMES;

  if (!matches.length) {
    const empty = document.createElement('div');
    empty.className = 'dropdown-empty';
    empty.textContent = 'Sin resultados';
    dropList.appendChild(empty);
    return;
  }

  matches.forEach(name => {
    const item = document.createElement('div');
    item.className = 'dropdown-item' + (name === currentCong ? ' active' : '');
    item.textContent = name;
    item.addEventListener('mousedown', e => { e.preventDefault(); selectCong(name); });
    dropList.appendChild(item);
  });
}

function openDrop() {
  congInput.removeAttribute('readonly');
  congInput.classList.add('open');
  chevron.classList.add('rotated');
  buildDropItems('');
  dropList.classList.add('open');
  dropOpen = true;
  // Scroll active item into view
  const active = dropList.querySelector('.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function closeDrop() {
  congInput.setAttribute('readonly', '');
  congInput.classList.remove('open');
  chevron.classList.remove('rotated');
  dropList.classList.remove('open');
  dropOpen = false;
  // Restore display value
  congInput.value = currentCong === '__all__' ? '' : currentCong;
}

function selectCong(name) {
  currentCong = name || '__all__';
  closeDrop();
  render(currentCong);
}

// Abrir al hacer clic en el input o en el chevron
congInput.addEventListener('click', () => {
  if (!dropOpen) openDrop();
});
chevron.addEventListener('click', () => {
  if (dropOpen) closeDrop();
  else openDrop();
});

// Filtrar mientras se escribe
congInput.addEventListener('input', function() {
  buildDropItems(this.value);
  if (!dropOpen) openDrop();
});

// Cerrar al hacer clic fuera
document.addEventListener('mousedown', e => {
  if (dropOpen && !searchWrap.contains(e.target)) closeDrop();
});

// Navegación con teclado
congInput.addEventListener('keydown', function(e) {
  if (!dropOpen) { if (e.key === 'ArrowDown' || e.key === 'Enter') openDrop(); return; }
  const items = [...dropList.querySelectorAll('.dropdown-item:not(.dropdown-empty)')];
  const cur   = dropList.querySelector('.active');
  let idx     = items.indexOf(cur);

  if (e.key === 'ArrowDown')  { e.preventDefault(); idx = Math.min(idx + 1, items.length - 1); }
  else if (e.key === 'ArrowUp')   { e.preventDefault(); idx = Math.max(idx - 1, 0); }
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (cur) cur.dispatchEvent(new MouseEvent('mousedown'));
    return;
  } else if (e.key === 'Escape') { closeDrop(); return; }
  else return;

  items.forEach(i => i.classList.remove('active'));
  if (items[idx]) { items[idx].classList.add('active'); items[idx].scrollIntoView({ block: 'nearest' }); }
});

// ─── INIT ─────────────────────────────────────────────────────────────────
render('__all__');