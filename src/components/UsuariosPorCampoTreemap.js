import React, { useState, useEffect } from 'react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { getUsersData } from '../services/firebaseService';

const UsuariosPorCampoTreemap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersData();
        
        // Agrupar usuarios por field_of_study con validación defensiva
        const fieldCounts = {};
        
        usersData.forEach(user => {
          const field = user?.metadata?.field_of_study || 'No especificado';
          if (field && typeof field === 'string') {
            fieldCounts[field] = (fieldCounts[field] || 0) + 1;
          }
        });

        // Convertir a formato para Treemap
        const treemapData = Object.entries(fieldCounts)
          .map(([field, count]) => ({
            name: field,
            value: count,
            fill: getFieldColor(field)
          }))
          .sort((a, b) => b.value - a.value);

        setData(treemapData);
      } catch (err) {
        console.error('Error cargando datos de usuarios por campo:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Función para asignar colores por campo (mismos colores que ofertas para consistencia)
  const getFieldColor = (field) => {
    const colors = {
      'Programming': '#3B82F6',      // Azul
      'Marketing': '#10B981',        // Verde
      'Finance': '#F59E0B',          // Amarillo
      'Design': '#8B5CF6',           // Púrpura
      'Sales': '#EF4444',            // Rojo
      'HR': '#06B6D4',               // Cian
      'Operations': '#84CC16',       // Lima
      'No especificado': '#6B7280'   // Gris
    };
    return colors[field] || '#9CA3AF';
  };

  // Función para formatear el tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.value}</span> usuarios
          </p>
        </div>
      );
    }
    return null;
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Distribución de Usuarios por Campo de Estudio
        </h3>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos de usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Distribución de Usuarios por Campo de Estudio
        </h3>
        <div className="flex items-center justify-center h-96 text-red-500">
          <div className="text-center">
            <p>Error cargando datos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Distribución de Usuarios por Campo de Estudio
        </h3>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p>No hay datos de usuarios disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Distribución de Usuarios por Campo de Estudio
        </h3>
        <p className="text-sm text-gray-500">
          El tamaño de cada rectángulo representa la cantidad de usuarios registrados
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

      {/* Leyenda de colores */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {data.slice(0, 8).map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-xs text-gray-600">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>

      {/* Estadísticas resumidas */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Resumen:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Total de usuarios:</span> {data.reduce((sum, item) => sum + item.value, 0)}
          </div>
          <div>
            <span className="font-medium">Campos de estudio:</span> {data.length}
          </div>
          <div>
            <span className="font-medium">Campo más popular:</span> {data[0]?.name} ({data[0]?.value})
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosPorCampoTreemap;

