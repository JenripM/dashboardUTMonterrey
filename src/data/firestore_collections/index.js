// Importar funciones para uso interno
import { getApplicationStats } from './applicationTracking.js';
import { getInterviewSimulationStats } from './aiTool_interviewSimulation.js';
import { getCvAnalysisStats } from './aiTool_cvAnalysis.js';
import { getCvAdaptationStats } from './aiTool_cvAdaptation.js';
import { getUsersStats } from './users.js';
import { getPracticasStats } from './practicas.js';

// Exportar todas las colecciones y funciones de utilidad
export { applicationTrackingData, getApplicationStats } from './applicationTracking.js';
export { interviewSimulationData, getInterviewSimulationStats, getInterviewCareerAverageScores } from './aiTool_interviewSimulation.js';
export { cvAnalysisData, getCvAnalysisStats, getCareerAverageScores } from './aiTool_cvAnalysis.js';
export { cvAdaptationData, getCvAdaptationStats } from './aiTool_cvAdaptation.js';
export { usersData, getUsersStats, getCycleStats, getCareerStats } from './users.js';
export { practicasData, getPracticasStats } from './practicas.js';
export { userCVsData } from './userCVs.js';

// Función principal para obtener todas las estadísticas del dashboard
export const getAllDashboardStats = () => {
  const applicationStats = getApplicationStats();
  const interviewStats = getInterviewSimulationStats();
  const cvAnalysisStats = getCvAnalysisStats();
  const cvAdaptationStats = getCvAdaptationStats();
  const usersStats = getUsersStats();
  const practicasStats = getPracticasStats();

  return {
    applications: applicationStats,
    interviews: interviewStats,
    cvAnalysis: cvAnalysisStats,
    cvAdaptation: cvAdaptationStats,
    users: usersStats,
    practicas: practicasStats,
    
    // Métricas calculadas para el dashboard principal
    totalApplications: applicationStats.total,
    totalInterviews: interviewStats.total,
    totalCvAnalysis: cvAnalysisStats.total,
    totalCvAdaptations: cvAdaptationStats.total,
    totalUsers: usersStats.total,
    totalPracticas: practicasStats.total,
    
    // Tasa de match promedio
    averageMatchScore: applicationStats.averageMatchScore,
    
    // Uso de herramientas
    toolsUsage: applicationStats.toolsUsage,
    
    // Estadísticas de rendimiento
    interviewAverageScore: interviewStats.averageScore,
    cvAnalysisAverageScore: cvAnalysisStats.averageScore,
    cvAdaptationSuccessRate: cvAdaptationStats.successRate,
    
    // Estadísticas de oferta vs demanda
    offerDemandStats: {
      byField: practicasStats.byField,
      byLocation: practicasStats.byLocation,
      bySalary: practicasStats.bySalary
    }
  };
};
