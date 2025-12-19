const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 12000;

// Middleware
app.use(cors({
  origin: ['http://localhost:12001', 'https://work-2-mzytnvcdszswlgqa.prod-runtime.all-hands.dev'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Expense Control API is running!',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    await initDatabase();
    console.log('Database connected and initialized');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();