import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { getAreasOfInterest } from '../services/areasOfInterestService';

const AreasOfInterestChart = () => {
  const [areasInteres, setAreasInteres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getAreasOfInterest();
        // Filtrar áreas que contengan "error" en el nombre (case insensitive)
        const filteredData = data.filter(area => 
          !area.name.toLowerCase().includes('error')
        );
        setAreasInteres(filteredData);
      } catch (err) {
        console.error('Error cargando áreas de interés:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
        style={{
          filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        {`${value}%`}
      </text>
    );
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Áreas de Interés</h2>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando áreas de interés...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Áreas de Interés</h2>
        <div className="flex items-center justify-center h-96 text-red-500">
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  // Calcular altura dinámica basada en el número de áreas
  const getChartHeight = () => {
    const baseHeight = 300;
    const minHeight = 250;
    const maxHeight = 600;
    const legendItemHeight = 20;
    const extraSpace = 50;
    
    const calculatedHeight = baseHeight + (areasInteres.length * legendItemHeight) + extraSpace;
    return Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Áreas de Interés</h2>
      <p className="mt-1 text-sm text-gray-500">Distribución de intereses profesionales de los estudiantes</p>
      <div className="mt-6 overflow-hidden" style={{ height: `${getChartHeight()}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={areasInteres}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius="45%"
              outerRadius="80%"
              dataKey="value"
              paddingAngle={1}
              strokeWidth={2}
              stroke="#ffffff"
            >
              {areasInteres.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                `${value}%`,
                `${props.payload.name} (${props.payload.count} estudiantes)`
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              layout="vertical" 
              align="right"
              verticalAlign="middle"
              wrapperStyle={{
                paddingLeft: '20px',
                maxHeight: '100%',
                overflow: 'auto'
              }}
              formatter={(value, entry, index) => (
                <span style={{ 
                  color: '#4B5563', 
                  fontSize: '14px',
                  fontWeight: '500',
                  paddingLeft: '8px'
                }}>
                  {value}
                </span>
              )}
              iconSize={16}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreasOfInterestChart;
