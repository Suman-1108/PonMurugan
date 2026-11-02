import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  store: {
    name: 'PON MURUGAN FIREWORKS',
    city: process.env.STORE_CITY || 'Sivakasi',
    state: process.env.STORE_STATE || 'Tamil Nadu',
    phone: process.env.STORE_PHONE || '8098443633',
    email: process.env.STORE_EMAIL || 'sales@ponmuruganfireworks.com',
  }
};

