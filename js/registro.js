// REGISTRO DE USUARIO
document.querySelector("#btn_registro").addEventListener("click", (e) => {
    e.preventDefault();

    const datos = new FormData(document.querySelector("#formulario_registro"));
    const usuario = Object.fromEntries(datos.entries());

    // Validación
    if (!usuario.nombre || !usuario.correo || !usuario.contraseña || !usuario.avatar) {
        alert("Por favor completa todos los campos y selecciona un avatar.");
        return;
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Evitar correos duplicados
    if (listaUsuarios.some(u => u.correo === usuario.correo)) {
        alert("Este correo ya está registrado.");
        return;
    }

    // 🔥 CORRECCIÓN: La ruta del avatar ya viene con "recursos/" desde el FormData
    // NO agregues "recursos/" otra vez porque ya está en el value del radio button
    usuario.avatar = datos.get("avatar"); // ← QUITA el "recursos/" de aquí
    
    // Datos adicionales del jugador
    usuario.puntajeTotal = 0;
    usuario.partidasJugadas = 0;
    usuario.mejorPuntaje = 0;

    console.log("Usuario a guardar:", usuario);
    console.log("Avatar path:", usuario.avatar);

    listaUsuarios.push(usuario);

    // Guardar lista completa de usuarios
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    // Guardar usuario actual
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // Verificar que se guardó correctamente
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));
    console.log("Usuario guardado en localStorage:", usuarioGuardado);

    alert("Registro exitoso 🎉");
    window.location.href = "perfil.html";
});