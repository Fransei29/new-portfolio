import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, 
  logging: false
});

// Función para sincronizar el modelo con la base de datos
const syncDb = async () => {
  await sequelize.sync({ alter: true }); // Sincroniza el modelo con la base de datos, alterando tablas si es necesario
};

syncDb(); // Llamar a la función para sincronizar al iniciar la aplicación

export default sequelize; 
