// Mock data para la colección aiTool_interviewSimulation
// Basado en la documentación de FIRESTORE_COLLECTIONS.md

export const interviewSimulationData = [
  {
    id: "sim_001",
    userId: "user_123",
    user: {
      id: "user_123",
      email: "juan.perez@ejemplo.com",
      displayName: "Juan Pérez",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    jobTitle: "Desarrollador Frontend React",
    questions: [
      {
        text: "Cuéntame sobre tu experiencia con React",
        evaluation: {
          score: 8.5,
          summary: "Excelente respuesta técnica con ejemplos concretos",
          strengths: ["Experiencia sólida", "Conocimiento profundo de hooks"],
          aspects_to_improve: ["Eliminación de muletillas", "Tiempo de respuesta apropiado"],
          recommendations: ["Continúa practicando con React Testing Library"]
        }
      },
      {
        text: "¿Cómo manejas el estado en aplicaciones grandes?",
        evaluation: {
          score: 7.2,
          summary: "Buena comprensión de conceptos de estado",
          strengths: ["Conoce Redux y Context API"],
          aspects_to_improve: ["Estructura de respuestas", "Fluidez verbal"],
          recommendations: ["Explora librerías de estado más modernas"]
        }
      }
    ],
    interviewScore: 65,
    cvMatchScore: 87,
    creditsUsed: 5,
    status: "completed",
    jobOffer: {
      id: "job_456",
      title: "Desarrollador Frontend React",
      description: "Buscamos un desarrollador con experiencia en React..."
    },
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T11:45:00Z")
  },
  {
    id: "sim_002",
    userId: "user_124",
    user: {
      id: "user_124",
      email: "maria.garcia@ejemplo.com",
      displayName: "María García",
      career: "Administración",
      cycle: 5
    },
    jobTitle: "Product Manager",
    questions: [
      {
        text: "Describe tu proceso para priorizar features",
        evaluation: {
          score: 9.1,
          summary: "Excelente metodología de priorización",
          strengths: ["Usa frameworks como RICE", "Considera impacto del negocio"],
          aspects_to_improve: ["Tiempo de respuesta apropiado"],
          recommendations: ["Continúa desarrollando skills analíticos"]
        }
      }
    ],
    interviewScore: 72,
    cvMatchScore: 89,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_457",
      title: "Product Manager",
      description: "Lidera el desarrollo de productos digitales..."
    },
    createdAt: new Date("2024-01-15T14:20:00Z"),
    updatedAt: new Date("2024-01-15T15:30:00Z")
  },
  {
    id: "sim_003",
    userId: "user_125",
    user: {
      id: "user_125",
      email: "carlos.mendoza@ejemplo.com",
      displayName: "Carlos Mendoza",
      career: "Diseño Gráfico",
      cycle: 2
    },
    jobTitle: "Diseñador UX/UI",
    questions: [
      {
        text: "Explica tu proceso de diseño centrado en el usuario",
        evaluation: {
          score: 8.8,
          summary: "Muy buen proceso de UX",
          strengths: ["Conoce metodologías de investigación", "Usa herramientas modernas"],
          aspects_to_improve: ["Ejemplos STAR concretos", "Especificidad de ejemplos"],
          recommendations: ["Aprende más sobre optimización de conversión"]
        }
      }
    ],
    interviewScore: 68,
    cvMatchScore: 85,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_458",
      title: "Diseñador UX/UI",
      description: "Diseña experiencias digitales excepcionales..."
    },
    createdAt: new Date("2024-01-16T09:15:00Z"),
    updatedAt: new Date("2024-01-16T10:20:00Z")
  },
  {
    id: "sim_004",
    userId: "user_126",
    user: {
      id: "user_126",
      email: "ana.torres@ejemplo.com",
      displayName: "Ana Torres",
      career: "Ingeniería de Sistemas",
      cycle: 4
    },
    jobTitle: "Data Analyst",
    questions: [
      {
        text: "¿Cómo analizas grandes volúmenes de datos?",
        evaluation: {
          score: 7.5,
          summary: "Conocimientos básicos de análisis de datos",
          strengths: ["Conoce SQL y Python"],
          aspects_to_improve: ["Fluidez verbal", "Estructura de respuestas", "Coherencia en respuestas"],
          recommendations: ["Aprende Power BI o Tableau"]
        }
      }
    ],
    interviewScore: 58,
    cvMatchScore: 78,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_459",
      title: "Data Analyst",
      description: "Analiza datos para insights de negocio..."
    },
    createdAt: new Date("2024-01-16T11:45:00Z"),
    updatedAt: new Date("2024-01-16T12:30:00Z")
  },
  {
    id: "sim_005",
    userId: "user_127",
    user: {
      id: "user_127",
      email: "diego.rodriguez@ejemplo.com",
      displayName: "Diego Rodríguez",
      career: "Marketing",
      cycle: 1
    },
    jobTitle: "Backend Developer",
    questions: [
      {
        text: "Explica tu experiencia con microservicios",
        evaluation: {
          score: 6.8,
          summary: "Conocimientos básicos de arquitectura",
          strengths: ["Conoce conceptos fundamentales"],
          aspects_to_improve: ["Eliminación de muletillas", "Fluidez verbal", "Estructura de respuestas", "Coherencia en respuestas", "Tiempo de respuesta apropiado"],
          recommendations: ["Practica con proyectos reales"]
        }
      }
    ],
    interviewScore: 55,
    cvMatchScore: 72,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_460",
      title: "Backend Developer",
      description: "Desarrolla APIs robustas y escalables..."
    },
    createdAt: new Date("2024-01-17T08:30:00Z"),
    updatedAt: new Date("2024-01-17T09:15:00Z")
  },
  {
    id: "sim_006",
    userId: "user_128",
    user: {
      id: "user_128",
      email: "laura.martinez@ejemplo.com",
      displayName: "Laura Martínez",
      career: "Psicología",
      cycle: 6
    },
    jobTitle: "HR Specialist",
    questions: [
      {
        text: "¿Cómo manejarías un conflicto entre empleados?",
        evaluation: {
          score: 8.2,
          summary: "Buena comprensión de resolución de conflictos",
          strengths: ["Conoce técnicas de mediación", "Enfoque empático"],
          aspects_to_improve: ["Ejemplos STAR concretos", "Especificidad de ejemplos"],
          recommendations: ["Practica con casos reales"]
        }
      }
    ],
    interviewScore: 62,
    cvMatchScore: 79,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_461",
      title: "HR Specialist",
      description: "Gestiona recursos humanos y reclutamiento..."
    },
    createdAt: new Date("2024-01-17T16:20:00Z"),
    updatedAt: new Date("2024-01-17T17:00:00Z")
  },
  {
    id: "sim_007",
    userId: "user_129",
    user: {
      id: "user_129",
      email: "pedro.silva@ejemplo.com",
      displayName: "Pedro Silva",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    jobTitle: "DevOps Engineer",
    questions: [
      {
        text: "Explica tu experiencia con CI/CD",
        evaluation: {
          score: 9.3,
          summary: "Excelente conocimiento de DevOps",
          strengths: ["Experiencia con Jenkins y GitLab", "Conoce Docker y Kubernetes"],
          aspects_to_improve: ["Tiempo de respuesta apropiado"],
          recommendations: ["Aprende más sobre observabilidad"]
        }
      }
    ],
    interviewScore: 70,
    cvMatchScore: 91,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_462",
      title: "DevOps Engineer",
      description: "Gestiona infraestructura y deployment..."
    },
    createdAt: new Date("2024-01-18T10:15:00Z"),
    updatedAt: new Date("2024-01-18T11:30:00Z")
  },
  {
    id: "sim_008",
    userId: "user_130",
    user: {
      id: "user_130",
      email: "sofia.hernandez@ejemplo.com",
      displayName: "Sofía Hernández",
      career: "Administración",
      cycle: 4
    },
    jobTitle: "Project Manager",
    questions: [
      {
        text: "¿Cómo gestionas equipos remotos?",
        evaluation: {
          score: 7.8,
          summary: "Buenas bases de gestión de equipos",
          strengths: ["Conoce metodologías ágiles", "Buenas habilidades de comunicación"],
          aspects_to_improve: ["Eliminación de muletillas", "Fluidez verbal", "Vocabulario profesional"],
          recommendations: ["Aprende Jira y Slack avanzado"]
        }
      }
    ],
    interviewScore: 60,
    cvMatchScore: 81,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_463",
      title: "Project Manager",
      description: "Gestiona proyectos de desarrollo de software..."
    },
    createdAt: new Date("2024-01-18T14:45:00Z"),
    updatedAt: new Date("2024-01-18T15:20:00Z")
  },
  // ===== SEGUNDAS SIMULACIONES =====
  {
    id: "sim_009",
    userId: "user_123",
    user: {
      id: "user_123",
      email: "juan.perez@ejemplo.com",
      displayName: "Juan Pérez",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    jobTitle: "Desarrollador Full Stack",
    questions: [
      {
        text: "Explica tu experiencia con bases de datos",
        evaluation: {
          score: 8.8,
          summary: "Mejoró significativamente en estructura de respuestas",
          strengths: ["Conocimiento técnico sólido", "Ejemplos más específicos"],
          aspects_to_improve: ["Fluidez verbal"],
          recommendations: ["Continúa practicando explicaciones técnicas"]
        }
      }
    ],
    interviewScore: 85,
    cvMatchScore: 89,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_460",
      title: "Desarrollador Full Stack",
      description: "Desarrollador con experiencia en frontend y backend..."
    },
    createdAt: new Date("2024-01-19T09:15:00Z"),
    updatedAt: new Date("2024-01-19T10:30:00Z")
  },
  {
    id: "sim_010",
    userId: "user_124",
    user: {
      id: "user_124",
      email: "maria.garcia@ejemplo.com",
      displayName: "María García",
      career: "Administración",
      cycle: 5
    },
    jobTitle: "Marketing Manager",
    questions: [
      {
        text: "Describe una campaña exitosa que hayas liderado",
        evaluation: {
          score: 9.3,
          summary: "Excelente mejora en ejemplos STAR concretos",
          strengths: ["Estructura clara", "Métricas específicas"],
          aspects_to_improve: [],
          recommendations: ["Mantén este nivel de detalle"]
        }
      }
    ],
    interviewScore: 93,
    cvMatchScore: 91,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_461",
      title: "Marketing Manager",
      description: "Lidera estrategias de marketing digital..."
    },
    createdAt: new Date("2024-01-19T11:20:00Z"),
    updatedAt: new Date("2024-01-19T12:45:00Z")
  },
  {
    id: "sim_011",
    userId: "user_125",
    user: {
      id: "user_125",
      email: "carlos.mendoza@ejemplo.com",
      displayName: "Carlos Mendoza",
      career: "Diseño Gráfico",
      cycle: 2
    },
    jobTitle: "Diseñador Senior",
    questions: [
      {
        text: "¿Cómo abordas la investigación de usuarios?",
        evaluation: {
          score: 9.0,
          summary: "Mejora notable en especificidad de ejemplos",
          strengths: ["Metodología clara", "Herramientas específicas"],
          aspects_to_improve: [],
          recommendations: ["Excelente progreso"]
        }
      }
    ],
    interviewScore: 90,
    cvMatchScore: 88,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_462",
      title: "Diseñador Senior",
      description: "Diseñador con experiencia en UX/UI..."
    },
    createdAt: new Date("2024-01-19T14:30:00Z"),
    updatedAt: new Date("2024-01-19T15:45:00Z")
  },
  {
    id: "sim_012",
    userId: "user_126",
    user: {
      id: "user_126",
      email: "ana.torres@ejemplo.com",
      displayName: "Ana Torres",
      career: "Ingeniería de Sistemas",
      cycle: 4
    },
    jobTitle: "Data Scientist",
    questions: [
      {
        text: "Explica un proyecto de machine learning que hayas desarrollado",
        evaluation: {
          score: 8.2,
          summary: "Mejora en fluidez verbal y coherencia",
          strengths: ["Conocimiento técnico", "Estructura mejorada"],
          aspects_to_improve: ["Tiempo de respuesta"],
          recommendations: ["Continúa practicando explicaciones técnicas"]
        }
      }
    ],
    interviewScore: 82,
    cvMatchScore: 85,
    creditsUsed: 3,
    status: "completed",
    jobOffer: {
      id: "job_463",
      title: "Data Scientist",
      description: "Analista de datos con experiencia en ML..."
    },
    createdAt: new Date("2024-01-19T16:15:00Z"),
    updatedAt: new Date("2024-01-19T17:30:00Z")
  },
  // ===== TERCERAS SIMULACIONES =====
  {
    id: "sim_013",
    userId: "user_123",
    user: {
      id: "user_123",
      email: "juan.perez@ejemplo.com",
      displayName: "Juan Pérez",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    jobTitle: "Tech Lead",
    questions: [
      {
        text: "¿Cómo liderarías un equipo de desarrollo?",
        evaluation: {
          score: 9.1,
          summary: "Excelente evolución, muy fluido y estructurado",
          strengths: ["Liderazgo técnico", "Visión estratégica"],
          aspects_to_improve: [],
          recommendations: ["Listo para roles senior"]
        }
      }
    ],
    interviewScore: 95,
    cvMatchScore: 92,
    creditsUsed: 5,
    status: "completed",
    jobOffer: {
      id: "job_464",
      title: "Tech Lead",
      description: "Lidera equipos de desarrollo de software..."
    },
    createdAt: new Date("2024-01-20T10:00:00Z"),
    updatedAt: new Date("2024-01-20T11:15:00Z")
  },
  {
    id: "sim_014",
    userId: "user_124",
    user: {
      id: "user_124",
      email: "maria.garcia@ejemplo.com",
      displayName: "María García",
      career: "Administración",
      cycle: 5
    },
    jobTitle: "Head of Marketing",
    questions: [
      {
        text: "¿Cómo desarrollarías la estrategia de marketing para una startup?",
        evaluation: {
          score: 9.5,
          summary: "Rendimiento excepcional, muy profesional",
          strengths: ["Estrategia clara", "Métricas específicas", "Visión de negocio"],
          aspects_to_improve: [],
          recommendations: ["Candidato ideal para roles senior"]
        }
      }
    ],
    interviewScore: 98,
    cvMatchScore: 94,
    creditsUsed: 4,
    status: "completed",
    jobOffer: {
      id: "job_465",
      title: "Head of Marketing",
      description: "Lidera toda la estrategia de marketing..."
    },
    createdAt: new Date("2024-01-20T13:30:00Z"),
    updatedAt: new Date("2024-01-20T14:45:00Z")
  }
];

