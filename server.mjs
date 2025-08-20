import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const DATA_FILE = './data/mockUsers.json';

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los usuarios' });
  }
});

// Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const newUser = req.body;
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const users = JSON.parse(data);
    newUser.id = (users.length + 1).toString();
    users.push(newUser);
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
