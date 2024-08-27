import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

// Definir un modelo
const TutorialProgress = sequelize.define('TutorialProgress', {
  userId: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  tutorialId: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
});

export default TutorialProgress; 
