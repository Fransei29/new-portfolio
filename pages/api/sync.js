// pages/api/sync.js

import sequelize from '../../lib/sequelize'; // Asegúrate de que la ruta a sequelize es correcta

export default async function handler(req, res) {
  try {
    await sequelize.sync({ force: true }); // Sincronizar las tablas con la base de datos
    res.status(200).json({ message: 'Tablas recreadas en la base de datos' });
  } catch (err) {
    console.error('Error al recrear las tablas:', err);
    res.status(500).json({ error: 'Error al recrear las tablas' });
  }
}
