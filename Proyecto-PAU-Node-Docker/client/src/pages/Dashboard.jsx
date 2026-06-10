//-------------------Librerias--------------------
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AyudantiaCard from '../components/AyudantiaCard';
import Modal from '../components/Modal';
import ThemeToggle from '../components/ThemeToggle';

//------------------Componente--------------------
/*
    ------------Componente-----------------
    Dashboard: 
        Vista principal de la aplicación. Orquesta la obtención 
        de datos desde la API y maneja los modales de interacción.
    --------------Return------------------
    JSX.Element: Vista completa del panel de control del estudiante.
    ----------------------------------
*/
export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const [postulaciones, setPostulaciones] = useState([]);
  const [ayudantias, setAyudantias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para el modal de ayudantía
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para el avance curricular
  const [avanceCurricular, setAvanceCurricular] = useState([]);
  const [isAvanceModalOpen, setIsAvanceModalOpen] = useState(false);

  // El ID del estudiante de prueba es 3 (Víctor Jara)
  const STUDENT_ID = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener datos del estudiante
        const studentRes = await fetch(`/api/estudiantes/${STUDENT_ID}`);
        if (studentRes.ok) {
          const studentData = await studentRes.json();
          setStudent(studentData);
        }

        // Obtener postulaciones del estudiante
        const postRes = await fetch(`/api/estudiantes/${STUDENT_ID}/postulaciones`);
        if (postRes.ok) {
          const postData = await postRes.json();
          setPostulaciones(postData);
        }

        // Obtener ayudantías disponibles
        const ayudRes = await fetch('/api/ayudantias');
        if (ayudRes.ok) {
          const ayudData = await ayudRes.json();
          setAyudantias(ayudData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const openAvanceCurricular = async () => {
    try {
      const res = await fetch(`/api/estudiantes/${STUDENT_ID}/avance`);
      if (res.ok) {
        const data = await res.json();
        setAvanceCurricular(data);
        setIsAvanceModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching avance curricular:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Sidebar student={student} onOpenAvanceCurricular={openAvanceCurricular} />

      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Plataforma de Ayudantías Unificadas</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto w-full">
          {/* Bienvenida */}
          <section className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Hola, {student?.nombre ? student.nombre.split(' ')[0] : 'Estudiante'} 👋
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Bienvenido a tu panel de control. Aquí puedes gestionar tus postulaciones y descubrir nuevas ayudantías.
            </p>
          </section>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
          ) : (
            <>
              {/* Sección: Mis Postulaciones */}
              <section className="animate-in slide-in-from-bottom-8 fade-in duration-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-brand-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Mis Postulaciones Activas
                  </h3>
                  <span className="bg-brand-primary/10 text-brand-primary dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full">
                    {postulaciones.length}
                  </span>
                </div>
                
                {postulaciones.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {postulaciones.map(post => (
                      <AyudantiaCard 
                        key={`post-${post.postulacion_id}`} 
                        data={post} 
                        isPostulation={true} 
                        onClick={openModal} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400">No tienes postulaciones activas en este momento.</p>
                  </div>
                )}
              </section>

              {/* Sección: Ayudantías Disponibles */}
              <section className="animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-brand-secondary dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Ayudantías Disponibles
                  </h3>
                </div>
                
                {ayudantias.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {ayudantias.map(ayud => (
                      <AyudantiaCard 
                        key={`ayud-${ayud.id}`} 
                        data={ayud} 
                        isPostulation={false} 
                        onClick={openModal} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400">No hay ayudantías disponibles actualmente.</p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      {/* Modal de Detalles */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Detalles de Ayudantía"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{selectedItem.nombre_asignatura}</h4>
              <p className="text-sm text-brand-primary dark:text-blue-400 font-medium">{selectedItem.departamento}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tipo</span>
                <span className="text-slate-900 dark:text-white font-medium">{selectedItem.tipo_ayudantia}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Carga Horaria</span>
                <span className="text-slate-900 dark:text-white font-medium">{selectedItem.carga_horaria} horas/semana</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Profesor Coordinador</span>
                <span className="text-slate-900 dark:text-white font-medium">{selectedItem.profesor_coordinador || 'No asignado'}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Profesores Cátedra</span>
                <span className="text-slate-900 dark:text-white font-medium">{selectedItem.profesores_catedra ? selectedItem.profesores_catedra.join(', ') : 'No asignado'}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Alumnos matriculados</span>
                <span className="text-slate-900 dark:text-white font-medium">{selectedItem.cantidad_estudiantes || 0}</span>
              </div>
              {selectedItem.estado_actual && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Estado de Postulación</span>
                  <span className="text-slate-900 dark:text-white font-medium">{selectedItem.estado_actual}</span>
                </div>
              )}
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Requisitos Mínimos</span>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg p-4 text-amber-900 dark:text-amber-200 text-sm">
                {selectedItem.requisitos || 'No hay requisitos específicos detallados.'}
              </div>
            </div>

            {selectedItem.estado_actual && selectedItem.fecha_envio && (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-right pt-4 border-t border-slate-100 dark:border-slate-700/50">
                Postulado el: {new Date(selectedItem.fecha_envio).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Avance Curricular */}
      <Modal 
        isOpen={isAvanceModalOpen} 
        onClose={() => setIsAvanceModalOpen(false)}
        title="Mi Avance Curricular"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Resumen de asignaturas cursadas y calificaciones obtenidas.
          </p>
          <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Asignatura</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-900 dark:text-white w-24">Nota</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-900 dark:text-white w-28">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {avanceCurricular.length > 0 ? avanceCurricular.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                      {item.nombre_asignatura}
                      <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">{item.departamento}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-900 dark:text-white font-semibold">
                      {item.nota}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.nota >= 55 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Aprobado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Reprobado
                        </span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      No hay registros curriculares.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
