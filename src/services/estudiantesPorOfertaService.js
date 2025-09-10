import { getUsersData, getPracticasData } from './firebaseService';
import { cacheService } from './cacheService';

export const getEstudiantesPorOfertaData = async () => {
  const cacheKey = 'estudiantes_por_oferta_data';
  
  // Intentar obtener del caché
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const [usersData, practicasData] = await Promise.all([
      getUsersData(),
      getPracticasData()
    ]);
    const data = getEstudiantesPorOfertaDataFromData(usersData, practicasData);
    
    // Guardar en caché
    cacheService.setMetrics(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Error obteniendo datos de estudiantes por oferta:', error);
    return [];
  }
};

/**
 * Lógica original para calcular estudiantes por oferta usando datos
 */
export const getEstudiantesPorOfertaDataFromData = (usersData, practicasData) => {
  // Parámetros configurables para filtrar áreas insignificantes
  const MIN_ESTUDIANTES = 5;  // Mínimo de estudiantes para considerar un área
  const MIN_OFERTAS = 2;      // Mínimo de ofertas para considerar un área
  
  console.log(`🔍 Filtrando áreas con menos de ${MIN_ESTUDIANTES} estudiantes o ${MIN_OFERTAS} ofertas`);
  console.log(`🚫 Excluyendo registros con campo "No especificado"`);

  // Agrupar usuarios por field_of_study (está en metadata) - excluyendo "No especificado"
  const usuariosPorArea = {};
  let usuariosExcluidos = 0;
  usersData.forEach(user => {
    const area = user.metadata?.field_of_study;
    // Solo procesar si tiene field_of_study válido y no es "No especificado"
    if (area && area.trim() !== '' && area !== 'No especificado') {
      if (!usuariosPorArea[area]) {
        usuariosPorArea[area] = 0;
      }
      usuariosPorArea[area]++;
    } else {
      usuariosExcluidos++;
    }
  });

  // Agrupar ofertas por target_field (está en metadata) - excluyendo "No especificado"
  const ofertasPorArea = {};
  let ofertasExcluidas = 0;
  practicasData.forEach(oferta => {
    const area = oferta.metadata?.target_field;
    // Solo procesar si tiene target_field válido y no es "No especificado"
    if (area && area.trim() !== '' && area !== 'No especificado') {
      if (!ofertasPorArea[area]) {
        ofertasPorArea[area] = 0;
      }
      ofertasPorArea[area]++;
    } else {
      ofertasExcluidas++;
    }
  });

  console.log(`👥 Usuarios procesados: ${usersData.length - usuariosExcluidos}/${usersData.length} (${usuariosExcluidos} excluidos)`);
  console.log(`💼 Ofertas procesadas: ${practicasData.length - ofertasExcluidas}/${practicasData.length} (${ofertasExcluidas} excluidas)`);

  // Calcular ratio de estudiantes por oferta
  const ratios = [];
  const areasFiltradas = [];
  
  Object.keys(usuariosPorArea).forEach(area => {
    const estudiantes = usuariosPorArea[area];
    const ofertas = ofertasPorArea[area] || 0;
    
    // Filtrar áreas con datos insuficientes
    if (estudiantes < MIN_ESTUDIANTES || ofertas < MIN_OFERTAS) {
      areasFiltradas.push({
        area,
        estudiantes,
        ofertas,
        razon: estudiantes < MIN_ESTUDIANTES ? 'pocos estudiantes' : 'pocas ofertas'
      });
      console.log(`❌ Área "${area}" filtrada: ${estudiantes} estudiantes, ${ofertas} ofertas (${estudiantes < MIN_ESTUDIANTES ? 'pocos estudiantes' : 'pocas ofertas'})`);
      return; // Saltar esta área
    }
    
    const ratio = ofertas > 0 ? estudiantes / ofertas : estudiantes; // Si no hay ofertas, el ratio es infinito
    
    ratios.push({
      area,
      estudiantes,
      ofertas,
      ratio: ofertas > 0 ? Math.round(ratio * 10) / 10 : 999 // Redondear a 1 decimal, 999 si no hay ofertas
    });
  });

  console.log(`✅ Áreas válidas encontradas: ${ratios.length}`);
  console.log(`❌ Áreas filtradas: ${areasFiltradas.length}`);
  
  if (areasFiltradas.length > 0) {
    console.log('📋 Áreas filtradas por datos insuficientes:', areasFiltradas);
  }

  // Ordenar por ratio descendente (más difícil primero)
  return ratios.sort((a, b) => b.ratio - a.ratio);
};

