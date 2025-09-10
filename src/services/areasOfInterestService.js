// Servicio para áreas de interés basadas en field_of_study de usuarios
import { getUsersData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Obtiene las áreas de interés de los usuarios
 */
export const getAreasOfInterest = async () => {
  const cacheKey = 'areas_of_interest';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const usersData = await getUsersData();
    const areas = getAreasOfInterestFromData(usersData);
    
    // Guardar en caché solo los datos procesados finales
    cacheService.setMetrics(cacheKey, areas);
    
    return areas;
  } catch (error) {
    console.error('Error obteniendo áreas de interés:', error);
    return [];
  }
};

/**
 * Lógica original para calcular áreas de interés usando datos
 */
export const getAreasOfInterestFromData = (usersData) => {
  const fieldCounts = {};
  
  usersData.forEach(user => {
    const field = user?.metadata?.field_of_study;
    // Solo contar si tiene field_of_study válido
    if (field && typeof field === 'string' && field.trim() !== '') {
      fieldCounts[field] = (fieldCounts[field] || 0) + 1;
    }
  });

  const totalUsers = Object.values(fieldCounts).reduce((sum, count) => sum + count, 0);
  const colors = ['#024579', '#028bbf', '#00bf63', '#EF4444', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6'];
  
  const areasData = Object.entries(fieldCounts)
    .map(([field, count], index) => ({
      name: field,
      value: Math.round((count / totalUsers) * 100),
      count: count,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.value - a.value);

  return areasData;
};

/**
 * Obtiene estadísticas de áreas de interés
 */
export const getAreasOfInterestStats = async () => {
  try {
    const areasData = await getAreasOfInterest();
    return getAreasOfInterestStatsFromData(areasData);
  } catch (error) {
    console.error('Error obteniendo estadísticas de áreas de interés:', error);
    return {
      totalAreas: 0,
      mostPopularArea: 'N/A',
      mostPopularPercentage: 0,
      totalUsers: 0
    };
  }
};

/**
 * Lógica original para calcular estadísticas de áreas de interés usando datos
 */
export const getAreasOfInterestStatsFromData = (areasData) => {
  if (areasData.length === 0) {
    return {
      totalAreas: 0,
      mostPopularArea: 'N/A',
      mostPopularPercentage: 0,
      totalUsers: 0
    };
  }

  const totalUsers = areasData.reduce((sum, area) => sum + area.count, 0);
  const mostPopular = areasData[0];

  return {
    totalAreas: areasData.length,
    mostPopularArea: mostPopular.name,
    mostPopularPercentage: mostPopular.value,
    totalUsers: totalUsers
  };
};
