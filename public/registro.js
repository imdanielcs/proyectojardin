// Función para mostrar la pantalla de bienvenida
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const formContainer = document.querySelector('.form-container');
    
    welcomeScreen.style.display = 'block';
    formContainer.style.display = 'none';
}

// Función para mostrar el formulario seleccionado
function showForm(formType) {
    const welcomeScreen = document.getElementById('welcome-screen');
    const formContainer = document.querySelector('.form-container');
    
    // Ocultar pantalla de bienvenida y mostrar contenedor de formularios
    welcomeScreen.style.display = 'none';
    formContainer.style.display = 'block';
    
    // Ocultar todos los formularios
    document.querySelectorAll('.form-section').forEach(form => {
        form.style.display = 'none';
    });
    
    // Mostrar el formulario seleccionado
    const formToShow = document.getElementById(`${formType}-form`);
    if (formToShow) {
        formToShow.style.display = 'block';
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('authToken');
    window.location.href = '/index.html';
}

// Función principal para manejar el registro de docentes
function inicializarRegistroDocente() {
    console.log("Inicializando registro de docente");
    
    const formDocente = document.getElementById("formDocente");
    console.log("Formulario encontrado:", formDocente);

    if (!formDocente) {
        console.error("Error: No se encontró el formulario de docente");
        return;
    }

    formDocente.addEventListener("submit", async function(e) {
        e.preventDefault();
        console.log("Formulario enviado");
        
        const formData = {
            rutDocente: document.getElementById("rutDocente").value,
            password: document.getElementById("password").value,
            nombreDocente: document.getElementById("nombreDocente").value,
            apellidoDocente: document.getElementById("apellidoDocente").value,
            fonoDocente: document.getElementById("fonoDocente").value,
            emailDocente: document.getElementById("emailDocente").value,
            direccionDocente: document.getElementById("direccionDocente").value,
            cursoDocente: document.getElementById("cursoDocente").value
        };
        console.log(formData);
        
        

        try {
            console.log("Datos a enviar:", formData);
            const response = await fetch('/api/docentes', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log("Respuesta recibida:", response);

            if (response.ok) {
                const data = await response.json();
                alert("Docente registrado exitosamente");
                formDocente.reset();
            } else {
                const error = await response.json();
                console.error("Error del servidor:", error);
                alert(`Error al registrar: ${error.message || "Inténtalo nuevamente."}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error); 
            alert("Error al registrar. Inténtalo nuevamente.");
        }
    });
}

// Función principal para manejar el registro de alumnos
function inicializarRegistroAlumno() {
    console.log("Inicializando registro de alumno");
    
    const formAlumno = document.getElementById("formAlumno");
    console.log("Formulario de alumno encontrado:", formAlumno);

    if (!formAlumno) {
        console.error("Error: No se encontró el formulario de alumno");
        return;
    }

    // Preview de imagen para el formulario de alumno
    const fotoAlumno = document.getElementById('fotoAlumno');
    if (fotoAlumno) {
        fotoAlumno.addEventListener('change', function(e) {
            const preview = document.getElementById('previewFoto');
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }

    formAlumno.addEventListener("submit", async function(e) {
        e.preventDefault();
        console.log("Formulario de alumno enviado");
        
        const formData = {
            rutAlumno: document.getElementById("rutAlumno").value,
            nombreAlumno: document.getElementById("nombreAlumno").value,
            apellidoAlumno: document.getElementById("apellidoAlumno").value,
            observacionAlumno: document.getElementById("observacionAlumno").value,
            cursoAlumno: document.getElementById("cursoAlumno").value,
            rutApoderadoUno: document.getElementById("rutApoderado1").value,
            nombreApoderadoUno: document.getElementById("nombreApoderado1").value,
            rutApoderadoDos: document.getElementById("rutApoderado2").value,
            nombreApoderadoDos: document.getElementById("nombreApoderado2").value,
            fono1: document.getElementById("fonoApoderado1").value,
            fono2: document.getElementById("fonoApoderado2").value,
            email1: document.getElementById("emailApoderado1").value,
            email2: document.getElementById("emailApoderado2").value,
            direccion: document.getElementById("direccionApoderado").value
        };

        console.log("Datos de alumno a enviar:", formData);

        try {
            const response = await fetch('/api/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log("Respuesta recibida:", response);

            if (response.ok) {
                const data = await response.json();
                console.log("Registro de alumno exitoso:", data);
                alert("Alumno registrado exitosamente");
                formAlumno.reset();
                const preview = document.getElementById('previewFoto');
                if (preview) {
                    preview.style.display = 'none';
                }
            } else {
                const error = await response.json();
                console.error("Error del servidor:", error);
                alert(`Error al registrar alumno: ${error.message || "Inténtalo nuevamente."}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al registrar alumno. Inténtalo nuevamente.");
        }
    });
}

function BustarcantidadInformacionJardin(){
    console.log("Función BustarcantidadDocente ejecutada");
    fetch('/api/docentes/count')
        .then(response => response.json())
        .then(data => {
          // Mostrar el número de docentes en el HTML
          document.getElementById('total-docentes').textContent = data.totalDocentes;
          console.info(data.totalDocentes);
        })
        .catch(error => {
          console.error('Error al obtener el número de docentes:', error);
          document.getElementById('total-docentes').textContent = 'Error al cargar';
        });

    fetch('/api/alumnos/count')
        .then(response => response.json())
        .then(data => {
            // Mostrar el número de docentes en el HTML
            document.getElementById('total-alumnos').textContent = data.totalAlumnos;
            console.info(data.totalAlumnos);
        })
        .catch(error => {
            console.error('Error al obtener el número de Alumnos:', error);
            document.getElementById('total-alumnos').textContent = 'Error al cargar';
        });



}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado");
    inicializarRegistroDocente();
    inicializarRegistroAlumno();
    
    // Mostrar la pantalla de bienvenida por defecto
    showWelcomeScreen();
});

//evento que se dispara cuando el HTML ha sido completamente cargado
//ideal cuando se necesita interactuar con el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarDocentes();
    BustarcantidadInformacionJardin();
});

