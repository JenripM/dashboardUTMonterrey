// Mock data para la colección users
// Basado en la documentación de FIRESTORE_COLLECTIONS.md

export const usersData = [
  // ===== PROGRAMMING FIELD =====
  {
    id: "user_123",
    email: "juan.perez@ejemplo.com",
    displayName: "Juan Pérez",
    photoURL: "https://example.com/photos/juan.jpg",
    emailVerified: true,
    isActive: true,
    credits: 15,
    subscriptionType: "premium",
    cvSelectedId: "cv_456",
    cvFileName: "Juan_Perez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_456",
    createdAt: new Date("2024-01-10T10:30:00Z"),
    lastLoginAt: new Date("2024-01-18T15:45:00Z"),
    updatedAt: new Date("2024-01-18T15:45:00Z"),
    metadata: {
      field_of_study: "Programming",
      competencies: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "C++"]
    },
    career: "Ingeniería de Sistemas",
    cycle: 3,
    studentStatus: "Estudiante"
  },
  {
    id: "user_124",
    email: "carlos.mendoza@ejemplo.com",
    displayName: "Carlos Mendoza",
    photoURL: "https://example.com/photos/carlos.jpg",
    emailVerified: true,
    isActive: true,
    credits: 12,
    subscriptionType: "premium",
    cvSelectedId: "cv_458",
    cvFileName: "Carlos_Mendoza_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_458",
    createdAt: new Date("2024-01-12T09:15:00Z"),
    lastLoginAt: new Date("2024-01-18T09:20:00Z"),
    updatedAt: new Date("2024-01-18T09:20:00Z"),
    metadata: {
      field_of_study: "Programming",
      competencies: ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn", "TensorFlow", "C++"]
    },
    career: "Diseño Gráfico",
    cycle: 5,
    studentStatus: "Estudiante"
  },
  {
    id: "user_125",
    email: "diego.rodriguez@ejemplo.com",
    displayName: "Diego Rodríguez",
    photoURL: "https://example.com/photos/diego.jpg",
    emailVerified: true,
    isActive: true,
    credits: 20,
    subscriptionType: "premium",
    cvSelectedId: "cv_460",
    cvFileName: "Diego_Rodriguez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_460",
    createdAt: new Date("2024-01-14T08:30:00Z"),
    lastLoginAt: new Date("2024-01-18T16:20:00Z"),
    updatedAt: new Date("2024-01-18T16:20:00Z"),
    metadata: {
      field_of_study: "Programming",
      competencies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "C++"]
    },
    career: "Ingeniería de Sistemas",
    cycle: 7,
    studentStatus: "Estudiante"
  },
  {
    id: "user_126",
    email: "laura.martinez@ejemplo.com",
    displayName: "Laura Martínez",
    photoURL: "https://example.com/photos/laura.jpg",
    emailVerified: true,
    isActive: true,
    credits: 7,
    subscriptionType: "free",
    cvSelectedId: "cv_461",
    cvFileName: "Laura_Martinez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_461",
    createdAt: new Date("2024-01-15T16:20:00Z"),
    lastLoginAt: new Date("2024-01-18T11:30:00Z"),
    updatedAt: new Date("2024-01-18T11:30:00Z"),
    metadata: {
      field_of_study: "Programming",
      competencies: ["React Native", "JavaScript", "Firebase", "C++"]
    },
    career: "Ingeniería de Sistemas",
    cycle: 7,
    studentStatus: "Estudiante"
  },
  // ===== MARKETING FIELD =====
  {
    id: "user_127",
    email: "maria.garcia@ejemplo.com",
    displayName: "María García",
    photoURL: "https://example.com/photos/maria.jpg",
    emailVerified: true,
    isActive: true,
    credits: 8,
    subscriptionType: "free",
    cvSelectedId: "cv_457",
    cvFileName: "Maria_Garcia_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_457",
    createdAt: new Date("2024-01-11T14:20:00Z"),
    lastLoginAt: new Date("2024-01-18T12:30:00Z"),
    updatedAt: new Date("2024-01-18T12:30:00Z"),
    metadata: {
      field_of_study: "Marketing",
      competencies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEO", "Content Marketing", "Canva", "Influencer Marketing"]
    },
    career: "Administración",
    cycle: 4,
    studentStatus: "Estudiante"
  },
  {
    id: "user_128",
    email: "pedro.silva@ejemplo.com",
    displayName: "Pedro Silva",
    photoURL: "https://example.com/photos/pedro.jpg",
    emailVerified: true,
    isActive: true,
    credits: 10,
    subscriptionType: "premium",
    cvSelectedId: "cv_462",
    cvFileName: "Pedro_Silva_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_462",
    createdAt: new Date("2024-01-16T10:15:00Z"),
    lastLoginAt: new Date("2024-01-18T15:45:00Z"),
    updatedAt: new Date("2024-01-18T13:45:00Z"),
    metadata: {
      field_of_study: "Marketing",
      competencies: ["Instagram", "Facebook", "Twitter", "TikTok", "Canva", "Branding", "Storytelling"]
    },
    career: "Comunicación",
    cycle: 6,
    studentStatus: "Estudiante"
  },
  {
    id: "user_129",
    email: "ana.torres@ejemplo.com",
    displayName: "Ana Torres",
    photoURL: "https://example.com/photos/ana.jpg",
    emailVerified: true,
    isActive: true,
    credits: 5,
    subscriptionType: "free",
    cvSelectedId: "cv_459",
    cvFileName: "Ana_Torres_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_459",
    createdAt: new Date("2024-01-13T11:45:00Z"),
    lastLoginAt: new Date("2024-01-18T14:15:00Z"),
    updatedAt: new Date("2024-01-18T14:15:00Z"),
    metadata: {
      field_of_study: "Marketing",
      competencies: ["Branding", "Posicionamiento", "Investigación de Mercado", "Adobe Creative Suite", "Canva", "A/B Testing"]
    },
    career: "Marketing",
    cycle: "egresado",
    studentStatus: "Egresado"
  },
  // ===== FINANCE FIELD =====
  {
    id: "user_130",
    email: "sofia.hernandez@ejemplo.com",
    displayName: "Sofía Hernández",
    photoURL: "https://example.com/photos/sofia.jpg",
    emailVerified: true,
    isActive: true,
    credits: 3,
    subscriptionType: "free",
    cvSelectedId: "cv_463",
    cvFileName: "Sofia_Hernandez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_463",
    createdAt: new Date("2024-01-17T14:45:00Z"),
    lastLoginAt: new Date("2024-01-18T10:20:00Z"),
    updatedAt: new Date("2024-01-18T10:20:00Z"),
    metadata: {
      field_of_study: "Finance",
      competencies: ["Excel", "Análisis Financiero", "Modelado", "SQL", "Power BI", "Bloomberg Terminal", "VBA Programming"]
    },
    career: "Contabilidad",
    cycle: 7,
    studentStatus: "Estudiante"
  },
  {
    id: "user_131",
    email: "roberto.gomez@ejemplo.com",
    displayName: "Roberto Gómez",
    photoURL: "https://example.com/photos/roberto.jpg",
    emailVerified: true,
    isActive: true,
    credits: 18,
    subscriptionType: "premium",
    cvSelectedId: "cv_464",
    cvFileName: "Roberto_Gomez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_464",
    createdAt: new Date("2024-01-18T12:00:00Z"),
    lastLoginAt: new Date("2024-01-18T17:30:00Z"),
    updatedAt: new Date("2024-01-18T17:30:00Z"),
    metadata: {
      field_of_study: "Finance",
      competencies: ["Análisis Financiero", "Valuación", "Modelado", "Bloomberg Terminal", "Excel", "Python Finance"]
    },
    career: "Finanzas",
    cycle: -1,
    studentStatus: "Egresado"
  },
  {
    id: "user_132",
    email: "carmen.lopez@ejemplo.com",
    displayName: "Carmen López",
    photoURL: "https://example.com/photos/carmen.jpg",
    emailVerified: true,
    isActive: true,
    credits: 14,
    subscriptionType: "premium",
    cvSelectedId: "cv_465",
    cvFileName: "Carmen_Lopez_CV_2024.pdf",
    cvFileUrl: "/mis-cvs/edit/cv_465",
    createdAt: new Date("2024-01-19T09:30:00Z"),
    lastLoginAt: new Date("2024-01-18T16:45:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z"),
    metadata: {
      field_of_study: "Finance",
      competencies: ["Contabilidad", "Auditoría", "NIIF", "SAP", "Excel", "QuickBooks"]
    },
    career: "Contabilidad",
    cycle: 8,
    studentStatus: "Estudiante"
  }
];

