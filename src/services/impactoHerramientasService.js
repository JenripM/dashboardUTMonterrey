// Servicio para calcular el impacto de las herramientas AI en el éxito laboral
import { getApplicationTrackingData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Calcula el impacto de las herramientas AI en el éxito laboral
 * Compara estudiantes que consiguieron trabajo con/sin herramientas
 */
export const getImpactoHerramientasData = async () => {
  try {
    const applicationTrackingData = await getApplicationTrackingData();
    return getImpactoHerramientasDataFromData(applicationTrackingData);
  } catch (error) {
    console.error('Error obteniendo datos de impacto de herramientas:', error);
    return {
      conHerramientas: 0,
      sinHerramientas: 0,
      totalExitosos: 0,
      porcentajeConHerramientas: 0,
      porcentajeSinHerramientas: 0
    };
  }
};

/**
 * Lógica original para calcular impacto usando datos
 */
export const getImpactoHerramientasDataFromData = (applicationTrackingData) => {
  // Filtrar solo aplicaciones exitosas (entrevistas + aceptados)
  const aplicacionesExitosas = applicationTrackingData.filter(app => 
    app.status === "entrevistas" || app.status === "aceptados"
  );

  if (aplicacionesExitosas.length === 0) {
    return {
      conHerramientas: 0,
      sinHerramientas: 0,
      totalExitosos: 0,
      porcentajeConHerramientas: 0,
      porcentajeSinHerramientas: 0
    };
  }

  // Contar aplicaciones exitosas con y sin herramientas
  let conHerramientas = 0;
  let sinHerramientas = 0;

  aplicacionesExitosas.forEach(app => {
    const toolsUsed = app.toolsUsed || {};
    
    // Verificar si hay herramientas usadas (objeto no vacío y con valores > 0)
    const hasTools = Object.keys(toolsUsed).length > 0 && 
                     Object.values(toolsUsed).some(count => count > 0);
    
    if (hasTools) {
      conHerramientas++;
    } else {
      sinHerramientas++;
    }
  });

  const totalExitosos = conHerramientas + sinHerramientas;
  const porcentajeConHerramientas = Math.round((conHerramientas / totalExitosos) * 100);
  const porcentajeSinHerramientas = Math.round((sinHerramientas / totalExitosos) * 100);

  return {
    conHerramientas,
    sinHerramientas,
    totalExitosos,
    porcentajeConHerramientas,
    porcentajeSinHerramientas
  };
};

/**
 * Obtiene los datos formateados para el gráfico
 */
export const getImpactoHerramientasChartData = async () => {
  const cacheKey = 'impacto_herramientas_chart';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await getImpactoHerramientasData();
    const chartData = getImpactoHerramientasChartDataFromData(data);
    
    // Guardar en caché solo los datos del gráfico (2 barras)
    cacheService.setMetrics(cacheKey, chartData);
    
    return chartData;
  } catch (error) {
    console.error('Error obteniendo datos del gráfico de impacto:', error);
    return [
      {
        categoria: "Usó al menos una herramienta",
        cantidad: 0,
        porcentaje: 0,
        color: "#10b981"
      },
      {
        categoria: "No usó ninguna herramienta", 
        cantidad: 0,
        porcentaje: 0,
        color: "#ef4444"
      }
    ];
  }
};

/**
 * Lógica original para formatear datos del gráfico
 */
export const getImpactoHerramientasChartDataFromData = (data) => {
  return [
    {
      categoria: "Usó al menos una herramienta",
      cantidad: data.conHerramientas,
      porcentaje: data.porcentajeConHerramientas,
      color: "#10b981" // Verde
    },
    {
      categoria: "No usó ninguna herramienta", 
      cantidad: data.sinHerramientas,
      porcentaje: data.porcentajeSinHerramientas,
      color: "#ef4444" // Rojo
    }
  ];
};

/**
 * Calcula estadísticas adicionales
 */
export const getImpactoHerramientasStats = async () => {
  const cacheKey = 'impacto_herramientas_stats';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await getImpactoHerramientasData();
    const stats = getImpactoHerramientasStatsFromData(data);
    
    // Guardar en caché solo las estadísticas procesadas
    cacheService.setMetrics(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas de impacto:', error);
    return {
      totalExitosos: 0,
      mensajePrincipal: 'No hay datos disponibles',
      mejoraRelativa: 0
    };
  }
};

/**
 * Lógica original para calcular estadísticas
 */
export const getImpactoHerramientasStatsFromData = (data) => {
  return {
    totalExitosos: data.totalExitosos,
    mensajePrincipal: `El ${data.porcentajeConHerramientas}% de los estudiantes exitosos usó nuestras herramientas`,
    mejoraRelativa: data.porcentajeConHerramientas > 0 ? 
      Math.round((data.porcentajeConHerramientas / data.porcentajeSinHerramientas) * 100) : 0
  };
};
