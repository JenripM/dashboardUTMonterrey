import { useMemo, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db2 } from '../credentials/companies'; // Asegúrate que la ruta sea correcta

const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  approved: 'bg-green-50 text-green-700 ring-green-600/20',
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  active: 'bg-blue-50 text-blue-700 ring-blue-600/20', // Añadí un estilo para 'active'
};

const Empresas = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db2, 'companies'));
        const companiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companiesList);
      } catch (error) {
        console.error("Error fetching companies: ", error);
      }
    };

    fetchCompanies();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return companies;
    return companies.filter((c) => c.status === filter);
  }, [companies, filter]);

  const updateStatus = (id, status) => {
    // Nota: Esta función solo actualiza el estado local.
    // Para persistir el cambio, necesitarías actualizar el documento en Firestore.
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Empresas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona solicitudes de conexión de empresas empleadoras
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aceptadas</option>
            <option value="rejected">Rechazadas</option>
            <option value="active">Activas</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b text-xs font-medium text-gray-500">
          <div className="col-span-4">Empresa</div>
          <div className="col-span-2">Industria</div>
          <div className="col-span-2">Contacto</div>
          <div className="col-span-1">Tamaño</div>
          <div className="col-span-1">Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {filtered.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-4 px-4 py-4 border-b last:border-b-0 items-center">
            <div className="col-span-4">
              <div className="font-medium text-gray-900">{c.displayName}</div>
              <div className="text-sm text-gray-500">{c.description}</div>
              <div className="text-xs text-gray-400 mt-1">
                Desde{' '}
                {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString() : 'N/A'}
              </div>
            </div>
            <div className="col-span-2 text-gray-700">{c.sector}</div>
            <div className="col-span-2 text-blue-600">{c.contactEmail}</div>
            <div className="col-span-1 text-gray-700">{c.companySize}</div>
            <div className="col-span-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ${statusStyles[c.status] || statusStyles.pending}`}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <button
                onClick={() => updateStatus(c.id, 'approved')}
                className="px-3 py-1 text-sm rounded-md border border-green-600 text-green-700 hover:bg-green-50 disabled:opacity-50"
                disabled={c.status === 'approved'}
              >
                Aceptar
              </button>
              <button
                onClick={() => updateStatus(c.id, 'rejected')}
                className="px-3 py-1 text-sm rounded-md border border-red-600 text-red-700 hover:bg-red-50 disabled:opacity-50"
                disabled={c.status === 'rejected'}
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empresas;
