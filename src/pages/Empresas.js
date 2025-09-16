import { useMemo, useState } from 'react';

const initialCompanies = [
  {
    id: 'comp-1',
    name: 'TechNova S.A.C.',
    industry: 'Software y Tecnología',
    contact: 'talento@technova.pe',
    size: '200-500',
    note: 'Buscan practicantes de Ingeniería de Sistemas y carrera afín.',
    status: 'pending',
    createdAt: '2025-09-05',
  },
  {
    id: 'comp-2',
    name: 'Andes Retail Group',
    industry: 'Retail',
    contact: 'rrhh@andesretail.com',
    size: '1000+',
    note: 'Programa trainee en logística y data analytics.',
    status: 'pending',
    createdAt: '2025-09-10',
  },
];

const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  approved: 'bg-green-50 text-green-700 ring-green-600/20',
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
};

const Empresas = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return companies;
    return companies.filter((c) => c.status === filter);
  }, [companies, filter]);

  const updateStatus = (id, status) => {
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
              <div className="font-medium text-gray-900">{c.name}</div>
              <div className="text-sm text-gray-500">{c.note}</div>
              <div className="text-xs text-gray-400 mt-1">Desde {c.createdAt}</div>
            </div>
            <div className="col-span-2 text-gray-700">{c.industry}</div>
            <div className="col-span-2 text-blue-600">{c.contact}</div>
            <div className="col-span-1 text-gray-700">{c.size}</div>
            <div className="col-span-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ring-1 ${statusStyles[c.status]}`}>
                {c.status === 'pending' && 'Pendiente'}
                {c.status === 'approved' && 'Aceptada'}
                {c.status === 'rejected' && 'Rechazada'}
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