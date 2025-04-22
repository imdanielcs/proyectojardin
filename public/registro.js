
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

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado");
    inicializarRegistroDocente();
    
    // Mostrar la pantalla de bienvenida por defecto
    showWelcomeScreen();
});