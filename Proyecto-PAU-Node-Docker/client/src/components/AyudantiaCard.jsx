import React from 'react';

export default function AyudantiaCard({ data, onClick, isPostulation = false }) {
  // Configuración de colores según estado
  const statusColors = {
    'En Revisión': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Aceptada': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    'Rechazada': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    'Disponible': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  };

  const status = isPostulation ? data.estado_actual : 'Disponible';
  const statusClass = statusColors[status] || statusColors['Disponible'];

  return (
    <div 
      onClick={() => onClick(data)}
      className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-brand-primary/50 dark:hover:border-blue-500/50"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors">
            {data.nombre_asignatura}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {data.departamento}
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
          {status}
        </span>
      </div>
      
      <div className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-slate-700 dark:text-slate-200">Tipo:</span> {data.tipo_ayudantia}
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-slate-700 dark:text-slate-200">Carga:</span> {data.carga_horaria} hrs/sem
        </div>
        
        {!isPostulation && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium text-slate-700 dark:text-slate-200">Cupos:</span> {data.cantidad_cupos}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <span className="text-sm font-medium text-brand-primary dark:text-blue-400">Ver detalles</span>
        <svg className="w-4 h-4 text-brand-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
