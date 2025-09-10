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
import { getInterviewAspectsToImprove } from '../services/aspectsAnalysisService';

const AspectosEntrevistasChart = () => {
  const [aspectosEntrevista, setAspectosEntrevista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getInterviewAspectsToImprove();
        // Filtrar solo aspectos que superen el 10%
        const filteredData = data.filter(aspect => aspect.value >= 10);
        setAspectosEntrevista(filteredData);
      } catch (err) {
        console.error('Error cargando aspectos de entrevistas:', err);
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
        <h2 className="text-lg font-medium text-gray-900">Aspectos a mejorar en Entrevistas</h2>
        <div className="flex items-center justify-center h-80 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando aspectos de entrevistas...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Aspectos a mejorar en Entrevistas</h2>
        <div className="flex items-center justify-center h-80 text-red-500">
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Aspectos a mejorar en Entrevistas</h2>
      <p className="mt-1 text-sm text-gray-500">Aspectos que afectan a más del 10% de estudiantes</p>
      <div className="mt-6" style={{ height: `${Math.max(200, aspectosEntrevista.length * 40 + 100)}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={aspectosEntrevista}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                      <p className="font-semibold text-gray-900">{data.name}</p>
                      <p className="text-blue-600">Estudiantes: {data.value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#024579"
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
    </div>
  );
};

export default AspectosEntrevistasChart;
