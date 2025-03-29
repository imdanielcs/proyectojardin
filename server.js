const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DanielDennisse_123', 
    database: 'jardin_db'
});


connection.connect(err => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL correctamente');
});


app.use(express.static('public'));

// Ruta principal 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta de prueba para obtener datos desde MySQL
app.get('/api/alumnos', (req, res) => {
    connection.query('SELECT * FROM alumnos', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error obteniendo alumnos' });
            return;
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
