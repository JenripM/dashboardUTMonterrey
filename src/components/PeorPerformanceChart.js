import React, { useState, useEffect } from 'react';
import { getBottomAlumnos } from '../services/desempenoAlumnosService';

const PeorPerformanceChart = () => {
  const [bottomAlumnos, setBottomAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBottomAlumnos();
        setBottomAlumnos(data);
      } catch (err) {
        console.error('Error cargando bottom alumnos:', err);
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
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con peor performance</h2>
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
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con peor performance</h2>
        <div className="flex items-center justify-center h-32 text-red-500">
          <p>Error cargando datos: {error}</p>
        </div>
      </div>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (bottomAlumnos.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Estudiantes con peor performance</h2>
        <div className="flex items-center justify-center h-32 text-gray-500">
          <p>No hay datos de análisis de CV disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Estudiantes con peor performance</h2>
      <div className="mt-6 space-y-4">
        {bottomAlumnos.map((estudiante) => {
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
                    className="h-2 rounded-full"
                    style={{ width: `${Math.min(score, 100)}%`, backgroundColor: '#028bbf' }}
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

export default PeorPerformanceChart;
