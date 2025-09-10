import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportModal = ({ isOpen, onClose }) => {
  const [selectedFields, setSelectedFields] = useState({
    informacionGeneral: {
      checked: true,
      fields: {
        idEntrevista: true,
        fechaCreacion: true,
        puntuacionGeneral: true
      }
    },
    informacionCandidato: {
      checked: true,
      fields: {
        nombre: true,
        telefono: true,
        email: true,
        direccion: true
      }
    },
    informacionProceso: {
      checked: true,
      fields: {
        tituloProceso: true,
        modalidadTrabajo: true,
        monedaSalario: true,
        posicion: true,
        salarioOfrecido: true
      }
    },
    respuestasEntrevista: {
      checked: true,
      fields: {
        preguntasRespuestas: true,
        enlacesVideos: true,
        enlaceCV: true
      }
    }
  });

  const handleSectionChange = (section) => {
    const sectionFields = selectedFields[section].fields;
    const allChecked = Object.values(sectionFields).every(value => value);
    
    setSelectedFields({
      ...selectedFields,
      [section]: {
        checked: !allChecked,
        fields: Object.keys(sectionFields).reduce((acc, field) => ({
          ...acc,
          [field]: !allChecked
        }), {})
      }
    });
  };

  const handleFieldChange = (section, field) => {
    const newFields = {
      ...selectedFields[section].fields,
      [field]: !selectedFields[section].fields[field]
    };

    setSelectedFields({
      ...selectedFields,
      [section]: {
        checked: Object.values(newFields).every(value => value),
        fields: newFields
      }
    });
  };

  const generateMockData = () => {
    const mockData = [];
    const nombres = [
      'Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofia', 'Miguel', 'Lucía',
      'Fernando', 'Valentina', 'José', 'Camila', 'Gabriel', 'Isabella', 'Andrés', 'Paula', 'Daniel', 'Andrea'
    ];
    const apellidos = [
      'García', 'Rodríguez', 'López', 'Martínez', 'González', 'Pérez', 'Sánchez', 'Romero', 'Torres', 'Flores',
      'Vargas', 'Ruiz', 'Ramírez', 'Cruz', 'Morales', 'Reyes', 'Ortiz', 'Castro', 'Silva', 'Núñez'
    ];
    const preguntas = [
      '¿Cuál es tu mayor fortaleza profesional?',
      '¿Por qué te interesa este puesto?',
      '¿Dónde te ves en 5 años?',
      'Cuéntame sobre un desafío que hayas superado',
      'Describe tu experiencia más relevante',
      '¿Qué habilidades técnicas dominas?',
      '¿Cómo trabajas en equipo?',
      '¿Qué te motiva profesionalmente?',
      'Describe tu proyecto más exitoso',
      '¿Qué buscas en tu próximo empleo?'
    ];
    const respuestas = [
      'Mi capacidad de adaptación y aprendizaje rápido me permite enfrentar nuevos desafíos con confianza...',
      'Me apasiona la innovación y el impacto que puedo generar en proyectos desafiantes...',
      'Me veo liderando proyectos importantes y contribuyendo al crecimiento del equipo...',
      'En mi último proyecto, enfrenté un desafío técnico complejo que resolví mediante...',
      'Durante mi práctica profesional, lideré un equipo de desarrollo exitosamente...',
      'Domino varias tecnologías y frameworks modernos, incluyendo React, Node.js y Python...',
      'Disfruto colaborando en equipos multidisciplinarios y aportando diferentes perspectivas...',
      'Busco constantemente oportunidades para crecer y aprender nuevas tecnologías...',
      'Implementé un sistema que mejoró la eficiencia del proceso en un 40%...',
      'Busco un ambiente que fomente la innovación y el desarrollo profesional...'
    ];
    const posiciones = [
      'Desarrollador Frontend',
      'UX Designer',
      'Product Manager',
      'Marketing Digital',
      'Data Analyst',
      'Backend Developer',
      'DevOps Engineer',
      'Business Analyst',
      'QA Engineer',
      'Project Manager'
    ];
    const modalidades = ['Presencial', 'Remoto', 'Híbrido'];
    const distritos = [
      'San Isidro', 'Miraflores', 'San Borja', 'Surco', 'La Molina',
      'Barranco', 'Jesús María', 'Lince', 'San Miguel', 'Magdalena'
    ];

    for (let i = 0; i < 800; i++) {
      const nombreIndex = Math.floor(Math.random() * nombres.length);
      const apellidoIndex = Math.floor(Math.random() * apellidos.length);
      const nombreCompleto = `${nombres[nombreIndex]} ${apellidos[apellidoIndex]}`;
      const id = 20000 + i;
      
      // Generate random date between 2024-01-01 and 2025-12-31
      const startDate = new Date(2024, 0, 1).getTime();
      const endDate = new Date(2025, 11, 31).getTime();
      const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
      const fechaFormateada = randomDate.toISOString().split('T')[0];

      // Generate random questions and answers
      const preguntaIndex1 = Math.floor(Math.random() * preguntas.length);
      const preguntaIndex2 = Math.floor(Math.random() * preguntas.length);
      const preguntaIndex3 = Math.floor(Math.random() * preguntas.length);

      mockData.push({
        'ID Entrevista': `ENT-${id}`,
        'Fecha Creación': fechaFormateada,
        'Puntuación General': Math.floor(Math.random() * 20 + 80),
        'Nombre': nombreCompleto,
        'Teléfono': `+51 9${Math.floor(Math.random() * 90000000 + 10000000)}`,
        'Email': `${nombreCompleto.toLowerCase().replace(' ', '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@gmail.com`,
        'Dirección': `Av. Principal ${100 + Math.floor(Math.random() * 900)}, ${distritos[Math.floor(Math.random() * distritos.length)]}`,
        'Título Proceso': `Proceso de Selección ${Math.floor(Math.random() * 4 + 1)}Q ${randomDate.getFullYear()}`,
        'Modalidad Trabajo': modalidades[Math.floor(Math.random() * modalidades.length)],
        'Moneda Salario': 'PEN',
        'Posición': posiciones[Math.floor(Math.random() * posiciones.length)],
        'Salario Ofrecido': `${Math.floor(Math.random() * 5000 + 3000)}`,
        'Pregunta 1': preguntas[preguntaIndex1],
        'Respuesta 1': respuestas[preguntaIndex1],
        'Video 1': `myworkin.pe/videos/${id}_1`,
        'Pregunta 2': preguntas[preguntaIndex2],
        'Respuesta 2': respuestas[preguntaIndex2],
        'Video 2': `myworkin.pe/videos/${id}_2`,
        'Pregunta 3': preguntas[preguntaIndex3],
        'Respuesta 3': respuestas[preguntaIndex3],
        'Video 3': `myworkin.pe/videos/${id}_3`,
        'CV': `myworkin.pe/cvs/cv/${id}.pdf`
      });
    }

    return mockData;
  };

  const handleExport = () => {
    const mockData = generateMockData();
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(mockData);

    // Set column widths
    const colWidths = [
      { wch: 12 }, // ID
      { wch: 12 }, // Fecha
      { wch: 10 }, // Puntuación
      { wch: 20 }, // Nombre
      { wch: 15 }, // Teléfono
      { wch: 25 }, // Email
      { wch: 30 }, // Dirección
      { wch: 25 }, // Título
      { wch: 15 }, // Modalidad
      { wch: 8 },  // Moneda
      { wch: 20 }, // Posición
      { wch: 12 }, // Salario
      { wch: 40 }, // Pregunta 1
      { wch: 50 }, // Respuesta 1
      { wch: 35 }, // Video 1
      { wch: 40 }, // Pregunta 2
      { wch: 50 }, // Respuesta 2
      { wch: 35 }, // Video 2
      { wch: 40 }, // Pregunta 3
      { wch: 50 }, // Respuesta 3
      { wch: 35 }, // Video 3
      { wch: 35 }, // CV
    ];
    ws['!cols'] = colWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Estudiantes");

    // Generate Excel file and trigger download
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    
    // Convert binary string to ArrayBuffer
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    
    // Trigger download
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'Estudiantes_Seleccionados.xlsx');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Exportar Estudiantes Seleccionados</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Cerrar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-6">
          {/* Información General */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFields.informacionGeneral.checked}
                onChange={() => handleSectionChange('informacionGeneral')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">Información General</span>
            </div>
            <div className="ml-6 space-y-2">
              {Object.entries(selectedFields.informacionGeneral.fields).map(([field, checked]) => (
                <div key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleFieldChange('informacionGeneral', field)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {field === 'idEntrevista' ? 'ID Entrevista' :
                     field === 'fechaCreacion' ? 'Fecha Creación' :
                     field === 'puntuacionGeneral' ? 'Puntuación General' : field}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del Candidato */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFields.informacionCandidato.checked}
                onChange={() => handleSectionChange('informacionCandidato')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">Información del Candidato</span>
            </div>
            <div className="ml-6 space-y-2">
              {Object.entries(selectedFields.informacionCandidato.fields).map(([field, checked]) => (
                <div key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleFieldChange('informacionCandidato', field)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del Proceso */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFields.informacionProceso.checked}
                onChange={() => handleSectionChange('informacionProceso')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">Información del Proceso</span>
            </div>
            <div className="ml-6 space-y-2">
              {Object.entries(selectedFields.informacionProceso.fields).map(([field, checked]) => (
                <div key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleFieldChange('informacionProceso', field)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {field === 'tituloProceso' ? 'Título del Proceso' :
                     field === 'modalidadTrabajo' ? 'Modalidad de Trabajo' :
                     field === 'monedaSalario' ? 'Moneda del Salario' :
                     field === 'salarioOfrecido' ? 'Salario Ofrecido' :
                     field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Respuestas de Entrevista */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFields.respuestasEntrevista.checked}
                onChange={() => handleSectionChange('respuestasEntrevista')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">Respuestas de Entrevista</span>
            </div>
            <div className="ml-6 space-y-2">
              {Object.entries(selectedFields.respuestasEntrevista.fields).map(([field, checked]) => (
                <div key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleFieldChange('respuestasEntrevista', field)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {field === 'preguntasRespuestas' ? 'Preguntas y Respuestas' :
                     field === 'enlacesVideos' ? 'Enlaces a Videos' :
                     field === 'enlaceCV' ? 'Enlace al CV' : field}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal; 