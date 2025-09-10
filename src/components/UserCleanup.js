import { useState } from 'react';
import { cleanupDuplicateUsers, showAllUsers } from '../utils/cleanupUsers';

export default function UserCleanup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleShowUsers = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const allUsers = await showAllUsers();
      setUsers(allUsers);
      setMessage(`✅ Se encontraron ${allUsers.length} usuarios`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar usuarios duplicados? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const result = await cleanupDuplicateUsers();
      setMessage(`✅ Limpieza completada. Se encontraron ${result.duplicatesFound} emails con duplicados`);
      await handleShowUsers(); // Refrescar la lista
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Limpieza de Usuarios Duplicados</h2>
      
      <div className="space-y-4">
        <button
          onClick={handleShowUsers}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Mostrar Todos los Usuarios'}
        </button>

        <button
          onClick={handleCleanup}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? 'Limpiando...' : 'Limpiar Usuarios Duplicados'}
        </button>

        {message && (
          <div className={`p-3 rounded ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {users.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Usuarios en Firestore:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IsRoot</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-900">{user.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{user.status}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{user.role}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{user.isRoot ? 'Sí' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
