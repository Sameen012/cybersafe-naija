import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Alert = sequelize.define(
  'Alert',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    severity: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false,
      defaultValue: 'Low'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    }
  },
  {
    tableName: 'alerts'
  }
);

export default Alert;
