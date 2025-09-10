const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas por defecto
const MAX_CACHE_SIZE = 4 * 1024 * 1024; // 4MB (dejamos margen)

// Claves para organizar localStorage
const METRICS_CACHE_KEY = 'metrics_cache';
const USER_SETTINGS_KEY = 'user_settings';

// Configuración por defecto
const DEFAULT_CACHE_CONFIG = {
  enabled: true,
  duration: CACHE_DURATION,
  maxSize: MAX_CACHE_SIZE
};

const DEFAULT_USER_SETTINGS = {
  cache: DEFAULT_CACHE_CONFIG,
  theme: 'light',
  language: 'es',
  notifications: true
};

// Función para obtener objeto del localStorage con fallback
const getStorageObject = (key, defaultValue = {}) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? { ...defaultValue, ...JSON.parse(stored) } : defaultValue;
  } catch (error) {
    console.warn(`Error leyendo ${key} del localStorage:`, error);
    return defaultValue;
  }
};

// Función para guardar objeto en localStorage
const setStorageObject = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn(`Error guardando ${key} en localStorage:`, error);
    return false;
  }
};

export const cacheService = {
  // === CONFIGURACIÓN DE CACHÉ ===
  
  // Obtener configuración de caché
  getConfig: () => {
    const userSettings = getStorageObject(USER_SETTINGS_KEY, DEFAULT_USER_SETTINGS);
    return userSettings.cache || DEFAULT_CACHE_CONFIG;
  },

  // Establecer configuración de caché
  setConfig: (newConfig) => {
    const userSettings = getStorageObject(USER_SETTINGS_KEY, DEFAULT_USER_SETTINGS);
    userSettings.cache = { ...userSettings.cache, ...newConfig };
    setStorageObject(USER_SETTINGS_KEY, userSettings);
    return true;
  },

  // === MÉTRICAS DE CACHÉ ===
  
  // Guardar métricas en caché
  setMetrics: (key, metrics) => {
    const config = cacheService.getConfig();
    if (!config.enabled) {
      return false;
    }

    try {
      const cacheData = {
        data: metrics,
        timestamp: Date.now(),
        size: JSON.stringify(metrics).length
      };
      
      const cacheString = JSON.stringify(cacheData);
      
      // Verificar tamaño
      if (cacheString.length > config.maxSize) {
        console.warn(`⚠️ Caché para ${key} es muy grande (${(cacheString.length / (1024 * 1024)).toFixed(2)}MB), no se guarda.`);
        return false;
      }
      
      // Obtener objeto de métricas existente
      const metricsCache = getStorageObject(METRICS_CACHE_KEY, {});
      metricsCache[key] = cacheData;
      
      // Guardar en localStorage
      if (setStorageObject(METRICS_CACHE_KEY, metricsCache)) {
        console.log(`✅ Métricas guardadas en caché: ${key} (${(cacheString.length / 1024).toFixed(2)}KB)`);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('❌ Error guardando caché:', error);
      return false;
    }
  },

  // Obtener métricas del caché
  getMetrics: (key) => {
    const config = cacheService.getConfig();
    if (!config.enabled) {
      return null;
    }

    try {
      const metricsCache = getStorageObject(METRICS_CACHE_KEY, {});
      const cached = metricsCache[key];
      
      if (!cached) return null;
      
      // Verificar si el caché no ha expirado
      if (Date.now() - cached.timestamp < config.duration) {
        console.log(`📦 Usando caché: ${key}`);
        return cached.data;
      }
      
      // Caché expirado, eliminar
      delete metricsCache[key];
      setStorageObject(METRICS_CACHE_KEY, metricsCache);
      console.log(`🧹 Caché expirado eliminado: ${key}`);
      return null;
    } catch (error) {
      console.warn('❌ Error leyendo caché:', error);
      return null;
    }
  },

  // === GESTIÓN DE CACHÉ ===
  
  // Limpiar caché expirado
  cleanExpiredCache: () => {
    const config = cacheService.getConfig();
    const metricsCache = getStorageObject(METRICS_CACHE_KEY, {});
    let cleanedCount = 0;
    
    Object.keys(metricsCache).forEach(key => {
      try {
        const cached = metricsCache[key];
        if (Date.now() - cached.timestamp >= config.duration) {
          delete metricsCache[key];
          cleanedCount++;
        }
      } catch (error) {
        // Si hay error al parsear, eliminar
        delete metricsCache[key];
        cleanedCount++;
      }
    });
    
    if (cleanedCount > 0) {
      setStorageObject(METRICS_CACHE_KEY, metricsCache);
      console.log(`🧹 ${cleanedCount} entradas de caché expiradas eliminadas`);
    }
  },

  // Limpiar todo el caché de métricas
  clearAllCache: () => {
    setStorageObject(METRICS_CACHE_KEY, {});
    console.log('🗑️ Todo el caché de métricas ha sido limpiado.');
  },

  // Obtener estadísticas del caché
  getCacheStats: () => {
    const config = cacheService.getConfig();
    const metricsCache = getStorageObject(METRICS_CACHE_KEY, {});
    
    let validEntries = 0;
    let expiredEntries = 0;
    let totalSize = 0;

    Object.entries(metricsCache).forEach(([key, cached]) => {
      try {
        totalSize += cached.size || 0;
        
        if (Date.now() - cached.timestamp < config.duration) {
          validEntries++;
        } else {
          expiredEntries++;
        }
      } catch (error) {
        // Ignorar entradas corruptas
        expiredEntries++;
      }
    });

    return {
      validEntries,
      expiredEntries,
      totalSize: `${(totalSize / (1024 * 1024)).toFixed(2)}MB`,
      maxSize: `${(config.maxSize / (1024 * 1024)).toFixed(2)}MB`,
      keys: Object.keys(metricsCache)
    };
  },

  // === CONFIGURACIÓN DE USUARIO ===
  
  // Obtener configuración de usuario
  getUserSettings: () => {
    return getStorageObject(USER_SETTINGS_KEY, DEFAULT_USER_SETTINGS);
  },

  // Establecer configuración de usuario
  setUserSettings: (newSettings) => {
    const currentSettings = getStorageObject(USER_SETTINGS_KEY, DEFAULT_USER_SETTINGS);
    const updatedSettings = { ...currentSettings, ...newSettings };
    setStorageObject(USER_SETTINGS_KEY, updatedSettings);
    return true;
  },

  // === UTILIDADES ===
  
  // Obtener todas las claves del localStorage organizadas
  getAllStorageKeys: () => {
    const allKeys = Object.keys(localStorage);
    return {
      metrics: Object.keys(getStorageObject(METRICS_CACHE_KEY, {})),
      userSettings: Object.keys(getStorageObject(USER_SETTINGS_KEY, {})),
      other: allKeys.filter(key => 
        key !== METRICS_CACHE_KEY && 
        key !== USER_SETTINGS_KEY &&
        !key.startsWith('dashboard_') // Mantener compatibilidad con claves antiguas
      )
    };
  },

  // Migrar claves antiguas al nuevo formato
  migrateOldKeys: () => {
    const allKeys = Object.keys(localStorage);
    const oldKeys = allKeys.filter(key => key.startsWith('dashboard_'));
    
    if (oldKeys.length > 0) {
      console.log(`🔄 Migrando ${oldKeys.length} claves antiguas al nuevo formato...`);
      
      const metricsCache = getStorageObject(METRICS_CACHE_KEY, {});
      
      oldKeys.forEach(oldKey => {
        try {
          const oldData = localStorage.getItem(oldKey);
          const parsed = JSON.parse(oldData);
          
          // Extraer la clave sin el prefijo 'dashboard_'
          const newKey = oldKey.replace('dashboard_', '');
          metricsCache[newKey] = parsed;
          
          // Eliminar clave antigua
          localStorage.removeItem(oldKey);
        } catch (error) {
          console.warn(`Error migrando clave ${oldKey}:`, error);
          localStorage.removeItem(oldKey);
        }
      });
      
      setStorageObject(METRICS_CACHE_KEY, metricsCache);
      console.log('✅ Migración completada');
    }
  }
};

// Inicializar configuración y migrar claves antiguas al cargar
cacheService.getConfig();
cacheService.migrateOldKeys();