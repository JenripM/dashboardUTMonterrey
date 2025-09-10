import React, { useState, useEffect } from 'react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { getTreemapData } from '../services/offerDemandService';

const OfertasPorCampoTreemap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const treemapData = await getTreemapData();
        setData(treemapData);
      } catch (err) {
        console.error('Error cargando datos de ofertas por campo:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Función para formatear el tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-4 h-4 rounded-sm" 
              style={{ backgroundColor: data.fill }}
            />
            <p className="font-semibold text-gray-900">{data.name}</p>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.value}</span> ofertas laborales
          </p>
          {data.isGroup && data.originalFields && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Incluye:</p>
              <div className="max-h-20 overflow-y-auto">
                {data.originalFields.slice(0, 5).map((field, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    • {field.name} ({field.value})
                  </p>
                ))}
                {data.originalFields.length > 5 && (
                  <p className="text-xs text-gray-500">
                    ... y {data.originalFields.length - 5} más
                  </p>
                )}
              </div>
            </div>
          )}
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
          Distribución de Ofertas Laborales por Campo
        </h3>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos de ofertas...</p>
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
          Distribución de Ofertas Laborales por Campo
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
          Distribución de Ofertas Laborales por Campo
        </h3>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p>No hay datos de ofertas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Distribución de Ofertas Laborales por Campo
        </h3>
        <p className="text-sm text-gray-500">
          El tamaño de cada rectángulo representa la cantidad de ofertas disponibles. 
          Campos con menos del 2% se agrupan en "Otros" para mejor visualización. 
          Se excluyen registros con campo "No especificado".
        </p>
      </div>

      {/* Gráfico Treemap */}
      <div className="h-96 mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Total de ofertas:</span> {data.reduce((sum, item) => sum + item.value, 0)}
          </div>
          <div>
            <span className="font-medium">Campos principales:</span> {data.filter(item => !item.isGroup).length}
          </div>
          <div>
            <span className="font-medium">Campos agrupados:</span> {data.find(item => item.isGroup)?.originalFields?.length || 0}
          </div>
          <div>
            <span className="font-medium">Campo líder:</span> {data[0]?.name} ({data[0]?.value})
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfertasPorCampoTreemap;

