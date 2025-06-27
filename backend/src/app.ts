import express from 'express';
import cors from 'cors';
import editorialRoutes from './routes/editorial.routes';

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para peticiones desde el frontend
app.use(express.json()); // Permite recibir JSON en el cuerpo de la petición
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});
// Rutas
app.use('/api/editoriales', editorialRoutes);

export default app;
