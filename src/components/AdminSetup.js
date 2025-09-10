import { useState } from 'react';
import { createAdminUser, checkAdminUserExists } from '../utils/createAdminUser';

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [adminExists, setAdminExists] = useState(null);

  const handleCreateAdmin = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await createAdminUser();
      setMessage('✅ Usuario administrador creado exitosamente');
      setAdminExists(true);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkAdmin = async () => {
    setLoading(true);
    try {
      const exists = await checkAdminUserExists();
      setAdminExists(exists);
      setMessage(exists ? '✅ Usuario administrador ya existe' : '❌ Usuario administrador no existe');
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Configuración de Administrador</h2>
      
      <div className="space-y-4">
        <button
          onClick={checkAdmin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Verificando...' : 'Verificar Usuario Admin'}
        </button>

        {adminExists === false && (
          <button
            onClick={handleCreateAdmin}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Usuario Administrador'}
          </button>
        )}

        {message && (
          <div className={`p-3 rounded ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {adminExists && (
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded">
            <p><strong>Credenciales del administrador:</strong></p>
            <p>Email: admin@myworkin.com</p>
            <p>Password: admin123</p>
            <p className="text-sm mt-2">⚠️ Cambia la contraseña después del primer login</p>
          </div>
        )}
      </div>
    </div>
  );
}
