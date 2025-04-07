document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("No tienes acceso. Por favor, inicia sesión.");
        window.location.href = "/login.html"; 
    }

    const tipoUsuario = document.getElementById("tipoUsuario");
    const registrarBtn = document.getElementById("registrarBtn");
    const formularioContainer = document.getElementById("formularioContainer");

    registrarBtn.addEventListener("click", function () {
        formularioContainer.innerHTML = ""; 
        const tipo = tipoUsuario.value;

        if (tipo === "docente") {
            formularioContainer.innerHTML = `
                <form id="docenteForm" class="p-4 border rounded bg-white">
                    <h3 class="mb-3">Registrar Docente</h3>
                    <div class="mb-3">
                        <label for="rutDocente" class="form-label">RUT:</label>
                        <input type="text" id="rutDocente" name="rutDocente" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="nombreDocente" class="form-label">Nombre:</label>
                        <input type="text" id="nombreDocente" name="nombreDocente" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="apellidoDocente" class="form-label">Apellido:</label>
                        <input type="text" id="apellidoDocente" name="apellidoDocente" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="fonoDocente" class="form-label">Teléfono:</label>
                        <input type="text" id="fonoDocente" name="fonoDocente" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="emailDocente" class="form-label">Email:</label>
                        <input type="email" id="emailDocente" name="emailDocente" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="direccionDocente" class="form-label">Dirección:</label>
                        <input type="text" id="direccionDocente" name="direccionDocente" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="cursoDocente" class="form-label">ID Curso:</label>
                        <input type="text" id="cursoDocente" name="cursoDocente" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Registrar Docente</button>
                </form>
            `;
            document.getElementById("docenteForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                guardarDatos('/api/docentes', data);
            });
        } else if (tipo === "alumno") {
            formularioContainer.innerHTML = `
                <form id="alumnoForm" class="p-4 border rounded bg-white">
                    <h3 class="mb-3">Registrar Alumno</h3>
                    <div class="mb-3">
                        <label for="rutAlumno" class="form-label">RUT:</label>
                        <input type="text" id="rutAlumno" name="rutAlumno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="nombreAlumno" class="form-label">Nombre:</label>
                        <input type="text" id="nombreAlumno" name="nombreAlumno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="apellidoAlumno" class="form-label">Apellido:</label>
                        <input type="text" id="apellidoAlumno" name="apellidoAlumno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="observacionAlumno" class="form-label">Observación:</label>
                        <textarea id="observacionAlumno" name="observacionAlumno" class="form-control"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="cursoAlumno" class="form-label">ID Curso:</label>
                        <input type="text" id="cursoAlumno" name="cursoAlumno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="rutApoderadoUno" class="form-label">RUT Apoderado 1:</label>
                        <input type="text" id="rutApoderadoUno" name="rutApoderadoUno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="nombreApoderadoUno" class="form-label">Nombre Apoderado 1:</label>
                        <input type="text" id="nombreApoderadoUno" name="nombreApoderadoUno" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="rutApoderadoDos" class="form-label">RUT Apoderado 2:</label>
                        <input type="text" id="rutApoderadoDos" name="rutApoderadoDos" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="nombreApoderadoDos" class="form-label">Nombre Apoderado 2:</label>
                        <input type="text" id="nombreApoderadoDos" name="nombreApoderadoDos" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Registrar Alumno</button>
                </form>
            `;
            document.getElementById("alumnoForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                guardarDatos('/api/alumnos', data);
            });
        }
    });

    function guardarDatos(url, data) {
        console.log("Datos enviados:", data); 
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Registro exitoso");
                formularioContainer.innerHTML = ""; 
            } else {
                return response.json().then(err => {
                    console.error("Error del servidor:", err); 
                    alert(`Error al registrar: ${err.message || "Inténtalo nuevamente."}`);
                });
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error); 
            alert("Error al registrar. Inténtalo nuevamente.");
        });
    }
});