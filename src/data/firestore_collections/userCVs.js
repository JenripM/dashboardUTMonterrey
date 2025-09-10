// Mock data para la colección userCVs
// Basado en la documentación de FIRESTORE_COLLECTIONS.md

export const userCVsData = [
  {
    id: "cv_001",
    userId: "user_123",
    title: "Juan_Perez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user123_cv001.pdf",
    template: "harvard",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-10T09:30:00Z"),
    updatedAt: new Date("2024-01-15T14:20:00Z")
  },
  {
    id: "cv_002",
    userId: "user_124",
    title: "Maria_Garcia_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user124_cv002.pdf",
    template: "stanford",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-12T11:15:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z")
  },
  {
    id: "cv_003",
    userId: "user_125",
    title: "Carlos_Mendoza_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user125_cv003.pdf",
    template: "mit",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-14T08:45:00Z"),
    updatedAt: new Date("2024-01-20T10:30:00Z")
  },
  {
    id: "cv_004",
    userId: "user_126",
    title: "Ana_Torres_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user126_cv004.pdf",
    template: "harvard",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-16T13:20:00Z"),
    updatedAt: new Date("2024-01-22T09:15:00Z")
  },
  {
    id: "cv_005",
    userId: "user_127",
    title: "Diego_Rodriguez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user127_cv005.pdf",
    template: "stanford",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-18T15:30:00Z"),
    updatedAt: new Date("2024-01-25T11:45:00Z")
  },
  {
    id: "cv_006",
    userId: "user_128",
    title: "Laura_Martinez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user128_cv006.pdf",
    template: "mit",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-20T10:15:00Z"),
    updatedAt: new Date("2024-01-28T14:20:00Z")
  },
  {
    id: "cv_007",
    userId: "user_129",
    title: "Pedro_Silva_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user129_cv007.pdf",
    template: "harvard",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-22T12:45:00Z"),
    updatedAt: new Date("2024-01-30T16:10:00Z")
  },
  {
    id: "cv_008",
    userId: "user_130",
    title: "Sofia_Hernandez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user130_cv008.pdf",
    template: "stanford",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-24T14:30:00Z"),
    updatedAt: new Date("2024-02-01T08:25:00Z")
  },
  {
    id: "cv_009",
    userId: "user_131",
    title: "Miguel_Castro_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user131_cv009.pdf",
    template: "mit",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-26T16:20:00Z"),
    updatedAt: new Date("2024-02-03T12:40:00Z")
  },
  {
    id: "cv_010",
    userId: "user_132",
    title: "Carmen_Lopez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user132_cv010.pdf",
    template: "harvard",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-28T09:10:00Z"),
    updatedAt: new Date("2024-02-05T15:55:00Z")
  },
  {
    id: "cv_011",
    userId: "user_133",
    title: "Ricardo_Morales_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user133_cv011.pdf",
    template: "stanford",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-01-30T11:35:00Z"),
    updatedAt: new Date("2024-02-07T10:20:00Z")
  },
  {
    id: "cv_012",
    userId: "user_134",
    title: "Patricia_Vargas_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user134_cv012.pdf",
    template: "mit",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-02-01T13:50:00Z"),
    updatedAt: new Date("2024-02-09T17:30:00Z")
  },
  {
    id: "cv_013",
    userId: "user_135",
    title: "Fernando_Gutierrez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user135_cv013.pdf",
    template: "harvard",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-02-03T15:25:00Z"),
    updatedAt: new Date("2024-02-11T13:15:00Z")
  },
  {
    id: "cv_014",
    userId: "user_136",
    title: "Elena_Ramirez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user136_cv014.pdf",
    template: "stanford",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-02-05T08:40:00Z"),
    updatedAt: new Date("2024-02-13T11:50:00Z")
  },
  {
    id: "cv_015",
    userId: "user_137",
    title: "Roberto_Jimenez_CV_2024.pdf",
    fileUrl: "https://r2.example.com/cvs/user137_cv015.pdf",
    template: "mit",
    data: {},
    embeddings: {},
    createdAt: new Date("2024-02-07T10:55:00Z"),
    updatedAt: new Date("2024-02-15T14:35:00Z")
  }
];

// Funciones de utilidad para calcular estadísticas
export const getUserCVsStats = () => {
  const total = userCVsData.length;
  const harvardCount = userCVsData.filter(cv => cv.template === "harvard").length;
  const stanfordCount = userCVsData.filter(cv => cv.template === "stanford").length;
  const mitCount = userCVsData.filter(cv => cv.template === "mit").length;

  return {
    total,
    byTemplate: {
      harvard: harvardCount,
      stanford: stanfordCount,
      mit: mitCount
    }
  };
};
