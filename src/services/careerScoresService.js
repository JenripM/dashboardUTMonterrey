// Servicio para puntajes promedio por carrera (CV y entrevistas)
import { getCvAnalysisData, getInterviewSimulationData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Obtiene puntajes promedio de CV por carrera
 */
export const getCareerAverageScores = async () => {
  const cacheKey = 'career_cv_scores';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const cvAnalysisData = await getCvAnalysisData();
    const scores = getCareerAverageScoresFromData(cvAnalysisData);
    
    // Guardar en caché solo los datos procesados
    cacheService.setMetrics(cacheKey, scores);
    
    return scores;
  } catch (error) {
    console.error('Error obteniendo puntajes de CV por carrera:', error);
    return [];
  }
};

/**
 * Lógica original para calcular puntajes de CV por carrera usando datos
 */
export const getCareerAverageScoresFromData = (cvAnalysisData) => {
  const careerScores = {};
  
  cvAnalysisData.forEach(analysis => {
    const career = analysis?.user?.career;
    const score = analysis?.result?.score;
    
    // Solo procesar si tiene career válido y score válido
    if (career && typeof career === 'string' && career.trim() !== '' && 
        score && typeof score === 'number' && !isNaN(score)) {
      if (!careerScores[career]) {
        careerScores[career] = {
          scores: [],
          count: 0
        };
      }
      careerScores[career].scores.push(score);
      careerScores[career].count++;
    }
  });

  return Object.entries(careerScores)
    .map(([career, data]) => ({
      name: career,
      value: Math.round((data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length) * 10) / 10,
      count: data.count
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Obtiene puntajes promedio de entrevistas por carrera
 */
export const getInterviewCareerAverageScores = async () => {
  const cacheKey = 'career_interview_scores';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const interviewSimulationData = await getInterviewSimulationData();
    const scores = getInterviewCareerAverageScoresFromData(interviewSimulationData);
    
    // Guardar en caché solo los datos procesados
    cacheService.setMetrics(cacheKey, scores);
    
    return scores;
  } catch (error) {
    console.error('Error obteniendo puntajes de entrevistas por carrera:', error);
    return [];
  }
};

/**
 * Lógica original para calcular puntajes de entrevistas por carrera usando datos
 */
export const getInterviewCareerAverageScoresFromData = (interviewSimulationData) => {
  const careerScores = {};
  
  interviewSimulationData.forEach(simulation => {
    const career = simulation?.user?.career;
    const score = simulation?.interviewScore;
    
    // Solo procesar si tiene career válido y score válido
    if (career && typeof career === 'string' && career.trim() !== '' && 
        score && typeof score === 'number' && !isNaN(score)) {
      if (!careerScores[career]) {
        careerScores[career] = {
          scores: [],
          count: 0
        };
      }
      careerScores[career].scores.push(score);
      careerScores[career].count++;
    }
  });

  return Object.entries(careerScores)
    .map(([career, data]) => ({
      name: career,
      value: Math.round((data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length) * 10) / 10,
      count: data.count
    }))
    .sort((a, b) => b.value - a.value);
};
