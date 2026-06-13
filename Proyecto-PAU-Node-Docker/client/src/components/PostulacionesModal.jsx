import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import Button from './Button';
import AyudantiaCardHorizontal from './AyudantiaCardHorizontal';

export default function PostulacionesModal({ isOpen, onClose, ayudantias = [] }) {
  const [selectedAyudantia, setSelectedAyudantia] = useState(null);
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterCarga, setFilterCarga] = useState('');
  const [filterProfesor, setFilterProfesor] = useState('');

  // Extract unique options for filters
  const departamentos = useMemo(() => {
    return [...new Set(ayudantias.map(a => a.departamento).filter(Boolean))];
  }, [ayudantias]);

  const cargas = useMemo(() => {
    return [...new Set(ayudantias.map(a => a.carga_horaria).filter(Boolean))].sort((a, b) => a - b);
  }, [ayudantias]);

  const profesores = useMemo(() => {
    const allProfs = new Set();
    ayudantias.forEach(a => {
      if (a.profesor_coordinador) allProfs.add(a.profesor_coordinador);
      if (a.profesores_catedra) {
        a.profesores_catedra.forEach(p => allProfs.add(p));
      }
    });
    return [...allProfs].sort();
  }, [ayudantias]);

  // Apply filters
  const filteredAyudantias = useMemo(() => {
    return ayudantias.filter(a => {
      // Búsqueda por nombre de asignatura
      const matchSearch = a.nombre_asignatura.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro Departamento
      const matchDept = filterDept === '' || a.departamento === filterDept;
      
      // Filtro Carga Horaria
      const matchCarga = filterCarga === '' || a.carga_horaria.toString() === filterCarga;
      
      // Filtro Profesor (coordinador o de cátedra)
      const matchProfesor = filterProfesor === '' || 
        (a.profesor_coordinador === filterProfesor) || 
        (a.profesores_catedra && a.profesores_catedra.includes(filterProfesor));

      return matchSearch && matchDept && matchCarga && matchProfesor;
    });
  }, [ayudantias, searchTerm, filterDept, filterCarga, filterProfesor]);

  const handleClose = () => {
    setSelectedAyudantia(null);
    onClose();
  };

  const handlePostular = () => {
    alert("Funcionalidad de postulación en desarrollo (Prototipo).");
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={selectedAyudantia ? "Detalles de Ayudantía" : "Realizar Postulaciones"}
      maxWidth="max-w-4xl"
    >
      {!selectedAyudantia ? (
        <div className="space-y-6">
          {/* Filtros */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Buscar Asignatura</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white"
                  placeholder="Ej. Programación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Departamento</label>
                <select 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="">Todos los departamentos</option>
                  {departamentos.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Carga Horaria</label>
                <select 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white"
                  value={filterCarga}
                  onChange={(e) => setFilterCarga(e.target.value)}
                >
                  <option value="">Todas las cargas</option>
                  {cargas.map(c => (
                    <option key={c} value={c}>{c} horas</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Profesor</label>
                <select 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white"
                  value={filterProfesor}
                  onChange={(e) => setFilterProfesor(e.target.value)}
                >
                  <option value="">Todos los profesores</option>
                  {profesores.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <h4 className="font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Resultados ({filteredAyudantias.length})
            </h4>
            
            {filteredAyudantias.length > 0 ? (
              filteredAyudantias.map(ayud => (
                <AyudantiaCardHorizontal 
                  key={ayud.id}
                  data={ayud}
                  onClick={(data) => setSelectedAyudantia(data)}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400">No se encontraron vacantes con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Vista de Detalle de la Ayudantía */
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedAyudantia(null)}
            className="flex items-center text-sm font-medium text-brand-primary dark:text-blue-400 hover:underline mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la lista
          </button>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">{selectedAyudantia.nombre_asignatura}</h4>
            <p className="text-md text-brand-primary dark:text-blue-400 font-medium">{selectedAyudantia.departamento}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tipo</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.tipo_ayudantia}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Carga Horaria</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.carga_horaria} horas/semana</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Cupos Disponibles</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.cantidad_cupos}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Alumnos matriculados</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.cantidad_estudiantes || 0}</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Profesor Coordinador</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.profesor_coordinador || 'No asignado'}</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Profesores Cátedra</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedAyudantia.profesores_catedra ? selectedAyudantia.profesores_catedra.join(', ') : 'No asignado'}</span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Requisitos Mínimos</span>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg p-4 text-amber-900 dark:text-amber-200 text-sm">
              {selectedAyudantia.requisitos || 'No hay requisitos específicos detallados.'}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button 
              onClick={handlePostular}
              className="px-8 py-3 bg-brand-secondary hover:bg-yellow-500 text-white font-bold rounded-xl shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl w-full md:w-auto text-lg"
            >
              Postular a esta Ayudantía
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