let rutDocenteActualizar = null; //variable para almacenar el rut del docente

function cargarDocentes() {
    fetch('/api/docentes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los docentes');
            }
            return response.json();
        })
        .then(docentes => {
            const tabla = document.getElementById('tabla-docentes');//hace refenencia a la tabla en el html
            tabla.innerHTML = ''; // limpia la tabla antes de agregar nuevos datos

            docentes.forEach(docente => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${docente.rut_docente}</td>
                    <td>${docente.nombre}</td>
                    <td>${docente.apellido}</td>
                    <td>${docente.fono}</td>
                    <td>${docente.email}</td>
                    <td>${docente.curso_id_curso}</td>
                `;
                // Crear celda para los botones de acción
                const tdAcciones = document.createElement('td');
                
                // Crear botón de Actualizar
                const btnActualizar = document.createElement('button');
                btnActualizar.textContent = 'Actualizar';
                btnActualizar.classList.add('btn-entrada');
                console.log("entra rut docente"+ docente.rutDocente);
                btnActualizar.onclick = () => {
                    rutDocenteActualizar = docente.rut_docente; // Asegurarse de usar rut_docente
                    console.log("RUT del docente a actualizar:", rutDocenteActualizar);
                    mostrarModal(docente); 
                };
                // Crear botón de Eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.classList.add('btn-salida');
                btnEliminar.onclick = () => eliminarDocente(docente.rut_docente); // Llama a la función con el RUT del docente

                // Agregar los botones a la celda de acciones
                tdAcciones.appendChild(btnActualizar);
                tdAcciones.appendChild(btnEliminar);

                // Agregar la celda de botones a la fila
                fila.appendChild(tdAcciones);

                // Agregar la fila a la tabla
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarModal(docente) {
    // Rellenar los campos del modal con los datos del docente
    document.getElementById('nombreDocente_update').value = docente.nombre;
    document.getElementById('apellidoDocente_update').value = docente.apellido;
    document.getElementById('fonoDocente_update').value = docente.fono;
    document.getElementById('emailDocente_update').value = docente.email;
    document.getElementById('cursoDocente_update').value = docente.curso_id_curso;
    document.getElementById('direccionDocente_update').value = docente.direccion || '';

    // Mostrar el modal
    document.getElementById('modal-actualizar').style.display = 'block';
}

// Función para actualizar el docente
function actualizarDocente() {
    if (rutDocenteActualizar === null) {
        alert("No se ha seleccionado un docente para actualizar.");
        return;
    }

    // Mostrar indicador de carga
    const btnConfirmar = document.getElementById('btn-confirmar');
    btnConfirmar.disabled = true;
    btnConfirmar.innerHTML = 'Actualizando...'

    //obteniendo los datos del docente
    const docenteActualizado = {
        nombreDocente: document.getElementById('nombreDocente_update').value,
        apellidoDocente: document.getElementById('apellidoDocente_update').value,
        fonoDocente: document.getElementById('fonoDocente_update').value,
        emailDocente: document.getElementById('emailDocente_update').value,
        cursoDocente: document.getElementById('cursoDocente_update').value,
        direccionDocente: document.getElementById('direccionDocente_update').value || null
    };

    // Validación de campos
    if (!docenteActualizado.nombreDocente || !docenteActualizado.apellidoDocente || 
        !docenteActualizado.fonoDocente || !docenteActualizado.emailDocente || 
        !docenteActualizado.cursoDocente) {
        alert("Por favor, completa todos los campos obligatorios.");
        tnConfirmar.disabled = false;
        btnConfirmar.innerHTML = 'Confirmar';
        return;
    }

    // Solicitud PUT para actualizar docente
    fetch(`/api/docentes/${rutDocenteActualizar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(docenteActualizado)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text || 'Error en la respuesta del servidor');
            });
        }
        return response.json();
    })
    .then(data => {
        // Mostrar notificación de éxito
        mostrarNotificacion('Docente actualizado exitosamente', 'success');
        
        // Cerrar el modal
        document.getElementById('modal-actualizar').style.display = 'none';
        
        // Recargar la tabla de docentes
        cargarDocentes();
    })
    .catch(error => {
        console.error("Error al actualizar docente:", error);
        alert("Hubo un problema al actualizar el docente.");
    })
    .finally(() => {
        // Restaurar el botón
        btnConfirmar.disabled = false;
        btnConfirmar.innerHTML = 'Confirmar';
    });
}

