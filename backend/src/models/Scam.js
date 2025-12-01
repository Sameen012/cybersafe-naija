import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Scam = sequelize.define(
  'Scam',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    redFlags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    preventionTips: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  },
  {
    tableName: 'scams'
  }
);

export default Scam;
