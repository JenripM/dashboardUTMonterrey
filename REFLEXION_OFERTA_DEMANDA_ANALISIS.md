# Reflexión: Análisis de Oferta vs Demanda de Hard Skills

## 🚨 Problemas Identificados

### 1. **Sesgo de Autoselección**
- **Problema**: Los usuarios solo analizan CVs con ofertas que sienten tener oportunidad
- **Ejemplo**: Un programador C++ difícilmente analizaría su CV para una oferta JavaScript
- **Resultado**: El gráfico mostraría que muchas ofertas piden C++ (sesgo de autoselección)

### 2. **Confusión Conceptual: Usuario vs CV**
- **Problema**: Un usuario puede tener múltiples CVs
- **Ejemplo**: Usuario A tiene 30 CVs, Usuario B tiene 1 CV
- **Error**: Tratar como 31 usuarios distintos al comparar oferta vs demanda
- **Realidad**: Las keywords se extraen del CV, no del usuario

### 3. **Desbalance de Conteo**
- **Problema**: Múltiples análisis del mismo CV generan duplicados
- **Resultado**: Desbalance en conteo de keywords y uso de herramientas

## 🔍 Contexto Importante

- **CV Principal**: Los usuarios tienen un CV marcado como "por defecto"
- **Metadata Existente**: Ya existe IA que genera metadata para ofertas laborales
- **Filtrado**: Necesitamos poder filtrar por `related_degree`

## 💡 Opciones de Resolución

### **Opción 1: Análisis Automático en Segundo Plano**

**Implementación:**
- Forzar análisis de CV cada vez que se sube una oferta laboral
- Comparar con todos los CVs (o solo CVs principales)
- Guardar en colección separada para no mezclar uso automático vs manual

**Ventajas:**
- Datos completos de todas las ofertas
- No depende de autoselección del usuario

**Desventajas:**
- **Costos altos**: CVAnalysis consume tokens LLM + genera PDFs
- **Sesgo de cuantificación**: Múltiples CVs del mismo usuario
- **Complejidad**: Colección separada, difícil de mantener
- **Filtrado complejo**: Difícil filtrar por `related_degree`

**Costo estimado:** Alto (tokens LLM + almacenamiento + complejidad)

---

### **Opción 2: Desvincular de Herramienta de Análisis (PREFERIDA)**

**Implementación:**
- Agregar `keywords_job_competencies` al metadata de ofertas laborales
- Guardar `competencies` directamente en el usuario (collection `users`)
- Actualizar competencias cuando se cambia el CV principal

**Ventajas:**
- **Costo 0**: No necesita LLM adicional (metadata ya existe)
- **Sin colecciones nuevas**: Usa estructuras existentes
- **Filtrado fácil**: Tanto `users` como `practicas` tienen `related_degree`
- **Sin sesgo**: Datos reales de ofertas vs competencias reales de usuarios
- **Escalable**: Fácil de mantener y analizar

**Desventajas:**
- Requiere modificar metadata existente
- Necesita sincronización con cambios de CV principal

**Costo estimado:** Mínimo (solo modificaciones de estructura)

## 🎯 Recomendación Final

**Opción 2 es claramente superior** porque:

1. **Elimina sesgos** de autoselección y cuantificación
2. **Costo mínimo** comparado con análisis automático
3. **Datos reales** de ofertas laborales vs competencias de usuarios
4. **Fácil filtrado** por carrera/sector
5. **Escalable** y mantenible

## 🔄 Implementación Propuesta

### **1. Modificar Collection `practicas` (ofertas laborales)**
```javascript
// Formato actual de practicas
{
  company: str,
  description: str,
  embedding: vector<2048>,
  fecha_Agregado: timestamp,
  location: "string",  // Campo abierto, cambiable por usuario
  logo: str,           // URL de Supabase
  salary: string,
  sitio_web: string,
  title: string,
  titulo_contactos: string,
  url: string,
  metadata: {
    category: list,
    hard_skills: list,
    language_requirements: list | null,
    related_degrees: str list,        // ← Campo existente
    soft_skills: str list
  }
}

// Modificaciones propuestas
{
  // ... campos existentes ...
  metadata: {
    // ... campos existentes ...
    target_field: "Programming",  // NUEVO - Campo único normalizado
    required_competencies: [  // NUEVO
      "Python",
      "AWS",
      "Docker",
      "SQL",
      "React.js"
    ]
  }
}
```

