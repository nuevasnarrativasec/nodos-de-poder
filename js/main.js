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
            'cargo': ['cargo', 'position'],
            'foto': ['foto', 'foto_url', 'photo', 'imagen', 'image'],
            'region': ['region', 'región', 'departamento'],
            'edad': ['edad', 'age'],
            'cambio_partidario': ['cambio_partidario', 'cambio_partido'],
            'experiencia_publico': ['experiencia_publico', 'experiencia'],
            'hallazgo_intereses': ['hallazgo_intereses', 'intereses'],
            'detalle_intereses': ['detalle_intereses'],
            'hallazgo_dinero': ['hallazgo_dinero', 'dinero'],
            'detalle_dinero': ['detalle_dinero'],
            'hallazgo_bienes': ['hallazgo_bienes', 'bienes'],
            'detalle_bienes': ['detalle_bienes'],
            'hallazgo_estudios': ['hallazgo_estudios', 'estudios'],
            'detalle_estudios': ['detalle_estudios'],
            'link_detalle_intereses': ['link_detalle_intereses', 'link_intereses'],
            'link_detalle_dinero_1': ['link_detalle_dinero_1', 'link_detalle_dinero'],
            'link_detalle_dinero_2': ['link_detalle_dinero_2'],
            'link_detalle_bienes': ['link_detalle_bienes', 'link_bienes'],
            'link_detalle_estudios': ['link_detalle_estudios', 'link_estudios'],
            'resumen_ficha': ['resumen_ficha', 'resumen'],
            'disclaimer_resumen_ficha': ['disclaimer_resumen_ficha', 'disclaimer_resumen']
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
                cargo: getValue('cargo'),
                foto: getValue('foto') || `https://via.placeholder.com/150x150/ccc/666?text=${encodeURIComponent(getValue('nombre').substring(0,2))}`,
                region: getValue('region'),
                edad: parseInt(getValue('edad', 0)) || 0,
                cambio_partidario: getValue('cambio_partidario'),
                experiencia_publico: getValue('experiencia_publico'),
                hallazgo_intereses: getBoolValue('hallazgo_intereses'),
                detalle_intereses: getValue('detalle_intereses'),
                hallazgo_dinero: getBoolValue('hallazgo_dinero'),
                detalle_dinero: getValue('detalle_dinero'),
                hallazgo_bienes: getBoolValue('hallazgo_bienes'),
                detalle_bienes: getValue('detalle_bienes'),
                hallazgo_estudios: getBoolValue('hallazgo_estudios'),
                detalle_estudios: getValue('detalle_estudios'),
                link_detalle_intereses: getValue('link_detalle_intereses'),
                link_detalle_dinero_1: getValue('link_detalle_dinero_1'),
                link_detalle_dinero_2: getValue('link_detalle_dinero_2'),
                link_detalle_bienes: getValue('link_detalle_bienes'),
                link_detalle_estudios: getValue('link_detalle_estudios'),
                resumen_ficha: getValue('resumen_ficha'),
                disclaimer_resumen_ficha: getValue('disclaimer_resumen_ficha')
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

        // Íconos de categorías: siempre se muestran los 4, coloreados solo si hay hallazgo
        const iconosData = [
            { key: 'intereses', img: './img/bg-ficha-1.png', label: 'Intereses<br>cruzados',        color: 'yellow' },
            { key: 'dinero',    img: './img/bg-ficha-2.png', label: 'El rastro<br>del dinero',       color: 'green'  },
            { key: 'estudios',  img: './img/bg-ficha-4.png', label: 'Lo que respalda<br>su trayectoria', color: 'blue' },
            { key: 'bienes',    img: './img/bg-ficha-3.png', label: 'Bienes a<br>su nombre',         color: 'pink'   }
        ];

        const iconosHTML = '<div class="ficha-resultado__categorias">' +
            iconosData.map(function(ic) {
                const activo = c['hallazgo_' + ic.key];
                return '<div class="ficha-categoria-indicador ' + (activo ? 'ficha-categoria-indicador--activo ficha-categoria-indicador--' + ic.color : 'ficha-categoria-indicador--inactivo') + '">' +
                    '<div class="ficha-categoria-btn__icon"><img src="' + ic.img + '" alt="" width="100%"></div>' +
                    '<span class="ficha-categoria-btn__text">' + ic.label + '</span>' +
                '</div>';
            }).join('') +
        '</div>';

        // Resumen y disclaimer
        const resumenHTML = (c.resumen_ficha || c.disclaimer_resumen_ficha) ?
            '<div class="ficha-resultado__resumen">' +
                (c.resumen_ficha ? '<p class="ficha-resultado__resumen-texto">' + c.resumen_ficha + '</p>' : '') +
                (c.disclaimer_resumen_ficha ? '<p class="ficha-resultado__resumen-disclaimer">' + c.disclaimer_resumen_ficha + '</p>' : '') +
            '</div>' : '';

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
                        '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Experiencia en sector público</span> <span class="ficha-resultado__dato-value">' + (c.experiencia_publico || '---') + '</span></p>' +
                    '</div>' +
                '</div>' +
                '<div class="ficha-resultado__photo-container">' +
                    '<img src="' + c.foto + '" alt="' + c.nombre + '" class="ficha-resultado__photo" onerror="this.src=\'https://via.placeholder.com/110x110/ccc/666?text=' + encodeURIComponent(c.nombre.substring(0,2)) + '\'">' +
                '</div>' +
            '</div>' +
            '<div class="ficha-resultado__hallazgos-summary">' +
                '<p class="ficha-resultado__hallazgos-title">' + hallazgosTitulo + '</p>' +
            '</div>' +
            iconosHTML +
            resumenHTML +
            '<div class="ficha-resultado__footer">' +
                '<span class="ficha-resultado__footer-text">Para más detalles ver las siguientes secciones</span>' +
                '<div class="ficha-resultado__acciones">' +
                    '<button class="ficha-accion-btn ficha-accion-btn--compartir" onclick="compartirFicha(' + c.id + ', this)" title="Compartir ficha">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>' +
                        '<span>Compartir</span>' +
                    '</button>' +
                    '<button class="ficha-accion-btn ficha-accion-btn--descargar" onclick="descargarFichaJPG(' + c.id + ', this)" title="Descargar como imagen">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>' +
                        '<span>Descargar</span>' +
                    '</button>' +
                '</div>' +
            '</div>' +
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

