// Servicio para calcular la mejora en entrevistas por número de simulación
import { getInterviewSimulationData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Calcula el score promedio por número de simulación
 * Agrupa las simulaciones por usuario, las ordena cronológicamente
 * y calcula el promedio para cada "primera vez", "segunda vez", etc.
 */
export const getMejoraEntrevistasData = async () => {
  const cacheKey = 'mejora_entrevistas_data';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const interviewSimulationData = await getInterviewSimulationData();
    const data = getMejoraEntrevistasDataFromData(interviewSimulationData);
    
    // Guardar en caché solo los datos procesados
    cacheService.setMetrics(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Error obteniendo datos de entrevistas:', error);
    return [];
  }
};

/**
 * Lógica original para calcular mejora en entrevistas usando datos
 */
export const getMejoraEntrevistasDataFromData = (interviewSimulationData) => {
  // 1. Agrupar simulaciones por usuario
  const userSimulations = {};
  
  interviewSimulationData.forEach(sim => {
    if (!userSimulations[sim.userId]) {
      userSimulations[sim.userId] = [];
    }
    userSimulations[sim.userId].push({
      score: sim.interviewScore,
      date: sim.createdAt,
      userId: sim.userId
    });
  });

  // 2. Ordenar por fecha y asignar número de simulación
  const simulationNumbers = {};
  
  Object.keys(userSimulations).forEach(userId => {
    const sorted = userSimulations[userId].sort((a, b) => a.date - b.date);
    
    sorted.forEach((sim, index) => {
      const simNumber = index + 1;
      if (!simulationNumbers[simNumber]) {
        simulationNumbers[simNumber] = [];
      }
      simulationNumbers[simNumber].push({
        score: sim.score,
        userId: sim.userId,
        date: sim.date
      });
    });
  });

  // 3. Calcular promedios y estadísticas
  const result = Object.entries(simulationNumbers)
    .map(([number, simulations]) => {
      const scores = simulations.map(s => s.score);
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      return {
        simulationNumber: parseInt(number),
        averageScore: Math.round(averageScore * 10) / 10, // Redondear a 1 decimal
        count: simulations.length,
        minScore: Math.min(...scores),
        maxScore: Math.max(...scores),
        scores: scores // Para análisis adicional si es necesario
      };
    })
    .sort((a, b) => a.simulationNumber - b.simulationNumber);

  return result;
};

/**
 * Calcula estadísticas adicionales para el gráfico
 */
export const getMejoraEntrevistasStats = async () => {
  const cacheKey = 'mejora_entrevistas_stats';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const interviewSimulationData = await getInterviewSimulationData();
    const data = getMejoraEntrevistasDataFromData(interviewSimulationData);
    const stats = getMejoraEntrevistasStatsFromData(data, interviewSimulationData);
    
    // Guardar en caché solo las estadísticas procesadas
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas de entrevistas:', error);
    return {
      totalSimulations: 0,
      totalUsers: 0,
      maxSimulations: 0,
      averageImprovement: 0,
      minScore: 0,
      maxScore: 100
    };
  }
};

/**
 * Lógica original para calcular estadísticas usando datos
 */
export const getMejoraEntrevistasStatsFromData = (data, interviewSimulationData) => {
  if (data.length === 0) {
    return {
      totalSimulations: 0,
      totalUsers: 0,
      maxSimulations: 0,
      averageImprovement: 0,
      minScore: 0,
      maxScore: 100
    };
  }

  const totalSimulations = data.reduce((sum, item) => sum + item.count, 0);
  const totalUsers = new Set(
    interviewSimulationData.map(sim => sim.userId)
  ).size;
  const maxSimulations = Math.max(...data.map(item => item.simulationNumber));
  
  // Calcular mejora promedio (diferencia entre última y primera simulación)
  const firstSim = data.find(item => item.simulationNumber === 1);
  const lastSim = data[data.length - 1];
  const averageImprovement = firstSim && lastSim 
    ? lastSim.averageScore - firstSim.averageScore 
    : 0;

  // Calcular rango dinámico para el eje Y basado en promedios por simulación
  const averageScores = data.map(item => item.averageScore);
  const minScore = Math.min(...averageScores);
  const maxScore = Math.max(...averageScores);
  
  // Agregar margen de 5 puntos arriba y abajo, redondeando a enteros
  const margin = 5;
  const yAxisMin = Math.max(0, Math.floor(minScore - margin));
  const yAxisMax = Math.min(100, Math.ceil(maxScore + margin));

  return {
    totalSimulations,
    totalUsers,
    maxSimulations,
    averageImprovement: Math.round(averageImprovement * 10) / 10,
    minScore: yAxisMin,
    maxScore: yAxisMax
  };
};
