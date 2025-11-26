// main.js - Para el formulario de login en index.html
import { iniciarSesion } from "./sesiones.js";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario_inicio_sesion");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const datos = new FormData(formulario);
        const correo = datos.get("correo");
        const contraseña = datos.get("contraseña");
        
        try {
            const usuario = iniciarSesion(correo, contraseña);
            alert(`¡Bienvenido ${usuario.nombre}! 🎉`);
            window.location.href = "perfil.html";
        } catch (error) {
            alert(error.message);
        }
    });
});