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

        if (response.ok && data.success) {
            window.location.href = "/index.html"; // Redirigir si el login es exitoso al index
        } else {
            errorMessage.textContent = data.message || "Usuario o contraseña incorrectos";
            errorMessage.style.display = "block"; // 
        }
    } catch (error) {
        console.error("Error en el login:", error);
        errorMessage.textContent = "Error en el servidor. Intenta de nuevo.";
        errorMessage.style.display = "block";
    }

  
});

   