// Servicio principal para métricas del dashboard
// Combina todos los servicios para calcular métricas completas
// Ahora usa datos reales de Firestore en lugar de datos mock

import { 
  calculateCollectionChanges, 
  calculateToolUsageChanges 
} from './timeRangeService.js';
import { analyzeToolUsage, analyzeToolUsageFromData } from './toolUsageService.js';
import { 
  calculatePerformanceMetrics, 
  calculateSuccessRate,
  calculateMatchScoreDistribution 
} from './performanceMetricsService.js';
import { 
  getApplicationTrackingData,
  getInterviewSimulationData,
  getCvAnalysisData,
  getCvAdaptationData,
  getUsersData,
  getPracticasData
} from './firebaseService.js';

// Función principal para obtener métricas del dashboard (ahora async)
export const getDashboardMetrics = async (timeRange = '30D') => {
  try {
    // Obtener todos los datos de Firestore
    const [
      applicationTrackingData,
      interviewSimulationData,
      cvAnalysisData,
      cvAdaptationData,
      usersData
    ] = await Promise.all([
      getApplicationTrackingData(),
      getInterviewSimulationData(),
      getCvAnalysisData(),
      getCvAdaptationData(),
      getUsersData()
    ]);

    return getDashboardMetricsFromData({
      applicationTrackingData,
      interviewSimulationData,
      cvAnalysisData,
      cvAdaptationData,
      usersData
    }, timeRange);
  } catch (error) {
    console.error('Error obteniendo métricas del dashboard:', error);
    throw error;
  }
};

// Función que mantiene la lógica original pero ahora recibe datos como parámetro
export const getDashboardMetricsFromData = (collections, timeRange = '30D') => {
  const { 
    applicationTrackingData, 
    interviewSimulationData, 
    cvAnalysisData, 
    cvAdaptationData, 
    usersData 
  } = collections;

  // Calcular cambios en colecciones
  const applicationChanges = calculateCollectionChanges(applicationTrackingData, timeRange);
  const interviewChanges = calculateCollectionChanges(interviewSimulationData, timeRange);
  const cvAnalysisChanges = calculateCollectionChanges(cvAnalysisData, timeRange);
  const cvAdaptationChanges = calculateCollectionChanges(cvAdaptationData, timeRange);

  // Calcular uso de herramientas (usar la función que acepta datos como parámetro)
  const toolUsage = analyzeToolUsageFromData(applicationTrackingData);
  const toolUsageChanges = calculateToolUsageChanges(applicationTrackingData, timeRange);

  // Calcular métricas de rendimiento
  const interviewPerformance = calculatePerformanceMetrics(interviewSimulationData, 'interviewScore');
  const cvAnalysisPerformance = calculatePerformanceMetrics(cvAnalysisData, 'result.score');
  const cvAdaptationSuccess = calculateSuccessRate(cvAdaptationData);
  const matchScoreDistribution = calculateMatchScoreDistribution(applicationTrackingData);

  return {
    // Métricas principales
    totalApplications: applicationTrackingData.length,
    totalInterviews: interviewSimulationData.length,
    totalCvAnalysis: cvAnalysisData.length,
    totalCvAdaptations: cvAdaptationData.length,
    totalUsers: usersData.length,

    // Cambios porcentuales
    applicationChange: {
      value: applicationChanges.change,
      type: applicationChanges.changeType
    },
    interviewChange: {
      value: interviewChanges.change,
      type: interviewChanges.changeType
    },
    cvAnalysisChange: {
      value: cvAnalysisChanges.change,
      type: cvAnalysisChanges.changeType
    },
    cvAdaptationChange: {
      value: cvAdaptationChanges.change,
      type: cvAdaptationChanges.changeType
    },

    // Uso de herramientas
    toolsUsage: toolUsage.totalUsage,
    toolsUsageChanges: toolUsageChanges.changes,

    // Métricas de rendimiento
    averageMatchScore: calculatePerformanceMetrics(applicationTrackingData, 'matchScore').average,
    interviewAverageScore: interviewPerformance.average,
    cvAnalysisAverageScore: cvAnalysisPerformance.average,
    cvAdaptationSuccessRate: cvAdaptationSuccess.successRate,

    // Distribución de puntuaciones
    matchScoreDistribution,

    // Tiempos de procesamiento
    cvAnalysisProcessingTime: calculatePerformanceMetrics(cvAnalysisData, 'processingTime').average,
    cvAdaptationProcessingTime: calculatePerformanceMetrics(cvAdaptationData, 'processingTime').average
  };
};

