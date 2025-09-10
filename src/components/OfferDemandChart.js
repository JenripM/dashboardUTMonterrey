import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { analyzeOfferDemand, getFieldsAnalysisAndRawData, analyzeOfferDemandFromData } from '../services/offerDemandService';

const OfferDemandChart = () => {
  const [selectedField, setSelectedField] = useState('all');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  const [allData, setAllData] = useState(null); // Cache de todos los datos
  const [isFiltering, setIsFiltering] = useState(false); // Indicador de filtrado local

  // Cargar todos los datos una sola vez al montar el componente
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cargar todos los datos en una sola llamada optimizada
        const { fields, analysis: fullAnalysis, rawData } = await getFieldsAnalysisAndRawData();
        
        setAvailableFields(fields);
        
        // Si hay rawData (primera carga), guardarlo para filtrado local
        // Si no hay rawData (desde caché), solo usar analysis
        if (rawData) {
          setAllData({ analysis: fullAnalysis, rawData });
        } else {
          setAllData({ analysis: fullAnalysis, rawData: null });
        }
        
        setAnalysis(fullAnalysis);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Filtrar datos localmente cuando cambia el filtro
  useEffect(() => {
    if (!allData) return;
    
    const filterData = async () => {
      setIsFiltering(true);
      
      if (selectedField === 'all') {
        setAnalysis(allData.analysis);
        setIsFiltering(false);
        return;
      }
      
      // Si no hay rawData (desde caché), hacer nueva llamada para el filtro específico
      if (!allData.rawData) {
        try {
          const filteredAnalysis = await analyzeOfferDemand(selectedField);
          setAnalysis(filteredAnalysis);
        } catch (error) {
          console.error('Error filtrando datos:', error);
          setAnalysis(allData.analysis);
        }
      } else {
        // Si hay rawData, filtrar localmente
        const filteredAnalysis = analyzeOfferDemandFromData(
          allData.rawData.practicasData,
          allData.rawData.usersData,
          selectedField
        );
        setAnalysis(filteredAnalysis);
      }
      
      setIsFiltering(false);
    };
    
    filterData();
  }, [selectedField, allData]);

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Análisis de Oferta vs Demanda
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando análisis...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Análisis de Oferta vs Demanda
        </h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          <div className="text-center">
            <p>Error cargando datos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return <div className="text-center py-8">No hay datos disponibles</div>;

  // Validaciones defensivas para datos de Firestore
  const competencies = analysis.competencies || {};
  const totalOffers = analysis.totalOffers || 0;
  const totalUsers = analysis.totalUsers || 0;

  // Preparar datos para los 3 gráficos usando porcentajes normalizados
  const demandData = Object.entries(competencies)
    .filter(([_, data]) => data && typeof data === 'object') // Filtrar datos válidos
    .map(([competency, data]) => ({
      name: competency,
      value: data.offerPercentage
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const supplyData = Object.entries(competencies)
    .filter(([_, data]) => data && typeof data === 'object') // Filtrar datos válidos
    .map(([competency, data]) => ({
      name: competency,
      value: data.demandPercentage || 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const bottleneckData = Object.entries(competencies)
    .filter(([_, data]) => data && typeof data === 'object') // Filtrar datos válidos
    .map(([competency, data]) => ({
      name: competency,
      value: data.gapPercentage || 0
    }))
    .filter(item => item.value > 0) // Solo competencias con escasez (más oferta que demanda)
    .sort((a, b) => b.value - a.value) // Ordenar por mayor escasez
    .slice(0, 8);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Análisis de Competencias</h2>
          <p className="text-sm text-gray-500 mt-1">
            Comparación entre competencias demandadas y ofrecidas
            {selectedField !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Filtrado por: {selectedField}
                {isFiltering && <span className="ml-1">(filtrando...)</span>}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Filtrar por campo:</label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los campos</option>
            {availableFields.map(field => (
              <option key={field.field} value={field.field}>
                {field.field} ({field.competencies} competencias)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Total Ofertas</h3>
          <p className="text-2xl font-bold text-blue-900">{totalOffers}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Usuarios</h3>
          <p className="text-2xl font-bold text-green-900">{totalUsers}</p>
        </div>

      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Competencias más demandadas */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Skills que más demandan las empresas</h3>
          {demandData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <p>No hay datos de competencias demandadas para el filtro seleccionado</p>
            </div>
          ) : (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demandData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`, 
                    'Porcentaje de ofertas que requieren esta competencia'
                  ]}
                  labelFormatter={(label) => `Competencia: ${label}`}
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(value) => `${value}%`}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Competencias más ofrecidas */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Skills que tienen los usuarios</h3>
          {supplyData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <p>No hay datos de competencias ofrecidas para el filtro seleccionado</p>
            </div>
          ) : (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={supplyData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`, 
                    'Porcentaje de usuarios que tienen esta competencia'
                  ]}
                  labelFormatter={(label) => `Competencia: ${label}`}
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#10B981"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(value) => `${value}%`}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Cuellos de botella */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Cuellos de botella: Skills que las empresas demandan pero no tienen los usuarios</h3>
          {bottleneckData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <p>No hay cuellos de botella identificados para el filtro seleccionado</p>
            </div>
          ) : (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bottleneckData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`, 
                    'Escasez en el mercado (diferencia entre demanda y oferta)'
                  ]}
                  labelFormatter={(label) => `Competencia: ${label}`}
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#EF4444"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(value) => `${value}%`}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferDemandChart;
