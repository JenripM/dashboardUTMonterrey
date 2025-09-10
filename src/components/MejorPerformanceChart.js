import React, { useState, useEffect } from 'react';
import { getTopAlumnos } from '../services/desempenoAlumnosService';

const MejorPerformanceChart = () => {
  const [topAlumnos, setTopAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTopAlumnos();
        setTopAlumnos(data);
      } catch (err) {
        console.error('Error cargando top alumnos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con mejor performance</h2>
        <div className="flex items-center justify-center h-32 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con mejor performance</h2>
        <div className="flex items-center justify-center h-32 text-red-500">
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (topAlumnos.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con mejor performance</h2>
        <div className="flex items-center justify-center h-32 text-gray-500">
          <p>No hay datos de análisis de CV disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Estudiantes con mejor performance</h2>
      <div className="mt-6 space-y-4">
        {topAlumnos.map((estudiante) => {
          // Validación adicional en el componente
          const score = typeof estudiante.averageScore === 'number' && !isNaN(estudiante.averageScore) 
            ? estudiante.averageScore 
            : 0;
          const displayScore = score > 0 ? score : 'N/A';
          
          return (
            <div key={estudiante.name} className="relative">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">{estudiante.name}</div>
                <div className="text-sm font-medium text-gray-500">{displayScore}</div>
              </div>
              {score > 0 && (
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-success rounded-full"
                    style={{ width: `${Math.min(score, 100)}%`, backgroundColor: '#00bf63' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MejorPerformanceChart;
