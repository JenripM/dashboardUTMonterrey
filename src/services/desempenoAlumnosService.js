// Servicio para calcular el desempeño de alumnos basado en análisis de CV
import { getCvAnalysisData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Calcula el desempeño de alumnos basado en sus análisis de CV
 * Agrupa por usuario y calcula el score promedio
 */
export const getDesempenoAlumnosData = async () => {
  try {
    const cvAnalysisData = await getCvAnalysisData();
    return getDesempenoAlumnosDataFromData(cvAnalysisData);
  } catch (error) {
    console.error('Error obteniendo datos de análisis de CV:', error);
    return [];
  }
};

/**
 * Lógica original para calcular desempeño usando datos
 */
export const getDesempenoAlumnosDataFromData = (cvAnalysisData) => {
  // Agrupar análisis por usuario con validación defensiva
  const userScores = {};
  
  cvAnalysisData.forEach(analysis => {
    // Validación defensiva de la estructura de datos
    if (!analysis || typeof analysis !== 'object') {
      console.warn('⚠️ Análisis inválido:', analysis);
      return;
    }
    
    const { user, result } = analysis;
    
    // Validar que user y result existan
    if (!user || !result || typeof user !== 'object' || typeof result !== 'object') {
      console.warn('⚠️ Estructura de análisis inválida:', { user, result });
      return;
    }
    
    const userName = user.displayName;
    const score = result.score;
    
    // Validar que userName sea válido
    if (!userName || typeof userName !== 'string' || userName.trim() === '') {
      console.warn('⚠️ Nombre de usuario inválido:', userName);
      return;
    }
    
    // Validar que score sea un número válido
    if (typeof score !== 'number' || isNaN(score) || !isFinite(score)) {
      console.warn('⚠️ Score inválido:', score, 'para usuario:', userName);
      return;
    }
    
    if (!userScores[userName]) {
      userScores[userName] = {
        name: userName,
        scores: [],
        totalAnalyses: 0,
        averageScore: 0,
        career: user.career || 'No especificado',
        cycle: user.cycle || 'No especificado'
      };
    }
    
    userScores[userName].scores.push(score);
    userScores[userName].totalAnalyses += 1;
  });
  
  // Calcular promedios con validación adicional
  Object.values(userScores).forEach(user => {
    if (user.scores.length === 0) {
      console.warn('⚠️ Usuario sin scores válidos:', user.name);
      user.averageScore = 0;
      return;
    }
    
    const totalScore = user.scores.reduce((sum, score) => {
      // Validación adicional en el reduce
      if (typeof score !== 'number' || isNaN(score) || !isFinite(score)) {
        console.warn('⚠️ Score inválido en reduce:', score);
        return sum;
      }
      return sum + score;
    }, 0);
    
    user.averageScore = Math.round((totalScore / user.scores.length) * 10) / 10;
    
    // Validación final del promedio
    if (isNaN(user.averageScore) || !isFinite(user.averageScore)) {
      console.warn('⚠️ Promedio inválido calculado:', user.averageScore, 'para usuario:', user.name);
      user.averageScore = 0;
    }
  });
  
  // Filtrar usuarios con datos válidos y ordenar por score promedio (mayor a menor)
  const sortedUsers = Object.values(userScores)
    .filter(user => user.averageScore > 0 && !isNaN(user.averageScore))
    .sort((a, b) => b.averageScore - a.averageScore);
  
  console.log(`📊 Usuarios válidos procesados: ${sortedUsers.length}`);
  console.log(`📊 Usuarios filtrados por datos inválidos: ${Object.keys(userScores).length - sortedUsers.length}`);
  
  return sortedUsers;
};

/**
 * Obtiene los top 5 alumnos con mejor desempeño
 */
export const getTopAlumnos = async () => {
  const cacheKey = 'top_alumnos';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const allUsers = await getDesempenoAlumnosData();
    const top5 = allUsers.slice(0, 5);
    
    // Guardar en caché solo los 5 mejores (datos mínimos)
    cacheService.setMetrics(cacheKey, top5);
    
    return top5;
  } catch (error) {
    console.error('Error obteniendo top alumnos:', error);
    return [];
  }
};

/**
 * Obtiene los 5 alumnos con menor desempeño
 */
export const getBottomAlumnos = async () => {
  const cacheKey = 'bottom_alumnos';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const allUsers = await getDesempenoAlumnosData();
    const bottom5 = allUsers.slice(-5).reverse(); // Revertir para mostrar de menor a mayor
    
    // Guardar en caché solo los 5 peores (datos mínimos)
    cacheService.setMetrics(cacheKey, bottom5);
    
    return bottom5;
  } catch (error) {
    console.error('Error obteniendo bottom alumnos:', error);
    return [];
  }
};

/**
 * Calcula estadísticas generales de desempeño
 */
export const getDesempenoStats = async () => {
  try {
    const allUsers = await getDesempenoAlumnosData();
    return getDesempenoStatsFromData(allUsers);
  } catch (error) {
    console.error('Error obteniendo estadísticas de desempeño:', error);
    return {
      totalAlumnos: 0,
      promedioGeneral: 0,
      mejorScore: 0,
      peorScore: 0
    };
  }
};

/**
 * Lógica original para calcular estadísticas usando datos
 */
export const getDesempenoStatsFromData = (allUsers) => {
  if (allUsers.length === 0) {
    return {
      totalAlumnos: 0,
      promedioGeneral: 0,
      mejorScore: 0,
      peorScore: 0
    };
  }
  
  const scores = allUsers.map(user => user.averageScore);
  const promedioGeneral = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const mejorScore = Math.max(...scores);
  const peorScore = Math.min(...scores);
  
  return {
    totalAlumnos: allUsers.length,
    promedioGeneral: Math.round(promedioGeneral * 10) / 10,
    mejorScore: Math.round(mejorScore * 10) / 10,
    peorScore: Math.round(peorScore * 10) / 10
  };
};