// Funciones de utilidad para calcular estadísticas
export const getUsersStats = () => {
  const total = usersData.length;
  const active = usersData.filter(user => user.isActive).length;
  const premium = usersData.filter(user => user.subscriptionType === "premium").length;
  const free = usersData.filter(user => user.subscriptionType === "free").length;
  const totalCredits = usersData.reduce((sum, user) => sum + user.credits, 0);
  const averageCredits = totalCredits / total;

  return {
    total,
    active,
    premium,
    free,
    totalCredits,
    averageCredits: Math.round(averageCredits * 10) / 10
  };
};

// Función para calcular estadísticas por ciclo
export const getCycleStats = () => {
  const cycleCounts = {};
  
  usersData.forEach(user => {
    const { cycle, studentStatus } = user;
    
    // Prioridad: usar studentStatus si está disponible
    let validCycle = null;
    
    if (studentStatus === "Egresado") {
      validCycle = "Egresado";
    } else if (studentStatus === "Estudiante") {
      // Solo procesar ciclo si es estudiante
      if (typeof cycle === "number" && cycle >= 0 && cycle <= 11) {
        validCycle = `Ciclo ${cycle}`;
      } else if (typeof cycle === "string" && !isNaN(parseInt(cycle))) {
        const numCycle = parseInt(cycle);
        if (numCycle >= 0 && numCycle <= 11) {
          validCycle = `Ciclo ${numCycle}`;
        }
      }
    } else {
      // Fallback: usar la lógica anterior si studentStatus no está disponible
      if (cycle === "egresado" || cycle === -1) {
        validCycle = "Egresado";
      } else if (typeof cycle === "number" && cycle >= 0 && cycle <= 11) {
        validCycle = `Ciclo ${cycle}`;
      } else if (typeof cycle === "string" && !isNaN(parseInt(cycle))) {
        const numCycle = parseInt(cycle);
        if (numCycle >= 0 && numCycle <= 11) {
          validCycle = `Ciclo ${numCycle}`;
        }
      }
    }
    
    // Solo contar si el ciclo es válido
    if (validCycle) {
      cycleCounts[validCycle] = (cycleCounts[validCycle] || 0) + 1;
    }
  });
  
  // Convertir a array y ordenar por cantidad (más activo a menos activo)
  return Object.entries(cycleCounts)
    .map(([cycle, count]) => ({ name: cycle, value: count }))
    .sort((a, b) => {
      // Ordenar por cantidad de estudiantes (mayor a menor)
      return b.value - a.value;
    });
};

// Función para calcular estadísticas por carrera
export const getCareerStats = () => {
  const careerCounts = {};
  
  usersData.forEach(user => {
    const { career, isActive } = user;
    
    // Solo contar usuarios activos
    if (isActive && career) {
      careerCounts[career] = (careerCounts[career] || 0) + 1;
    }
  });
  
  // Convertir a array y ordenar por cantidad (más activo a menos activo)
  return Object.entries(careerCounts)
    .map(([career, count]) => ({ name: career, value: count }))
    .sort((a, b) => {
      // Ordenar por cantidad de estudiantes (mayor a menor)
      return b.value - a.value;
    });
};