// Función para cerrar el modal
function cancelarActualizacion() {
    document.getElementById('modal-actualizar').style.display = 'none';
}

// Asignar la función de confirmar y cancelar en los botones del modal
document.getElementById('btn-confirmar').onclick = actualizarDocente;
document.getElementById('btn-cancelar').onclick = cancelarActualizacion;

// Función para eliminar un docente
function eliminarDocente(rut) {
    if (confirm(`¿Estás seguro de que quieres eliminar al docente con RUT ${rut}?`)) {
        // Mostrar indicador de carga
        const btnEliminar = event.target;
        btnEliminar.disabled = true;
        btnEliminar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Eliminando...';
        // Realizamos la solicitud DELETE para eliminar al docente
        fetch(`/api/docentes/${rut}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar notificación de éxito
            mostrarNotificacion('Docente eliminado exitosamente', 'success');
            
            // Recargar la tabla de docentes
            cargarDocentes();
            BustarcantidadInformacionJardin()
        })
        .catch(error => {
            console.error("Error al eliminar docente:", error);
            alert("Hubo un problema al eliminar el docente.");
        })
        .finally(() => {
            // Restaurar el botón
            btnEliminar.disabled = false;
            btnEliminar.innerHTML = 'Eliminar';
        });
    }
}

function buscarPorRutAlumno() {
    const rut = document.getElementById('rutInput').value; // Obtenemos el RUT desde el input
    
    // Verificamos si el RUT no está vacío
    if (!rut) {
        alert("Por favor ingrese un RUT.");
        return;
    }

    fetch(`/api/alumnos/${rut}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del alumno');
        }
        return response.json();
    })
    .then(data => {
        // Verificamos si encontramos al alumno
        if (data) {
            mostrarDatosAlumno(data);
        } else {
            alert("No se encontraron datos para el alumno");
            limpiarDatosAlumno();
        }
    })
    .catch(error => {
        console.error("Error al buscar al alumno y su información", error);
        alert("No se obtuvo al alumno :(");
        limpiarDatosAlumno();
    });
}

