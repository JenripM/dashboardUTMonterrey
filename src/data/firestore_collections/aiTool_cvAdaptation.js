// Mock data para la colección aiTool_cvAdaptation
// Basado en la documentación de FIRESTORE_COLLECTIONS.md

export const cvAdaptationData = [
  {
    id: "cv_adapt_001",
    userId: "user_123",
    user: {
      id: "user_123",
      email: "juan.perez@ejemplo.com",
      displayName: "Juan Pérez",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    cv: {
      id: "cv_456",
      fileUrl: "https://r2.example.com/cvs/user123_cv456.pdf",
      displayName: "Juan_Perez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_789",
      title: "Desarrollador Frontend React",
      description: "Buscamos un desarrollador con experiencia en React..."
    },
    result: {
      success: true,
      adaptedCVId: "cv_789",
      adaptationId: "adapt_123",
      adaptationSummary: "Se adaptó el resumen ejecutivo para enfatizar experiencia en React y se reorganizaron las habilidades técnicas para destacar las más relevantes al puesto."
    },
    status: "completed",
    processingTime: 3500,
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: "cv_adapt_002",
    userId: "user_124",
    user: {
      id: "user_124",
      email: "maria.garcia@ejemplo.com",
      displayName: "María García",
      career: "Administración",
      cycle: 5
    },
    cv: {
      id: "cv_457",
      fileUrl: "https://r2.example.com/cvs/user124_cv457.pdf",
      displayName: "Maria_Garcia_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_790",
      title: "Product Manager",
      description: "Lidera el desarrollo de productos digitales..."
    },
    result: {
      success: true,
      adaptedCVId: "cv_790",
      adaptationId: "adapt_124",
      adaptationSummary: "Se reescribió la experiencia laboral para destacar logros cuantificables y se agregaron keywords específicos de product management."
    },
    status: "completed",
    processingTime: 4200,
    createdAt: new Date("2024-01-15T14:20:00Z")
  },
  {
    id: "cv_adapt_003",
    userId: "user_125",
    user: {
      id: "user_125",
      email: "carlos.mendoza@ejemplo.com",
      displayName: "Carlos Mendoza",
      career: "Diseño Gráfico",
      cycle: 2
    },
    cv: {
      id: "cv_458",
      fileUrl: "https://r2.example.com/cvs/user125_cv458.pdf",
      displayName: "Carlos_Mendoza_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_791",
      title: "Diseñador UX/UI",
      description: "Diseña experiencias digitales excepcionales..."
    },
    result: {
      success: false,
      error: "No se pudo procesar el CV debido a formato no compatible",
      adaptedCVId: null,
      adaptationId: null,
      adaptationSummary: null
    },
    status: "error",
    processingTime: 1500,
    createdAt: new Date("2024-01-16T09:15:00Z")
  },
  {
    id: "cv_adapt_004",
    userId: "user_126",
    user: {
      id: "user_126",
      email: "ana.torres@ejemplo.com",
      displayName: "Ana Torres",
      career: "Ingeniería de Sistemas",
      cycle: 4
    },
    cv: {
      id: "cv_459",
      fileUrl: "https://r2.example.com/cvs/user126_cv459.pdf",
      displayName: "Ana_Torres_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_792",
      title: "Data Analyst",
      description: "Analiza datos para insights de negocio..."
    },
    result: {
      success: true,
      adaptedCVId: "cv_792",
      adaptationId: "adapt_126",
      adaptationSummary: "Se destacaron las habilidades en Python y SQL, y se reorganizaron los proyectos para mostrar experiencia relevante en análisis de datos."
    },
    status: "completed",
    processingTime: 3800,
    createdAt: new Date("2024-01-16T11:45:00Z")
  },
  {
    id: "cv_adapt_005",
    userId: "user_127",
    user: {
      id: "user_127",
      email: "diego.rodriguez@ejemplo.com",
      displayName: "Diego Rodríguez",
      career: "Ingeniería de Sistemas",
      cycle: 1
    },
    cv: {
      id: "cv_460",
      fileUrl: "https://r2.example.com/cvs/user127_cv460.pdf",
      displayName: "Diego_Rodriguez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_793",
      title: "Backend Developer",
      description: "Desarrolla APIs robustas y escalables..."
    },
    result: {
      success: true,
      adaptedCVId: "cv_793",
      adaptationId: "adapt_127",
      adaptationSummary: "Se adaptó la sección de experiencia para enfatizar proyectos de backend y se agregaron tecnologías específicas mencionadas en la oferta."
    },
    status: "completed",
    processingTime: 3200,
    createdAt: new Date("2024-01-17T08:30:00Z")
  },
  {
    id: "cv_adapt_006",
    userId: "user_128",
    user: {
      id: "user_128",
      email: "laura.martinez@ejemplo.com",
      displayName: "Laura Martínez",
      career: "Marketing",
      cycle: 6
    },
    cv: {
      id: "cv_461",
      fileUrl: "https://r2.example.com/cvs/user128_cv461.pdf",
      displayName: "Laura_Martinez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_794",
      title: "Marketing Digital Specialist",
      description: "Desarrolla estrategias de marketing digital..."
    },
    result: {
      success: true,
      adaptedCVId: "cv_794",
      adaptationId: "adapt_128",
      adaptationSummary: "Se reescribieron las experiencias para destacar resultados de marketing digital y se agregaron métricas de rendimiento específicas."
    },
    status: "completed",
    processingTime: 4100,
    createdAt: new Date("2024-01-17T16:20:00Z")
  }
];

// Funciones de utilidad para calcular estadísticas
export const getCvAdaptationStats = () => {
  const total = cvAdaptationData.length;
  const completed = cvAdaptationData.filter(adapt => adapt.status === "completed").length;
  const errors = cvAdaptationData.filter(adapt => adapt.status === "error").length;
  const successRate = (completed / total) * 100;
  const averageProcessingTime = cvAdaptationData.reduce((sum, adapt) => sum + adapt.processingTime, 0) / total;

  return {
    total,
    completed,
    errors,
    successRate: Math.round(successRate * 10) / 10,
    averageProcessingTime: Math.round(averageProcessingTime)
  };
};
