import React from 'react';

export default function Sidebar({ student, onOpenAvanceCurricular }) {
  // Determine certificate status
  const estadoEAA = student?.estado_cursoEAA || 'Sin Realizar';
  let bubbleColor = 'bg-slate-500';
  let textColor = 'text-slate-600 dark:text-slate-400';
  if (estadoEAA === 'Vigente' || estadoEAA === 'Aprobado' || estadoEAA === 'Aprovado') {
    bubbleColor = 'bg-green-500';
    textColor = 'text-green-600 dark:text-green-400';
  } else if (estadoEAA === 'Expirado') {
    bubbleColor = 'bg-amber-500';
    textColor = 'text-amber-600 dark:text-amber-400';
  }

  return (
    <aside className="w-full lg:w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full shadow-sm sticky top-0 lg:h-screen transition-colors duration-300">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-usm-blue text-white flex items-center justify-center font-bold text-xl shadow-md">
            {student?.nombre?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white leading-tight">
              {student?.nombre || 'Cargando...'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {student?.carrera || 'Estudiante'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          Estado Académico
        </h3>
        
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Situación</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{student?.situacion_academica || '-'}</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Curso EAA</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${bubbleColor} shadow-sm`}></span>
                  <span className={`text-sm font-medium ${textColor}`}>
                    {estadoEAA}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button 
                onClick={onOpenAvanceCurricular}
                className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-blue-400">Ver Avance Curricular</span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-brand-primary dark:group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-8 mb-4">
          Navegación
        </h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-brand-primary/10 text-brand-primary dark:bg-blue-500/10 dark:text-blue-400 rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mi Perfil
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Certificados
          </a>
        </nav>
      </div>
      
      <div className="p-6 border-t border-slate-200 dark:border-slate-700">
        <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </a>
      </div>
    </aside>
  );
}
