import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db2 } from '../credentials/companies';
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  UsersIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  DocumentPlusIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const TABS = [
  { id: 'info', name: 'Información', icon: BuildingOfficeIcon },
  { id: 'vacantes', name: 'Vacantes', icon: BriefcaseIcon },
  { id: 'convenios', name: 'Convenios', icon: DocumentCheckIcon },
  { id: 'notas', name: 'Notas Internas', icon: ChatBubbleLeftIcon },
];

// Mock data para tabs estáticos
const MOCK_VACANTES = [
  {
    id: 1,
    title: 'Asistente de Marketing Digital',
    location: 'Lima, Perú',
    type: 'Tiempo completo',
    publishedDays: 5,
    applicants: 12,
  },
  {
    id: 2,
    title: 'Analista de Recursos Humanos',
    location: 'Lima, Perú',
    type: 'Prácticas',
    publishedDays: 14,
    applicants: 8,
  },
  {
    id: 3,
    title: 'Desarrollador Full Stack',
    location: 'Remoto',
    type: 'Tiempo completo',
    publishedDays: 7,
    applicants: 15,
  },
  {
    id: 4,
    title: 'Diseñador UX/UI',
    location: 'Lima, Perú',
    type: 'Prácticas',
    publishedDays: 3,
    applicants: 10,
  },
  {
    id: 5,
    title: 'Contador Junior',
    location: 'Lima, Perú',
    type: 'Tiempo completo',
    publishedDays: 12,
    applicants: 6,
  },
];

const MOCK_CONVENIOS = [
  {
    id: 1,
    title: 'Convenio Marco 2025',
    uploadedDate: '2025-01-09',
    fileSize: '2.4 MB',
  },
  {
    id: 2,
    title: 'Acuerdo de Confidencialidad',
    uploadedDate: '2024-12-15',
    fileSize: '1.8 MB',
  },
  {
    id: 3,
    title: 'Términos y Condiciones Prácticas',
    uploadedDate: '2024-11-20',
    fileSize: '3.1 MB',
  },
];

const MOCK_NOTAS = [
  {
    id: 1,
    author: 'Admin',
    content: 'Empresa muy activa, excelente comunicación.',
    date: '2025-10-15',
  },
  {
    id: 2,
    author: 'Admin',
    content: 'Renovación de convenio programada para diciembre.',
    date: '2025-10-10',
  },
  {
    id: 3,
    author: 'Admin',
    content: 'Han contratado a 3 estudiantes este mes.',
    date: '2025-10-05',
  },
];

const EmpresasDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchCompanyDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCompanyDetails = async () => {
    try {
      const docRef = doc(db2, 'companies', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCompany({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error('Company not found');
        navigate('/empresas');
      }
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Aquí iría la lógica para guardar en Firebase
      console.log('Nueva nota:', newNote);
      setNewNote('');
      setShowNoteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Empresa no encontrada</p>
      </div>
    );
  }

  const statusStyles = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    approved: 'bg-success-light text-success ring-success/20',
    rejected: 'bg-red-50 text-red-700 ring-red-600/20',
    active: 'bg-primary/10 text-primary ring-primary/20',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-6 text-white">
        <button
          onClick={() => navigate('/empresas')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Volver a Empresas</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{company.displayName}</h1>
            <p className="text-white/90 text-base max-w-3xl leading-relaxed">
              {company.description || 'No hay descripción disponible'}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              statusStyles[company.status] || statusStyles.pending
            }`}
          >
            {company.status?.charAt(0).toUpperCase() + company.status?.slice(1) || 'Pending'}
          </span>
        </div>
      </div>

      {/* Métricas Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Vacantes Activas */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BriefcaseIcon className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Vacantes Activas</p>
              <p className="text-3xl font-bold text-primary mt-1">5</p>
              <p className="text-xs text-gray-500 mt-1">Publicadas actualmente</p>
            </div>
          </div>
        </div>

        {/* Card 2: Postulantes */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <UsersIcon className="w-7 h-7 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Postulantes</p>
              <p className="text-3xl font-bold text-success mt-1">23</p>
              <p className="text-xs text-gray-500 mt-1">Total de aplicaciones</p>
            </div>
          </div>
        </div>

        {/* Card 3: Contrataciones */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pending/10 rounded-lg">
              <DocumentCheckIcon className="w-7 h-7 text-pending" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Contrataciones</p>
              <p className="text-3xl font-bold text-pending mt-1">8</p>
              <p className="text-xs text-gray-500 mt-1">Estudiantes contratados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 group relative py-4 px-4 text-center border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Tab: Información */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Información General
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <BuildingOfficeIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Industria</p>
                      <p className="text-base font-semibold text-gray-900">
                        {company.sector || 'No especificado'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <EnvelopeIcon className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Contacto</p>
                      <a
                        href={`mailto:${company.contactEmail}`}
                        className="text-base font-semibold text-gray-900 hover:text-primary hover:underline"
                      >
                        {company.contactEmail || 'No especificado'}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <UserGroupIcon className="w-5 h-5 text-pending" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Tamaño</p>
                      <p className="text-base font-semibold text-gray-900">
                        {company.companySize || 'No especificado'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Miembro desde
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {company.createdAt?.toDate
                          ? company.createdAt.toDate().toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'No disponible'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {company.website && (
                <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Sitio Web</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark font-medium hover:underline flex items-center gap-2"
                  >
                    {company.website}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Tab: Vacantes */}
          {activeTab === 'vacantes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Vacantes Publicadas</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {MOCK_VACANTES.length} vacantes activas
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_VACANTES.map((vacante) => (
                  <div
                    key={vacante.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {vacante.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span>{vacante.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span>{vacante.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span>Hace {vacante.publishedDays} días</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-success mb-1">
                          {vacante.applicants}
                        </div>
                        <p className="text-xs text-gray-500 mb-2">postulantes</p>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                          Ver postulantes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Convenios */}
          {activeTab === 'convenios' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Convenios</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  <DocumentPlusIcon className="w-5 h-5" />
                  Subir nuevo convenio
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_CONVENIOS.map((convenio) => (
                  <div
                    key={convenio.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <DocumentCheckIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {convenio.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(convenio.uploadedDate).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{convenio.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                        <DocumentArrowDownIcon className="w-5 h-5" />
                        Descargar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Notas Internas */}
          {activeTab === 'notas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Notas Internas</h2>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  <PlusIcon className="w-5 h-5" />
                  Agregar Nota
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_NOTAS.map((nota) => (
                  <div
                    key={nota.id}
                    className="bg-white border-l-2 border-primary rounded-lg p-5 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {nota.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{nota.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(nota.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{nota.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar nota */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nota Interna</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              placeholder="Escribe tu nota aquí..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setNewNote('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Guardar Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresasDetail;