### **2. Modificar Collection `users`**
```javascript
// Agregar competencias del CV principal
{
  // ... campos existentes ...
  position: "string",  // Campo existente (abierto, cambiable)
  career_normalized: "Programming",           // NUEVO - Para matching
  career_detailed: "Ingeniería de Sistemas", // NUEVO - Para display
  career_country: "México",                  // NUEVO - Contexto adicional
  competencies: [                            // NUEVO
    "Python",
    "SQL",
    "React.js"
  ],
  cv_principal_id: "cv_id_123"  // NUEVO - Referencia al CV principal
}
```

### **3. Actualizar Competencias**
- Cuando usuario cambia CV principal → actualizar `user.competencies`
- Sincronización automática con `userCVs` collection

## 🎯 Estandarización de Carreras

### **Problema Identificado**
- **Users**: Campo `position` (abierto, cambiable por usuario)
- **Ofertas**: Campo `metadata.related_degrees` (lista generada por IA)
- **Problema**: Sin estandarización = sin matching efectivo
- **Desafío**: Flexibilidad vs Consistencia (diferentes países/universidades)

### **Solución: Campo Normalizado + Campo Libre**

**Estructura propuesta:**
```javascript
// Collection users
user: {
  position: "string",                    // Campo existente (libre)
  metadata: {
    field_of_study: "Programming",       // NUEVO - Normalizado por defecto
    competencies: [                      // NUEVO
      "Python",
      "SQL",
      "React.js"
    ]
  }
}

// Collection practicas
practica: {
  metadata: {
    related_degrees: ["Ingeniería de Sistemas", "Administración"], // Campo existente
    target_field: "Programming",  // NUEVO - Campo único normalizado
    required_competencies: [  // NUEVO
      "Python",
      "AWS",
      "Docker",
      "SQL",
      "React.js"
    ]
  }
}
```

### **Lista Predefinida de Campos Normalizados**

```javascript
const NORMALIZED_FIELDS = [
  "Programming",              // Programación/Desarrollo de Software
  "Networks_Telecommunications", // Redes y Telecomunicaciones
  "Civil_Engineering",        // Ingeniería Civil
  "Mechanical_Engineering",   // Ingeniería Mecánica
  "Electrical_Engineering",   // Ingeniería Eléctrica
  "Chemical_Engineering",     // Ingeniería Química
  "Industrial_Engineering",   // Ingeniería Industrial
  "Textile_Engineering",      // Ingeniería Textil
  "Medicine",                 // Medicina
  "Dentistry",               // Odontología
  "Psychology",              // Psicología
  "Nursing",                 // Enfermería
  "Veterinary",              // Veterinaria
  "Business_Administration", // Administración de Empresas
  "Economics",               // Economía
  "Accounting",              // Contabilidad
  "Marketing",               // Marketing
  "Finance",                 // Finanzas
  "Human_Resources",         // Recursos Humanos
  "Law",                     // Derecho
  "Education",               // Educación
  "Social_Work",             // Trabajo Social
  "Mathematics",             // Matemáticas
  "Physics",                 // Física
  "Chemistry",               // Química
  "Biology",                 // Biología
  "Architecture",            // Arquitectura
  "Design",                  // Diseño (gráfico, industrial, etc.)
  "Communications",          // Comunicaciones/Periodismo
  "International_Relations", // Relaciones Internacionales
  "Tourism",                 // Turismo
  "Other"                    // Otros. La opción mas peligrosa de todas porque imposibilita el filtro
]
```

### **Ventajas de esta Estandarización**
1. **Matching perfecto** entre ofertas y usuarios por campo
2. **Flexibilidad** para diferentes países/universidades
3. **Escalable** - fácil agregar nuevas categorías
4. **IA controlada** - limitamos las opciones de la IA
5. **Filtrado efectivo** por campo/sector
6. **Precisión conceptual** - field_of_study (usuarios) vs target_field (ofertas)
7. **Simplicidad** - un solo campo normalizado en users, ambos en practicas

## 📊 Análisis de Oferta vs Demanda

**Datos disponibles:**
- `practicas[].metadata.required_competencies` → Oferta (competencias)
- `users[].metadata.competencies` → Demanda (competencias)
- `practicas[].metadata.target_field` → Oferta (campo objetivo)
- `users[].metadata.field_of_study` → Demanda (campo de estudio)
- Filtrado perfecto por `metadata.field_of_study` vs `metadata.target_field`

**Métricas calculables:**
- Competencias más demandadas por campo de estudio normalizado
- Competencias más comunes en usuarios por campo de estudio normalizado
- Brecha de competencias por sector normalizado
- Tasa de match real oferta vs demanda por campo de estudio
- Análisis de competencias faltantes por sector
- Distribución de campos de estudio en ofertas vs usuarios
