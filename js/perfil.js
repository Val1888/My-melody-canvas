document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Mostrar los datos en pantalla
    document.getElementById("nombreJugador").textContent = usuario.nombre;
    document.getElementById("avatarJugador").src = usuario.avatar;

    // 🔥 MOSTRAR ESTADÍSTICAS ACTUALIZADAS
    document.getElementById("puntajeTotal").textContent = usuario.puntajeTotal || 0;
    document.getElementById("partidasJugadas").textContent = usuario.partidasJugadas || 0;
    document.getElementById("mejorPuntaje").textContent = usuario.mejorPuntaje || 0;
});

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
}

document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);