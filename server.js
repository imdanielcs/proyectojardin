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


app.post("/login-docente", (req, res) => {
    const { rut_docente, password } = req.body;

   
    const query = "SELECT * FROM docente WHERE rut_docente = ?";
    connection.query(query, [rut_docente], (err, results) => {
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
        const token = jwt.sign({ username: user.rut_docente }, SECRET_KEY, { expiresIn: "1h" });
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

//Ruta para obtener el total de docentes en el jardin
app.get('/api/docentes/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM docente';
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
  
      const totalDocentes = results[0].total;
      res.json({ totalDocentes });
    });
  });



// Ruta protegida de ejemplo
app.get("/registro", authenticateToken, (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.post('/api/docentes', (req, res) => {
    const docente = req.body;
    console.log("Datos recibidos para docente:", docente);

    // Validación de campos requeridos
    if (!docente.rutDocente || !docente.nombreDocente || !docente.apellidoDocente || 
        !docente.fonoDocente || !docente.emailDocente || !docente.cursoDocente) {
        return res.status(400).send({
            message: "Los campos RUT, nombre, apellido, teléfono, curso y email son obligatorios"
        });
    }

    console.log("Ingresa los datos del docente a la query");
    const query = "INSERT INTO docente (rut_docente, password, nombre, apellido, fono, email, direccion, curso_id_curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    connection.query(query, [
        docente.rutDocente,
        docente.password,
        docente.nombreDocente,
        docente.apellidoDocente,
        docente.fonoDocente,
        docente.emailDocente,
        docente.direccionDocente || null,
        docente.cursoDocente
    ], (err, results) => {
        if (err) {
            console.error("Error al insertar en la tabla docente:", err);
            return res.status(500).send({ message: "Error al registrar el docente" });
        }
        console.log("Docente registrado exitosamente:", results);
        res.status(201).send({ message: 'Docente registrado exitosamente' });
    });
});

app.post('/api/alumnos', (req, res) => {
    const alumno = req.body;
    
    console.log("Datos recibidos para alumno:", alumno);

    // Validación básica de campos requeridos
    if (!alumno.rutAlumno || !alumno.nombreAlumno || !alumno.apellidoAlumno || 
        !alumno.cursoAlumno || !alumno.rutApoderadoUno || !alumno.nombreApoderadoUno || 
        !alumno.fono1 || !alumno.email1) {
        return res.status(400).send({ 
            message: "Los campos RUT, nombre, apellido, curso, y datos del apoderado principal (RUT, nombre, teléfono y email) son obligatorios" 
        });
    }

    // Primero verificamos que el curso existe
    const checkCursoQuery = "SELECT id_curso FROM curso WHERE id_curso = ?";
    connection.query(checkCursoQuery, [alumno.cursoAlumno], (err, results) => {
        if (err) {
            console.error("Error al verificar el curso:", err);
            return res.status(500).send({ message: "Error al verificar el curso" });
        }

        if (results.length === 0) {
            return res.status(400).send({ message: "El curso especificado no existe" });
        }

        // Si el curso existe, procedemos con el registro
        const query = "INSERT INTO alumno (rut_alumno, nombre, apellido, observacion, curso_id_curso, rut_apoderado_uno, nombre_apoderado_uno, rut_apoderado_dos, nombre_apoderado_dos, fono1, fono2, email1, email2, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [
            alumno.rutAlumno,
            alumno.nombreAlumno,
            alumno.apellidoAlumno,
            alumno.observacionAlumno || null,
            alumno.cursoAlumno,
            alumno.rutApoderadoUno,
            alumno.nombreApoderadoUno,
            alumno.rutApoderadoDos || null,
            alumno.nombreApoderadoDos || null,
            alumno.fono1,
            alumno.fono2 || null,
            alumno.email1,
            alumno.email2 || null,
            alumno.direccion || null
        ], (err, results) => {
            if (err) {
                console.error("Error al insertar en la tabla alumno:", err);
                return res.status(500).send({ message: "Error al registrar el alumno" });
            }
            res.status(201).send({ message: 'Alumno registrado exitosamente' });
        });
    });
});



