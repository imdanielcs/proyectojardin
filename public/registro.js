document.getElementById('registrarBtn').addEventListener('click', () => {
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const formularioContainer = document.getElementById('formularioContainer');

    formularioContainer.innerHTML = '';

    if (tipoUsuario === 'docente') {
        // Formulario para Docente
        formularioContainer.innerHTML = `
            <h2>Formulario para Docentes</h2>
            <form id="formDocente">
                <label for="rutDocente">Rut:</label>
                <input type="text" id="rutDocente" name="rutDocente" required>

                <label for="nombreDocente">Nombre:</label>
                <input type="text" id="nombreDocente" name="nombreDocente" required>

                <label for="apellidoDocente">Apellido:</label>
                <input type="text" id="apellidoDocente" name="apellidoDocente" required>

                <label for="fonoDocente">Fono:</label>
                <input type="tel" id="fonoDocente" name="fonoDocente" required>

                <label for="emailDocente">Email:</label>
                <input type="email" id="emailDocente" name="emailDocente" required>

                <label for="direccionDocente">Dirección:</label>
                <input type="text" id="direccionDocente" name="direccionDocente" required>

                <button type="submit">Enviar</button>
            </form>
        `;

        document.getElementById('formDocente').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                rut: document.getElementById('rutDocente').value,
                nombre: document.getElementById('nombreDocente').value,
                apellido: document.getElementById('apellidoDocente').value,
                fono: document.getElementById('fonoDocente').value,
                email: document.getElementById('emailDocente').value,
                direccion: document.getElementById('direccionDocente').value,
            };
            await enviarDatos('docente', data);
        });
    } else if (tipoUsuario === 'alumno') {
        // Formulario para Alumno
        formularioContainer.innerHTML = `
            <h2>Formulario para Alumnos</h2>
            <form id="formAlumno">
                <label for="rutAlumno">Rut:</label>
                <input type="text" id="rutAlumno" name="rutAlumno" required>

                <label for="nombreAlumno">Nombre:</label>
                <input type="text" id="nombreAlumno" name="nombreAlumno" required>

                <label for="apellidoAlumno">Apellido:</label>
                <input type="text" id="apellidoAlumno" name="apellidoAlumno" required>

                <label for="observacionAlumno">Observación:</label>
                <input type="text" id="observacionAlumno" name="gradoAlumno" required>

                <button type="submit">Enviar</button>
            </form>
        `;

        document.getElementById('formAlumno').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                rut: document.getElementById('rutAlumno').value,
                nombre: document.getElementById('nombreAlumno').value,
                apellido: document.getElementById('apellidoAlumno').value,
                observacion: document.getElementById('observacionAlumno').value,
            };
            await enviarDatos('alumno', data);
        });
    } else if (tipoUsuario === 'apoderado') {
        // Formulario para Apoderado
        formularioContainer.innerHTML = `
            <h2>Formulario para Apoderados</h2>
            <form id="formApoderado">
                <label for="rutApoderado">Rut:</label>
                <input type="text" id="rutApoderado" name="rutApoderado" required>

                <label for="nombreApoderado">Nombre:</label>
                <input type="text" id="nombreApoderado" name="nombreApoderado" required>

                <label for="apellidoApoderado">Apellido:</label>
                <input type="text" id="apellidoApoderado" name="apellidoApoderado" required>

                <label for="fonoApoderado">Fono:</label>
                <input type="tel" id="fonoApoderado" name="fonoApoderado" required>

                <label for="emailApoderado">Email:</label>
                <input type="email" id="emailApoderado" name="emailApoderado" required>

                <label for="direccionApoderado">Dirección:</label>
                <input type="text" id="direccionApoderado" name="direccionApoderado" required>

                <button type="submit">Enviar</button>
            </form>
        `;

        document.getElementById('formApoderado').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                rut: document.getElementById('rutApoderado').value,
                nombre: document.getElementById('nombreApoderado').value,
                apellido: document.getElementById('apellidoApoderado').value,
                fono: document.getElementById('fonoApoderado').value,
                email: document.getElementById('emailApoderado').value,
                direccion: document.getElementById('direccionApoderado').value,
            };
            await enviarDatos('apoderado', data);
        });
    } else {
        alert('Por favor, selecciona un tipo de usuario válido.');
    }
});

async function enviarDatos(tipo, data) {
    try {
        const response = await fetch(`/api/${tipo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert('Datos enviados correctamente.');
        } else {
            alert('Error al enviar los datos.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar los datos.');
    }
}