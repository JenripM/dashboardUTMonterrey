// Mock data para la colección aiTool_cvAnalysis
// Basado en la documentación de FIRESTORE_COLLECTIONS.md

export const cvAnalysisData = [
  {
    id: "cv_analysis_001",
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
      pdf_url: "https://r2.example.com/analysis/user123_job789.pdf",
      score: 87,
      aspects_to_improve: [
        "Logros cuantificables",
        "Herramientas de ofimática",
        "Experiencia práctica relevante"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user123_job789.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2500,
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: "cv_analysis_002",
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
      pdf_url: "https://r2.example.com/analysis/user124_job790.pdf",
      score: 92,
      aspects_to_improve: [
        "Herramientas de IA",
        "Proyectos destacados"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user124_job790.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 3200,
    createdAt: new Date("2024-01-15T14:20:00Z")
  },
  {
    id: "cv_analysis_003",
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
      pdf_url: "https://r2.example.com/analysis/user125_job791.pdf",
      score: 78,
      aspects_to_improve: [
        "Logros cuantificables",
        "Palabras clave del sector",
        "Experiencia práctica relevante",
        "Objetivos profesionales claros",
        "Herramientas de ofimática"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user125_job791.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2800,
    createdAt: new Date("2024-01-16T09:15:00Z")
  },
  {
    id: "cv_analysis_004",
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
      pdf_url: "https://r2.example.com/analysis/user126_job792.pdf",
      score: 85,
      aspects_to_improve: [
        "Herramientas de IA",
        "Proyectos destacados",
        "Idiomas relevantes"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user126_job792.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2100,
    createdAt: new Date("2024-01-16T11:45:00Z")
  },
  {
    id: "cv_analysis_005",
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
      pdf_url: "https://r2.example.com/analysis/user127_job793.pdf",
      score: 72,
      aspects_to_improve: [
        "Logros cuantificables",
        "Palabras clave del sector",
        "Experiencia práctica relevante",
        "Objetivos profesionales claros",
        "Ortografía y gramática",
        "Herramientas de ofimática",
        "Herramientas de IA"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user127_job793.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2900,
    createdAt: new Date("2024-01-17T08:30:00Z")
  },
  {
    id: "cv_analysis_006",
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
      pdf_url: "https://r2.example.com/analysis/user128_job794.pdf",
      score: 89,
      aspects_to_improve: [
        "Proyectos destacados"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user128_job794.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2600,
    createdAt: new Date("2024-01-17T16:20:00Z")
  },
  {
    id: "cv_analysis_007",
    userId: "user_129",
    user: {
      id: "user_129",
      email: "pedro.silva@ejemplo.com",
      displayName: "Pedro Silva",
      career: "Ingeniería de Sistemas",
      cycle: 3
    },
    cv: {
      id: "cv_462",
      fileUrl: "https://r2.example.com/cvs/user129_cv462.pdf",
      displayName: "Pedro_Silva_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_795",
      title: "DevOps Engineer",
      description: "Gestiona infraestructura y deployment..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user129_job795.pdf",
      score: 91,
      aspects_to_improve: [
        "Idiomas relevantes"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user129_job795.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 3100,
    createdAt: new Date("2024-01-18T10:15:00Z")
  },
  {
    id: "cv_analysis_008",
    userId: "user_130",
    user: {
      id: "user_130",
      email: "sofia.hernandez@ejemplo.com",
      displayName: "Sofía Hernández",
      career: "Psicología",
      cycle: 4
    },
    cv: {
      id: "cv_463",
      fileUrl: "https://r2.example.com/cvs/user130_cv463.pdf",
      displayName: "Sofia_Hernandez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_796",
      title: "QA Engineer",
      description: "Asegura la calidad del software..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user130_job796.pdf",
      score: 83,
      aspects_to_improve: [
        "Experiencia práctica relevante",
        "Herramientas de ofimática",
        "Herramientas de IA"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user130_job796.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2400,
    createdAt: new Date("2024-01-18T14:45:00Z")
  },
  {
    id: "cv_analysis_009",
    userId: "user_131",
    user: {
      id: "user_131",
      email: "miguel.castro@ejemplo.com",
      displayName: "Miguel Castro",
      career: "Ingeniería de Sistemas",
      cycle: 2
    },
    cv: {
      id: "cv_464",
      fileUrl: "https://r2.example.com/cvs/user131_cv464.pdf",
      displayName: "Miguel_Castro_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_797",
      title: "Full Stack Developer",
      description: "Desarrolla aplicaciones web completas..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user131_job797.pdf",
      score: 95,
      aspects_to_improve: [],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user131_job797.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2700,
    createdAt: new Date("2024-01-19T09:30:00Z")
  },
  {
    id: "cv_analysis_010",
    userId: "user_132",
    user: {
      id: "user_132",
      email: "carmen.lopez@ejemplo.com",
      displayName: "Carmen López",
      career: "Administración",
      cycle: 5
    },
    cv: {
      id: "cv_465",
      fileUrl: "https://r2.example.com/cvs/user132_cv465.pdf",
      displayName: "Carmen_Lopez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_798",
      title: "Project Manager",
      description: "Gestiona proyectos de desarrollo de software..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user132_job798.pdf",
      score: 88,
      aspects_to_improve: [
        "Herramientas de IA",
        "Proyectos destacados"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user132_job798.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2300,
    createdAt: new Date("2024-01-19T13:15:00Z")
  },
  {
    id: "cv_analysis_011",
    userId: "user_133",
    user: {
      id: "user_133",
      email: "ricardo.morales@ejemplo.com",
      displayName: "Ricardo Morales",
      career: "Diseño Gráfico",
      cycle: 1
    },
    cv: {
      id: "cv_466",
      fileUrl: "https://r2.example.com/cvs/user133_cv466.pdf",
      displayName: "Ricardo_Morales_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_799",
      title: "UI/UX Designer",
      description: "Diseña interfaces de usuario atractivas..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user133_job799.pdf",
      score: 76,
      aspects_to_improve: [
        "Logros cuantificables",
        "Palabras clave del sector",
        "Experiencia práctica relevante",
        "Objetivos profesionales claros",
        "Herramientas de ofimática",
        "Herramientas de IA",
        "Idiomas relevantes"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user133_job799.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2500,
    createdAt: new Date("2024-01-20T11:00:00Z")
  },
  {
    id: "cv_analysis_012",
    userId: "user_134",
    user: {
      id: "user_134",
      email: "patricia.vargas@ejemplo.com",
      displayName: "Patricia Vargas",
      career: "Marketing",
      cycle: 6
    },
    cv: {
      id: "cv_467",
      fileUrl: "https://r2.example.com/cvs/user134_cv467.pdf",
      displayName: "Patricia_Vargas_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_800",
      title: "Digital Marketing Manager",
      description: "Desarrolla estrategias de marketing digital..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user134_job800.pdf",
      score: 82,
      aspects_to_improve: [
        "Logros cuantificables",
        "Herramientas de ofimática",
        "Proyectos destacados"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user134_job800.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2200,
    createdAt: new Date("2024-01-20T15:45:00Z")
  },
  {
    id: "cv_analysis_013",
    userId: "user_135",
    user: {
      id: "user_135",
      email: "fernando.gutierrez@ejemplo.com",
      displayName: "Fernando Gutiérrez",
      career: "Psicología",
      cycle: 4
    },
    cv: {
      id: "cv_468",
      fileUrl: "https://r2.example.com/cvs/user135_cv468.pdf",
      displayName: "Fernando_Gutierrez_CV_2024.pdf"
    },
    jobOffer: {
      id: "job_801",
      title: "HR Specialist",
      description: "Gestiona recursos humanos y reclutamiento..."
    },
    result: {
      pdf_url: "https://r2.example.com/analysis/user135_job801.pdf",
      score: 79,
      aspects_to_improve: [
        "Experiencia práctica relevante",
        "Objetivos profesionales claros",
        "Herramientas de IA",
        "Idiomas relevantes"
      ],
      extractedData: {
        analysisResults: {
          pdf_url: "https://r2.example.com/analysis/user135_job801.pdf"
        }
      }
    },
    status: "completed",
    processingTime: 2600,
    createdAt: new Date("2024-01-21T08:20:00Z")
  }
];

// Funciones de utilidad para calcular estadísticas
export const getCvAnalysisStats = () => {
  const total = cvAnalysisData.length;
  const completed = cvAnalysisData.filter(analysis => analysis.status === "completed").length;
  const averageScore = cvAnalysisData.reduce((sum, analysis) => sum + (analysis.result.score || 0), 0) / completed;
  const averageProcessingTime = cvAnalysisData.reduce((sum, analysis) => sum + analysis.processingTime, 0) / total;

  return {
    total,
    completed,
    averageScore: Math.round(averageScore * 10) / 10,
    averageProcessingTime: Math.round(averageProcessingTime)
  };
};

// Función para calcular puntaje promedio por carrera
export const getCareerAverageScores = () => {
  const careerScores = {};
  
  // Agrupar por carrera y calcular promedios
  cvAnalysisData.forEach(analysis => {
    if (analysis.status === "completed" && analysis.user.career && analysis.result.score) {
      const career = analysis.user.career;
      if (!careerScores[career]) {
        careerScores[career] = {
          scores: [],
          total: 0,
          count: 0
        };
      }
      careerScores[career].scores.push(analysis.result.score);
      careerScores[career].total += analysis.result.score;
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
