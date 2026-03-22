// ─── DATA ─────────────────────────────────────────────────────────────────
const DATA = {"global":{"AMAZONAS":{"contratos":33,"monto":2924288.48,"familiares":5,"congresistas":["Flores Seferino","Infantes Eliana","Miguel Ciccia","Torres Rosio","Zegarra Zadith"]},"ANCASH":{"contratos":36,"monto":3404309.17,"familiares":3,"congresistas":["Chacon Nilza","Portalatino Roxana","Torres Rosio"]},"APURIMAC":{"contratos":18,"monto":566660.97,"familiares":3,"congresistas":["Cruz Mamani","Portalatino Roxana","Taipe Maria"]},"AREQUIPA":{"contratos":57,"monto":673068.25,"familiares":9,"congresistas":["Amuruz Rosselli","Chacon Nilza","Cueto Jose","Gonzales Diana","Juarez Patricia","Medina Esdras","Paredes Alex","Quito Jaime","Victor Cutipa"]},"AYACUCHO":{"contratos":4,"monto":29900.0,"familiares":2,"congresistas":["Miguel Ciccia","Palacios Margot"]},"CAJAMARCA":{"contratos":21,"monto":81659.5,"familiares":1,"congresistas":["Ramirez Tania"]},"CALLAO":{"contratos":21,"monto":243053.0,"familiares":6,"congresistas":["Chacon Nilza","Chiabra Roberto","Chirinos Rosa","Medina Esdras","Obando Ana","Soto Alejandro"]},"CUSCO":{"contratos":169,"monto":7289846.63,"familiares":11,"congresistas":["Aragon Angel","Bellido Guido","Chacon Nilza","Cruz Mamani","Flores Seferino","Juarez Patricia","Luque Ruth","Marticorena Alfonso","Quito Jaime","Soto Alejandro","Torres Rosio"]},"HUANCAVELICA":{"contratos":11,"monto":2030634.4,"familiares":3,"congresistas":["Orue Ariana","Paredes Francis","Zegarra Zadith"]},"HUANUCO":{"contratos":2,"monto":851.8,"familiares":1,"congresistas":["Medina Sara"]},"ICA":{"contratos":514,"monto":3848912.04,"familiares":16,"congresistas":["Alegria Luis","Amuruz Rosselli","Barbaran Rosangella","Chacon Nilza","Chiabra Roberto","Gonzales Diana","Huaman Raul","Juarez Patricia","Limachi Esmeralda","Luque Ruth","Marticorena Alfonso","Miguel Ciccia","Muñante Alejandro","Paredes Francis","Torres Rosio","Zegarra Zadith"]},"JUNIN":{"contratos":1,"monto":2173837.88,"familiares":1,"congresistas":["Torres Rosio"]},"LA LIBERTAD":{"contratos":32,"monto":125401.08,"familiares":3,"congresistas":["Chacon Nilza","Juarez Patricia","Padilla Rommel"]},"LAMBAYEQUE":{"contratos":16,"monto":493807.49,"familiares":4,"congresistas":["Chacon Nilza","Echaiz Margot","Miguel Ciccia","Soto Alejandro"]},"LIMA":{"contratos":494,"monto":12527214.89,"familiares":33,"congresistas":["Alegria Luis","Amuruz Rosselli","Arriola Alberto","Bustamante Ernesto","Castillo Eduardo","Chacon Nilza","Chiabra Roberto","Cruz Mamani","Cueto Jose","Echaiz Margot","Gonza Américo","Juarez Patricia","Julon Elva","Luna Leon","Medina Esdras","Miguel Ciccia","Montoya Jorge","Muñante Alejandro","Obando Ana","Padilla Rommel","Palacios Margot","Portalatino Roxana","Revilla Cesar","Reyes Augusto","Sanchez Helbert","Soto Alejandro","Taipe Maria","Tello Edgar","Torres Rosio","Trigozo Cheryl","Valer Hector","Varas Marcial","Zegarra Zadith"]},"LORETO":{"contratos":207,"monto":3411529.24,"familiares":4,"congresistas":["Flores Seferino","Ramirez Tania","Torres Rosio","Zegarra Zadith"]},"MOQUEGUA":{"contratos":16,"monto":58800.0,"familiares":1,"congresistas":["Victor Cutipa"]},"PASCO":{"contratos":3,"monto":22500.0,"familiares":2,"congresistas":["Davila Neomias","Robles Emperatriz"]},"PIURA":{"contratos":159,"monto":1415774.31,"familiares":3,"congresistas":["Miguel Ciccia","Padilla Rommel","Revilla Cesar"]},"PUNO":{"contratos":7,"monto":31881.0,"familiares":2,"congresistas":["Cruz Mamani","Quito Jaime"]},"SAN MARTIN":{"contratos":28,"monto":305669.1,"familiares":5,"congresistas":["Flores Seferino","Medina Sara","Ramirez Tania","Torres Rosio","Trigozo Cheryl"]},"TACNA":{"contratos":18,"monto":48150.0,"familiares":3,"congresistas":["Limachi Esmeralda","Mita Alanoca","Victor Cutipa"]},"UCAYALI":{"contratos":9,"monto":19972.5,"familiares":3,"congresistas":["Davila Neomias","Lopez Luz","Medina Sara"]}},"por_congresista":{"Alegria Luis":{"ICA":{"contratos":1,"monto":22000.0,"familiares":1},"LIMA":{"contratos":1,"monto":5500.0,"familiares":1}},"Amuruz Rosselli":{"AREQUIPA":{"contratos":7,"monto":87175.0,"familiares":1},"ICA":{"contratos":1,"monto":4355.12,"familiares":1},"LIMA":{"contratos":7,"monto":104009.61,"familiares":1}},"Aragon Angel":{"CUSCO":{"contratos":3,"monto":10500.0,"familiares":1}},"Arriola Alberto":{"LIMA":{"contratos":7,"monto":23450.0,"familiares":1}},"Barbaran Rosangella":{"ICA":{"contratos":6,"monto":4200.0,"familiares":1}},"Bellido Guido":{"CUSCO":{"contratos":49,"monto":574114.75,"familiares":1}},"Bustamante Ernesto":{"LIMA":{"contratos":28,"monto":101384.3,"familiares":1}},"Castillo Eduardo":{"LIMA":{"contratos":13,"monto":81400.0,"familiares":1}},"Chacon Nilza":{"ANCASH":{"contratos":32,"monto":197726.97,"familiares":1},"AREQUIPA":{"contratos":1,"monto":7000.0,"familiares":1},"CALLAO":{"contratos":10,"monto":167220.0,"familiares":1},"CUSCO":{"contratos":11,"monto":200341.96,"familiares":1},"ICA":{"contratos":9,"monto":57538.7,"familiares":1},"LA LIBERTAD":{"contratos":30,"monto":101501.08,"familiares":1},"LAMBAYEQUE":{"contratos":1,"monto":3091.5,"familiares":1},"LIMA":{"contratos":85,"monto":1336984.8,"familiares":1}},"Chiabra Roberto":{"CALLAO":{"contratos":2,"monto":32000.0,"familiares":1},"ICA":{"contratos":2,"monto":89347.82,"familiares":1},"LIMA":{"contratos":22,"monto":350790.12,"familiares":1}},"Chirinos Rosa":{"CALLAO":{"contratos":1,"monto":5000.0,"familiares":1}},"Cruz Mamani":{"APURIMAC":{"contratos":3,"monto":4500.0,"familiares":1},"CUSCO":{"contratos":1,"monto":16000.0,"familiares":1},"LIMA":{"contratos":7,"monto":90200.0,"familiares":1},"PUNO":{"contratos":4,"monto":25881.0,"familiares":1}},"Cueto Jose":{"AREQUIPA":{"contratos":1,"monto":2386.27,"familiares":1},"LIMA":{"contratos":7,"monto":32457.19,"familiares":1}},"Davila Neomias":{"PASCO":{"contratos":2,"monto":10000.0,"familiares":1},"UCAYALI":{"contratos":2,"monto":6000.0,"familiares":1}},"Echaiz Margot":{"LAMBAYEQUE":{"contratos":3,"monto":37250.0,"familiares":1},"LIMA":{"contratos":1,"monto":15000.0,"familiares":1}},"Flores Seferino":{"AMAZONAS":{"contratos":2,"monto":466.0,"familiares":1},"CUSCO":{"contratos":1,"monto":900.0,"familiares":1},"LORETO":{"contratos":6,"monto":16416.0,"familiares":1},"SAN MARTIN":{"contratos":3,"monto":4900.0,"familiares":1}},"Gonza Américo":{"LIMA":{"contratos":14,"monto":103000.0,"familiares":1}},"Gonzales Diana":{"AREQUIPA":{"contratos":3,"monto":14500.0,"familiares":1},"ICA":{"contratos":1,"monto":1000.0,"familiares":1}},"Huaman Raul":{"ICA":{"contratos":15,"monto":26865.0,"familiares":1}},"Infantes Eliana":{"AMAZONAS":{"contratos":1,"monto":3080.0,"familiares":1}},"Juarez Patricia":{"AREQUIPA":{"contratos":10,"monto":329999.99,"familiares":1},"CUSCO":{"contratos":30,"monto":772679.96,"familiares":1},"ICA":{"contratos":16,"monto":355340.0,"familiares":1},"LA LIBERTAD":{"contratos":1,"monto":14000.0,"familiares":1},"LIMA":{"contratos":75,"monto":1753228.73,"familiares":1}},"Julon Elva":{"LIMA":{"contratos":2,"monto":12000.0,"familiares":1}},"Limachi Esmeralda":{"ICA":{"contratos":2,"monto":60000.0,"familiares":1},"TACNA":{"contratos":5,"monto":9450.0,"familiares":1}},"Lopez Luz":{"UCAYALI":{"contratos":4,"monto":12524.5,"familiares":1}},"Luna Leon":{"LIMA":{"contratos":7,"monto":24000.0,"familiares":1}},"Luque Ruth":{"CUSCO":{"contratos":6,"monto":12700.0,"familiares":1},"ICA":{"contratos":1,"monto":1000.0,"familiares":1}},"Marticorena Alfonso":{"CUSCO":{"contratos":13,"monto":27493.99,"familiares":1},"ICA":{"contratos":401,"monto":1051083.4,"familiares":1}},"Medina Esdras":{"AREQUIPA":{"contratos":25,"monto":108376.99,"familiares":1},"CALLAO":{"contratos":4,"monto":25000.0,"familiares":1},"LIMA":{"contratos":29,"monto":155850.0,"familiares":1}},"Medina Sara":{"HUANUCO":{"contratos":2,"monto":851.8,"familiares":1},"SAN MARTIN":{"contratos":2,"monto":7040.0,"familiares":1},"UCAYALI":{"contratos":3,"monto":1448.0,"familiares":1}},"Miguel Ciccia":{"AMAZONAS":{"contratos":4,"monto":560.0,"familiares":1},"AYACUCHO":{"contratos":2,"monto":18100.0,"familiares":1},"ICA":{"contratos":18,"monto":194828.5,"familiares":1},"LAMBAYEQUE":{"contratos":3,"monto":327465.99,"familiares":1},"LIMA":{"contratos":23,"monto":972980.65,"familiares":1},"PIURA":{"contratos":148,"monto":1352545.28,"familiares":1}},"Mita Alanoca":{"TACNA":{"contratos":5,"monto":10700.0,"familiares":1}},"Montoya Jorge":{"LIMA":{"contratos":2,"monto":4940.0,"familiares":1}},"Muñante Alejandro":{"ICA":{"contratos":1,"monto":2700.0,"familiares":1},"LIMA":{"contratos":3,"monto":10922.0,"familiares":1}},"Obando Ana":{"CALLAO":{"contratos":2,"monto":3200.0,"familiares":1},"LIMA":{"contratos":7,"monto":35100.0,"familiares":1}},"Orue Ariana":{"HUANCAVELICA":{"contratos":1,"monto":2500.0,"familiares":1}},"Padilla Rommel":{"LA LIBERTAD":{"contratos":1,"monto":9900.0,"familiares":1},"LIMA":{"contratos":20,"monto":221169.2,"familiares":1},"PIURA":{"contratos":1,"monto":21400.0,"familiares":1}},"Palacios Margot":{"AYACUCHO":{"contratos":2,"monto":11800.0,"familiares":1},"LIMA":{"contratos":2,"monto":16120.0,"familiares":1}},"Paredes Alex":{"AREQUIPA":{"contratos":5,"monto":25000.0,"familiares":1}},"Paredes Francis":{"HUANCAVELICA":{"contratos":3,"monto":1989600.4,"familiares":1},"ICA":{"contratos":38,"monto":477914.03,"familiares":1}},"Portalatino Roxana":{"ANCASH":{"contratos":3,"monto":4699.0,"familiares":1},"APURIMAC":{"contratos":1,"monto":3000.0,"familiares":1},"LIMA":{"contratos":1,"monto":11000.0,"familiares":1}},"Quito Jaime":{"AREQUIPA":{"contratos":2,"monto":20000.0,"familiares":1},"CUSCO":{"contratos":49,"monto":260619.5,"familiares":1},"PUNO":{"contratos":3,"monto":6000.0,"familiares":1}},"Ramirez Tania":{"CAJAMARCA":{"contratos":21,"monto":81659.5,"familiares":1},"LORETO":{"contratos":11,"monto":12428.4,"familiares":1},"SAN MARTIN":{"contratos":1,"monto":40480.0,"familiares":1}},"Revilla Cesar":{"LIMA":{"contratos":2,"monto":43000.0,"familiares":1},"PIURA":{"contratos":10,"monto":41829.03,"familiares":1}},"Reyes Augusto":{"LIMA":{"contratos":21,"monto":39500.0,"familiares":1}},"Robles Emperatriz":{"PASCO":{"contratos":1,"monto":12500.0,"familiares":1}},"Sanchez Helbert":{"LIMA":{"contratos":12,"monto":97800.0,"familiares":1}},"Soto Alejandro":{"CALLAO":{"contratos":2,"monto":10633.0,"familiares":1},"CUSCO":{"contratos":3,"monto":6500.0,"familiares":1},"LAMBAYEQUE":{"contratos":9,"monto":126000.0,"familiares":1},"LIMA":{"contratos":37,"monto":371303.7,"familiares":1}},"Taipe Maria":{"APURIMAC":{"contratos":14,"monto":559160.97,"familiares":1},"LIMA":{"contratos":5,"monto":79941.12,"familiares":1}},"Tello Edgar":{"LIMA":{"contratos":8,"monto":36000.0,"familiares":1}},"Torres Rosio":{"AMAZONAS":{"contratos":15,"monto":2868582.48,"familiares":1},"ANCASH":{"contratos":1,"monto":3201883.2,"familiares":1},"CUSCO":{"contratos":3,"monto":5407996.47,"familiares":1},"ICA":{"contratos":1,"monto":1484985.87,"familiares":1},"JUNIN":{"contratos":1,"monto":2173837.88,"familiares":1},"LIMA":{"contratos":29,"monto":5994455.41,"familiares":1},"LORETO":{"contratos":35,"monto":1905093.32,"familiares":1},"SAN MARTIN":{"contratos":1,"monto":147716.1,"familiares":1}},"Trigozo Cheryl":{"LIMA":{"contratos":8,"monto":128600.0,"familiares":1},"SAN MARTIN":{"contratos":21,"monto":105533.0,"familiares":1}},"Valer Hector":{"LIMA":{"contratos":4,"monto":31666.66,"familiares":1}},"Varas Marcial":{"LIMA":{"contratos":1,"monto":10500.0,"familiares":1}},"Victor Cutipa":{"AREQUIPA":{"contratos":3,"monto":78630.0,"familiares":1},"MOQUEGUA":{"contratos":16,"monto":58800.0,"familiares":1},"TACNA":{"contratos":8,"monto":28000.0,"familiares":1}},"Zegarra Zadith":{"AMAZONAS":{"contratos":11,"monto":51600.0,"familiares":1},"HUANCAVELICA":{"contratos":7,"monto":38534.0,"familiares":1},"ICA":{"contratos":1,"monto":15753.6,"familiares":1},"LIMA":{"contratos":4,"monto":232961.4,"familiares":1},"LORETO":{"contratos":155,"monto":1477591.52,"familiares":1}}}};

