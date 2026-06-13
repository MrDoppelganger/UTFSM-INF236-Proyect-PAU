import React from 'react';

export default function AyudantiaCardHorizontal({ data, onClick }) {
  return (
    <div 
      onClick={() => onClick(data)}
      className="group flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-brand-primary/50 dark:hover:border-blue-500/50 gap-4"
    >
      <div className="flex-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors">
          {data.nombre_asignatura}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {data.departamento}
        </p>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase">Carga Horaria</span>
          <span className="font-medium">{data.carga_horaria} hrs/sem</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase">Cupos</span>
          <span className="font-medium">{data.cantidad_cupos}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase">Profesores</span>
          <span className="font-medium text-center truncate max-w-[120px]" title={data.profesores_catedra ? data.profesores_catedra.join(', ') : 'No asignado'}>
            {data.profesores_catedra ? data.profesores_catedra.length : 0}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
          Ver detalles
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
