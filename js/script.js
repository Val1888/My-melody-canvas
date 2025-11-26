import { iniciarSesion, obtenerSesionActiva } from "./sesiones.js";

function iniciarSesio(event) {
    event.preventDefault();
    

    if (datos_usuario.correo && datos_usuario.contraseña) {
        //una vez se valida que el usuario haya ingresado los dos campos se inicia la sesion
        if(datos_usuario.correo === usuario.correo){
            if(datos_usuario.contraseña === usuario.contraseña){
                console.log('Datos correctos');
                localStorage.setItem('usuario',JSON.stringify(usuario));
            }else{
                console.log('constraseña incorrecta');
            }
        }else{
            console.log('correo incorrecto');
        }
    }
}
function cerrarSesion(){
    localStorage.removeItem('usuario');
}

iniciarSesion("amancio@gmail.com","12345678");

obtenerSesionActiva();

//cargarJSON('../datos/usuarios.json');