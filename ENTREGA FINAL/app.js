const express = require('express');  
const app = express();
const PORT = 4000;
const path = require('path'); // Importa path para manejar rutas
const bcrypt = require('bcryptjs'); // Importa bcrypt para encriptar contraseñas
const connection = require('./db'); // Importa la conexión de db.js

// Configuración para usar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura Express para servir los archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para redirigir al index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/registro', async (req, res) => {
  try {
      console.log("Datos recibidos en el servidor:", req.body);

      const { nombre, apellido, nombre_usuario, dni, email, password } = req.body;

      if (!nombre || !apellido || !nombre_usuario || !dni || !email || !password) {
          return res.status(400).send("Todos los campos son obligatorios.");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Asume que el rol "alumno" tiene un ID de 1
      const roles_id_rol = 1; 

      const query = 'INSERT INTO usuarios (nombre_usuario, email, password, nombre, apellido, dni, roles_id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(query, [nombre_usuario, email, hashedPassword, nombre, apellido, dni, roles_id_rol], (error, results) => {
          if (error) {
              console.error('Error al insertar datos:', error);

              if (error.code === 'ER_DUP_ENTRY') {
                  return res.status(409).send('Este usuario o correo ya existe');
              } else {
                  return res.status(500).send('Error en el registro. Inténtalo nuevamente');
              }
          }
          res.status(200).send('Cuenta creada exitosamente');
      });
  } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      res.status(500).send('Error al encriptar la contraseña');
  }
});

// Ruta para el inicio de sesión
app.post('/api/login', async (req, res) => {
  const { nombre_usuario, password } = req.body;

  if (!nombre_usuario || !password) {
      return res.status(400).send('Debe proporcionar el nombre de usuario y la contraseña');
  }

  const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
  connection.query(query, [nombre_usuario], async (error, results) => {
      if (error) {
          console.error('Error al consultar la base de datos:', error);
          return res.status(500).send('Error en el servidor');
      }

      if (results.length === 0) {
          return res.status(401).send('Usuario no encontrado');
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).send('Contraseña incorrecta');
      }

     // Verificar el rol del usuario para determinar la redirección
     const { rol } = user; // Asume que tienes un campo `rol` en la tabla `usuarios`
     if (rol === 'admin') {
       return res.status(200).send({ redirectTo: '/admin-dashboard.html' });
     } else if (rol === 'profesor') {
       return res.status(200).send({ redirectTo: '/profesor-dashboard.html' });
     } else {
       return res.status(200).send({ redirectTo: '/alumno-dashboard.html' });
     }
   });
 });


// Inicia el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});