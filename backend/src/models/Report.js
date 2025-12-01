import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Report = sequelize.define(
  'Report',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    scammerIdentity: {
      type: DataTypes.STRING(160),
      allowNull: false,
      field: 'scammer_identity'
    },
    scamType: {
      type: DataTypes.ENUM('Investment', 'Phishing', 'Grant', 'Job', 'Romance', 'Other'),
      allowNull: false,
      defaultValue: 'Other',
      field: 'scam_type'
    },
    platform: {
      type: DataTypes.ENUM('WhatsApp', 'Facebook', 'SMS', 'Telegram', 'Phone Call'),
      allowNull: false,
      defaultValue: 'WhatsApp'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    evidenceScreenshot: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'evidence_screenshot'
    },
    upvotes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'resolved'),
      allowNull: false,
      defaultValue: 'pending'
    },
    reportedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'reports'
  }
);

export default Report;
