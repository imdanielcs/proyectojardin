document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const rut_docente = document.getElementById("rut").value; 
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("/login-docente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rut_docente, password }) 
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem("authToken", data.token);
            window.location.href = "/dashboardDocente.html"; 
        } else {
            errorMessage.textContent = data.message || "Usuario o contraseña incorrectos";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error en el login:", error);
        errorMessage.textContent = "Error en el servidor. Intenta de nuevo.";
        errorMessage.style.display = "block";
    }
});

