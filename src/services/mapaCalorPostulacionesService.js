// Servicio para calcular el mapa de calor de postulaciones por carrera
import { getApplicationTrackingData, getUsersData } from './firebaseService';
import { cacheService } from './cacheService';

/**
 * Calcula el mapa de calor de postulaciones por carrera
 * Cruza carreras (filas) con rangos de postulaciones (columnas)
 */
export const getMapaCalorPostulacionesData = async () => {
  const cacheKey = 'mapa_calor_postulaciones';
  
  // 1. Verificar caché primero
  const cached = cacheService.getMetrics(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const [applicationTrackingData, usersData] = await Promise.all([
      getApplicationTrackingData(),
      getUsersData()
    ]);
    const data = getMapaCalorPostulacionesDataFromData(applicationTrackingData, usersData);
    
    // Guardar en caché solo los datos procesados del mapa de calor
    cacheService.setMetrics(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Error obteniendo datos del mapa de calor:', error);
    return [];
  }
};

/**
 * Lógica original para calcular mapa de calor usando datos
 */
export const getMapaCalorPostulacionesDataFromData = (applicationTrackingData, usersData) => {
  // Crear mapa de usuarios por ID para obtener carreras
  const userMap = {};
  usersData.forEach(user => {
    userMap[user.id] = {
      career: user.career || 'No especificado',
      displayName: user.displayName,
      email: user.email
    };
  });

  // Agrupar aplicaciones por usuario usando ID
  const userApplications = {};
  applicationTrackingData.forEach(app => {
    // Buscar el usuario por email para obtener su ID
    const user = usersData.find(u => u.email === app.email);
    if (!user) return; // Saltar si no se encuentra el usuario
    
    const userId = user.id;
    if (!userApplications[userId]) {
      userApplications[userId] = [];
    }
    userApplications[userId].push({
      ...app,
      userId: userId,
      career: userMap[userId]?.career || 'No especificado',
      displayName: userMap[userId]?.displayName || app.email
    });
  });

  // Calcular postulaciones hasta el primer éxito por usuario
  const userPostulaciones = {};
  const allPostulaciones = []; // Para calcular rangos dinámicos
  
  Object.keys(userApplications).forEach(userId => {
    const apps = userApplications[userId];
    const career = apps[0].career;
    
    // Filtrar carreras válidas (no "No especificado")
    if (career === 'No especificado') return;
    
    // Ordenar aplicaciones por fecha de creación
    const sortedApps = apps.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    // Contar postulaciones hasta el primer éxito (aceptados)
    let postulacionesHastaExito = 0;
    let encontroExito = false;
    
    for (let i = 0; i < sortedApps.length; i++) {
      postulacionesHastaExito++;
      if (sortedApps[i].status === 'aceptados') {
        encontroExito = true;
        break;
      }
    }
    
    // Solo incluir usuarios que encontraron éxito
    if (encontroExito) {
      if (!userPostulaciones[career]) {
        userPostulaciones[career] = [];
      }
      userPostulaciones[career].push(postulacionesHastaExito);
      allPostulaciones.push(postulacionesHastaExito);
    }
  });

  // Calcular rangos dinámicamente basado en los datos reales
  const calcularRangosDinamicos = (postulaciones) => {
    if (postulaciones.length === 0) {
      return [
        { min: 1, max: 2, label: '1-2' },
        { min: 3, max: 5, label: '3-5' },
        { min: 6, max: 10, label: '6-10' },
        { min: 11, max: 20, label: '11+' }
      ];
    }
    
    const minPostulaciones = Math.min(...postulaciones);
    const maxPostulaciones = Math.max(...postulaciones);
    
    // Asegurar mínimo de 4 rangos
    const rangos = [];
    const totalRangos = 4;
    const rangoSize = Math.ceil((maxPostulaciones - minPostulaciones + 1) / totalRangos);
    
    for (let i = 0; i < totalRangos; i++) {
      const min = minPostulaciones + (i * rangoSize);
      const max = i === totalRangos - 1 ? maxPostulaciones : min + rangoSize - 1;
      
      rangos.push({
        min: min,
        max: max,
        label: max === maxPostulaciones && i === totalRangos - 1 ? `${min}+` : `${min}-${max}`
      });
    }
    
    return rangos;
  };
  
  const rangos = calcularRangosDinamicos(allPostulaciones);

  // Calcular porcentajes por carrera y rango
  const mapaCalorData = [];
  
  Object.keys(userPostulaciones).forEach(carrera => {
    const postulaciones = userPostulaciones[carrera];
    const totalUsuarios = postulaciones.length;
    
    if (totalUsuarios === 0) return;
    
    const carreraData = {
      carrera: carrera,
      totalUsuarios: totalUsuarios,
      rangos: {}
    };
    
    rangos.forEach(rango => {
      const usuariosEnRango = postulaciones.filter(p => 
        p >= rango.min && p <= rango.max
      ).length;
      
      const porcentaje = Math.round((usuariosEnRango / totalUsuarios) * 100);
      carreraData.rangos[rango.label] = porcentaje;
    });
    
    mapaCalorData.push(carreraData);
  });

  // Ordenar por total de usuarios (carreras con más datos primero)
  return mapaCalorData.sort((a, b) => b.totalUsuarios - a.totalUsuarios);
};

/**
 * Obtiene los rangos de postulaciones para las columnas
 */
export const getRangosPostulaciones = async () => {
  try {
    const data = await getMapaCalorPostulacionesData();
    if (data.length === 0) return ['1-2', '3-5', '6-10', '11+'];
    
    // Obtener los rangos del primer elemento (todos tienen los mismos rangos)
    return Object.keys(data[0].rangos);
  } catch (error) {
    console.error('Error obteniendo rangos de postulaciones:', error);
    return ['1-2', '3-5', '6-10', '11+'];
  }
};

/**
 * Calcula estadísticas generales del mapa de calor
 */
export const getMapaCalorStats = async () => {
  try {
    const data = await getMapaCalorPostulacionesData();
    return getMapaCalorStatsFromData(data);
  } catch (error) {
    console.error('Error obteniendo estadísticas del mapa de calor:', error);
    return {
      totalCarreras: 0,
      totalUsuariosExitosos: 0,
      promedioPostulaciones: 0
    };
  }
};

/**
 * Lógica original para calcular estadísticas usando datos
 */
export const getMapaCalorStatsFromData = (data) => {
  if (data.length === 0) {
    return {
      totalCarreras: 0,
      totalUsuariosExitosos: 0,
      promedioPostulaciones: 0
    };
  }

  const totalUsuariosExitosos = data.reduce((sum, carrera) => sum + carrera.totalUsuarios, 0);
  
  // Calcular promedio de postulaciones
  const allPostulaciones = [];
  data.forEach(carrera => {
    Object.keys(carrera.rangos).forEach(rango => {
      const porcentaje = carrera.rangos[rango];
      const usuariosEnRango = Math.round((carrera.totalUsuarios * porcentaje) / 100);
      
      // Obtener valor medio del rango
      let valorMedio = 0;
      switch(rango) {
        case '1-2': valorMedio = 1.5; break;
        case '3-5': valorMedio = 4; break;
        case '6-10': valorMedio = 8; break;
        case '11+': valorMedio = 15; break;
        default: valorMedio = 0; break;
      }
      
      for (let i = 0; i < usuariosEnRango; i++) {
        allPostulaciones.push(valorMedio);
      }
    });
  });
  
  const promedioPostulaciones = allPostulaciones.length > 0 
    ? Math.round((allPostulaciones.reduce((sum, val) => sum + val, 0) / allPostulaciones.length) * 10) / 10
    : 0;

  return {
    totalCarreras: data.length,
    totalUsuariosExitosos,
    promedioPostulaciones
  };
};
