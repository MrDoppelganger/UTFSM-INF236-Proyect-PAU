//-------------------Librerias--------------------
import React, { useEffect } from 'react';
import Button from './Button';

//------------------Componente--------------------
/*
    ------------Componente-----------------
    Modal: 
        Renderiza una ventana emergente sobre el contenido 
        principal y bloquea el desplazamiento del fondo.
    ------------Parametros----------------
    isOpen (boolean): Indica si el modal debe ser visible.
    onClose (function): Callback ejecutado para cerrar el modal.
    title (string): Título superior que muestra el modal.
    children (ReactNode): Contenido interno del modal.
    --------------Return------------------
    JSX.Element | null: Elemento React del modal o nulo si no está abierto.
    ----------------------------------
*/
export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  // Evitar scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      {/* Fondo Oscuro (Backdrop) */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Contenido del Modal */}
      <div 
        className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full ${maxWidth} overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {/* Pie de página */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
