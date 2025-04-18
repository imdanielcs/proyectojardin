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

app.post('/api/docentes', (req, res) => {
    const docente = req.body;

   
    //if (!docente.rutDocente  || !docente.password || !docente.nombreDocente || !docente.apellidoDocente || !docente.fonoDocente || !docente.cursoDocente) {
    //    return res.status(400).send({ message: "Los campos rutDocente, passwordDocente, nombreDocente, apellidoDocente, fonoDocente y cursoDocente son obligatorios" });
    //}

    
    console.log("Datos recibidos para docente:", docente);

    const query = "INSERT INTO docente (rut_docente, password, nombre, apellido, fono, email, direccion, curso_id_curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [
        docente.rutDocente,
        docente.passwordDocente,
        docente.nombreDocente,
        docente.apellidoDocente,
        docente.fonoDocente,
        docente.emailDocente || null, 
        docente.direccionDocente || null, 
        docente.cursoDocente
    ], (err, results) => {
        if (err) {
            console.error("Error al insertar en la tabla docente:", err);
            return res.status(500).send({ message: "Error al registrar el docente" });
        }
        res.status(201).send({ message: 'Docente registrado exitosamente' });
    });
});

app.post('/api/alumnos', (req, res) => {
    const alumno = req.body;

   
    if (!alumno.rutAlumno || !alumno.nombreAlumno || !alumno.apellidoAlumno || !alumno.cursoAlumno || !alumno.rutApoderadoUno || !alumno.nombreApoderadoUno) {
        return res.status(400).send({ message: "Los campos Rut, Nombre, Apellido, Curso y el Rut y nombre del apoderado son obligatorios" });
    }

    
    console.log("Datos recibidos para alumno:", alumno);

    const query = "INSERT INTO alumno (rut_alumno, nombre, apellido, observacion, curso_id_curso, rut_apoderado_uno, rut_apoderado_dos, nombre_apoderado_uno, nombre_apoderado_dos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [
        alumno.rutAlumno,
        alumno.nombreAlumno,
        alumno.apellidoAlumno,
        alumno.observacionAlumno || null,
        alumno.cursoAlumno,
        alumno.rutApoderadoUno || null,
        alumno.rutApoderadoDos || null,
        alumno.nombreApoderadoUno || null,
        alumno.nombreApoderadoDos || null
    ], (err, results) => {
        if (err) {
            console.error("Error al insertar en la tabla alumno:", err);
            return res.status(500).send({ message: "Error al registrar el alumno" });
        }
        res.status(201).send({ message: 'Alumno registrado exitosamente' });
    });
});
