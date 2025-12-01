import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'report_id',
      references: {
        model: 'reports',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    userAlias: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'user_alias'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isVictim: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_victim'
    }
  },
  {
    tableName: 'comments'
  }
);

export default Comment;
