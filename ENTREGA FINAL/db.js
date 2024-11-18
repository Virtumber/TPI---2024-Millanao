// db.js
const mysql = require('mysql2');

// Configura la conexión con MySQL
const connection = mysql.createConnection({
  host: 'localhost',      // Cambia si no estás usando el servidor local
  user: 'root',           // Tu usuario de MySQL
  password: '12345678',   // Tu contraseña de MySQL
  database: 'escuela'         // El nombre de tu base de datos
});

// Conéctate a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Exporta la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;
