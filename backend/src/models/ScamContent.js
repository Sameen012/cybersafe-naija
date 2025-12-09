import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // FIXED: Changed from database.js to db.js

const ScamContent = sequelize.define(
  'ScamContent',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING(255)
    }
  },
  {
    tableName: 'scam_content'
  }
);

export default ScamContent;