// Mock data para la colección practicas (ofertas laborales)
// Basado en la documentación de FIRESTORE_COLLECTIONS.md y REFLEXION_OFERTA_DEMANDA_ANALISIS.md

export const practicasData = [
  // ===== PROGRAMMING FIELD =====
  {
    id: "practica_001",
    company: "TechCorp Solutions",
    description: "Desarrollador Full Stack con experiencia en React y Node.js. Buscamos un profesional apasionado por la tecnología y con ganas de crecer en un ambiente dinámico.",
    embedding: [0.1, 0.2, 0.3, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-15T10:30:00Z"),
    location: "Ciudad de México",
    logo: "https://supabase.com/storage/techcorp-logo.png",
    salary: "$25,000 - $35,000 MXN",
    sitio_web: "https://techcorp.com",
    title: "Desarrollador Full Stack",
    titulo_contactos: "Recursos Humanos",
    url: "https://techcorp.com/careers/fullstack",
    metadata: {
      category: ["Tecnología", "Desarrollo"],
      hard_skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Ingeniería Informática", "Desarrollo de Software"],
      soft_skills: ["Trabajo en equipo", "Comunicación", "Resolución de problemas"],
      target_field: "Programming",
      required_competencies: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "Inglés", "Python"]
    }
  },
  {
    id: "practica_002",
    company: "DataScience Labs",
    description: "Data Scientist con experiencia en Python, machine learning y análisis de datos. Trabajo con grandes volúmenes de información y desarrollo de modelos predictivos.",
    embedding: [0.2, 0.3, 0.4, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-16T14:20:00Z"),
    location: "Monterrey",
    logo: "https://supabase.com/storage/datascience-logo.png",
    salary: "$30,000 - $45,000 MXN",
    sitio_web: "https://datasciencelabs.com",
    title: "Data Scientist",
    titulo_contactos: "Dirección de Tecnología",
    url: "https://datasciencelabs.com/careers/datascientist",
    metadata: {
      category: ["Tecnología", "Ciencia de Datos"],
      hard_skills: ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Matemáticas", "Estadística"],
      soft_skills: ["Análisis crítico", "Comunicación técnica", "Trabajo en equipo"],
      target_field: "Programming",
      required_competencies: ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn", "TensorFlow", "Inglés"]
    }
  },
  {
    id: "practica_003",
    company: "MobileDev Studio",
    description: "Desarrollador móvil con experiencia en React Native y desarrollo de aplicaciones iOS/Android. Conocimientos en diseño de UX/UI y publicación en stores.",
    embedding: [0.3, 0.4, 0.5, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-17T09:15:00Z"),
    location: "Guadalajara",
    logo: "https://supabase.com/storage/mobiledev-logo.png",
    salary: "$28,000 - $40,000 MXN",
    sitio_web: "https://mobiledevstudio.com",
    title: "Desarrollador Móvil",
    titulo_contactos: "Dirección de Desarrollo",
    url: "https://mobiledevstudio.com/careers/mobile",
    metadata: {
      category: ["Tecnología", "Desarrollo Móvil"],
      hard_skills: ["React Native", "JavaScript", "iOS", "Android", "Firebase"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Desarrollo de Software"],
      soft_skills: ["Creatividad", "Resolución de problemas", "Trabajo en equipo"],
      target_field: "Programming",
      required_competencies: ["React Native", "JavaScript", "Firebase", "Inglés", "Python"]
    }
  },
  {
    id: "practica_004",
    company: "Backend Systems",
    description: "Desarrollador Backend con experiencia en Java, Spring Boot y bases de datos. Trabajo con arquitecturas microservicios y APIs RESTful.",
    embedding: [0.4, 0.5, 0.6, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-18T11:45:00Z"),
    location: "Querétaro",
    logo: "https://supabase.com/storage/backendsystems-logo.png",
    salary: "$26,000 - $38,000 MXN",
    sitio_web: "https://backendsystems.com",
    title: "Desarrollador Backend",
    titulo_contactos: "Dirección de Tecnología",
    url: "https://backendsystems.com/careers/backend",
    metadata: {
      category: ["Tecnología", "Desarrollo Backend"],
      hard_skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Ingeniería Informática"],
      soft_skills: ["Análisis", "Trabajo en equipo", "Comunicación técnica"],
      target_field: "Programming",
      required_competencies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Inglés", "Python"]
    }
  },
  // ===== MARKETING FIELD =====
  {
    id: "practica_005",
    company: "Marketing Digital Pro",
    description: "Especialista en marketing digital con enfoque en redes sociales y publicidad online. Experiencia en Google Ads y Facebook Ads requerida.",
    embedding: [0.5, 0.6, 0.7, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-19T16:30:00Z"),
    location: "Guadalajara",
    logo: "https://supabase.com/storage/marketingpro-logo.png",
    salary: "$18,000 - $25,000 MXN",
    sitio_web: "https://marketingpro.com",
    title: "Especialista en Marketing Digital",
    titulo_contactos: "Dirección de Marketing",
    url: "https://marketingpro.com/careers/marketing",
    metadata: {
      category: ["Marketing", "Publicidad"],
      hard_skills: ["Google Ads", "Facebook Ads", "Analytics", "SEO"],
      language_requirements: ["Español"],
      related_degrees: ["Marketing", "Comunicación", "Administración de Empresas"],
      soft_skills: ["Creatividad", "Análisis", "Comunicación"],
      target_field: "Marketing",
      required_competencies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEO", "Content Marketing", "Inglés", "Data Analysis"]
    }
  },
  {
    id: "practica_006",
    company: "Social Media Agency",
    description: "Community Manager con experiencia en gestión de redes sociales y creación de contenido. Manejo de múltiples plataformas y estrategias de engagement.",
    embedding: [0.6, 0.7, 0.8, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-20T08:45:00Z"),
    location: "Ciudad de México",
    logo: "https://supabase.com/storage/socialmedia-logo.png",
    salary: "$15,000 - $22,000 MXN",
    sitio_web: "https://socialmediaagency.com",
    title: "Community Manager",
    titulo_contactos: "Dirección de Marketing",
    url: "https://socialmediaagency.com/careers/community",
    metadata: {
      category: ["Marketing", "Redes Sociales"],
      hard_skills: ["Instagram", "Facebook", "Twitter", "TikTok", "Canva"],
      language_requirements: ["Español"],
      related_degrees: ["Marketing", "Comunicación", "Publicidad"],
      soft_skills: ["Creatividad", "Comunicación", "Gestión de tiempo"],
      target_field: "Marketing",
      required_competencies: ["Instagram", "Facebook", "Twitter", "TikTok", "Canva", "Inglés", "Video Editing"]
    }
  },
  {
    id: "practica_007",
    company: "Brand Strategy Co",
    description: "Estratega de marca con experiencia en posicionamiento y desarrollo de identidad corporativa. Trabajo con empresas de diferentes sectores.",
    embedding: [0.7, 0.8, 0.9, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-21T13:20:00Z"),
    location: "Monterrey",
    logo: "https://supabase.com/storage/brandstrategy-logo.png",
    salary: "$22,000 - $32,000 MXN",
    sitio_web: "https://brandstrategyco.com",
    title: "Estratega de Marca",
    titulo_contactos: "Dirección Creativa",
    url: "https://brandstrategyco.com/careers/strategist",
    metadata: {
      category: ["Marketing", "Branding"],
      hard_skills: ["Branding", "Posicionamiento", "Investigación de Mercado", "Adobe Creative Suite"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Marketing", "Diseño", "Administración de Empresas"],
      soft_skills: ["Creatividad", "Análisis", "Comunicación"],
      target_field: "Marketing",
      required_competencies: ["Branding", "Posicionamiento", "Investigación de Mercado", "Adobe Creative Suite", "Inglés", "Customer Journey"]
    }
  },
  // ===== FINANCE FIELD =====
  {
    id: "practica_008",
    company: "FinTech Solutions",
    description: "Analista financiero con experiencia en análisis de riesgo y modelado financiero. Conocimientos en Excel avanzado y herramientas de análisis financiero.",
    embedding: [0.8, 0.9, 1.0, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-22T10:15:00Z"),
    location: "Ciudad de México",
    logo: "https://supabase.com/storage/fintech-logo.png",
    salary: "$22,000 - $32,000 MXN",
    sitio_web: "https://fintechsolutions.com",
    title: "Analista Financiero",
    titulo_contactos: "Dirección Financiera",
    url: "https://fintechsolutions.com/careers/analyst",
    metadata: {
      category: ["Finanzas", "Análisis"],
      hard_skills: ["Excel", "Análisis Financiero", "Modelado", "SQL"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Finanzas", "Economía", "Administración de Empresas"],
      soft_skills: ["Análisis", "Atención al detalle", "Comunicación"],
      target_field: "Finance",
      required_competencies: ["Excel", "Análisis Financiero", "Modelado", "SQL", "Power BI", "Inglés", "Risk Management"]
    }
  },
  {
    id: "practica_009",
    company: "Investment Bank",
    description: "Analista de inversiones con experiencia en análisis de mercado y evaluación de proyectos. Conocimientos en finanzas corporativas y valuación.",
    embedding: [0.9, 1.0, 1.1, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-23T14:30:00Z"),
    location: "Monterrey",
    logo: "https://supabase.com/storage/investmentbank-logo.png",
    salary: "$28,000 - $40,000 MXN",
    sitio_web: "https://investmentbank.com",
    title: "Analista de Inversiones",
    titulo_contactos: "Dirección de Inversiones",
    url: "https://investmentbank.com/careers/investment",
    metadata: {
      category: ["Finanzas", "Inversiones"],
      hard_skills: ["Análisis Financiero", "Valuación", "Modelado", "Bloomberg Terminal"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Finanzas", "Economía", "Administración de Empresas"],
      soft_skills: ["Análisis", "Comunicación", "Trabajo bajo presión"],
      target_field: "Finance",
      required_competencies: ["Análisis Financiero", "Valuación", "Modelado", "Bloomberg Terminal", "Inglés", "CFA Certification"]
    }
  },
  {
    id: "practica_010",
    company: "Accounting Firm",
    description: "Contador público con experiencia en auditoría y contabilidad corporativa. Conocimientos en normas contables internacionales.",
    embedding: [1.0, 1.1, 1.2, /* ... vector de 2048 dimensiones */],
    fecha_Agregado: new Date("2024-01-24T09:45:00Z"),
    location: "Guadalajara",
    logo: "https://supabase.com/storage/accountingfirm-logo.png",
    salary: "$18,000 - $26,000 MXN",
    sitio_web: "https://accountingfirm.com",
    title: "Contador Público",
    titulo_contactos: "Socio Director",
    url: "https://accountingfirm.com/careers/accountant",
    metadata: {
      category: ["Finanzas", "Contabilidad"],
      hard_skills: ["Contabilidad", "Auditoría", "NIIF", "SAP"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Contabilidad", "Administración de Empresas"],
      soft_skills: ["Atención al detalle", "Análisis", "Comunicación"],
      target_field: "Finance",
      required_competencies: ["Contabilidad", "Auditoría", "NIIF", "SAP", "Inglés", "Tax Planning"]
    }
  },
  // ===== OFERTAS ADICIONALES PARA CREAR DIFERENCIAS =====
  // Programming - 2 ofertas adicionales
  {
    id: "practica_010",
    company: "StartupTech",
    description: "Desarrollador Frontend especializado en React y TypeScript. Trabajo remoto con equipo internacional.",
    embedding: [0.1, 0.2, 0.3],
    fecha_Agregado: new Date("2024-01-20T09:00:00Z"),
    location: "Remoto",
    logo: "https://supabase.com/storage/startuptech-logo.png",
    salary: "$20,000 - $30,000 MXN",
    sitio_web: "https://startuptech.com",
    title: "Frontend Developer",
    titulo_contactos: "CTO",
    url: "https://startuptech.com/careers/frontend",
    metadata: {
      category: ["Tecnología", "Desarrollo"],
      hard_skills: ["React", "TypeScript", "CSS", "HTML"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Desarrollo de Software"],
      soft_skills: ["Trabajo remoto", "Autodisciplina", "Comunicación"],
      target_field: "Programming",
      required_competencies: ["React", "TypeScript", "CSS", "HTML", "Git", "Inglés"]
    }
  },
  {
    id: "practica_011",
    company: "DevCorp",
    description: "Desarrollador Backend con Python y Django. Proyectos de alto impacto en fintech.",
    embedding: [0.2, 0.3, 0.4],
    fecha_Agregado: new Date("2024-01-21T11:30:00Z"),
    location: "Guadalajara",
    logo: "https://supabase.com/storage/devcorp-logo.png",
    salary: "$28,000 - $40,000 MXN",
    sitio_web: "https://devcorp.com",
    title: "Backend Developer",
    titulo_contactos: "Lead Developer",
    url: "https://devcorp.com/careers/backend",
    metadata: {
      category: ["Tecnología", "Fintech"],
      hard_skills: ["Python", "Django", "PostgreSQL", "Redis"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Ingeniería de Sistemas", "Ciencias de la Computación"],
      soft_skills: ["Trabajo en equipo", "Resolución de problemas", "Aprendizaje continuo"],
      target_field: "Programming",
      required_competencies: ["Python", "Django", "PostgreSQL", "Redis", "Git", "Inglés", "Docker"]
    }
  },
  // Marketing - 1 oferta adicional
  {
    id: "practica_012",
    company: "GrowthAgency",
    description: "Especialista en Marketing Digital con enfoque en redes sociales y contenido. Clientes internacionales.",
    embedding: [0.3, 0.4, 0.5],
    fecha_Agregado: new Date("2024-01-22T14:15:00Z"),
    location: "Ciudad de México",
    logo: "https://supabase.com/storage/growthagency-logo.png",
    salary: "$18,000 - $25,000 MXN",
    sitio_web: "https://growthagency.com",
    title: "Digital Marketing Specialist",
    titulo_contactos: "Marketing Director",
    url: "https://growthagency.com/careers/digital-marketing",
    metadata: {
      category: ["Marketing", "Digital"],
      hard_skills: ["Social Media", "Content Creation", "Analytics", "SEO"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Marketing", "Comunicación", "Publicidad"],
      soft_skills: ["Creatividad", "Comunicación", "Análisis de datos"],
      target_field: "Marketing",
      required_competencies: ["Social Media", "Content Creation", "Analytics", "SEO", "Inglés", "Design"]
    }
  },
  // Design - 2 ofertas nuevas
  {
    id: "practica_013",
    company: "CreativeStudio",
    description: "Diseñador UX/UI con experiencia en aplicaciones móviles. Trabajo con startups innovadoras.",
    embedding: [0.4, 0.5, 0.6],
    fecha_Agregado: new Date("2024-01-23T10:00:00Z"),
    location: "Monterrey",
    logo: "https://supabase.com/storage/creativestudio-logo.png",
    salary: "$22,000 - $32,000 MXN",
    sitio_web: "https://creativestudio.com",
    title: "UX/UI Designer",
    titulo_contactos: "Design Lead",
    url: "https://creativestudio.com/careers/ux-ui",
    metadata: {
      category: ["Diseño", "UX/UI"],
      hard_skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Diseño Gráfico", "Diseño Digital", "Comunicación Visual"],
      soft_skills: ["Creatividad", "Empatía", "Trabajo en equipo"],
      target_field: "Design",
      required_competencies: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "Inglés", "User Research"]
    }
  },
  {
    id: "practica_014",
    company: "BrandAgency",
    description: "Diseñador Gráfico especializado en identidad corporativa y branding. Clientes de lujo y retail.",
    embedding: [0.5, 0.6, 0.7],
    fecha_Agregado: new Date("2024-01-24T16:45:00Z"),
    location: "Ciudad de México",
    logo: "https://supabase.com/storage/brandagency-logo.png",
    salary: "$20,000 - $28,000 MXN",
    sitio_web: "https://brandagency.com",
    title: "Graphic Designer",
    titulo_contactos: "Creative Director",
    url: "https://brandagency.com/careers/graphic-designer",
    metadata: {
      category: ["Diseño", "Branding"],
      hard_skills: ["Adobe Creative Suite", "Illustrator", "Photoshop", "InDesign"],
      language_requirements: ["Español", "Inglés"],
      related_degrees: ["Diseño Gráfico", "Comunicación Visual", "Artes Visuales"],
      soft_skills: ["Creatividad", "Atención al detalle", "Comunicación"],
      target_field: "Design",
      required_competencies: ["Adobe Creative Suite", "Illustrator", "Photoshop", "InDesign", "Inglés", "Branding"]
    }
  }
];

// Funciones de utilidad para calcular estadísticas
export const getPracticasStats = () => {
  const total = practicasData.length;
  const byField = {};
  const byLocation = {};
  const bySalary = {
    low: 0,    // < $15,000
    medium: 0, // $15,000 - $25,000
    high: 0     // > $25,000
  };

  practicasData.forEach(practica => {
    // Estadísticas por campo
    const field = practica.metadata.target_field;
    byField[field] = (byField[field] || 0) + 1;

    // Estadísticas por ubicación
    const location = practica.location;
    byLocation[location] = (byLocation[location] || 0) + 1;

    // Estadísticas por salario
    const salary = practica.salary;
    const salaryNum = parseInt(salary.match(/\$(\d+)/)[1]);
    if (salaryNum < 15000) bySalary.low++;
    else if (salaryNum <= 25000) bySalary.medium++;
    else bySalary.high++;
  });

  return {
    total,
    byField,
    byLocation,
    bySalary
  };
};
