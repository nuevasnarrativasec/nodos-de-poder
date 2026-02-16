// ========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ========================================

// INSTRUCCIONES PARA CONFIGURAR TU GOOGLE SHEET:
// 1. Crea un Google Spreadsheet con la siguiente estructura de columnas:
//    A: id | B: nombre | C: partido | D: foto_url | E: region
//    F: hallazgo_intereses (TRUE/FALSE) | G: detalle_intereses
//    H: hallazgo_dinero (TRUE/FALSE) | I: detalle_dinero
//    J: hallazgo_bienes (TRUE/FALSE) | K: detalle_bienes
//    L: hallazgo_estudios (TRUE/FALSE) | M: detalle_estudios
//
// 2. Publica el sheet: Archivo > Compartir > Publicar en la web > CSV
//    O simplemente comparte el documento como "Cualquier persona con el enlace puede ver"
//
// 3. El SPREADSHEET_ID es solo el ID, NO la URL completa
//    Ejemplo: Si tu URL es https://docs.google.com/spreadsheets/d/1AObLGILruN3LrVSi849oiLGlabcXKqv-0-9nNY4GdA8/edit
//    El ID es: 1AObLGILruN3LrVSi849oiLGlabcXKqv-0-9nNY4GdA8

const CONFIG = {
    // SOLO el ID del spreadsheet, NO la URL completa
    SPREADSHEET_ID: '1AObLGILruN3LrVSi849oiLGlabcXKqv-0-9nNY4GdA8',
    SHEET_NAME: 'congresistas', // Nombre de la pestaña
};

// ========================================
// ESTADO GLOBAL
// ========================================

let congresistas = [];
let partidos = [];

// ========================================
// FUNCIONES DE CARGA DE DATOS
// ========================================

/**
 * Carga datos desde Google Sheets
 */
async function cargarDatosGoogleSheets() {
    try {
        console.log('🔄 Intentando cargar datos desde Google Sheets...');
        
        // URL para obtener CSV público de Google Sheets
        const csvUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(CONFIG.SHEET_NAME)}`;
        
        console.log('📡 URL de carga:', csvUrl);
        
        const response = await fetch(csvUrl);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        console.log('📄 CSV recibido (primeros 500 chars):', csvText.substring(0, 500));
        
        // Parsear CSV
        const rows = parseCSV(csvText);
        
        if (rows.length < 2) {
            throw new Error('El CSV no tiene suficientes filas (necesita headers + datos)');
        }
        
        // La primera fila son los headers
        const headers = rows[0].map(h => h.trim().toLowerCase());
        console.log('📋 Headers encontrados:', headers);
        
        // Mapear headers a nombres esperados
        const headerMap = {
            'id': ['id'],
            'nombre': ['nombre', 'name'],
            'partido': ['partido', 'party'],
            'foto': ['foto', 'foto_url', 'photo', 'imagen', 'image'],
            'region': ['region', 'región', 'departamento'],
            'hallazgo_intereses': ['hallazgo_intereses', 'intereses'],
            'detalle_intereses': ['detalle_intereses'],
            'hallazgo_dinero': ['hallazgo_dinero', 'dinero'],
            'detalle_dinero': ['detalle_dinero'],
            'hallazgo_bienes': ['hallazgo_bienes', 'bienes'],
            'detalle_bienes': ['detalle_bienes'],
            'hallazgo_estudios': ['hallazgo_estudios', 'estudios'],
            'detalle_estudios': ['detalle_estudios']
        };
        
        // Encontrar índices de columnas
        const columnIndex = {};
        for (const [key, possibleNames] of Object.entries(headerMap)) {
            const idx = headers.findIndex(h => possibleNames.includes(h.toLowerCase()));
            if (idx !== -1) {
                columnIndex[key] = idx;
            }
        }
        
        console.log('🗂️ Índices de columnas:', columnIndex);
        
        // Convertir filas a objetos
        congresistas = rows.slice(1).filter(row => row.length > 1 && row[0]).map((row, index) => {
            const getValue = (key, defaultValue = '') => {
                const idx = columnIndex[key];
                return idx !== undefined ? (row[idx] || defaultValue).trim() : defaultValue;
            };
            
            const getBoolValue = (key) => {
                const val = getValue(key, 'FALSE').toUpperCase();
                return val === 'TRUE' || val === 'SI' || val === 'SÍ' || val === '1' || val === 'YES';
            };
            
            return {
                id: parseInt(getValue('id', index + 1)) || (index + 1),
                nombre: getValue('nombre'),
                partido: getValue('partido'),
                foto: getValue('foto') || `https://via.placeholder.com/150x150/ccc/666?text=${encodeURIComponent(getValue('nombre').substring(0,2))}`,
                region: getValue('region'),
                hallazgo_intereses: getBoolValue('hallazgo_intereses'),
                detalle_intereses: getValue('detalle_intereses'),
                hallazgo_dinero: getBoolValue('hallazgo_dinero'),
                detalle_dinero: getValue('detalle_dinero'),
                hallazgo_bienes: getBoolValue('hallazgo_bienes'),
                detalle_bienes: getValue('detalle_bienes'),
                hallazgo_estudios: getBoolValue('hallazgo_estudios'),
                detalle_estudios: getValue('detalle_estudios')
            };
        }).filter(c => c.nombre); // Filtrar filas vacías
        
        console.log(`✅ Cargados ${congresistas.length} congresistas desde Google Sheets`);
        console.log('👤 Primer congresista:', congresistas[0]);
        
        // Extraer lista única de partidos
        partidos = [...new Set(congresistas.map(c => c.partido))].filter(p => p).sort();
        console.log('🗳️ Partidos encontrados:', partidos);
        
        inicializarUI();
        return true;
        
    } catch (error) {
        console.error('❌ Error cargando datos de Google Sheets:', error);
        mostrarErrorCarga(error.message);
        return false;
    }
}

