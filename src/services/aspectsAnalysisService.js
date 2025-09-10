// Servicio para analizar aspectos a mejorar basados en datos reales de AI tools
import { getCvAnalysisData, getInterviewSimulationData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Calcula el porcentaje de estudiantes que necesitan mejorar cada aspecto de CV
 * @returns {Array} Array de objetos con {name, value} ordenados por valor descendente
 */
export const getCvAspectsToImprove = async () => {
  const cacheKey = 'cv_aspects_improve';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const cvAnalysisData = await getCvAnalysisData();
    const aspects = getCvAspectsToImproveFromData(cvAnalysisData);
    
    // Solo cachear aspectos que superan el 10% (como se usa en los componentes)
    const filteredAspects = aspects.filter(aspect => aspect.value >= 10);
    
    // Guardar en caché solo los datos procesados y filtrados
    cacheService.setMetrics(cacheKey, filteredAspects);
    
    return filteredAspects;
  } catch (error) {
    console.error('Error obteniendo aspectos de CV a mejorar:', error);
    return [];
  }
};

/**
 * Lógica original para calcular aspectos de CV usando datos
 */
export const getCvAspectsToImproveFromData = (cvAnalysisData) => {
  const aspectCounts = {};
  const totalAnalyses = cvAnalysisData.filter(analysis => analysis.status === 'completed').length;
  
  // Contar cuántas veces aparece cada aspecto en los datos (dinámico)
  cvAnalysisData.forEach(analysis => {
    if (analysis.status === 'completed' && analysis.result?.aspects_to_improve) {
      analysis.result.aspects_to_improve.forEach(aspect => {
        aspectCounts[aspect] = (aspectCounts[aspect] || 0) + 1;
      });
    }
  });
  
  // Convertir a porcentajes y crear array ordenado (solo aspectos que aparecen)
  return Object.entries(aspectCounts)
    .map(([aspect, count]) => ({
      name: aspect,
      value: totalAnalyses > 0 ? Math.round((count / totalAnalyses) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Calcula el porcentaje de estudiantes que necesitan mejorar cada aspecto de entrevistas
 * @returns {Array} Array de objetos con {name, value} ordenados por valor descendente
 */
export const getInterviewAspectsToImprove = async () => {
  const cacheKey = 'interview_aspects_improve';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const interviewSimulationData = await getInterviewSimulationData();
    const aspects = getInterviewAspectsToImproveFromData(interviewSimulationData);
    
    // Solo cachear aspectos que superan el 10% (como se usa en los componentes)
    const filteredAspects = aspects.filter(aspect => aspect.value >= 10);
    
    // Guardar en caché solo los datos procesados y filtrados
    cacheService.setMetrics(cacheKey, filteredAspects);
    
    return filteredAspects;
  } catch (error) {
    console.error('Error obteniendo aspectos de entrevistas a mejorar:', error);
    return [];
  }
};

/**
 * Lógica original para calcular aspectos de entrevistas usando datos
 */
export const getInterviewAspectsToImproveFromData = (interviewSimulationData) => {
  const aspectCounts = {};
  let totalQuestions = 0;
  
  // Contar cuántas veces aparece cada aspecto en las evaluaciones de preguntas (dinámico)
  interviewSimulationData.forEach(simulation => {
    if (simulation.status === 'completed' && simulation.questions) {
      simulation.questions.forEach(question => {
        if (question.evaluation?.aspects_to_improve) {
          totalQuestions++;
          question.evaluation.aspects_to_improve.forEach(aspect => {
            aspectCounts[aspect] = (aspectCounts[aspect] || 0) + 1;
          });
        }
      });
    }
  });
  
  // Convertir a porcentajes y crear array ordenado (solo aspectos que aparecen)
  return Object.entries(aspectCounts)
    .map(([aspect, count]) => ({
      name: aspect,
      value: totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Obtiene estadísticas generales de aspectos a mejorar
 * @returns {Object} Estadísticas generales
 */
export const getAspectsStats = async () => {
  try {
    const [cvAnalysisData, interviewSimulationData] = await Promise.all([
      getCvAnalysisData(),
      getInterviewSimulationData()
    ]);
    
    const cvAspects = getCvAspectsToImproveFromData(cvAnalysisData);
    const interviewAspects = getInterviewAspectsToImproveFromData(interviewSimulationData);
    
    return getAspectsStatsFromData(cvAnalysisData, interviewSimulationData, cvAspects, interviewAspects);
  } catch (error) {
    console.error('Error obteniendo estadísticas de aspectos:', error);
    return {
      cv: {
        totalAnalyses: 0,
        totalAspects: 0,
        mostCommonAspect: 'N/A',
        mostCommonPercentage: 0
      },
      interview: {
        totalQuestions: 0,
        totalAspects: 0,
        mostCommonAspect: 'N/A',
        mostCommonPercentage: 0
      }
    };
  }
};

/**
 * Lógica original para calcular estadísticas usando datos
 */
export const getAspectsStatsFromData = (cvAnalysisData, interviewSimulationData, cvAspects, interviewAspects) => {
  const totalCvAnalyses = cvAnalysisData.filter(analysis => analysis.status === 'completed').length;
  const totalInterviewQuestions = interviewSimulationData.reduce((total, sim) => {
    if (sim.status === 'completed' && sim.questions) {
      return total + sim.questions.filter(q => q.evaluation?.aspects_to_improve).length;
    }
    return total;
  }, 0);
  
  return {
    cv: {
      totalAnalyses: totalCvAnalyses,
      totalAspects: cvAspects.length,
      mostCommonAspect: cvAspects[0]?.name || 'N/A',
      mostCommonPercentage: cvAspects[0]?.value || 0
    },
    interview: {
      totalQuestions: totalInterviewQuestions,
      totalAspects: interviewAspects.length,
      mostCommonAspect: interviewAspects[0]?.name || 'N/A',
      mostCommonPercentage: interviewAspects[0]?.value || 0
    }
  };
};

/**
 * Obtiene aspectos a mejorar por carrera para CVs
 * @returns {Object} Aspectos agrupados por carrera
 */
export const getCvAspectsByCareer = async () => {
  try {
    const cvAnalysisData = await getCvAnalysisData();
    return getCvAspectsByCareerFromData(cvAnalysisData);
  } catch (error) {
    console.error('Error obteniendo aspectos de CV por carrera:', error);
    return {};
  }
};

/**
 * Lógica original para calcular aspectos de CV por carrera usando datos
 */
export const getCvAspectsByCareerFromData = (cvAnalysisData) => {
  const careerAspects = {};
  
  cvAnalysisData.forEach(analysis => {
    if (analysis.status === 'completed' && analysis.user?.career && analysis.result?.aspects_to_improve) {
      const career = analysis.user.career;
      if (!careerAspects[career]) {
        careerAspects[career] = {};
      }
      
      analysis.result.aspects_to_improve.forEach(aspect => {
        careerAspects[career][aspect] = (careerAspects[career][aspect] || 0) + 1;
      });
    }
  });
  
  return careerAspects;
};

/**
 * Obtiene aspectos a mejorar por carrera para entrevistas
 * @returns {Object} Aspectos agrupados por carrera
 */
export const getInterviewAspectsByCareer = async () => {
  try {
    const interviewSimulationData = await getInterviewSimulationData();
    return getInterviewAspectsByCareerFromData(interviewSimulationData);
  } catch (error) {
    console.error('Error obteniendo aspectos de entrevistas por carrera:', error);
    return {};
  }
};

/**
 * Lógica original para calcular aspectos de entrevistas por carrera usando datos
 */
export const getInterviewAspectsByCareerFromData = (interviewSimulationData) => {
  const careerAspects = {};
  
  interviewSimulationData.forEach(simulation => {
    if (simulation.status === 'completed' && simulation.user?.career && simulation.questions) {
      const career = simulation.user.career;
      if (!careerAspects[career]) {
        careerAspects[career] = {};
      }
      
      simulation.questions.forEach(question => {
        if (question.evaluation?.aspects_to_improve) {
          question.evaluation.aspects_to_improve.forEach(aspect => {
            careerAspects[career][aspect] = (careerAspects[career][aspect] || 0) + 1;
          });
        }
      });
    }
  });
  
  return careerAspects;
};
