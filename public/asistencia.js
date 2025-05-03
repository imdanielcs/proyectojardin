document.addEventListener("DOMContentLoaded", async () => {
    const tablaAlumnos = document.getElementById("tablaAlumnos");
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch('/api/alumnos', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) throw new Error("Error al obtener los datos de los alumnos.");
        const alumnos = await response.json();

        alumnos.forEach(alumno => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${alumno.rut_alumno}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.curso_id_curso}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="marcarAsistencia('${alumno.rut_alumno}', true)">Asistió</button>
                    <button class="btn btn-danger btn-sm" onclick="marcarAsistencia('${alumno.rut_alumno}', false)">No Asistió</button>
                    <button class="btn btn-warning btn-sm" onclick="marcarSalida('${alumno.rut_alumno}', true)">Salida</button>
                </td>
            `;
            tablaAlumnos.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al cargar los datos de los alumnos.");
    }
});

function formatDateToMySQL(date) {
    const pad = num => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

async function marcarAsistencia(rut_alumno, asistio) {
    const estado = asistio ? "Asistió" : "No Asistió";
    const fila = Array.from(document.querySelectorAll("#tablaAlumnos tr")).find(row => row.children[0].textContent === rut_alumno);
    const nombre = fila.children[1].textContent;
    const apellido = fila.children[2].textContent;
    const id_curso = fila.children[3].textContent;
    const hora = formatDateToMySQL(new Date());
    const token = localStorage.getItem("authToken");

    const data = {
        rut_alumno,
        nombre,
        apellido,
        id_curso,
        estado,
        hora
    };

    try {
        const response = await fetch('/api/ingreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
            
        });

        if (!response.ok) throw new Error("Error al registrar la asistencia.");
        alert(`El alumno con RUT ${rut_alumno} ha sido marcado como ${estado}.`);
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al registrar la asistencia.");
    }
}

async function marcarSalida(rut_alumno) {
    const fila = Array.from(document.querySelectorAll("#tablaAlumnos tr")).find(row => row.children[0].textContent === rut_alumno);
    const nombre = fila.children[1].textContent;
    const apellido = fila.children[2].textContent;
    const id_curso = fila.children[3].textContent;
    const hora = formatDateToMySQL(new Date());
    const estado = "Salida";
    const token = localStorage.getItem("authToken");

    const data = {
        rut_alumno,
        nombre,
        apellido,
        id_curso,
        estado,
        hora
    };

    try {
        const response = await fetch('/api/salida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Error al registrar la salida.");
        alert(`El alumno con RUT ${rut_alumno} se registró su salida con éxito.`);
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al registrar la salida.");
    }
}
