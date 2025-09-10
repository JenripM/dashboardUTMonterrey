import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getEstudiantesPorOfertaData, getEstudiantesPorOfertaStats, getEstudiantesPorOfertaDetailedStats } from '../services/estudiantesPorOfertaService';

const EstudiantesPorOfertaChart = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [detailedStats, setDetailedStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [chartData, chartStats, detailedStatsData] = await Promise.all([
          getEstudiantesPorOfertaData(),
          getEstudiantesPorOfertaStats(),
          getEstudiantesPorOfertaDetailedStats()
        ]);
        
        setData(chartData);
        setStats(chartStats);
        setDetailedStats(detailedStatsData);
      } catch (error) {
        console.error('Error loading estudiantes por oferta data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dificultad por Área de Estudio
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos de dificultad por área...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dificultad por Área de Estudio
        </h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dificultad por Área de Estudio
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isInfinite = data.ratio === 999;
      const difficulty = isInfinite ? 'Muy Difícil' : 
                       data.ratio > 10 ? 'Difícil' : 
                       data.ratio > 5 ? 'Moderado' : 'Fácil';
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Estudiantes:</span> {data.estudiantes.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Ofertas:</span> {data.ofertas.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Ratio:</span> {isInfinite ? '∞' : `${data.ratio} estudiantes por oferta`}
            </p>
            <p className="text-sm">
              <span className="font-medium">Dificultad:</span> 
              <span className={`ml-1 px-2 py-1 rounded text-xs ${
                isInfinite ? 'bg-red-100 text-red-800' :
                data.ratio > 10 ? 'bg-orange-100 text-orange-800' :
                data.ratio > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {difficulty}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dificultad por Área de Estudio
            </h3>
            <p className="text-sm text-gray-600">
              Muestra cuántos estudiantes compiten por cada oferta laboral. 
              <span className="font-medium text-red-600"> Barras más altas = más difícil conseguir trabajo</span>
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Áreas válidas: <span className="font-semibold text-gray-800">{detailedStats.areasValidas || stats.totalAreas}</span></p>
            <p>Áreas filtradas: <span className="font-semibold text-gray-800">{detailedStats.areasFiltradas || 0}</span></p>
            <p>Total estudiantes: <span className="font-semibold text-gray-800">{stats.totalEstudiantes}</span></p>
            <p>Total ofertas: <span className="font-semibold text-gray-800">{stats.totalOfertas}</span></p>
            <p>Promedio: <span className="font-semibold text-gray-800">{stats.promedioRatio} estudiantes/oferta</span></p>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="area" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              stroke="#666"
            />
            <YAxis 
              label={{ value: 'Estudiantes por Oferta', angle: -90, position: 'insideLeft' }}
              fontSize={12}
              stroke="#666"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="ratio" 
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => {
                const getColor = (ratio) => {
                  if (ratio === 999) return '#dc2626'; // Muy difícil - rojo oscuro
                  if (ratio > 10) return '#ea580c';    // Difícil - naranja
                  if (ratio > 5) return '#d97706';     // Moderado - amarillo
                  return '#16a34a';                    // Fácil - verde
                };
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getColor(entry.ratio)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-3">
        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <span className="font-medium">Interpretación:</span> 
            Un ratio de 5 significa que hay 5 estudiantes compitiendo por cada oferta laboral en esa área.
          </p>
        </div>
        
        
        <div className="p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Código de colores:</span>
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
              <span>Muy Difícil (∞ o sin ofertas)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-600 rounded mr-2"></div>
              <span>Difícil (&gt;10 estudiantes/oferta)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-600 rounded mr-2"></div>
              <span>Moderado (5-10 estudiantes/oferta)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
              <span>Fácil (&lt;5 estudiantes/oferta)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstudiantesPorOfertaChart;
