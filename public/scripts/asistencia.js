document.addEventListener("DOMContentLoaded", async () => {
    const tablaAlumnos = document.getElementById("tablaAlumnos");
    try {
        const response = await fetch('/api/alumnos'); 
        if (!response.ok) throw new Error("Error al obtener los datos de los alumnos.");
        const alumnos = await response.json();

        alumnos.forEach(alumno => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${alumno.rut_alumno}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="marcarAsistencia('${alumno.rut_alumno}', true)">Asistió</button>
                    <button class="btn btn-danger btn-sm" onclick="marcarAsistencia('${alumno.rut_alumno}', false)">No Asistió</button>
                </td>
            `;
            tablaAlumnos.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al cargar los datos de los alumnos.");
    }
});


function marcarAsistencia(rut_alumno, asistio) {
    alert(`El alumno con RUT ${rut_alumno} ha sido marcado como ${asistio ? "Asistió" : "No Asistió"}.`);
   
}