// Funciones de utilidad para calcular estadísticas
export const getInterviewSimulationStats = () => {
  const total = interviewSimulationData.length;
  const completed = interviewSimulationData.filter(sim => sim.status === "completed").length;
  const averageScore = interviewSimulationData.reduce((sum, sim) => sum + (sim.interviewScore || 0), 0) / completed;
  const averageCvMatch = interviewSimulationData.reduce((sum, sim) => sum + (sim.cvMatchScore || 0), 0) / completed;
  const totalCreditsUsed = interviewSimulationData.reduce((sum, sim) => sum + sim.creditsUsed, 0);

  return {
    total,
    completed,
    averageScore: Math.round(averageScore * 10) / 10,
    averageCvMatch: Math.round(averageCvMatch * 10) / 10,
    totalCreditsUsed
  };
};

// Función para calcular puntaje promedio de entrevistas por carrera
export const getInterviewCareerAverageScores = () => {
  const careerScores = {};
  
  // Agrupar por carrera y calcular promedios
  interviewSimulationData.forEach(simulation => {
    if (simulation.status === "completed" && simulation.user.career && simulation.interviewScore) {
      const career = simulation.user.career;
      if (!careerScores[career]) {
        careerScores[career] = {
          scores: [],
          total: 0,
          count: 0
        };
      }
      careerScores[career].scores.push(simulation.interviewScore);
      careerScores[career].total += simulation.interviewScore;
      careerScores[career].count += 1;
    }
  });

  // Calcular promedios y convertir a formato para gráfico
  return Object.entries(careerScores)
    .map(([career, data]) => ({
      name: career,
      value: Math.round((data.total / data.count) * 10) / 10,
      count: data.count
    }))
    .sort((a, b) => b.value - a.value); // Ordenar por puntaje promedio descendente
};
