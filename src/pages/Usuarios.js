import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userManagementService';
import UserModal from '../components/UserModal';

const Usuarios = () => {
  const { currentUser, userData } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Verificar si el usuario actual es admin o root
  const isAdmin = userData?.role === 'admin' || userData?.isRoot === true;
  

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      // Filtrar el usuario actual y usuarios root
      const filteredUsers = users.filter(user => 
        user.id !== currentUser?.uid && !user.isRoot
      );
      
      console.log('👥 Usuarios cargados:', {
        total: users.length,
        filtrados: filteredUsers.length,
        usuariosRoot: users.filter(user => user.isRoot).length
      });
      
      setUsuarios(filteredUsers);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Manejar creación/edición de usuario
  const handleSaveUser = async (formData) => {
    try {
      if (isEditing) {
        await updateUser(editingUser.id, formData, currentUser, userData);
      } else {
        await createUser(formData, currentUser, userData);
      }
      await loadUsers(); // Recargar la lista
    } catch (error) {
      console.error('Error guardando usuario:', error);
      throw error;
    }
  };

  // Manejar eliminación de usuario
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar al usuario "${userName}"?`)) {
      return;
    }

    try {
      await deleteUser(userId, currentUser, userData);
      await loadUsers(); // Recargar la lista
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      setError('Error al eliminar el usuario');
    }
  };

  // Abrir modal para crear usuario
  const handleCreateUser = () => {
    setEditingUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Abrir modal para editar usuario
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setIsEditing(false);
  };

  // Formatear fecha
  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-1 text-sm text-gray-500">
            Lista de usuarios de MyWorkin
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={handleCreateUser}
            className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Nuevo usuario
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}


      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de creación
              </th>
              {isAdmin && (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Editar
                </th>
              )}
              {isAdmin && (
                <th scope="col" className="w-16"></th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 7 : 5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {usuario.nombre || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.empresa || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      usuario.role === 'admin' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(usuario.createdAt)}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleEditUser(usuario)}
                        className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                      >
                        Editar
                      </button>
                    </td>
                  )}
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {!usuario.isRoot && (
                        <button 
                          onClick={() => handleDeleteUser(usuario.id, usuario.nombre)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Eliminar usuario"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar usuario */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={editingUser}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Usuarios; 