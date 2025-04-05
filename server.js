const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");


const app = express();
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "grupo_3";

app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DanielDennisse_123",
    database: "jardin_db"
});

connection.connect(err => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL correctamente");
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;

   
    const query = "SELECT * FROM admin WHERE username = ?";
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const user = results[0];

        
        if (password !== user.password) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Generar un token JWT
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    });
});

// Middleware para proteger rutas
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Acceso denegado" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = user;
        next();
    });
}


// Ruta protegida de ejemplo
app.get("/registro", authenticateToken, (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});