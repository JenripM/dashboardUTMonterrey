// Servicio para estadísticas de usuarios (carrera y ciclo)
import { getUsersData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Obtiene estadísticas de usuarios por carrera
 */
export const getCareerStats = async () => {
  const cacheKey = 'career_stats';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const usersData = await getUsersData();
    const stats = getCareerStatsFromData(usersData);
    
    // Guardar en caché solo los datos procesados
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas por carrera:', error);
    return [];
  }
};

/**
 * Lógica original para calcular estadísticas por carrera usando datos
 */
export const getCareerStatsFromData = (usersData, minPercentage = 0.5) => {
  const careerCounts = {};
  let totalUsers = 0;
  
  usersData.forEach(user => {
    const career = user?.career;
    // Solo contar si tiene career y no está vacío
    if (career && typeof career === 'string' && career.trim() !== '') {
      careerCounts[career] = (careerCounts[career] || 0) + 1;
      totalUsers++;
    }
  });

  const allCareers = Object.entries(careerCounts)
    .map(([career, count]) => ({
      name: career,
      value: count,
      percentage: (count / totalUsers) * 100
    }))
    .sort((a, b) => b.value - a.value);

  // Log para debugging - ver todas las carreras y sus porcentajes
  /*
  console.log('=== ANÁLISIS DE CARRERAS ===');
  console.log(`Total usuarios con carrera: ${totalUsers}`);
  console.log(`Total carreras únicas: ${allCareers.length}`);
  console.log('Top 20 carreras:');
  allCareers.slice(0, 20).forEach((career, index) => {
    console.log(`${index + 1}. ${career.name}: ${career.value} usuarios (${career.percentage.toFixed(2)}%)`);
  });
  console.log('========================');
 */
  return allCareers.filter(item => item.percentage >= minPercentage);
};

/**
 * Obtiene estadísticas de usuarios por ciclo
 */
export const getCycleStats = async () => {
  const cacheKey = 'cycle_stats';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const usersData = await getUsersData();
    const stats = getCycleStatsFromData(usersData);
    
    // Guardar en caché solo los datos procesados
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas por ciclo:', error);
    return [];
  }
};

/**
 * Lógica original para calcular estadísticas por ciclo usando datos
 */
export const getCycleStatsFromData = (usersData, minPercentage = 2) => {
  const cycleCounts = {};
  let totalUsers = 0;
  
  // Función para validar si un ciclo es válido
  const isValidCycle = (cycle) => {
    if (!cycle || typeof cycle !== 'string' || cycle.trim() === '') {
      return false;
    }
    
    const trimmedCycle = cycle.trim();
    
    // "Egresado" es siempre válido
    if (trimmedCycle.toLowerCase() === 'egresado') {
      return true;
    }
    
    // Verificar si es un entero válido
    const num = parseInt(trimmedCycle, 10);
    return !isNaN(num) && num.toString() === trimmedCycle && num > 0;
  };
  
  usersData.forEach(user => {
    const cycle = user?.cycle;
    // Solo contar si tiene cycle válido
    if (isValidCycle(cycle)) {
      cycleCounts[cycle] = (cycleCounts[cycle] || 0) + 1;
      totalUsers++;
    }
  });

  return Object.entries(cycleCounts)
    .map(([cycle, count]) => ({
      name: cycle,
      value: count,
      percentage: (count / totalUsers) * 100
    }))
    .filter(item => item.percentage >= minPercentage)
    .sort((a, b) => b.value - a.value);
};