export const getEstudiantesPorOfertaStats = async () => {
  const cacheKey = 'estudiantes_por_oferta_stats';
  
  // Intentar obtener del caché
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await getEstudiantesPorOfertaData();
    const stats = getEstudiantesPorOfertaStatsFromData(data);
    
    // Guardar en caché
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas de estudiantes por oferta:', error);
    return {
      totalEstudiantes: 0,
      totalOfertas: 0,
      promedioRatio: 0,
      totalAreas: 0,
      areasFiltradas: 0
    };
  }
};

/**
 * Obtiene estadísticas detalladas incluyendo áreas filtradas
 */
export const getEstudiantesPorOfertaDetailedStats = async () => {
  const cacheKey = 'estudiantes_por_oferta_detailed_stats';
  
  // Intentar obtener del caché
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const [usersData, practicasData] = await Promise.all([
      getUsersData(),
      getPracticasData()
    ]);
    const stats = getEstudiantesPorOfertaDetailedStatsFromData(usersData, practicasData);
    
    // Guardar en caché
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas detalladas:', error);
    return {
      areasValidas: 0,
      areasFiltradas: 0,
      totalEstudiantes: 0,
      totalOfertas: 0,
      promedioRatio: 0
    };
  }
};

/**
 * Lógica para calcular estadísticas detalladas usando datos
 */
export const getEstudiantesPorOfertaDetailedStatsFromData = (usersData, practicasData) => {
  const MIN_ESTUDIANTES = 5;
  const MIN_OFERTAS = 2;
  
  // Agrupar usuarios por field_of_study - excluyendo "No especificado"
  const usuariosPorArea = {};
  usersData.forEach(user => {
    const area = user.metadata?.field_of_study;
    // Solo procesar si tiene field_of_study válido y no es "No especificado"
    if (area && area.trim() !== '' && area !== 'No especificado') {
      if (!usuariosPorArea[area]) {
        usuariosPorArea[area] = 0;
      }
      usuariosPorArea[area]++;
    }
  });

  // Agrupar ofertas por target_field - excluyendo "No especificado"
  const ofertasPorArea = {};
  practicasData.forEach(oferta => {
    const area = oferta.metadata?.target_field;
    // Solo procesar si tiene target_field válido y no es "No especificado"
    if (area && area.trim() !== '' && area !== 'No especificado') {
      if (!ofertasPorArea[area]) {
        ofertasPorArea[area] = 0;
      }
      ofertasPorArea[area]++;
    }
  });

  let areasValidas = 0;
  let areasFiltradas = 0;
  let totalEstudiantes = 0;
  let totalOfertas = 0;

  Object.keys(usuariosPorArea).forEach(area => {
    const estudiantes = usuariosPorArea[area];
    const ofertas = ofertasPorArea[area] || 0;
    
    if (estudiantes < MIN_ESTUDIANTES || ofertas < MIN_OFERTAS) {
      areasFiltradas++;
    } else {
      areasValidas++;
      totalEstudiantes += estudiantes;
      totalOfertas += ofertas;
    }
  });

  const promedioRatio = totalOfertas > 0 ? totalEstudiantes / totalOfertas : 0;

  return {
    areasValidas,
    areasFiltradas,
    totalEstudiantes,
    totalOfertas,
    promedioRatio: Math.round(promedioRatio * 10) / 10
  };
};

/**
 * Lógica original para calcular estadísticas usando datos
 */
export const getEstudiantesPorOfertaStatsFromData = (data) => {
  const totalEstudiantes = data.reduce((sum, item) => sum + item.estudiantes, 0);
  const totalOfertas = data.reduce((sum, item) => sum + item.ofertas, 0);
  const promedioRatio = totalOfertas > 0 ? totalEstudiantes / totalOfertas : 0;

  return {
    totalEstudiantes,
    totalOfertas,
    promedioRatio: Math.round(promedioRatio * 10) / 10,
    totalAreas: data.length
  };
};