// Función para mostrar los datos del alumno en el HTML
function mostrarDatosAlumno(data) {
    const alumnoInfoDiv = document.getElementById('alumnoInfo');

    alumnoInfoDiv.innerHTML = `
        <h2>Información del Alumno</h2>
        <p><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</p>
        <p><strong>RUT:</strong> ${data.rut_alumno}</p>
        <p><strong>Curso ID:</strong> ${data.curso_id_curso}</p>
        <p><strong>Apoderado 1:</strong> ${data.nombre_apoderado_uno}</p>
        <p><strong>Apoderado 2:</strong> ${data.nombre_apoderado_dos}</p>
        <p><strong>Teléfono 1:</strong> ${data.fono1}</p>
        <p><strong>Teléfono 2:</strong> ${data.fono2}</p>
        <p><strong>Email 1:</strong> ${data.email1}</p>
        <p><strong>Email 2:</strong> ${data.email2}</p>
        <p><strong>Dirección:</strong> ${data.direccion}</p>
        <input type="text" id="InformacionAdicional" placeholder="Ingrese la información adicional">
    `;

    const botonEnviar = document.createElement('button');
    botonEnviar.textContent = 'Enviar Correo';
    alumnoInfoDiv.appendChild(botonEnviar);

    botonEnviar.addEventListener('click', () => {
        
        //asignamos valor espesifico a las variables de envio de correo
        const nombreAlumno = data.nombre;
        const nombreApoderado_1 = data.nombre_apoderado_uno;
        const email = data.email1;
        const informacionAdicional = document.getElementById('InformacionAdicional').value;
        enviarCorreoComunicacion(email, nombreAlumno, nombreApoderado_1, informacionAdicional);
    });
}

// Función para limpiar los datos mostrados en caso de error o no encontrar al alumno
function limpiarDatosAlumno() {
    const alumnoInfoDiv = document.getElementById('alumnoInfo');
    alumnoInfoDiv.innerHTML = "<p>No se encontró información del alumno.</p>";
}

// Función auxiliar para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

async function enviarCorreoComunicacion(email, nombreAlumno, nombreApoderado_1, informacionAdicional) {
    alert("Correo enviado exitosamente");
    const asunto = 'Contacto con apoderado del Jardín Huellita';
    const mensaje = `
    <h1>Correo del Jardín Huellita</h1>
    <p>Estimado apoderado  ${nombreApoderado_1}, nos comunicamos con usted para informarle sobre sircunstancias de su hijo ${nombreAlumno} .</p>
    <p>Información adicional: ${informacionAdicional}</p>
    `;
    try {
      const response = await fetch('/api/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, asunto, mensaje }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('Correo enviado correctamente');
      } else {
        console.error('Error al enviar el correo:', data.error);
      }
    } catch (err) {
      console.error('Error al conectarse al servidor:', err.message);
    }
}
  

// Objeto para guardar el estado de asistencia de cada alumno por su RUT
const estadoAsistencia = "";


function cargarAlumnos(estado) {
    fetch(`/api/alumno/asistencia/${estado}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del alumno');
        }
        return response.json();
    })
    .then(alumnos => {
        const tabla = document.getElementById('tabla-body');
        tabla.innerHTML = '';

        alumnos.forEach(alumno => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.rut_alumno}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.curso}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => console.error('Error:', error));
}

function mostrarAsistieron() {
    cargarAlumnos("asistio");
}

function mostrarNoAsistieron() {
    cargarAlumnos("no_asistio");
}

