import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'cybersafe_naija',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('MySQL connected and models synchronized');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default sequelize;
