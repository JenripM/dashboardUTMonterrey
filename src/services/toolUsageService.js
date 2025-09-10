// Servicio para analizar el uso de herramientas de IA
// Calcula métricas específicas de herramientas basadas en applicationTracking
// Ahora usa datos reales de Firestore en lugar de datos mock

import { getApplicationTrackingData } from './firebaseService';

// Función principal para obtener y analizar el uso de herramientas
export const analyzeToolUsage = async () => {
  try {
    const applicationData = await getApplicationTrackingData();
    return analyzeToolUsageFromData(applicationData);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

// Función que mantiene la lógica original pero ahora recibe datos como parámetro
export const analyzeToolUsageFromData = (applicationData) => {
  const totalUsage = applicationData.reduce((acc, app) => {
    if (app.toolsUsed) {
      Object.entries(app.toolsUsed).forEach(([tool, count]) => {
        acc[tool] = (acc[tool] || 0) + count;
      });
    }
    return acc;
  }, {});

  const totalUses = Object.values(totalUsage).reduce((sum, count) => sum + count, 0);
  
  // Calcular porcentajes de uso
  const usagePercentages = {};
  Object.entries(totalUsage).forEach(([tool, count]) => {
    usagePercentages[tool] = totalUses > 0 ? Math.round((count / totalUses) * 100 * 10) / 10 : 0;
  });

  return {
    totalUsage,
    totalUses,
    usagePercentages,
    mostUsedTool: Object.entries(totalUsage).reduce((a, b) => totalUsage[a[0]] > totalUsage[b[0]] ? a : b, ['', 0])[0],
    leastUsedTool: Object.entries(totalUsage).reduce((a, b) => totalUsage[a[0]] < totalUsage[b[0]] ? a : b, ['', Infinity])[0]
  };
};

export const getToolUsageByUser = async () => {
  try {
    const applicationData = await getApplicationTrackingData();
    return getToolUsageByUserFromData(applicationData);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

// Función que mantiene la lógica original pero ahora recibe datos como parámetro
export const getToolUsageByUserFromData = (applicationData) => {
  const userUsage = {};
  
  applicationData.forEach(app => {
    if (!userUsage[app.userId]) {
      userUsage[app.userId] = {
        totalUses: 0,
        tools: {}
      };
    }
    
    if (app.toolsUsed) {
      Object.entries(app.toolsUsed).forEach(([tool, count]) => {
        userUsage[app.userId].totalUses += count;
        userUsage[app.userId].tools[tool] = (userUsage[app.userId].tools[tool] || 0) + count;
      });
    }
  });
  
  return userUsage;
};

export const getToolUsageTrends = async (timeRange = '30D') => {
  try {
    const applicationData = await getApplicationTrackingData();
    return getToolUsageTrendsFromData(applicationData, timeRange);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

// Función que mantiene la lógica original pero ahora recibe datos como parámetro
export const getToolUsageTrendsFromData = (applicationData, timeRange = '30D') => {
  // Agrupar por día/semana según el rango
  let groupBy;
  
  switch (timeRange) {
    case '7D':
      groupBy = 'day';
      break;
    case '30D':
      groupBy = 'day';
      break;
    case '90D':
      groupBy = 'week';
      break;
    case '12M':
      groupBy = 'month';
      break;
    default:
      groupBy = 'day';
  }
  
  const groupedData = {};
  
  applicationData.forEach(app => {
    // Manejar diferentes formatos de fecha de Firestore
    let date;
    if (app.createdAt && typeof app.createdAt === 'object' && app.createdAt.toDate) {
      // Es un Timestamp de Firestore
      date = app.createdAt.toDate();
    } else if (app.createdAt) {
      // Es un string o Date
      date = new Date(app.createdAt);
    } else {
      // No hay fecha, usar fecha actual
      date = new Date();
    }
    
    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.warn('Fecha inválida encontrada:', app.createdAt, 'usando fecha actual');
      date = new Date();
    }
    
    let key;
    
    switch (groupBy) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      default:
        key = date.toISOString().split('T')[0];
        break;
    }
    
    if (!groupedData[key]) {
      groupedData[key] = {};
    }
    
    if (app.toolsUsed) {
      Object.entries(app.toolsUsed).forEach(([tool, count]) => {
        groupedData[key][tool] = (groupedData[key][tool] || 0) + count;
      });
    }
  });
  
  return groupedData;
};

// Función para obtener estadísticas de uso de herramientas por período específico
export const getToolUsageByPeriod = async (startDate, endDate) => {
  try {
    const applicationData = await getApplicationTrackingData();
    return getToolUsageByPeriodFromData(applicationData, startDate, endDate);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

export const getToolUsageByPeriodFromData = (applicationData, startDate, endDate) => {
  const filteredData = applicationData.filter(app => {
    const appDate = new Date(app.createdAt);
    return appDate >= startDate && appDate <= endDate;
  });
  
  return analyzeToolUsageFromData(filteredData);
};

// Función para obtener el uso de herramientas por estado de aplicación
export const getToolUsageByApplicationStatus = async () => {
  try {
    const applicationData = await getApplicationTrackingData();
    return getToolUsageByApplicationStatusFromData(applicationData);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

export const getToolUsageByApplicationStatusFromData = (applicationData) => {
  const statusGroups = {};
  
  applicationData.forEach(app => {
    const status = app.status || 'unknown';
    if (!statusGroups[status]) {
      statusGroups[status] = [];
    }
    statusGroups[status].push(app);
  });
  
  const result = {};
  Object.entries(statusGroups).forEach(([status, apps]) => {
    result[status] = analyzeToolUsageFromData(apps);
  });
  
  return result;
};

// Función para obtener el uso de herramientas por empresa
export const getToolUsageByCompany = async (limit = 10) => {
  try {
    const applicationData = await getApplicationTrackingData();
    return getToolUsageByCompanyFromData(applicationData, limit);
  } catch (error) {
    console.error('Error obteniendo datos de applicationTracking:', error);
    throw error;
  }
};

export const getToolUsageByCompanyFromData = (applicationData, limit = 10) => {
  const companyGroups = {};
  
  applicationData.forEach(app => {
    const company = app.company || 'Unknown';
    if (!companyGroups[company]) {
      companyGroups[company] = [];
    }
    companyGroups[company].push(app);
  });
  
  const result = {};
  const sortedCompanies = Object.entries(companyGroups)
    .sort(([,a], [,b]) => b.length - a.length)
    .slice(0, limit);
  
  sortedCompanies.forEach(([company, apps]) => {
    result[company] = {
      ...analyzeToolUsageFromData(apps),
      totalApplications: apps.length
    };
  });
  
  return result;
};
