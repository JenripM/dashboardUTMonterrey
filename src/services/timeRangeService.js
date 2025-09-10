// Servicio para cálculos de rangos de tiempo y cambios porcentuales
// Analiza timestamps y calcula métricas temporales

export const calculateTimeRange = (data, timeRange = '30D') => {
  const now = new Date();
  let startDate;
  
  switch (timeRange) {
    case '7D':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30D':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90D':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '12M':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  
  return data.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= now;
  });
};

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100 * 10) / 10;
};

export const getDataByTimeRange = (data, timeRange) => {
  const currentPeriod = calculateTimeRange(data, timeRange);
  
  // Calcular período anterior para comparación
  const now = new Date();
  let previousStartDate, previousEndDate;
  
  switch (timeRange) {
    case '7D':
      previousEndDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      break;
    case '30D':
      previousEndDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      break;
    case '90D':
      previousEndDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    case '12M':
      previousEndDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
      break;
    default:
      previousEndDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  }
  
  const previousPeriod = data.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= previousStartDate && itemDate < previousEndDate;
  });
  
  return {
    current: currentPeriod,
    previous: previousPeriod,
    currentCount: currentPeriod.length,
    previousCount: previousPeriod.length
  };
};

export const calculateToolUsageChanges = (data, timeRange = '30D') => {
  const { current, previous } = getDataByTimeRange(data, timeRange);
  
  // Calcular uso de herramientas en período actual
  const currentUsage = current.reduce((acc, item) => {
    if (item.toolsUsed) {
      Object.entries(item.toolsUsed).forEach(([tool, count]) => {
        acc[tool] = (acc[tool] || 0) + count;
      });
    }
    return acc;
  }, {});
  
  // Calcular uso de herramientas en período anterior
  const previousUsage = previous.reduce((acc, item) => {
    if (item.toolsUsed) {
      Object.entries(item.toolsUsed).forEach(([tool, count]) => {
        acc[tool] = (acc[tool] || 0) + count;
      });
    }
    return acc;
  }, {});
  
  // Calcular cambios porcentuales
  const changes = {};
  Object.keys({...currentUsage, ...previousUsage}).forEach(tool => {
    const current = currentUsage[tool] || 0;
    const prev = previousUsage[tool] || 0;
    changes[tool] = calculatePercentageChange(current, prev);
  });
  
  return {
    current: currentUsage,
    previous: previousUsage,
    changes
  };
};

export const calculateCollectionChanges = (data, timeRange = '30D') => {
  const { currentCount, previousCount } = getDataByTimeRange(data, timeRange);
  const change = calculatePercentageChange(currentCount, previousCount);
  
  return {
    current: currentCount,
    previous: previousCount,
    change,
    changeType: change >= 0 ? 'increase' : 'decrease'
  };
};
