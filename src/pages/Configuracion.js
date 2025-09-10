import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { cacheService } from '../services/cacheService';
import { useAuth } from '../contexts/AuthContext';
import { updateUser } from '../services/userManagementService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Configuracion() {
  const navigate = useNavigate();
  const { logout, userData } = useAuth();
  const [cacheSettings, setCacheSettings] = useState({
    enabled: true,
    duration: 24 * 60 * 60 * 1000, // 24 horas
    durationLabel: '24 horas'
  });
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    email: '',
    role: ''
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar configuración de caché
    const config = cacheService.getConfig();
    setCacheSettings({
      enabled: config.enabled,
      duration: config.duration,
      durationLabel: getDurationLabel(config.duration)
    });

    // Cargar información del usuario
    if (userData) {
      setUserInfo({
        nombre: userData.nombre || '',
        email: userData.email || '',
        role: userData.role || ''
      });
    }
  }, [userData]);

  const getDurationLabel = (duration) => {
    const hours = duration / (60 * 60 * 1000);
    if (hours === 24) return '24 horas';
    if (hours === 168) return '1 semana';
    if (hours === 720) return '1 mes';
    return `${hours} horas`;
  };

  const durationOptions = [
    { value: 24 * 60 * 60 * 1000, label: '24 horas' },
    { value: 168 * 60 * 60 * 1000, label: '1 semana' },
    { value: 720 * 60 * 60 * 1000, label: '1 mes' }
  ];

  const handleCacheToggle = () => {
    const newEnabled = !cacheSettings.enabled;
    setCacheSettings(prev => ({ ...prev, enabled: newEnabled }));
    cacheService.setConfig({ enabled: newEnabled });
    console.log('✅ Configuración de caché guardada automáticamente');
  };

  const handleDurationChange = (duration) => {
    const durationLabel = getDurationLabel(duration);
    setCacheSettings(prev => ({ ...prev, duration, durationLabel }));
    cacheService.setConfig({ duration });
    console.log('✅ Duración de caché guardada automáticamente');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Si está en modo edición, guardar cambios
      handleSaveChanges();
    } else {
      // Si no está editando, activar modo edición
      setIsEditing(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      // Guardar solo el nombre (el email y rol no son editables)
      console.log('Guardando nombre:', userInfo.nombre);
      
      // Actualizar en Firestore
      await updateUser(userData.uid, { nombre: userInfo.nombre }, userData, userData);
      
      console.log('✅ Nombre actualizado en Firestore');
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      console.error('❌ Error actualizando nombre:', error);
      // Mostrar error al usuario (opcional)
      alert('Error al actualizar el nombre. Por favor, intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {/* Título de la página */}
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900">Configuración</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Personaliza tu experiencia en el dashboard de Worky
              </p>
            </div>

            {/* Cerrar Sesión - Prioridad Alta */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-6 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Cerrar sesión</h3>
                    <p className="text-sm text-gray-500">
                      Termina tu sesión actual de forma segura
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Información de la Cuenta */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-6 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Información de la Cuenta</h3>
                  <button
                    onClick={handleEditToggle}
                    disabled={isSaving}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      isEditing 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSaving ? 'Guardando...' : (isEditing ? 'Guardar' : 'Editar')}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userInfo.nombre}
                        onChange={(e) => handleUserInfoChange('nombre', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingresa tu nombre completo"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md">
                        <span className="text-gray-900">{userInfo.nombre || 'No especificado'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico
                    </label>
                    <div className="px-3 py-2 bg-gray-50 rounded-md">
                      <span className="text-gray-900">{userInfo.email}</span>
                      <span className="ml-2 text-xs text-gray-500">(No editable)</span>
                    </div>
                  </div>

                  {/* Rol */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rol
                    </label>
                    <div className="px-3 py-2 bg-gray-50 rounded-md">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {userInfo.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caché de Datos */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-6 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Caché de Datos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Activar caché</span>
                      <p className="text-sm text-gray-500">
                        Mejora la velocidad de carga guardando métricas calculadas
                      </p>
                    </div>
                    <Switch
                      checked={cacheSettings.enabled}
                      onChange={handleCacheToggle}
                      className={classNames(
                        cacheSettings.enabled ? 'bg-blue-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                      )}
                    >
                      <span className="sr-only">Activar caché</span>
                      <span
                        className={classNames(
                          cacheSettings.enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </div>

                  {cacheSettings.enabled && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Duración del caché</label>
                          <p className="text-sm text-gray-500">
                            Tiempo antes de que los datos cacheados expiren
                          </p>
                        </div>
                        <select
                          value={cacheSettings.duration}
                          onChange={(e) => handleDurationChange(Number(e.target.value))}
                          className="w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          {durationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 