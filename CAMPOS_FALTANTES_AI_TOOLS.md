# Campos Faltantes para Herramientas de IA

Este documento especifica los campos adicionales necesarios para las colecciones de herramientas de IA que permitirán generar métricas reales en los dashboards.

## 🎯 Objetivo

Agregar campos específicos que permitan calcular métricas de "aspectos a mejorar", "soft skills" y otras visualizaciones del dashboard sin usar datos hardcodeados.

## 📋 Campos a Agregar

### 1. aiTool_interviewSimulation

**Campos a modificar/agregar:**
```javascript
evaluation: {
  // ... campos existentes ...
  improvements: string[] → aspects_to_improve: string[]  // RENOMBRAR
}
```

**Estructura:**
```javascript
{
  // ... estructura existente ...
  questions: [
    {
      text: "Pregunta de la entrevista",
      evaluation: {
        score: 8.5,
        summary: "Resumen de la evaluación",
        strengths: ["Fortaleza 1", "Fortaleza 2"],
        aspects_to_improve: [  // ← RENOMBRAR de "improvements"
          "Comunicación verbal clara",
          "Ejemplos STAR concretos",
          "Control de nervios/ansiedad",
          "Lenguaje corporal profesional"
        ],
        recommendations: ["Recomendación 1"]
      }
    }
  ]
}
```

### 2. aiTool_cvAnalysis

**Campos a agregar:**
```javascript
result: {
  // ... campos existentes ...
  aspects_to_improve: string[]  // NUEVO CAMPO
}
```

**Estructura:**
```javascript
{
  // ... estructura existente ...
  result: {
    // ... campos existentes ...
    pdf_url: "https://...",
    score: 87,
    aspects_to_improve: [  // ← NUEVO CAMPO
      "Logros cuantificables",
      "Palabras clave del sector",
      "Formato profesional",
      "Experiencia relevante destacada"
    ]
  }
}
```

### 3. aiTool_cvAdaptation

**NOTA:** Esta herramienta no se modificará por ahora debido a limitaciones técnicas internas.

## 📝 Formato de aspects_to_improve

### Reglas de Escritura

**IMPORTANTE:** Los aspectos deben escribirse de manera consistente para permitir comparaciones entre herramientas. Se recomienda encarecidamente usar una de las opciones de la lista predefinida.

### Lista Predefinida de Aspectos

#### Para Entrevistas (aiTool_interviewSimulation):
```javascript
const ASPECTOS_ENTREVISTA = [
  "Tiempo de respuesta apropiado",      // Duración vs complejidad de pregunta
  "Eliminación de muletillas",          // Frecuencia de "eh", "um", "bueno"
  "Estructura de respuestas",           // Introducción, desarrollo, conclusión
  "Ejemplos STAR concretos",            // Situación, Tarea, Acción, Resultado
  "Fluidez verbal",                     // Pausas, repeticiones, continuidad
  "Especificidad de ejemplos",          // Detalles concretos vs generalidades
  "Vocabulario profesional",            // Formal vs informal, términos técnicos
  "Conocimiento de la empresa",         // Menciona datos específicos de la empresa
  "Experiencia en trabajo en equipo",   // Ejemplos de colaboración
  "Pensamiento crítico"                 // Análisis, reflexión, cuestionamiento
];
```

#### Para Análisis de CV (aiTool_cvAnalysis):
```javascript
const ASPECTOS_CV = [
  "Logros cuantificables",              // Resultados medibles en proyectos/prácticas
  "Palabras clave del sector",          // Match con competencias del puesto
  "Experiencia práctica relevante",     // Prácticas, proyectos, voluntariado
  "Objetivos profesionales claros",     // Qué quiere lograr profesionalmente
  "Ortografía y gramática",             // Corrección en el texto
  "Longitud apropiada del CV",          // Extensión adecuada para early career
  "Proyectos destacados",               // Trabajos universitarios, side projects
  "Idiomas relevantes",                 // Idioma requerido para el puesto
  "Herramientas de ofimática",          // Excel, Word, PowerPoint (nivel intermedio/avanzado)
  "Herramientas de IA"                  // ChatGPT, Midjourney, etc.
];
```

### Reglas de Implementación para aspects_to_improve

1. **Consistencia:** Usar exactamente las frases de la lista predefinida
2. **Flexibilidad:** Se pueden agregar aspectos nuevos en casos excepcionales, pero se recomienda encarecidamente usar los predefinidos
3. **Formato:** Siempre en minúsculas, sin puntuación al final
4. **Longitud:** Máximo 3-4 palabras por aspecto
5. **Especificidad:** Ser específico pero conciso

### Ejemplos Correctos:
```javascript
// ✅ CORRECTO
aspects_to_improve: [
  "Comunicación verbal clara",
  "Ejemplos STAR concretos"
]

// ❌ INCORRECTO
aspects_to_improve: [
  "Comunicación verbal clara.",  // Punto al final
  "STAR examples",                // En inglés
  "Mejorar comunicación"          // Formato incorrecto
]
```


*Documento generado para el equipo de desarrollo - Dashboard MyWorkIn*
