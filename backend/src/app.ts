import express from 'express';
import cors from 'cors';
import editorialRoutes from './routes/editorial.routes';
import { libroRouter } from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import ClienteRoutes from './routes/cliente.routes';
import facturaRouter from './routes/factura.routes';
import categoriaRoutes from './routes/categoria.routes';
import reporteRoutes from './routes/reporte.routes';  
const app = express();

app.use(cors());
app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});
// Rutas
app.use('/api/clientes', ClienteRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api/libros', libroRouter);
app.use('/api/autores', autorRoutes);
app.use('/api/facturas', facturaRouter);
app.use('/api/categorias', categoriaRoutes); 
app.use('/api/reportes', reporteRoutes);
export default app;
