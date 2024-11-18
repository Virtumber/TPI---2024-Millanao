document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto (recargar la página)
    console.log("Formulario enviado"); // Comprobación de que el evento de envío funciona

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nombre_usuario = document.getElementById('nombre_usuario').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validaciones
    if (!nombre || !apellido || !nombre_usuario || !dni || !email || !password || !confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Preparar los datos para enviarlos
    const formData = {
        nombre,
        apellido,
        nombre_usuario,
        dni,
        email,
        password
    };

    // Realizar la petición a la API con fetch
    try {
        const response = await fetch('/api/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Cuenta creada exitosamente');
            document.getElementById('registerForm').reset(); // Limpiar el formulario
        } else {
            const errorMessage = await response.text();
            alert(`Hubo un error al crear la cuenta: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al crear la cuenta');
    }
});
