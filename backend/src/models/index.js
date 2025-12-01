import sequelize, { connectDB } from '../config/db.js';
import Scam from './Scam.js';
import Report from './Report.js';
import Comment from './Comment.js';
import Alert from './Alert.js';

Report.hasMany(Comment, { foreignKey: 'reportId', as: 'comments', onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(Report, { foreignKey: 'reportId', as: 'report' });

export { sequelize, connectDB, Scam, Report, Comment, Alert };