// Función para obtener métricas de herramientas de IA específicas
export const getAIToolsMetrics = async () => {
  try {
    const [
      cvAnalysisData,
      interviewSimulationData,
      cvAdaptationData
    ] = await Promise.all([
      getCvAnalysisData(),
      getInterviewSimulationData(),
      getCvAdaptationData()
    ]);

    return {
      cvAnalysis: {
        total: cvAnalysisData.length,
        averageScore: calculatePerformanceMetrics(cvAnalysisData, 'result.score').average,
        processingTime: calculatePerformanceMetrics(cvAnalysisData, 'processingTime').average,
        successRate: calculateSuccessRate(cvAnalysisData).successRate
      },
      interviewSimulation: {
        total: interviewSimulationData.length,
        averageScore: calculatePerformanceMetrics(interviewSimulationData, 'interviewScore').average,
        processingTime: calculatePerformanceMetrics(interviewSimulationData, 'processingTime').average,
        successRate: calculateSuccessRate(interviewSimulationData).successRate
      },
      cvAdaptation: {
        total: cvAdaptationData.length,
        averageScore: calculatePerformanceMetrics(cvAdaptationData, 'result.score').average,
        processingTime: calculatePerformanceMetrics(cvAdaptationData, 'processingTime').average,
        successRate: calculateSuccessRate(cvAdaptationData).successRate
      }
    };
  } catch (error) {
    console.error('Error obteniendo métricas de herramientas de IA:', error);
    throw error;
  }
};

// Función para obtener métricas de usuarios
export const getUsersMetrics = async () => {
  try {
    const usersData = await getUsersData();
    
    // Calcular métricas de usuarios
    const totalUsers = usersData.length;
    const activeUsers = usersData.filter(user => user.isActive !== false).length;
    const newUsers = usersData.filter(user => {
      const userDate = new Date(user.createdAt || user.joinedAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return userDate >= thirtyDaysAgo;
    }).length;

    return {
      total: totalUsers,
      active: activeUsers,
      newUsers: newUsers,
      activePercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100 * 10) / 10 : 0
    };
  } catch (error) {
    console.error('Error obteniendo métricas de usuarios:', error);
    throw error;
  }
};

// Función para obtener métricas de aplicaciones por estado
export const getApplicationStatusMetrics = async () => {
  try {
    const applicationData = await getApplicationTrackingData();
    
    const statusCounts = applicationData.reduce((acc, app) => {
      const status = app.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const total = applicationData.length;
    
    return {
      total,
      postulados: statusCounts.postulados || 0,
      entrevistas: statusCounts.entrevistas || 0,
      rechazados: statusCounts.rechazados || 0,
      aceptados: statusCounts.aceptados || 0,
      unknown: statusCounts.unknown || 0,
      percentages: {
        postulados: total > 0 ? Math.round(((statusCounts.postulados || 0) / total) * 100 * 10) / 10 : 0,
        entrevistas: total > 0 ? Math.round(((statusCounts.entrevistas || 0) / total) * 100 * 10) / 10 : 0,
        rechazados: total > 0 ? Math.round(((statusCounts.rechazados || 0) / total) * 100 * 10) / 10 : 0,
        aceptados: total > 0 ? Math.round(((statusCounts.aceptados || 0) / total) * 100 * 10) / 10 : 0
      }
    };
  } catch (error) {
    console.error('Error obteniendo métricas de estado de aplicaciones:', error);
    throw error;
  }
};

// Función para obtener métricas de rendimiento general
export const getPerformanceMetrics = async () => {
  try {
    const [
      applicationData,
      cvAnalysisData,
      interviewSimulationData,
      cvAdaptationData
    ] = await Promise.all([
      getApplicationTrackingData(),
      getCvAnalysisData(),
      getInterviewSimulationData(),
      getCvAdaptationData()
    ]);

    return {
      applications: {
        total: applicationData.length,
        averageMatchScore: calculatePerformanceMetrics(applicationData, 'matchScore').average,
        matchScoreDistribution: calculateMatchScoreDistribution(applicationData)
      },
      cvAnalysis: {
        total: cvAnalysisData.length,
        averageScore: calculatePerformanceMetrics(cvAnalysisData, 'result.score').average,
        averageProcessingTime: calculatePerformanceMetrics(cvAnalysisData, 'processingTime').average,
        successRate: calculateSuccessRate(cvAnalysisData).successRate
      },
      interviews: {
        total: interviewSimulationData.length,
        averageScore: calculatePerformanceMetrics(interviewSimulationData, 'interviewScore').average,
        averageProcessingTime: calculatePerformanceMetrics(interviewSimulationData, 'processingTime').average,
        successRate: calculateSuccessRate(interviewSimulationData).successRate
      },
      cvAdaptation: {
        total: cvAdaptationData.length,
        averageScore: calculatePerformanceMetrics(cvAdaptationData, 'result.score').average,
        averageProcessingTime: calculatePerformanceMetrics(cvAdaptationData, 'processingTime').average,
        successRate: calculateSuccessRate(cvAdaptationData).successRate
      }
    };
  } catch (error) {
    console.error('Error obteniendo métricas de rendimiento:', error);
    throw error;
  }
};
