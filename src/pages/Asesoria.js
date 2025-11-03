import { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  ChevronRightIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Asesoria = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  // Datos falsos para las sesiones programadas
  const scheduledSessions = [
    {
      id: 1,
      student: 'María F. López',
      day: 'Lun',
      time: '10:00 AM',
      duration: 1,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      id: 2,
      student: 'Ana García',
      day: 'Mar',
      time: '11:00 AM',
      duration: 1,
      color: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    },
    {
      id: 3,
      student: 'Carlos Ramírez',
      day: 'Lun',
      time: '2:00 PM',
      duration: 1,
      color: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
      id: 4,
      student: 'Patricia M.',
      day: 'Vie',
      time: '9:00 AM',
      duration: 1,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    },
    {
      id: 5,
      student: 'José Luis R.',
      day: 'Jue',
      time: '3:00 PM',
      duration: 1,
      color: 'bg-slate-50 border-slate-200 text-slate-700',
    },
  ];

  // Datos falsos para próximas sesiones
  const upcomingSessions = [
    {
      id: 1,
      name: 'María Fernanda López',
      career: 'Ingeniería de Software',
      date: '10 feb',
      time: '10:00 AM',
      sessionType: 'Revisión de CV',
      avatar: 'MFL',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Carlos Alberto Ramírez',
      career: 'Administración',
      date: '10 feb',
      time: '2:00 PM',
      sessionType: 'Preparación para entrevista',
      avatar: 'CAR',
      color: 'bg-sky-500',
    },
    {
      id: 3,
      name: 'Ana Sofía García',
      career: 'Marketing Digital',
      date: '11 feb',
      time: '11:00 AM',
      sessionType: 'Orientación profesional',
      avatar: 'ASG',
      color: 'bg-cyan-500',
    },
    {
      id: 4,
      name: 'José Luis Rodríguez',
      career: 'Diseño Gráfico',
      date: '11 feb',
      time: '3:00 PM',
      sessionType: 'Revisión de CV',
      avatar: 'JLR',
      color: 'bg-indigo-500',
    },
    {
      id: 5,
      name: 'Patricia Mendoza',
      career: 'Contabilidad',
      date: '12 feb',
      time: '9:00 AM',
      sessionType: 'Preparación para entrevista',
      avatar: 'PM',
      color: 'bg-slate-500',
    },
    {
      id: 6,
      name: 'Roberto Sánchez',
      career: 'Ingeniería Industrial',
      date: '12 feb',
      time: '1:00 PM',
      sessionType: 'Orientación profesional',
      avatar: 'RS',
      color: 'bg-gray-600',
    },
  ];

  // Horarios del calendario
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Función para obtener sesiones en un día y hora específicos
  const getSessionForSlot = (day, time) => {
    return scheduledSessions.find(
      (session) => session.day === day && session.time === time
    );
  };

  // Filtrar sesiones por búsqueda
  const filteredSessions = upcomingSessions.filter((session) =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Modal Nueva Sesión */}
      {showNewSessionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowNewSessionModal(false)}
          ></div>

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all">
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Nueva Sesión de Asesoría</h3>
                  <p className="text-sm text-gray-600 mt-1">Programa una sesión con un estudiante</p>
                </div>
                <button
                  onClick={() => setShowNewSessionModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6 space-y-6">
                {/* Información del Estudiante */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estudiante *
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-white">
                        <option value="">Seleccionar estudiante...</option>
                        <option value="1">María Fernanda López - Ingeniería de Software</option>
                        <option value="2">Carlos Alberto Ramírez - Administración</option>
                        <option value="3">Ana Sofía García - Marketing Digital</option>
                        <option value="4">José Luis Rodríguez - Diseño Gráfico</option>
                        <option value="5">Patricia Mendoza - Contabilidad</option>
                        <option value="6">Roberto Sánchez - Ingeniería Industrial</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      Fecha *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <ClockIcon className="w-4 h-4 inline mr-1" />
                      Hora *
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Tipo de Sesión */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Sesión *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all group">
                      <input
                        type="radio"
                        name="sessionType"
                        value="cv"
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900 group-hover:text-primary">
                          Revisión de CV
                        </span>
                        <span className="block text-xs text-gray-500">
                          Análisis y mejora
                        </span>
                      </div>
                    </label>

                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all group">
                      <input
                        type="radio"
                        name="sessionType"
                        value="interview"
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900 group-hover:text-primary">
                          Entrevista
                        </span>
                        <span className="block text-xs text-gray-500">
                          Preparación
                        </span>
                      </div>
                    </label>

                    <label className="relative flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all group">
                      <input
                        type="radio"
                        name="sessionType"
                        value="orientation"
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900 group-hover:text-primary">
                          Orientación
                        </span>
                        <span className="block text-xs text-gray-500">
                          Profesional
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Duración */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duración estimada
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-white">
                    <option value="30">30 minutos</option>
                    <option value="45" selected>45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="90">1 hora 30 minutos</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>

                {/* Modalidad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Modalidad
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 relative flex items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all">
                      <input
                        type="radio"
                        name="modality"
                        value="virtual"
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-gray-700">💻 Virtual</span>
                    </label>
                    <label className="flex-1 relative flex items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all">
                      <input
                        type="radio"
                        name="modality"
                        value="presencial"
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-gray-700">🏢 Presencial</span>
                    </label>
                  </div>
                </div>

                {/* Notas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas adicionales
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Agrega notas o comentarios sobre la sesión..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  ></textarea>
                </div>

                {/* Link de reunión (opcional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Link de reunión (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Footer del Modal */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowNewSessionModal(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Aquí irá la lógica para guardar
                    setShowNewSessionModal(false);
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Crear Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asesoría</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona sesiones de orientación profesional con estudiantes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total de sesiones</p>
            <p className="text-2xl font-bold text-primary">24</p>
          </div>
          <div className="h-12 w-px bg-gray-300"></div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Esta semana</p>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario Semanal - Ocupa 2 columnas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header del calendario */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Calendario Semanal
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Semana del 10 - 15 de febrero, 2025
                </p>
              </div>
              <button
                onClick={() => setShowNewSessionModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Nueva Sesión</span>
              </button>
            </div>

            {/* Calendario Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header de días */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                  <div className="p-4 text-sm font-semibold text-gray-500 border-r border-gray-200">
                    Hora
                  </div>
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Filas de tiempo */}
                <div className="divide-y divide-gray-200">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-7 hover:bg-gray-25">
                      {/* Columna de hora */}
                      <div className="p-4 text-sm font-medium text-gray-600 border-r border-gray-200 bg-gray-50">
                        {time}
                      </div>

                      {/* Columnas de días */}
                      {daysOfWeek.map((day) => {
                        const session = getSessionForSlot(day, time);
                        return (
                          <div
                            key={`${day}-${time}`}
                            className="p-2 border-r border-gray-200 last:border-r-0 min-h-[70px] hover:bg-blue-25 transition-colors cursor-pointer"
                          >
                            {session && (
                              <div
                                className={`${session.color} border-l-4 rounded-lg p-2 h-full flex flex-col justify-center transition-all duration-200 hover:shadow-md hover:scale-105`}
                              >
                                <p className="text-xs font-semibold truncate">
                                  {session.student}
                                </p>
                                <p className="text-xs opacity-75 mt-0.5">
                                  {session.time}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Sesiones Completadas
                  </p>
                  <p className="text-3xl font-bold mt-2">156</p>
                  <p className="text-blue-100 text-xs mt-1">↑ 12% vs mes anterior</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <CalendarIcon className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100 text-sm font-medium">
                    Estudiantes Atendidos
                  </p>
                  <p className="text-3xl font-bold mt-2">89</p>
                  <p className="text-sky-100 text-xs mt-1">↑ 8% vs mes anterior</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <UserCircleIcon className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-100 text-sm font-medium">
                    Promedio Duración
                  </p>
                  <p className="text-3xl font-bold mt-2">45m</p>
                  <p className="text-slate-100 text-xs mt-1">Tiempo promedio</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <ClockIcon className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Próximas Sesiones - Ocupa 1 columna */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <h2 className="text-xl font-bold text-gray-900">
                Próximas Sesiones
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredSessions.length} sesiones programadas
              </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Lista de sesiones */}
            <div className="divide-y divide-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`${session.color} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200`}
                    >
                      <span className="text-white font-bold text-sm">
                        {session.avatar}
                      </span>
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
                            {session.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {session.career}
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                      </div>

                      {/* Fecha y hora */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span>{session.time}</span>
                        </div>
                      </div>

                      {/* Tipo de sesión */}
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                          {session.sessionType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer con acción */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-white border border-primary rounded-lg transition-all duration-200 hover:shadow-md">
                Ver todas las sesiones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Asesoria;

