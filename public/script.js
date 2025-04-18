
const redirigirButton = document.getElementById('loginButtonAdmin');


redirigirButton.addEventListener('click', function() {
    // Redirige a otra página cuando se haga clic en el botón
    window.location.href = 'login.html'; 
});

const redirigirButtonDocente = document.getElementById('loginButtonDocente');
redirigirButtonDocente.addEventListener('click', function() {
    // Redirige a otra página cuando se haga clic en el botón
    window.location.href = 'loginDocente.html'; 
});