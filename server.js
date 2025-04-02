const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "danienDennisse_123",
    database: "jardin_db"
});

connection.connect(err => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL correctamente");
});

const session = require('express-session');

app.use(session({
    secret: 'mi_clave_secreta', // Usa una clave secreta para firmar las cookies de sesión
    resave: false,              // No volver a guardar la sesión si no ha sido modificada
    saveUninitialized: true,    // Guardar sesiones aún si no están inicializadas
    cookie: { secure: false }   // Si usas HTTPS, cambia secure: true
}));

// Endpoint de Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM admin WHERE username = ?";
    
    connection.query(sql, [username], async (err, results) => {

        if (err) return res.status(500).json({ success: false, message: "Error del servidor" });

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "error desde la base de datos Usuario o contraseña incorrectos" });
        }

        const user = results[0];
        
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        // Guardar información en la sesión
        req.session.id_admin = user.id_admin;
        req.session.username = user.username;
        req.session.password = user.password;
        console.log(user.id_admin);
        console.log(user.username);

        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});


const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Acceso denegado" });

    jwt.verify(token, "secreto", (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: "Token inválido" });

        req.userId = decoded.userId;
        next();
    });
};

// Proteger el acceso al dashboard
/*app.get("/dashboard", verificarToken, (req, res) => {
    res.sendFile(__dirname + "/public/dashboard.html");
});*/