// ─── FAMILIARES REALES POR CONGRESISTA ────────────────────────────────────────
// Fuente: data_v3.js (gráfico de nodos). Total verificado: 146 familiares.
const FAMILIARES_POR_CONG = {"Torres Rosio":15,"Chiabra Roberto":4,"Juarez Patricia":6,"Chacon Nilza":6,"Cruz Mamani":6,"Zegarra Zadith":2,"Miguel Ciccia":7,"Taipe Maria":3,"Bellido Guido":1,"Paredes Francis":1,"Reyes Augusto":1,"Medina Esdras":7,"Sanchez Helbert":2,"Trigozo Cheryl":4,"Soto Alejandro":4,"Castillo Eduardo":2,"Quito Jaime":3,"Limachi Esmeralda":2,"Revilla Cesar":3,"Palacios Margot":2,"Paredes Alex":1,"Padilla Rommel":4,"Varas Marcial":1,"Montoya Jorge":1,"Gonzales Diana":4,"Barbaran Rosangella":1,"Medina Sara":2,"Luque Ruth":1,"Ramirez Tania":3,"Valer Hector":1,"Portalatino Roxana":3,"Flores Seferino":2,"Arriola Alberto":1,"Julon Elva":1,"Huaman Raul":2,"Mita Alanoca":1,"Alegria Luis":2,"Obando Ana":3,"Bustamante Ernesto":3,"Gonza Américo":2,"Robles Emperatriz":1,"Tello Edgar":3,"Lopez Luz":1,"Davila Neomias":2,"Chirinos Rosa":1,"Victor Cutipa":6,"Infantes Eliana":1,"Luna Leon":1,"Echaiz Margot":2,"Muñante Alejandro":2,"Marticorena Alfonso":2,"Aragon Angel":1,"Orue Ariana":1,"Amuruz Rosselli":1,"Cueto Jose":1};
const TOTAL_FAMILIARES = Object.values(FAMILIARES_POR_CONG).reduce((s,v)=>s+v,0); // 146

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
      ? TOTAL_FAMILIARES
      : (FAMILIARES_POR_CONG[cong] || 0);
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
  const pad = 8;
  const mapPanel = document.querySelector('.map-panel');
  const r = mapPanel
    ? mapPanel.getBoundingClientRect()
    : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

  let x = e.clientX + 18;
  let y = e.clientY - 18;

  // Flip horizontalmente si se sale por la derecha del panel
  if (x + tw > r.right - pad) x = e.clientX - tw - 18;
  // Clamp izquierda (guarda que faltaba)
  if (x < r.left + pad) x = r.left + pad;
  // Clamp inferior
  if (y + th > r.bottom - pad) y = r.bottom - th - pad;
  // Clamp superior
  if (y < r.top + pad) y = r.top + pad;

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