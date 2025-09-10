import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getCareerStats } from '../services/userStatsService';

const EstudiantesActivosCarreraChart = () => {
  const [carrerasData, setCarrerasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCareerStats();
        setCarrerasData(data);
      } catch (err) {
        console.error('Error cargando datos de carreras:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes Activos por Carrera</h2>
        <div className="flex items-center justify-center text-gray-500" style={{ height: '300px' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos de carreras...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes Activos por Carrera</h2>
        <div className="flex items-center justify-center text-red-500" style={{ height: '300px' }}>
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Estudiantes Activos por Carrera</h2>
      <p className="mt-1 text-sm text-gray-500">Carreras con más del 0.5% de estudiantes activos</p>
      <div className="mt-6" style={{ height: `${Math.max(300, carrerasData.length * 40 + 100)}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={carrerasData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={200}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                // Truncar nombres largos y agregar ...
                return value.length > 25 ? value.substring(0, 25) + '...' : value;
              }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                      <p className="font-semibold text-gray-900">{data.name}</p>
                      <p className="text-blue-600">Estudiantes: {data.value}</p>
                      <p className="text-gray-600">Porcentaje: {data.percentage?.toFixed(1)}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" fill="#028bbf" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstudiantesActivosCarreraChart;
