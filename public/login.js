document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Guardo el token en localStorage
            // Si cierro y vuelvo a abrir el navegador, el token se borra.
            localStorage.setItem("authToken", data.token);
            window.location.href = "/registro.html"; 
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

