# Migración de Servicios a Firestore

## Resumen
Este documento describe la migración gradual de los servicios de datos mock a Firestore real, comenzando con `toolUsageService.js`.

## Archivos Modificados

### 1. `firebaseService.js` (NUEVO)
Servicio reutilizable para la conexión a Firebase que incluye:
- Inicialización de Firebase Admin SDK
- Manejo de credenciales de `firebase_jobs_credentials.json` y `firebase_users_credentials.json`
- Funciones para obtener datos de colecciones específicas
- Funciones para filtrado y ordenamiento de datos
- Manejo de errores y logging

### 2. `toolUsageService.js` (MODIFICADO)
Servicio actualizado que ahora:
- Conecta directamente con Firestore en lugar de usar datos mock
- Mantiene compatibilidad con funciones que aceptan datos como parámetro
- Incluye nuevas funciones para análisis más detallados
- Maneja errores de conexión a Firebase

## Nuevas Funciones Disponibles

### Funciones Principales (ahora async)
- `analyzeToolUsage()` - Análisis general de uso de herramientas
- `getToolUsageByUser()` - Uso de herramientas por usuario
- `getToolUsageTrends(timeRange)` - Tendencias de uso por período

### Funciones de Análisis Avanzado
- `getToolUsageByPeriod(startDate, endDate)` - Uso por período específico
- `getToolUsageByApplicationStatus()` - Uso por estado de aplicación
- `getToolUsageByCompany(limit)` - Uso por empresa (top N)

### Funciones de Compatibilidad
- `analyzeToolUsageFromData(applicationData)` - Versión que acepta datos como parámetro
- `getToolUsageByUserFromData(applicationData)` - Versión que acepta datos como parámetro
- `getToolUsageTrendsFromData(applicationData, timeRange)` - Versión que acepta datos como parámetro

## Dependencias Instaladas
```bash
npm install firebase-admin google-auth-library
```

## Uso Básico

```javascript
import { analyzeToolUsage, getToolUsageByUser } from './services/toolUsageService';

// Uso básico
const usage = await analyzeToolUsage();
console.log('Herramienta más usada:', usage.mostUsedTool);

// Uso por usuario
const userUsage = await getToolUsageByUser();
console.log('Usuarios activos:', Object.keys(userUsage).length);
```

## Migración Gradual

### Paso 1: Actualizar Componentes
Los componentes que usan `toolUsageService` necesitan ser actualizados para manejar las funciones async:

```javascript
// ANTES (síncrono)
const usage = analyzeToolUsage(applicationData);

// DESPUÉS (asíncrono)
const usage = await analyzeToolUsage();
```

### Paso 2: Mantener Compatibilidad
Las funciones que aceptan datos como parámetro siguen funcionando para facilitar la transición:

```javascript
// Para casos especiales donde ya tienes los datos
const usage = analyzeToolUsageFromData(applicationData);
```

## Próximos Pasos

1. **Actualizar componentes** que usan `toolUsageService`
2. **Migrar otros servicios** siguiendo el mismo patrón:
   - `performanceMetricsService.js`
   - `mejoraEntrevistasService.js`
   - `desempenoAlumnosService.js`
   - etc.

3. **Crear tests** para verificar la funcionalidad
4. **Documentar** cada servicio migrado

## Estructura de Datos Esperada

El servicio espera que la colección `applicationTracking` en Firestore tenga documentos con la siguiente estructura:

```javascript
{
  id: "document_id",
  company: "Nombre de la empresa",
  createdAt: "2025-08-09T19:32:01-05:00", // Timestamp
  description: "Descripción del trabajo",
  email: "usuario@ejemplo.com",
  status: "postulados|entrevistas|rechazados|aceptados",
  title: "Título del trabajo",
  toolsUsed: {
    "aiTool_cvAnalysis": 1,
    "aiTool_interviewSimulation": 2,
    "aiTool_cvAdaptation": 1
  },
  // ... otros campos
}
```

## Manejo de Errores

Todas las funciones incluyen manejo de errores que:
- Logean errores en la consola
- Re-lanzan errores para que los componentes puedan manejarlos
- Incluyen mensajes descriptivos para debugging

## Testing

Usa `toolUsageService.example.js` para probar la funcionalidad:

```javascript
import { exampleUsage, testFirebaseConnection } from './services/toolUsageService.example';

// Probar conexión
await testFirebaseConnection();

// Probar funcionalidad
await exampleUsage();
```
