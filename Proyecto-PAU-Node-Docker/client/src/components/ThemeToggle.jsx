//-------------------Librerias--------------------
import React from 'react';
import { useTheme } from '../context/ThemeContext';

//------------------Componente--------------------
/*
    ------------Componente-----------------
    ThemeToggle: 
        Botón interactivo que permite alternar el modo oscuro 
        y claro en la aplicación, utilizando el contexto global.
    ------------Parametros----------------
    Ninguno
    --------------Return------------------
    JSX.Element: Botón renderizado con el icono del tema actual.
    ----------------------------------
*/
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label="Toggle Dark Mode"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        // Icono de Luna (Estado actual: Oscuro)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Icono de Sol (Estado actual: Claro)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}