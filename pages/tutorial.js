import { useEffect, useState } from 'react';
import CircularProgress from '../components/tutorialprogres'; // Ajusta el path si es necesario

const TutorialPage = () => {
  const [progress, setProgress] = useState(0); // Estado para guardar el progreso
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const userId = 'testuser'; // Simulamos un userId, deberías obtenerlo de tu lógica
  const tutorialId = 'tutorial1'; // Simulamos un tutorialId, deberías obtenerlo de tu lógica

  useEffect(() => {
    // Llamada a la API para obtener el progreso
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?userId=${userId}&tutorialId=${tutorialId}`);
        const data = await response.json();

        // Si se encuentra el progreso, actualizamos el estado con el valor de `completed`
        if (data.length > 0) {
          setProgress(data[0].completed ? 100 : 0); // Progreso en % (100 o 0, según tu lógica)
        }
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchProgress(); // Llamamos a la función de carga de datos
  }, [userId, tutorialId]);

  if (loading) {
    return <p>Cargando progreso...</p>; // Muestra un mensaje mientras se carga el progreso
  }

  return (
    <div>
      <h1>Progreso del Tutorial</h1>
      <CircularProgress progress={progress} /> {/* Pasamos el progreso al componente */}
    </div>
  );
};

export default TutorialPage;