// ========================================
// CARGA DINÁMICA DE html2canvas
// ========================================
function cargarHtml2Canvas() {
    return new Promise((resolve) => {
        if (window.html2canvas) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando aplicación En Contienda...');
    
    // Cargar datos desde Google Sheets
    const cargaExitosa = await cargarDatosGoogleSheets();
    
    if (!cargaExitosa) {
        console.log('⚠️ No se pudieron cargar los datos. Revisa la consola para más detalles.');
    }

    // ── Detectar parámetro ?congresista=ID en la URL ──
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('congresista');
    if (idParam && cargaExitosa) {
        const c = congresistas.find(c => String(c.id) === String(idParam));
        if (c) {
            filtrarGlobalmente('nombre', c.nombre);
            // Scroll suave a la sección de resultados tras un pequeño delay
            setTimeout(() => {
                const ficha = document.querySelector('.ficha-resultado[data-id="' + c.id + '"]');
                if (ficha) ficha.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    }
});
// ========================================
// FUNCIONES PARA FICHAS INLINE
// ========================================

/**
 * Alterna la visibilidad del detalle de una categoría en una ficha específica
 */
/**
 * Genera HTML de botones de descarga según la categoría.
 * "dinero" puede tener hasta 2 links (hoja de vida 2021 y 2025).
 */
function generarLinksDescarga(c, categoria) {
    var iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>';
    var html = '';
    if (categoria === 'dinero') {
        var link1 = (c.link_detalle_dinero_1 || '').trim();
        var link2 = (c.link_detalle_dinero_2 || '').trim();
        if (link1 || link2) {
            html += '<div class="ficha-resultado__doc-links">';
            if (link1) html += '<a href="' + link1 + '" target="_blank" rel="noopener noreferrer" class="ficha-resultado__doc-link">' + iconSVG + 'DJI 2021</a>';
            if (link2) html += '<a href="' + link2 + '" target="_blank" rel="noopener noreferrer" class="ficha-resultado__doc-link">' + iconSVG + 'DJI 2025</a>';
            html += '</div>';
        }
    } else {
        var link = (c['link_detalle_' + categoria] || '').trim();
        if (link) {
            html = '<div class="ficha-resultado__doc-links"><a href="' + link + '" target="_blank" rel="noopener noreferrer" class="ficha-resultado__doc-link">' + iconSVG + 'Descargar documento</a></div>';
        }
    }
    return html;
}

function toggleFichaDetalle(fichaId, categoria) {
    var ficha = document.querySelector('.ficha-resultado[data-id="' + fichaId + '"]');
    if (!ficha) return;

    var detalle = document.getElementById('detalle-ficha-' + fichaId);
    var contenido = document.getElementById('detalle-contenido-' + fichaId);
    var botones = ficha.querySelectorAll('.ficha-categoria-btn');
    var congresista = congresistas.find(function(c) { return c.id === fichaId; });

    // Guardar si el botón clickeado YA estaba activo (para toggle off)
    var botonActual = ficha.querySelector('.ficha-categoria-btn[data-categoria="' + categoria + '"]');
    var estabaActivo = botonActual && botonActual.classList.contains('active');

    // Cerrar TODAS las demás fichas sin excepción
    document.querySelectorAll('.ficha-resultado').forEach(function(otraFicha) {
        if (String(otraFicha.dataset.id) === String(fichaId)) return; // saltar la ficha actual
        var otroDetalle = otraFicha.querySelector('.ficha-resultado__detalle');
        if (otroDetalle) otroDetalle.classList.remove('active');
        otraFicha.querySelectorAll('.ficha-categoria-btn').forEach(function(btn) { btn.classList.remove('active'); });
    });

    // Si el mismo botón estaba abierto → cerrar esta ficha (toggle off)
    if (estabaActivo) {
        botones.forEach(function(btn) { btn.classList.remove('active'); });
        if (detalle) detalle.classList.remove('active');
        return;
    }

    // Desactivar todos los botones de esta ficha y activar solo el clickeado
    botones.forEach(function(btn) { btn.classList.remove('active'); });
    if (botonActual) botonActual.classList.add('active');

    // Construir contenido
    var detalleTexto = congresista ? (congresista['detalle_' + categoria] || 'Sin información detallada disponible para esta categoría.') : '';
    if (typeof detalleTexto === 'string' && detalleTexto.indexOf('<p>') === -1) {
        contenido.innerHTML = '<p>' + detalleTexto + '</p>';
    } else {
        contenido.innerHTML = detalleTexto;
    }

    // Agregar links de descarga
    if (congresista) {
        contenido.innerHTML += generarLinksDescarga(congresista, categoria);
    }

    if (detalle) detalle.classList.add('active');

    setTimeout(function() {
        detalle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
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

    // Íconos indicadores (no clicables): si es "con-hallazgos" mostrar 3 activos, 1 inactivo
    const iconosConfig = [
        { key: 'intereses', img: './img/bg-ficha-1.png', label: 'Intereses<br>cruzados',             color: 'yellow', activo: tieneHallazgos },
        { key: 'dinero',    img: './img/bg-ficha-2.png', label: 'El rastro<br>del dinero',            color: 'green',  activo: tieneHallazgos },
        { key: 'estudios',  img: './img/bg-ficha-4.png', label: 'Lo que respalda<br>su trayectoria',  color: 'blue',   activo: tieneHallazgos },
        { key: 'bienes',    img: './img/bg-ficha-3.png', label: 'Bienes a<br>su nombre',              color: 'pink',   activo: false }
    ];

    const iconosHTML = '<div class="ficha-resultado__categorias">' +
        iconosConfig.map(function(ic) {
            const cls = ic.activo
                ? 'ficha-categoria-indicador ficha-categoria-indicador--activo ficha-categoria-indicador--' + ic.color
                : 'ficha-categoria-indicador ficha-categoria-indicador--inactivo';
            return '<div class="' + cls + '">' +
                '<div class="ficha-categoria-btn__icon"><img src="' + ic.img + '" alt="" width="100%"></div>' +
                '<span class="ficha-categoria-btn__text">' + ic.label + '</span>' +
            '</div>';
        }).join('') +
    '</div>';

    const resumenHTML = tieneHallazgos
        ? '<div class="ficha-resultado__resumen">' +
            '<p class="ficha-resultado__resumen-texto">Se identificaron 3 contrataciones con el Estado en las que figura un familiar directo del candidato, por un monto total de S/ 420,000, realizadas con dos entidades públicas durante el periodo parlamentario. Asimismo, no se encontró registro en Sunedu del grado de maestría declarado y el contraste con Sunarp reveló 2 propiedades no consignadas en la declaración jurada.</p>' +
            '<p class="ficha-resultado__resumen-disclaimer">El hallazgo se obtuvo al cruzar declaraciones juradas, registros de contrataciones públicas (SEACE), el registro oficial de visitas del Congreso, el padrón de títulos de Sunedu y los registros de propiedad de Sunarp. La identificación de estos cruces no implica una relación causal, pero permite observar coincidencias relevantes en información pública disponible.</p>' +
          '</div>'
        : '';

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
                    '<p class="ficha-resultado__dato"><span class="ficha-resultado__dato-label">Experiencia en sector público</span> <span class="ficha-resultado__dato-value">Sí</span></p>' +
                '</div>' +
            '</div>' +
            '<div class="ficha-resultado__photo-container">' +
                '<img src="https://via.placeholder.com/110x110/ccc/666?text=NC" alt="Nilza Chacón" class="ficha-resultado__photo">' +
            '</div>' +
        '</div>' +
        '<div class="ficha-resultado__hallazgos-summary">' +
            '<p class="ficha-resultado__hallazgos-title">' + hallazgosTitulo + '</p>' +
        '</div>' +
        iconosHTML +
        resumenHTML +
        '<div class="ficha-resultado__footer">' +
            '<span class="ficha-resultado__footer-text">Para más detalles ver las siguientes secciones</span>' +
            '<div class="ficha-resultado__acciones">' +
                '<button class="ficha-accion-btn ficha-accion-btn--compartir" onclick="compartirFicha(\'ejemplo\', this)" title="Compartir ficha">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>' +
                    '<span>Compartir</span>' +
                '</button>' +
                '<button class="ficha-accion-btn ficha-accion-btn--descargar" onclick="descargarFichaJPG(\'ejemplo\', this)" title="Descargar como imagen">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>' +
                    '<span>Descargar</span>' +
                '</button>' +
            '</div>' +
        '</div>' +
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
// ========================================
// COMPARTIR FICHA POR URL
// ========================================

/**
 * Copia al portapapeles la URL con ?congresista=ID
 * y muestra un toast de confirmación.
 */
function compartirFicha(fichaId, btnEl) {
    // Para fichas de demo ('ejemplo') no generamos URL real
    if (fichaId === 'ejemplo') {
        mostrarToast('Esta es una ficha de ejemplo — no tiene URL única.', 'info');
        return;
    }

    const url = new URL(window.location.href);
    url.search = '';                          // limpiar otros params
    url.searchParams.set('congresista', fichaId);

    navigator.clipboard.writeText(url.toString()).then(() => {
        mostrarToast('¡Enlace copiado al portapapeles!', 'ok');
        // Feedback visual en el botón
        if (btnEl) {
            const textoOriginal = btnEl.querySelector('span').textContent;
            btnEl.querySelector('span').textContent = '¡Copiado!';
            btnEl.classList.add('ficha-accion-btn--feedback');
            setTimeout(() => {
                btnEl.querySelector('span').textContent = textoOriginal;
                btnEl.classList.remove('ficha-accion-btn--feedback');
            }, 2000);
        }
    }).catch(() => {
        // Fallback para navegadores sin clipboard API
        prompt('Copia este enlace:', url.toString());
    });
}

// ========================================
// DESCARGAR FICHA COMO JPG
// ========================================

/**
 * Captura la ficha como imagen JPG y la descarga.
 * Usa html2canvas (se carga dinámicamente al primer uso).
 */
async function descargarFichaJPG(fichaId, btnEl) {
    const ficha = document.querySelector('.ficha-resultado[data-id="' + fichaId + '"]');
    if (!ficha) return;

    // Indicar estado de carga
    const spanTexto = btnEl ? btnEl.querySelector('span') : null;
    if (spanTexto) spanTexto.textContent = 'Generando...';
    if (btnEl) btnEl.disabled = true;

    try {
        await cargarHtml2Canvas();

        // Ocultar elementos de UI que no deben aparecer en la imagen
        ficha.classList.add('ficha-exportando');

        const canvas = await html2canvas(ficha, {
            scale: 2,                      // resolución 2× para nitidez
            useCORS: true,                 // intentar cargar fotos externas
            backgroundColor: '#323C4A',    // fondo de la ficha
            logging: false,
            onclone: (doc) => {
                // En el clon eliminamos los botones de acción
                doc.querySelectorAll('.ficha-resultado__close, .ficha-resultado__acciones')
                   .forEach(el => el.style.display = 'none');
            }
        });

        // Generar nombre de archivo
        const c = congresistas.find(c => String(c.id) === String(fichaId));
        const nombreArchivo = c
            ? 'en-contienda-' + c.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.jpg'
            : 'en-contienda-ficha.jpg';

        // Descargar
        const link = document.createElement('a');
        link.download = nombreArchivo;
        link.href = canvas.toDataURL('image/jpeg', 0.92);
        link.click();

        mostrarToast('Imagen descargada.', 'ok');

    } catch (err) {
        console.error('Error generando imagen:', err);
        mostrarToast('No se pudo generar la imagen.', 'error');
    } finally {
        ficha.classList.remove('ficha-exportando');
        if (spanTexto) spanTexto.textContent = 'Descargar';
        if (btnEl) btnEl.disabled = false;
    }
}

// ========================================
// TOAST DE NOTIFICACIÓN
// ========================================

function mostrarToast(mensaje, tipo) {
    // Eliminar toast anterior si existe
    const anterior = document.getElementById('ec-toast');
    if (anterior) anterior.remove();

    const toast = document.createElement('div');
    toast.id = 'ec-toast';
    toast.className = 'ec-toast ec-toast--' + (tipo || 'ok');
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('ec-toast--visible'));

    setTimeout(() => {
        toast.classList.remove('ec-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}