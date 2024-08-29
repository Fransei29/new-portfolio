import TutorialProgress from '../../models/TutorialProgress';

// Handler principal para manejar las solicitudes API
export default async function handler(req, res) {
  
  const { method } = req;

  console.log(`Método recibido: ${method}`); 
  

  if (method === 'POST') {                  // Si la solicitud es POST, guarda el progreso  
    return await saveProgress(req, res);
  } else if (method === 'GET') {            // Si la solicitud es GET, recupera el progreso
    return await getProgress(req, res);
  } else {                                  // Si se usa otro método, responde con un error 405 (Método no permitido)
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Función para guardar el progreso del tutorial en la base de datos
async function saveProgress(req, res) {
  const { userId, tutorialId, completed } = req.body;

  console.log('Datos recibidos en el backend:', { userId, tutorialId, completed });
  
  try {
    const [progress, created] = await TutorialProgress.findOrCreate({
      where: { userId, tutorialId },
      defaults: { completed }
    });

    if (!created) {
      await progress.update({ completed });
    }

    return res.status(200).json({ message: 'Progreso guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    return res.status(500).json({ error: 'Error al guardar progreso' });
  }
}

// Función para obtener el progreso del tutorial de la base de datos
async function getProgress(req, res) {
  const { userId } = req.query;

  try {
    const progress = await TutorialProgress.findAll({ where: { userId } });
    return res.status(200).json(progress);
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return res.status(500).json({ error: 'Error al obtener progreso' });
  }
}
