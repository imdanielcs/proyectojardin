document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/registro.html"; 
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});
