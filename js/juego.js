const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const imgMelody = new Image();
imgMelody.src = "recursos/Melody-sprit.png";

const imgObstaculo = new Image();
imgObstaculo.src = "recursos/obstaculo.png"; 

const imgSuelo = new Image();
imgSuelo.src = "recursos/suelo.jpg"; 

let melody = {
    x: 100,
    y: 200,
    width: 60,
    height: 80,
    vy: 15,
    gravedad: 1.2,
    saltando: false
};

let obstaculo = {
    x: 800,
    y: 210,
    width: 60,
    height: 60,
    velocidad: 14
};

// 🔥 SISTEMA DE PUNTUACIÓN
let puntuacion = 0;
let mejorPuntaje = localStorage.getItem("mejorPuntaje") || 0;
let juegoActivo = true;

// Elementos de la UI de puntuación
const puntuacionElement = document.getElementById("puntajeTotal");
const mejorPuntajeElement = document.getElementById("mejorPuntaje");

// Actualizar la UI de puntuación
function actualizarUI() {
    if (puntuacionElement) puntuacionElement.textContent = puntuacion;
    if (mejorPuntajeElement) mejorPuntajeElement.textContent = mejorPuntaje;
}

// Incrementar puntuación
function incrementarPuntuacion() {
    if (juegoActivo) {
        puntuacion++;
        actualizarUI();
        
        // Aumentar dificultad cada 100 puntos
        if (puntuacion % 100 === 0) {
            obstaculo.velocidad += 0.5;
        }
    }
}

// Incrementar puntuación cada segundo
setInterval(incrementarPuntuacion, 100);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !melody.saltando && juegoActivo) {
        melody.vy = -17;
        melody.saltando = true;
    }
});

function gameOver() {
    juegoActivo = false;
    
    // Actualizar mejor puntaje
    if (puntuacion > mejorPuntaje) {
        mejorPuntaje = puntuacion;
        localStorage.setItem("mejorPuntaje", mejorPuntaje);
    }
    
    // 🔥 GUARDAR ESTADÍSTICAS EN EL PERFIL DEL USUARIO
    guardarEstadisticas();
    
    setTimeout(() => {
        alert(`¡Game Over! \nPuntuación: ${puntuacion} \nMejor Puntaje: ${mejorPuntaje}`);
        document.location.reload();
    }, 500);
}

// 🔥 GUARDAR ESTADÍSTICAS EN EL USUARIO
function guardarEstadisticas() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    if (usuarioActual) {
        // Actualizar usuario actual
        usuarioActual.partidasJugadas = (usuarioActual.partidasJugadas || 0) + 1;
        usuarioActual.puntajeTotal = (usuarioActual.puntajeTotal || 0) + puntuacion;
        
        if (puntuacion > (usuarioActual.mejorPuntaje || 0)) {
            usuarioActual.mejorPuntaje = puntuacion;
        }
        
        // Actualizar en la lista de usuarios
        const usuarioIndex = usuarios.findIndex(u => u.correo === usuarioActual.correo);
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex] = usuarioActual;
        }
        
        // Guardar cambios
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function update() {
    if (!juegoActivo) return;

    melody.y += melody.vy;
    melody.vy += melody.gravedad;

    if (melody.y > 200) {
        melody.y = 200;
        melody.saltando = false;
    }

    obstaculo.x -= obstaculo.velocidad;

    if (obstaculo.x < -50) {
        obstaculo.x = 800 + Math.random() * 400;
    }

    // Detección de colisión
    if (
        melody.x < obstaculo.x + obstaculo.width &&
        melody.x + melody.width > obstaculo.x &&
        melody.y < obstaculo.y + obstaculo.height &&
        melody.height + melody.y > obstaculo.y
    ) {
        gameOver();
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    // Fondo
    ctx.fillStyle = "#ffe4ec";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Suelo
    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(0, 260, 800, 40);

    // Personaje
    ctx.drawImage(imgMelody, melody.x, melody.y, melody.width, melody.height);

    // Obstáculo
    ctx.drawImage(imgObstaculo, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);

    // 🔥 DIBUJAR PUNTUACIÓN EN EL JUEGO
    ctx.fillStyle = "#cc6699";
    ctx.font = "20px Poppins";
    ctx.fillText(`Puntuación: ${puntuacion}`, 20, 30);
    ctx.fillText(`Mejor: ${mejorPuntaje}`, 20, 60);
}

// Inicializar UI
actualizarUI();
update();