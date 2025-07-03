import app from './app';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
