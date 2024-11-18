document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto (recargar la página)

    // Obtener los valores de los campos
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validaciones
    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Preparar los datos para enviarlos
    const loginData = {
        nombre_usuario: username,
        password: password
    };

    // Realizar la petición a la API con fetch
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            // Redirige a la página principal, por ejemplo
            if (data.redirectTo) {
                window.location.href = data.redirectTo; // Redirige a la página correspondiente
              }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al iniciar sesión');
    }
});
