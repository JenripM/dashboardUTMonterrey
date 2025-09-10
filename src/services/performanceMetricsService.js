// Servicio para calcular métricas de rendimiento
// Analiza scores, tiempos de procesamiento y tasas de éxito

export const calculatePerformanceMetrics = (data, scoreField = 'score') => {
  const validData = data.filter(item => item[scoreField] !== null && item[scoreField] !== undefined);
  
  if (validData.length === 0) {
    return {
      average: 0,
      median: 0,
      min: 0,
      max: 0,
      count: 0
    };
  }
  
  const scores = validData.map(item => item[scoreField]).sort((a, b) => a - b);
  const sum = scores.reduce((acc, score) => acc + score, 0);
  
  return {
    average: Math.round((sum / scores.length) * 10) / 10,
    median: scores.length % 2 === 0 
      ? (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2
      : scores[Math.floor(scores.length / 2)],
    min: scores[0],
    max: scores[scores.length - 1],
    count: scores.length
  };
};

export const calculateProcessingTimeMetrics = (data) => {
  const validData = data.filter(item => item.processingTime !== null && item.processingTime !== undefined);
  
  if (validData.length === 0) {
    return {
      average: 0,
      median: 0,
      min: 0,
      max: 0,
      count: 0
    };
  }
  
  const times = validData.map(item => item.processingTime).sort((a, b) => a - b);
  const sum = times.reduce((acc, time) => acc + time, 0);
  
  return {
    average: Math.round(sum / times.length),
    median: times.length % 2 === 0 
      ? (times[times.length / 2 - 1] + times[times.length / 2]) / 2
      : times[Math.floor(times.length / 2)],
    min: times[0],
    max: times[times.length - 1],
    count: times.length
  };
};

export const calculateSuccessRate = (data, statusField = 'status') => {
  const total = data.length;
  const successful = data.filter(item => item[statusField] === 'completed').length;
  const failed = data.filter(item => item[statusField] === 'error').length;
  
  return {
    total,
    successful,
    failed,
    successRate: total > 0 ? Math.round((successful / total) * 100 * 10) / 10 : 0,
    failureRate: total > 0 ? Math.round((failed / total) * 100 * 10) / 10 : 0
  };
};

export const calculateMatchScoreDistribution = (applicationData) => {
  const scores = applicationData
    .filter(app => app.matchScore !== null && app.matchScore !== undefined)
    .map(app => app.matchScore);
  
  if (scores.length === 0) {
    return {
      excellent: 0, // 90-100
      good: 0,      // 70-89
      fair: 0,      // 50-69
      poor: 0       // 0-49
    };
  }
  
  const distribution = {
    excellent: scores.filter(score => score >= 90).length,
    good: scores.filter(score => score >= 70 && score < 90).length,
    fair: scores.filter(score => score >= 50 && score < 70).length,
    poor: scores.filter(score => score < 50).length
  };
  
  // Convertir a porcentajes
  const total = scores.length;
  Object.keys(distribution).forEach(key => {
    distribution[key] = Math.round((distribution[key] / total) * 100 * 10) / 10;
  });
  
  return distribution;
};
