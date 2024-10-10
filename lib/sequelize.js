import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL no está definido. Verifica tus variables de entorno.');
}

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: isProduction
    ? { 
        ssl: { 
          require: true, 
          rejectUnauthorized: false 
        } 
      }
    : {}, // No usar SSL en entornos de desarrollo local
});

// Función para sincronizar el modelo con la base de datos
const syncDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDb(); // Sincroniza la base de datos cuando inicias la app

export default sequelize;
