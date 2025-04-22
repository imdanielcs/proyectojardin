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
    window.location.href = '/login.html';
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
            passwordDocente: document.getElementById("password").value,
            nombreDocente: document.getElementById("nombreDocente").value,
            apellidoDocente: document.getElementById("apellidoDocente").value,
            fonoDocente: document.getElementById("fonoDocente").value,
            emailDocente: document.getElementById("emailDocente").value,
            direccionDocente: document.getElementById("direccionDocente").value,
            cursoDocente: document.getElementById("cursoDocente").value
        };

        

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

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado");
    inicializarRegistroDocente();
    inicializarRegistroAlumno();
    
    // Mostrar la pantalla de bienvenida por defecto
    showWelcomeScreen();
});