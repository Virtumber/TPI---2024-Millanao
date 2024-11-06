const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',          // Cambia a la IP o nombre de host de tu base de datos, si no es localhost
  user: 'root',          // Reemplaza 'tu_usuario' con tu usuario de MySQL
  password: '12345678',   // Reemplaza 'tu_contraseña' con tu contraseña de MySQL
  database: 'TPI' // Reemplaza 'nombre_base_de_datos' con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
