const express = require('express');
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DanielDennisse_123",
    database: "jardin_db",
});

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Ruta para registrar docentes
router.post('/docente', (req, res) => {
    const { rut, nombre, apellido, fono, email, direccion } = req.body;
    const sql = "INSERT INTO docentes (rut, nombre, apellido, fono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [rut, nombre, apellido, fono, email, direccion], (err, result) => {
        if (err) {
            console.error("Error al insertar docente:", err);
            return res.status(500).send({ message: "Error al registrar docente" });
        }
        res.status(201).send({ message: "Docente registrado correctamente" });
    });
});

// Ruta para registrar alumnos
router.post('/alumno', (req, res) => {
    const { rut, nombre, apellido, observacion } = req.body;
    const sql = "INSERT INTO alumnos (rut, nombre, apellido, observacion) VALUES (?, ?, ?, ?)";
    connection.query(sql, [rut, nombre, apellido, observacion], (err, result) => {
        if (err) {
            console.error("Error al insertar alumno:", err);
            return res.status(500).send({ message: "Error al registrar alumno" });
        }
        res.status(201).send({ message: "Alumno registrado correctamente" });
    });
});

// Ruta para registrar apoderados
router.post('/apoderado', (req, res) => {
    const { rut, nombre, apellido, fono, email, direccion } = req.body;
    const sql = "INSERT INTO apoderados (rut, nombre, apellido, fono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [rut, nombre, apellido, fono, email, direccion], (err, result) => {
        if (err) {
            console.error("Error al insertar apoderado:", err);
            return res.status(500).send({ message: "Error al registrar apoderado" });
        }
        res.status(201).send({ message: "Apoderado registrado correctamente" });
    });
});

module.exports = router;
