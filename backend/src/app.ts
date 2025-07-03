import express from 'express';
import cors from 'cors';
import editorialRoutes from './routes/editorial.routes';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import ClienteRoutes from './routes/cliente.routes';
const app = express();

app.use(cors());
app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});
// Rutas
app.use('/api/clientes', ClienteRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

export default app;
