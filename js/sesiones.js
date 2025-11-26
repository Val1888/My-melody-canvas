/* =========================================================
   Gestión de sesión sin archivos externos
   Usando localStorage 💖 (Registro + Login + Logout)
   ========================================================= */

// ───────────────────────────────────────────
//  GUARDAR UN USUARIO NUEVO (REGISTRO)
// ───────────────────────────────────────────
export function registrarUsuario(nombre, correo, contraseña, avatar) {
    if (!nombre || !correo || !contraseña || !avatar)
        throw new Error("Todos los campos son obligatorios");

    // Cargar usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe el correo
    const existe = usuarios.some(u => u.correo === correo);
    if (existe) throw new Error("Este correo ya está registrado");

    // Crear usuario
    const nuevo = {
        nombre,
        correo,
        contraseña,
        avatar,
        partidas: 0,
        puntajeMaximo: 0
    };

    usuarios.push(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return nuevo;
}



// ───────────────────────────────────────────
//        INICIO DE SESIÓN
// ───────────────────────────────────────────
export function iniciarSesion(correo, contraseña) {
    if (!correo || !contraseña)
        throw new Error("Debes escribir tu correo y contraseña");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
        u => u.correo === correo && u.contraseña === contraseña
    );

    if (!usuario)
        throw new Error("Correo o contraseña incorrectos");

    // 🔥 Asegurar que el avatar tenga la ruta completa si no la tiene
    if (usuario.avatar && !usuario.avatar.includes("recursos/")) {
        usuario.avatar = "recursos/" + usuario.avatar;
    }

    // Guardar sesión
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    return usuario;
}




// ───────────────────────────────────────────
//        OBTENER SESIÓN ACTIVA
// ───────────────────────────────────────────
export function obtenerSesionActiva() {

    const datos = localStorage.getItem("usuarioActual");

    if (!datos) return null;

    return JSON.parse(datos);
}



// ───────────────────────────────────────────
//                 CERRAR SESIÓN
// ───────────────────────────────────────────
export function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
}



// ───────────────────────────────────────────
//      ACTUALIZAR DATOS DEL USUARIO (ej: puntaje)
// ───────────────────────────────────────────
export function actualizarUsuario(usuarioActualizado) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const index = usuarios.findIndex(u => u.correo === usuarioActualizado.correo);

    if (index === -1) return;

    usuarios[index] = usuarioActualizado;

    // Guardar cambios
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));
}