app.get('/api/alumnos', (req, res) => {
    const query = 'SELECT rut_alumno, nombre, apellido, curso_id_curso FROM alumno';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los alumnos:', err);
            return res.status(500).json({ error: 'Error al obtener los alumnos' });
        }
        res.json(results);
    });
});

app.get('/api/docentes',(req, res) => {
    const query = 'SELECT rut_docente, nombre, apellido, fono, email, curso_id_curso FROM docente';
    connection.query(query, (err, results) => {

        if (err) {
            console.error('Error al obtener los docentes:', err);
            return res.status(500).json({ error: 'Error al obtener los docentes' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No se encontraron docentes registrados" });
        }

        return res.status(200).json(results);
    });

});

app.put('/api/docentes/:rut', (req, res) => {
    const rutDocente = req.params.rut;
    const docente = req.body;
    console.log("Datos recibidos para actualizar al docente:", docente);

    // Validación de campos requeridos
    if (!docente.nombreDocente || !docente.apellidoDocente || 
        !docente.fonoDocente || !docente.emailDocente || !docente.cursoDocente) {
        return res.status(400).send({
            message: "Los campos nombre, apellido, teléfono, curso y email son obligatorios"
        });
    }

    console.log("Actualizando datos del docente con RUT:", rutDocente);
    const query = `
        UPDATE docente 
        SET 
            nombre = ?, 
            apellido = ?, 
            fono = ?, 
            email = ?, 
            direccion = ?, 
            curso_id_curso = ? 
        WHERE rut_docente = ?`;

    connection.query(query, [
        docente.nombreDocente,
        docente.apellidoDocente,
        docente.fonoDocente,
        docente.emailDocente,
        docente.direccionDocente || null,
        docente.cursoDocente,
        rutDocente
    ], (err, results) => {
        if (err) {
            console.error("Error al actualizar el docente:", err);
            return res.status(500).send({ message: "Error al actualizar el docente" });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Docente no encontrado" });
        }

        console.log("Docente actualizado exitosamente:", results);
        res.status(200).send({ message: 'Docente actualizado exitosamente' });
    });
});

app.delete('/api/docentes/:rut', (req, res) => {
    const rutDocente = req.params.rut;
    console.log("Eliminando docente con RUT:", rutDocente);

    const query = "DELETE FROM docente WHERE rut_docente = ?";

    connection.query(query, [rutDocente], (err, results) => {
        if (err) {
            console.error("Error al eliminar el docente:", err);
            return res.status(500).send({ message: "Error al eliminar el docente" });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Docente no encontrado" });
        }

        console.log("Docente eliminado exitosamente:", results);
        res.status(200).send({ message: 'Docente eliminado exitosamente' });
    });
});

app.post('/api/ingreso', (req, res) => {
    const { rut_alumno, id_curso, estado, hora } = req.body;

    if (!rut_alumno || !id_curso || !estado || !hora) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    const query = `
        INSERT INTO ingreso (rut_alumno, id_curso, estado, hora)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(query, [rut_alumno, id_curso, estado, hora], (err, results) => {
        if (err) {
            console.error("Error al insertar en la tabla ingreso:", err);
            return res.status(500).send({ message: "Error al registrar la asistencia" });
        }
        res.status(201).send({ message: "Asistencia registrada correctamente" });
    });
});

app.post('/api/salida', (req, res) => {
    const { rut_alumno, id_curso, estado, hora } = req.body;

    if (!rut_alumno || !id_curso || !estado || !hora) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    const query = `
        INSERT INTO salida (rut_alumno, id_curso, estado, hora)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(query, [rut_alumno, id_curso, estado, hora], (err, results) => {
        if (err) {
            console.error("Error al insertar en la tabla salida:", err);
            return res.status(500).send({ message: "Error al registrar la salida" });
        }
        res.status(201).send({ message: "Salida registrada correctamente" });
    });
});