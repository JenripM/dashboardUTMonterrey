import React, { useState, useEffect } from 'react';
import { getMapaCalorPostulacionesData, getRangosPostulaciones } from '../services/mapaCalorPostulacionesService';

const MapaCalorPostulacionesChart = () => {
  const [data, setData] = useState([]);
  const [rangos, setRangos] = useState(['1-2', '3-5', '6-10', '11+']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dataResult, rangosResult] = await Promise.all([
          getMapaCalorPostulacionesData(),
          getRangosPostulaciones()
        ]);
        setData(dataResult);
        setRangos(rangosResult);
      } catch (err) {
        console.error('Error cargando datos del mapa de calor:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para calcular color dinámicamente basado en porcentaje
  // Gradiente desde amarillo claro (0%) hasta azul muy oscuro (100%)
  const getColorIntensity = (porcentaje) => {
    if (porcentaje === 0) return { backgroundColor: '#f3f4f6' }; // bg-gray-100
    
    // Normalizar el porcentaje a un valor entre 0 y 1
    const normalized = Math.min(porcentaje / 100, 1);
    
    // Calcular componentes RGB para el gradiente
    // Amarillo claro (255, 255, 150) -> Azul claro (150, 200, 255) -> Azul oscuro (0, 0, 150)
    let red, green, blue;
    
    if (normalized <= 0.4) {
      // Primera parte: amarillo -> azul claro
      const t = normalized / 0.4; // 0 a 1
      red = Math.round(255 * (1 - t) + 150 * t);
      green = Math.round(255 * (1 - t) + 200 * t);
      blue = Math.round(150 * (1 - t) + 255 * t);
    } else {
      // Segunda parte: azul claro -> azul oscuro (más gradual)
      const t = (normalized - 0.4) / 0.6; // 0 a 1
      red = Math.round(150 * (1 - t) + 0 * t);
      green = Math.round(200 * (1 - t) + 0 * t);
      blue = Math.round(255 * (1 - t) + 150 * t);
    }
    
    // Crear el color CSS personalizado
    const color = `rgb(${red}, ${green}, ${blue})`;
    
    return { backgroundColor: color };
  };

  // Función para obtener el color del texto basado en el brillo del fondo
  const getTextColor = (porcentaje) => {
    if (porcentaje === 0) return 'text-gray-800';
    
    // Calcular el brillo del color de fondo usando la misma fórmula
    const normalized = Math.min(porcentaje / 100, 1);
    let red, green, blue;
    
    if (normalized <= 0.4) {
      // Primera parte: amarillo -> azul claro
      const t = normalized / 0.4;
      red = 255 * (1 - t) + 150 * t;
      green = 255 * (1 - t) + 200 * t;
      blue = 150 * (1 - t) + 255 * t;
    } else {
      // Segunda parte: azul claro -> azul oscuro
      const t = (normalized - 0.4) / 0.6;
      red = 150 * (1 - t) + 0 * t;
      green = 200 * (1 - t) + 0 * t;
      blue = 255 * (1 - t) + 150 * t;
    }
    
    // Calcular luminancia relativa
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    
    // Usar texto oscuro en fondos claros, texto claro en fondos oscuros
    return luminance > 0.5 ? 'text-gray-800' : 'text-white';
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Mapa de Calor: Postulaciones por Carrera
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos del mapa de calor...</p>
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
          Mapa de Calor: Postulaciones por Carrera
        </h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          <div className="text-center">
            <p>Error cargando datos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Mapa de Calor: Postulaciones por Carrera
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No hay datos de aplicaciones exitosas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Postulaciones necesarias para conseguir un trabajo
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Cantidad de postulaciones realizadas antes de conseguir el primer trabajo, segun la carrera.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 min-w-[200px]">
                Carrera
              </th>
              {rangos.map(rango => (
                <th key={rango} className="border border-gray-300 bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-700 min-w-[80px]">
                  {rango}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((carrera, index) => (
              <tr key={carrera.carrera}>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900">
                  {carrera.carrera}
                </td>
                {rangos.map(rango => {
                  const porcentaje = carrera.rangos[rango] || 0;
                  const colorStyle = getColorIntensity(porcentaje);
                  return (
                    <td 
                      key={rango}
                      className={`border border-gray-300 px-4 py-2 text-center text-sm font-medium ${getTextColor(porcentaje)}`}
                      style={colorStyle}
                    >
                      {porcentaje}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex items-center justify-center space-x-3 text-xs text-gray-600">
        <span>Intensidad:</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300"></div>
          <span>0%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="w-4 h-4 border border-gray-300" 
            style={getColorIntensity(10)}
          ></div>
          <span>10%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="w-4 h-4 border border-gray-300" 
            style={getColorIntensity(25)}
          ></div>
          <span>25%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="w-4 h-4 border border-gray-300" 
            style={getColorIntensity(50)}
          ></div>
          <span>50%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="w-4 h-4 border border-gray-300" 
            style={getColorIntensity(75)}
          ></div>
          <span>75%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="w-4 h-4 border border-gray-300" 
            style={getColorIntensity(100)}
          ></div>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default MapaCalorPostulacionesChart;
