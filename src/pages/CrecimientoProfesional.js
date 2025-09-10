import { useState, useEffect } from 'react';
import {
  BriefcaseIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import MejoraEntrevistasChart from '../components/MejoraEntrevistasChart';
import MejorPerformanceChart from '../components/MejorPerformanceChart';
import PeorPerformanceChart from '../components/PeorPerformanceChart';
import ImpactoHerramientasChart from '../components/ImpactoHerramientasChart';
import { getCrecimientoProfesionalMetrics } from '../services/crecimientoProfesionalService';

const CrecimientoProfesional = () => {
  const [timeRange, setTimeRange] = useState('30D');
  const [dateRange] = useState('Jan 01, 2025 - Feb 20, 2025');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const data = await getCrecimientoProfesionalMetrics(timeRange);
        setMetrics(data);
      } catch (err) {
        console.error('Error cargando métricas de crecimiento profesional:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Crecimiento Profesional</h1>
            <p className="mt-1 text-sm text-gray-500">
              Análisis del progreso y desarrollo profesional de nuestros estudiantes y egresados
            </p>
            <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Cargando métricas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Crecimiento Profesional</h1>
            <p className="mt-1 text-sm text-gray-500">
              Análisis del progreso y desarrollo profesional de nuestros estudiantes y egresados
            </p>
            <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error al cargar métricas</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Crecimiento Profesional</h1>
            <p className="mt-1 text-sm text-gray-500">
              Análisis del progreso y desarrollo profesional de nuestros estudiantes y egresados
            </p>
            <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Entrevistas Simuladas',
      value: metrics.totalInterviews.toString(),
      icon: BriefcaseIcon,
      change: `${metrics.interviewChange.value > 0 ? '+' : ''}${metrics.interviewChange.value}%`,
      changeType: metrics.interviewChange.type,
      description: 'en el último mes'
    },
    {
      name: 'CVs Analizados',
      value: metrics.totalCvAnalysis.toString(),
      icon: DocumentTextIcon,
      change: `${metrics.cvAnalysisChange.value > 0 ? '+' : ''}${metrics.cvAnalysisChange.value}%`,
      changeType: metrics.cvAnalysisChange.type,
      description: 'en el último mes'
    },
    {
      name: 'CVs Adaptados',
      value: metrics.totalCvAdaptation.toString(),
      icon: DocumentCheckIcon,
      change: `${metrics.cvAdaptationChange.value > 0 ? '+' : ''}${metrics.cvAdaptationChange.value}%`,
      changeType: metrics.cvAdaptationChange.type,
      description: 'en el último mes'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Crecimiento Profesional</h1>
          <p className="mt-1 text-sm text-gray-500">
            Análisis del progreso y desarrollo profesional de nuestros estudiantes y egresados
          </p>
          <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTimeRange('7D')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              timeRange === '7D'
                ? 'text-primary bg-primary/5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setTimeRange('30D')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              timeRange === '30D'
                ? 'text-primary bg-primary/5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            30D
          </button>
          <button
            onClick={() => setTimeRange('90D')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              timeRange === '90D'
                ? 'text-primary bg-primary/5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            90D
          </button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <div>
              <div className="absolute bg-primary/5 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </div>
            <div className="ml-16 flex items-baseline mt-1">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-success' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className="ml-16 mt-1">
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tendencia de Mejora en Entrevistas */}
        <MejoraEntrevistasChart />

        {/* Impacto de las Herramientas AI */}
        <ImpactoHerramientasChart />
      </div>

      {/* Mejor y Peor Performance */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Estudiantes con mejor performance */}
        <MejorPerformanceChart />

        {/* Estudiantes con peor performance */}
        <PeorPerformanceChart />
      </div>
    </div>
  );
};

export default CrecimientoProfesional;