/**
 * Parsea texto CSV a array de arrays
 */
function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;
    
    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];
        
        if (insideQuotes) {
            if (char === '"') {
                if (nextChar === '"') {
                    // Comilla escapada
                    currentCell += '"';
                    i++;
                } else {
                    // Fin de campo entrecomillado
                    insideQuotes = false;
                }
            } else {
                currentCell += char;
            }
        } else {
            if (char === '"') {
                insideQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentCell);
                currentCell = '';
            } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
                currentRow.push(currentCell);
                if (currentRow.some(cell => cell.trim())) { // Ignorar filas vacías
                    rows.push(currentRow);
                }
                currentRow = [];
                currentCell = '';
                if (char === '\r') i++; // Saltar \n en \r\n
            } else if (char !== '\r') {
                currentCell += char;
            }
        }
    }
    
    // Última celda y fila
    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell);
        if (currentRow.some(cell => cell.trim())) {
            rows.push(currentRow);
        }
    }
    
    return rows;
}

/**
 * Muestra mensaje de error en la UI
 */
function mostrarErrorCarga(mensaje) {
    const emptyState = document.getElementById('empty-state-explora');
    if (emptyState) {
        emptyState.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="color: #e74c3c;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h3 class="empty-state__title" style="color: #e74c3c;">Error al cargar datos</h3>
            <p class="empty-state__text">${mensaje}</p>
            <p class="empty-state__text" style="margin-top: 10px; font-size: 0.8rem;">
                Verifica que:<br>
                • El spreadsheet esté compartido como "Cualquier persona con el enlace puede ver"<br>
                • El nombre de la hoja sea "${CONFIG.SHEET_NAME}"<br>
                • El ID del spreadsheet sea correcto
            </p>
        `;
    }
}

// ========================================
// FUNCIONES DE UI
// ========================================

/**
 * Inicializa toda la interfaz de usuario
 */
function inicializarUI() {
    console.log('🎨 Inicializando UI...');
    configurarTabs();
    configurarBuscadores();
    actualizarEstadisticas();
    generarGraficos();
    console.log('✅ UI inicializada correctamente');
}

/**
 * Configura el sistema de tabs
 */
function configurarTabs() {
    document.querySelectorAll('.search-tabs').forEach(tabsContainer => {
        const tabs = tabsContainer.querySelectorAll('.search-tab');
        const panelsContainer = tabsContainer.nextElementSibling;
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Desactivar todos los tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Activar tab clickeado
                tab.classList.add('active');
                
                // Cambiar panel visible
                const panelId = 'panel-' + tab.dataset.tab;
                panelsContainer.querySelectorAll('.search-panel').forEach(p => {
                    p.classList.remove('active');
                });
                const targetPanel = document.getElementById(panelId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Configura todos los buscadores (SOLO LOS PRINCIPALES)
 */
function configurarBuscadores() {
    // Buscador principal - por partido
    // Al seleccionar, filtra Explora Y todas las secciones de hallazgos
    configurarBuscador('search-partido', 'dropdown-partido', 'partido', (partido) => {
        filtrarGlobalmente('partido', partido);
    });
    
    // Buscador principal - por nombre
    // Al seleccionar, filtra Explora Y todas las secciones de hallazgos
    configurarBuscador('search-nombre', 'dropdown-nombre', 'nombre', (nombre) => {
        filtrarGlobalmente('nombre', nombre);
    });
    
    // NOTA: Se han eliminado los configuradores de búsqueda individuales 
    // para cumplir con el requerimiento de control centralizado.
}

/**
 * Función maestra que actualiza TODAS las secciones de la web
 * basándose en un criterio único (partido o nombre)
 */
function filtrarGlobalmente(criterio, valor) {
    console.log(`🔍 Filtrando globalmente por ${criterio}: ${valor}`);

    // 1. Filtrar para la sección "EXPLORA" (Fichas resumen)
    let resultadosExplora = [];
    if (criterio === 'partido') {
        resultadosExplora = congresistas.filter(c => c.partido === valor);
    } else { // nombre
        const encontrado = congresistas.find(c => c.nombre === valor);
        if (encontrado) resultadosExplora = [encontrado];
    }
    
    // Mostrar resultados en la grilla superior
    mostrarResultadosExplora(resultadosExplora);

    // 2. Filtrar para las secciones de "HALLAZGOS" (Abajo)
    const categorias = ['intereses', 'dinero', 'bienes', 'estudios'];

    categorias.forEach(cat => {
        const campoHallazgo = `hallazgo_${cat}`;
        let resultadosCat = [];

        // Lógica: El congresista debe coincidir con el filtro (partido/nombre) 
        // Y ADEMÁS tener hallazgos en esa categoría específica (TRUE).
        if (criterio === 'partido') {
            resultadosCat = congresistas.filter(c => 
                c.partido === valor && c[campoHallazgo]
            );
        } else { // nombre
            resultadosCat = congresistas.filter(c => 
                c.nombre === valor && c[campoHallazgo]
            );
        }

        // Actualizar la grilla de esa categoría específica
        mostrarResultadosHallazgo(cat, resultadosCat);
        
        // Opcional: Actualizar el contador de esa sección específica
        const countEl = document.getElementById(`count-${cat}`);
        if (countEl) countEl.textContent = resultadosCat.length;
    });

    // Scroll suave hacia la sección de resultados si hay coincidencias
    const sectionExplora = document.getElementById('explora');
    if(sectionExplora) {
        sectionExplora.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Configura un buscador individual
 */
function configurarBuscador(inputId, dropdownId, tipo, onSelect, dataSubset = null) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    
    if (!input || !dropdown) return;
    
    const data = dataSubset || congresistas;
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            dropdown.classList.remove('show');
            return;
        }
        
        let resultados = [];
        
        if (tipo === 'partido') {
            const partidosUnicos = [...new Set(data.map(c => c.partido))];
            resultados = partidosUnicos.filter(p => 
                p && p.toLowerCase().includes(query)
            ).map(p => ({ tipo: 'partido', valor: p, label: p }));
        } else {
            resultados = data.filter(c => 
                c.nombre && c.nombre.toLowerCase().includes(query)
            ).map(c => ({
                tipo: 'congresista',
                valor: c.nombre,
                label: c.nombre,
                sublabel: c.partido,
                foto: c.foto
            }));
        }
        
        if (resultados.length === 0) {
            dropdown.classList.remove('show');
            return;
        }
        
        dropdown.innerHTML = resultados.slice(0, 10).map(r => `
            <div class="dropdown-item" data-value="${r.valor}">
                ${r.foto ? `<img src="${r.foto}" alt="" class="dropdown-item__photo" onerror="this.src='https://via.placeholder.com/40x40/ccc/666?text=?'">` : ''}
                <div class="dropdown-item__info">
                    <div class="dropdown-item__name">${r.label}</div>
                    ${r.sublabel ? `<div class="dropdown-item__party">${r.sublabel}</div>` : ''}
                </div>
            </div>
        `).join('');
        
        dropdown.classList.add('show');
        
        // Agregar eventos de click a los items
        dropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const valor = item.dataset.value;
                input.value = valor;
                dropdown.classList.remove('show');
                onSelect(valor);
            });
        });
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

/**
 * Muestra resultados en la sección Explora con fichas inline
 */
function mostrarResultadosExplora(resultados) {
    const emptyState = document.getElementById('empty-state-explora');
    const grid = document.getElementById('fichas-resultado-grid');
    
    if (resultados.length === 0) {
        emptyState.style.display = 'block';
        grid.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    grid.style.display = 'grid';
    
    grid.innerHTML = resultados.map(c => {
        const tieneHallazgos = c.hallazgo_intereses || c.hallazgo_dinero || c.hallazgo_bienes || c.hallazgo_estudios;
        let countHallazgos = 0;
        if (c.hallazgo_intereses) countHallazgos++;
        if (c.hallazgo_dinero) countHallazgos++;
        if (c.hallazgo_bienes) countHallazgos++;
        if (c.hallazgo_estudios) countHallazgos++;
        
        const hallazgosTitulo = tieneHallazgos 
            ? '<strong>Hallazgos:</strong> Se identificaron cruces relevantes de información en ' + countHallazgos + ' de las 4 secciones analizadas, a partir de datos públicos.'
            : '<strong>Sin hallazgos:</strong> El contraste entre lo declarado y registros públicos oficiales no reveló diferencias en las secciones analizadas.';
        
        // Generar botones de categorías solo si tienen hallazgos
        let categoriasHTML = '';
        if (tieneHallazgos) {
            categoriasHTML = '<div class="ficha-resultado__categorias">';
            categoriasHTML += '<div class="ficha-resultado__click-hint"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>Hacer click</div>';
            
            if (c.hallazgo_intereses) {
                categoriasHTML += '<button class="ficha-categoria-btn ficha-categoria-btn--intereses" data-categoria="intereses" data-id="' + c.id + '" onclick="toggleFichaDetalle(' + c.id + ', \'intereses\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg></div><span class="ficha-categoria-btn__text">Intereses<br>cruzados</span></button>';
            }
            if (c.hallazgo_dinero) {
                categoriasHTML += '<button class="ficha-categoria-btn ficha-categoria-btn--dinero" data-categoria="dinero" data-id="' + c.id + '" onclick="toggleFichaDetalle(' + c.id + ', \'dinero\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg></div><span class="ficha-categoria-btn__text">El rastro<br>del dinero</span></button>';
            }
            if (c.hallazgo_bienes) {
                categoriasHTML += '<button class="ficha-categoria-btn ficha-categoria-btn--bienes" data-categoria="bienes" data-id="' + c.id + '" onclick="toggleFichaDetalle(' + c.id + ', \'bienes\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" /></svg></div><span class="ficha-categoria-btn__text">Bienes a<br>su nombre</span></button>';
            }
            if (c.hallazgo_estudios) {
                categoriasHTML += '<button class="ficha-categoria-btn ficha-categoria-btn--estudios" data-categoria="estudios" data-id="' + c.id + '" onclick="toggleFichaDetalle(' + c.id + ', \'estudios\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div><span class="ficha-categoria-btn__text">Lo que respalda<br>su trayectoria</span></button>';
            }
            categoriasHTML += '</div>';
        }
        
        return '<div class="ficha-resultado ' + (tieneHallazgos ? '' : 'ficha-resultado--sin-hallazgos') + '" data-id="' + c.id + '">' +
            '<button class="ficha-resultado__close" onclick="cerrarFichaResultado(' + c.id + ')">' +
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />' +
                '</svg>' +
            '</button>' +
            '<div class="ficha-resultado__header">' +
                '<div class="ficha-resultado__info">' +
                    '<h2 class="ficha-resultado__name">' + c.nombre + '</h2>' +
                    '<div class="ficha-resultado__datos">' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Edad</span> <span class="ficha-resultado__dato-value">' + (c.edad || '---') + '</span></p>' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Partido</span> <span class="ficha-resultado__dato-value">' + c.partido + '</span></p>' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Cargo al que postula</span> <span class="ficha-resultado__dato-value">' + (c.cargo || 'Congresista') + '</span></p>' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Región</span> <span class="ficha-resultado__dato-value">' + (c.region || 'No especificada') + '</span></p>' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Cambio partidario</span> <span class="ficha-resultado__dato-value">' + (c.cambio_partidario || '---') + '</span></p>' +
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Experiencia en sector privado</span> <span class="ficha-resultado__dato-value">' + (c.experiencia_privado || '---') + '</span></p>' +
                    '</div>' +
                '</div>' +
                '<div class="ficha-resultado__photo-container">' +
                    '<img src="' + c.foto + '" alt="' + c.nombre + '" class="ficha-resultado__photo" onerror="this.src=\'https://via.placeholder.com/110x110/ccc/666?text=' + encodeURIComponent(c.nombre.substring(0,2)) + '\'">' +
                '</div>' +
            '</div>' +
            '<div class="ficha-resultado__hallazgos-summary">' +
                '<p class="ficha-resultado__hallazgos-title">' + hallazgosTitulo + '</p>' +
            '</div>' +
            categoriasHTML +
            '<div class="ficha-resultado__detalle" id="detalle-ficha-' + c.id + '">' +
                '<div class="ficha-resultado__detalle-contenido" id="detalle-contenido-' + c.id + '"></div>' +
            '</div>' +
            '<div class="ficha-resultado__footer">Para más detalles ver las siguientes secciones</div>' +
        '</div>';
    }).join('');
}

/**
 * Muestra resultados en una categoría de hallazgo
 */
function mostrarResultadosHallazgo(categoria, resultados) {
    const container = document.getElementById(`results-${categoria}`);
    const grid = document.getElementById(`grid-${categoria}`);
    const detailContainer = document.getElementById(`detail-${categoria}`);
    
    container.classList.add('show');
    
    grid.innerHTML = resultados.map(c => `
        <div class="hallazgo-congress-item" data-id="${c.id}" data-categoria="${categoria}">
            <img src="${c.foto}" alt="${c.nombre}" class="hallazgo-congress-item__photo" onerror="this.src='https://via.placeholder.com/70x70/ccc/666?text=${encodeURIComponent(c.nombre.substring(0,2))}'">
            <div class="hallazgo-congress-item__name">${c.nombre.split(' ').slice(0, 2).join(' ')}</div>
            <div class="hallazgo-congress-item__party">${c.partido}</div>
        </div>
    `).join('');
    
    // Agregar eventos de click
    grid.querySelectorAll('.hallazgo-congress-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remover clase active de otros
            grid.querySelectorAll('.hallazgo-congress-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const id = parseInt(item.dataset.id);
            const categoria = item.dataset.categoria;
            mostrarDetalleHallazgo(id, categoria);
        });
    });
}

/**
 * Muestra el detalle expandido de un congresista
 */
function mostrarDetalleHallazgo(id, categoria) {
    const c = congresistas.find(c => c.id === id);
    if (!c) return;
    
    const detailContainer = document.getElementById(`detail-${categoria}`);
    const campoDetalle = `detalle_${categoria}`;
    
    const titulos = {
        intereses: 'Intereses cruzados detectados',
        dinero: 'Hallazgos en rastro del dinero',
        bienes: 'Diferencias en bienes declarados',
        estudios: 'Inconsistencias en respaldo académico'
    };
    
    detailContainer.innerHTML = `
        <div class="congress-detail__header">
            <img src="${c.foto}" alt="${c.nombre}" class="congress-detail__photo" onerror="this.src='https://via.placeholder.com/80x80/ccc/666?text=${encodeURIComponent(c.nombre.substring(0,2))}'">
            <div class="congress-detail__info">
                <h4>${c.nombre}</h4>
                <p><strong>Partido:</strong> ${c.partido}</p>
                <p><strong>Región:</strong> ${c.region || 'No especificada'}</p>
            </div>
        </div>
        <div class="congress-detail__content">
            <h5>${titulos[categoria]}</h5>
            <p>${c[campoDetalle] || 'Sin información detallada disponible.'}</p>
            <p class="congress-detail__source">
                Fuente: Registros públicos verificados al 15/02/2026
            </p>
        </div>
        <button class="congress-detail__close" onclick="cerrarDetalle('${categoria}')">
            Cerrar detalle
        </button>
    `;
    
    detailContainer.classList.add('show');
    
    // Scroll suave al detalle
    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Cierra el panel de detalle
 */
function cerrarDetalle(categoria) {
    const detailContainer = document.getElementById(`detail-${categoria}`);
    const grid = document.getElementById(`grid-${categoria}`);
    
    detailContainer.classList.remove('show');
    grid.querySelectorAll('.hallazgo-congress-item').forEach(i => i.classList.remove('active'));
}

/**
 * Actualiza las estadísticas en cada categoría
 */
function actualizarEstadisticas() {
    const categorias = ['intereses', 'dinero', 'bienes', 'estudios'];
    
    categorias.forEach(cat => {
        const count = congresistas.filter(c => c[`hallazgo_${cat}`]).length;
        const countEl = document.getElementById(`count-${cat}`);
        if (countEl) countEl.textContent = count;
    });
}

/**
 * Genera los gráficos SVG de síntesis
 */
function generarGraficos() {
    const total = congresistas.length;
    
    if (total === 0) {
        console.log('⚠️ No hay congresistas para generar gráficos');
        return;
    }
    
    const categorias = [
        { id: 'intereses', color: '#FFF85F' },
        { id: 'dinero', color: '#85FF85' },
        { id: 'bienes', color: '#F5A9F2' },
        { id: 'estudios', color: '#85E3FF' }
    ];
    
    categorias.forEach(cat => {
        const conHallazgo = congresistas.filter(c => c[`hallazgo_${cat.id}`]).length;
        const sinHallazgo = total - conHallazgo;
        
        const svg = document.getElementById(`chart-${cat.id}`);
        if (!svg) return;
        
        // Calcular ángulos para gráfico de dona
        const porcentaje = conHallazgo / total;
        const angulo = porcentaje * 360;
        
        // Crear arco SVG
        const centerX = 50;
        const centerY = 50;
        const radius = 40;
        const innerRadius = 25;
        
        // Función para calcular punto en el arco
        const polarToCartesian = (cx, cy, r, angleInDegrees) => {
            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: cx + (r * Math.cos(angleInRadians)),
                y: cy + (r * Math.sin(angleInRadians))
            };
        };
        
        // Crear path del arco
        const describeArc = (x, y, outerR, innerR, startAngle, endAngle) => {
            const start = polarToCartesian(x, y, outerR, endAngle);
            const end = polarToCartesian(x, y, outerR, startAngle);
            const innerStart = polarToCartesian(x, y, innerR, endAngle);
            const innerEnd = polarToCartesian(x, y, innerR, startAngle);
            
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            
            return [
                "M", start.x, start.y,
                "A", outerR, outerR, 0, largeArcFlag, 0, end.x, end.y,
                "L", innerEnd.x, innerEnd.y,
                "A", innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
                "Z"
            ].join(" ");
        };
        
        // Path para sección con hallazgo
        const hallazgoPath = angulo > 0 ? describeArc(centerX, centerY, radius, innerRadius, 0, angulo) : '';
        // Path para sección sin hallazgo
        const sinHallazgoPath = angulo < 360 ? describeArc(centerX, centerY, radius, innerRadius, angulo, 360) : '';
        
        svg.innerHTML = `
            ${hallazgoPath ? `<path d="${hallazgoPath}" fill="${cat.color}" />` : ''}
            ${sinHallazgoPath ? `<path d="${sinHallazgoPath}" fill="#e0e0e0" />` : ''}
            <text x="50" y="48" text-anchor="middle" font-size="14" font-weight="bold" fill="#000">${conHallazgo}</text>
            <text x="50" y="60" text-anchor="middle" font-size="7" fill="#666">de ${total}</text>
        `;
    });
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando aplicación En Contienda...');
    
    // Cargar datos desde Google Sheets
    const cargaExitosa = await cargarDatosGoogleSheets();
    
    if (!cargaExitosa) {
        console.log('⚠️ No se pudieron cargar los datos. Revisa la consola para más detalles.');
    }
});
// ========================================
// FUNCIONES PARA FICHAS INLINE
// ========================================

/**
 * Alterna la visibilidad del detalle de una categoría en una ficha específica
 */
function toggleFichaDetalle(fichaId, categoria) {
    const detalle = document.getElementById('detalle-ficha-' + fichaId);
    const contenido = document.getElementById('detalle-contenido-' + fichaId);
    const ficha = document.querySelector('.ficha-resultado[data-id="' + fichaId + '"]');
    const botones = ficha.querySelectorAll('.ficha-categoria-btn');
    
    // Obtener el congresista
    const congresista = congresistas.find(c => c.id === fichaId);
    
    // Actualizar estado de botones
    botones.forEach(btn => {
        if (btn.dataset.categoria === categoria) {
            btn.classList.toggle('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Verificar si el botón está activo
    const botonActivo = ficha.querySelector('.ficha-categoria-btn[data-categoria="' + categoria + '"]');
    
    if (botonActivo && botonActivo.classList.contains('active')) {
        // Mostrar detalle de la categoría
        let detalleTexto = '';
        
        if (congresista) {
            detalleTexto = congresista['detalle_' + categoria] || 'Sin información detallada disponible para esta categoría.';
        }
        
        // Formatear el texto si no tiene HTML
        if (typeof detalleTexto === 'string' && detalleTexto.indexOf('<p>') === -1) {
            contenido.innerHTML = '<p>' + detalleTexto + '</p>';
        } else {
            contenido.innerHTML = detalleTexto;
        }
        
        detalle.classList.add('active');
        
        // Scroll suave al detalle
        setTimeout(function() {
            detalle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        detalle.classList.remove('active');
    }
}

/**
 * Cierra una ficha de resultado específica
 */
function cerrarFichaResultado(fichaId) {
    const ficha = document.querySelector('.ficha-resultado[data-id="' + fichaId + '"]');
    if (ficha) {
        ficha.style.opacity = '0';
        ficha.style.transform = 'scale(0.95)';
        setTimeout(function() {
            ficha.remove();
            
            // Si no quedan fichas, mostrar estado vacío
            const grid = document.getElementById('fichas-resultado-grid');
            if (grid && grid.children.length === 0) {
                grid.style.display = 'none';
                document.getElementById('empty-state-explora').style.display = 'block';
            }
        }, 200);
    }
}

/**
 * Muestra la ficha de ejemplo (demo) - ahora muestra inline
 */
function mostrarFichaEjemplo(tipo) {
    const emptyState = document.getElementById('empty-state-explora');
    const grid = document.getElementById('fichas-resultado-grid');
    
    emptyState.style.display = 'none';
    grid.style.display = 'grid';
    
    const tieneHallazgos = tipo === 'con-hallazgos';
    const hallazgosTitulo = tieneHallazgos 
        ? '<strong>Hallazgos:</strong> Se identificaron cruces relevantes de información en 3 de las 4 secciones analizadas, a partir de datos públicos.'
        : '<strong>Sin hallazgos:</strong> El contraste entre lo declarado y registros públicos oficiales no reveló diferencias en las secciones analizadas.';
    
    let categoriasHTML = '';
    if (tieneHallazgos) {
        categoriasHTML = '<div class="ficha-resultado__categorias">' +
            '<div class="ficha-resultado__click-hint"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>Hacer click</div>' +
            '<button class="ficha-categoria-btn ficha-categoria-btn--intereses" data-categoria="intereses" onclick="toggleFichaDetalleDemo(\'ejemplo\', \'intereses\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg></div><span class="ficha-categoria-btn__text">Intereses<br>cruzados</span></button>' +
            '<button class="ficha-categoria-btn ficha-categoria-btn--dinero" data-categoria="dinero" onclick="toggleFichaDetalleDemo(\'ejemplo\', \'dinero\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg></div><span class="ficha-categoria-btn__text">El rastro<br>del dinero</span></button>' +
            '<button class="ficha-categoria-btn ficha-categoria-btn--estudios" data-categoria="estudios" onclick="toggleFichaDetalleDemo(\'ejemplo\', \'estudios\')"><div class="ficha-categoria-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div><span class="ficha-categoria-btn__text">Lo que respalda<br>su trayectoria</span></button>' +
            '</div>';
    }
    
    grid.innerHTML = '<div class="ficha-resultado ' + (tieneHallazgos ? '' : 'ficha-resultado--sin-hallazgos') + '" data-id="ejemplo">' +
        '<button class="ficha-resultado__close" onclick="cerrarFichaResultado(\'ejemplo\')">' +
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />' +
            '</svg>' +
        '</button>' +
        '<div class="ficha-resultado__header">' +
            '<div class="ficha-resultado__info">' +
                '<h2 class="ficha-resultado__name">Nilza Chacón</h2>' +
                '<div class="ficha-resultado__datos">' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Edad</span> <span class="ficha-resultado__dato-value">57 años</span></p>' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Partido</span> <span class="ficha-resultado__dato-value">Alianza para el Progreso</span></p>' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Cargo al que postula</span> <span class="ficha-resultado__dato-value">Senadora</span></p>' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Región</span> <span class="ficha-resultado__dato-value">Lima</span></p>' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Cambio partidario</span> <span class="ficha-resultado__dato-value">Sí</span></p>' +
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Experiencia en sector privado</span> <span class="ficha-resultado__dato-value">Sí</span></p>' +
                '</div>' +
            '</div>' +
            '<div class="ficha-resultado__photo-container">' +
                '<img src="https://via.placeholder.com/110x110/ccc/666?text=NC" alt="Nilza Chacón" class="ficha-resultado__photo">' +
            '</div>' +
        '</div>' +
        '<div class="ficha-resultado__hallazgos-summary">' +
            '<p class="ficha-resultado__hallazgos-title">' + hallazgosTitulo + '</p>' +
        '</div>' +
        categoriasHTML +
        '<div class="ficha-resultado__detalle" id="detalle-ficha-ejemplo">' +
            '<div class="ficha-resultado__detalle-contenido" id="detalle-contenido-ejemplo"></div>' +
        '</div>' +
        '<div class="ficha-resultado__footer">Para más detalles ver las siguientes secciones</div>' +
    '</div>';
    
    // Scroll suave hacia el resultado
    setTimeout(function() {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/**
 * Toggle detalle para fichas de ejemplo/demo
 */
function toggleFichaDetalleDemo(fichaId, categoria) {
    const detalle = document.getElementById('detalle-ficha-' + fichaId);
    const contenido = document.getElementById('detalle-contenido-' + fichaId);
    const ficha = document.querySelector('.ficha-resultado[data-id="' + fichaId + '"]');
    const botones = ficha.querySelectorAll('.ficha-categoria-btn');
    
    // Actualizar estado de botones
    botones.forEach(btn => {
        if (btn.dataset.categoria === categoria) {
            btn.classList.toggle('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    const botonActivo = ficha.querySelector('.ficha-categoria-btn[data-categoria="' + categoria + '"]');
    
    if (botonActivo && botonActivo.classList.contains('active')) {
        const detallesDemo = {
            intereses: '<p>Se identificaron <strong>3 contrataciones con el Estado</strong> en las que figura un familiar directo del candidato, por un monto total de <strong>S/ 420,000</strong>, realizadas con dos entidades públicas durante el periodo parlamentario analizado. Asimismo, se registraron <strong>5 visitas oficiales del candidato a dichas entidades en fechas previas o posteriores a las contrataciones.</strong></p><p class="ficha-resultado__detalle-nota"><em>El hallazgo se obtuvo al cruzar declaraciones juradas, registros de contrataciones públicas (SEACE) y el registro oficial de visitas del Congreso. La identificación de estos cruces no implica una relación causal entre las visitas y las contrataciones, pero permite observar coincidencias relevantes en información pública disponible.</em></p>',
            dinero: '<p>Se detectaron <strong>inconsistencias en los montos declarados</strong> de ingresos durante el periodo legislativo. Los registros muestran diferencias de hasta <strong>S/ 150,000</strong> entre lo reportado y los depósitos verificados.</p><p class="ficha-resultado__detalle-nota"><em>Información obtenida del cruce entre declaraciones juradas, reportes de la SUNAT y registros bancarios públicos.</em></p>',
            bienes: '<p>Se encontraron <strong>2 propiedades no declaradas</strong> a nombre del congresista, registradas en SUNARP con un valor catastral estimado de <strong>S/ 280,000</strong>.</p><p class="ficha-resultado__detalle-nota"><em>Datos verificados en registros públicos de SUNARP y contrastados con la declaración jurada del JNE.</em></p>',
            estudios: '<p>No se encontró <strong>registro en SUNEDU</strong> del grado de maestría declarado. La universidad indicada no cuenta con el programa mencionado en su oferta académica histórica.</p><p class="ficha-resultado__detalle-nota"><em>Verificación realizada en el registro nacional de grados y títulos de SUNEDU.</em></p>'
        };
        
        contenido.innerHTML = detallesDemo[categoria] || 'Sin información disponible.';
        detalle.classList.add('active');
        
        setTimeout(function() {
            detalle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        detalle.classList.remove('active');
    }
}