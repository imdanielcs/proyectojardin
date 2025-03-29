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

// Endpoint de Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM admin WHERE username = ?";
    connection.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Error del servidor" });

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ userId: user.id }, "secreto", { expiresIn: "1h" });
                return res.json({ success: true, token });
            }
        }
        res.json({ success: false, message: "Usuario o contraseña incorrectos" });
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
app.get("/dashboard", verificarToken, (req, res) => {
    res.sendFile(__dirname + "/public/dashboard.html");
});

