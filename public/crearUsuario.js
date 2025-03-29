const bcrypt = require("bcrypt");

async function crearUsuario() {
    const passwordEncriptada = await bcrypt.hash("123456", 10);
    const sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    connection.query(sql, ["admin", passwordEncriptada], (err, result) => {
        if (err) throw err;
        console.log("Usuario creado");
    });
}

crearUsuario();
