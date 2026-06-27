document.addEventListener("DOMContentLoaded", function () {
    mostrarSaludo();
    crearBotonArriba();
    activarSombraNavbar();
    actualizarAnioFooter();
    manejarFormularioContacto();
    manejarFormularioLogin();
    contarCaracteres();
    contarVisitas();
    filtrarServicios();
});

function mostrarSaludo() {
    var elemento = document.getElementById("saludo-dinamico");
    if (!elemento) return;

    var hora = new Date().getHours();
    var mensaje = "¡Hola!";

    if (hora >= 5 && hora < 12) {
        mensaje = "¡Buenos días!";
    } else if (hora >= 12 && hora < 19) {
        mensaje = "¡Buenas tardes!";
    } else {
        mensaje = "¡Buenas noches!";
    }

    elemento.textContent = mensaje;
}

function crearBotonArriba() {
    var boton = document.createElement("button");
    boton.id = "btn-arriba";
    boton.innerHTML = "&#8593;";
    boton.setAttribute("aria-label", "Volver arriba");
    boton.title = "Volver arriba";
    document.body.appendChild(boton);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            boton.classList.add("visible");
        } else {
            boton.classList.remove("visible");
        }
    });

    boton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function activarSombraNavbar() {
    var navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });
}

function actualizarAnioFooter() {
    var elementos = document.querySelectorAll(".footer-year");
    var anioActual = new Date().getFullYear();

    elementos.forEach(function (el) {
        el.textContent = anioActual;
    });
}

function manejarFormularioContacto() {
    var formulario = document.getElementById("contact-form");
    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add("was-validated");
            return;
        }

        var nombre = document.getElementById("nombre").value;
        var contenedor = document.getElementById("form-mensaje");

        contenedor.innerHTML =
            '<div class="alert alert-success mt-3" role="alert">' +
            "¡Gracias, <strong>" + nombre + "</strong>! Recibimos tu mensaje. " +
            "Te responderemos pronto." +
            "</div>";

        formulario.reset();
        formulario.classList.remove("was-validated");

        var contador = document.getElementById("char-count");
        if (contador) contador.textContent = "0";
    });
}

function contarCaracteres() {
    var textarea = document.getElementById("mensaje");
    var contador = document.getElementById("char-count");
    if (!textarea || !contador) return;

    textarea.addEventListener("input", function () {
        var total = textarea.value.length;
        contador.textContent = total;

        if (total > 400) {
            contador.classList.add("text-danger");
        } else {
            contador.classList.remove("text-danger");
        }
    });
}

function manejarFormularioLogin() {
    var formulario = document.getElementById("login-form");
    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var boton = formulario.querySelector("button[type='submit']");
        var mensaje = document.getElementById("login-mensaje");

        boton.disabled = true;
        boton.textContent = "Cargando...";

        setTimeout(function () {
            boton.disabled = false;
            boton.textContent = "Iniciar sesión";

            mensaje.innerHTML =
                '<div class="alert alert-info mt-3" role="alert">' +
                "Esta es una demo. En un proyecto real aquí validarías usuario y contraseña." +
                "</div>";
        }, 1500);
    });
}

function contarVisitas() {
    var elemento = document.getElementById("visitas-contador");
    if (!elemento) return;

    var visitas = localStorage.getItem("visitas-devnewsolutions");

    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas, 10) + 1;
    }

    localStorage.setItem("visitas-devnewsolutions", visitas);
    elemento.textContent = visitas;
}

function filtrarServicios() {
    var botones = document.querySelectorAll("[data-filtro]");
    var tarjetas = document.querySelectorAll("[data-categoria]");

    if (botones.length === 0 || tarjetas.length === 0) return;

    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            var categoria = boton.getAttribute("data-filtro");

            botones.forEach(function (b) {
                b.classList.remove("active");
            });
            boton.classList.add("active");

            tarjetas.forEach(function (tarjeta) {
                var catTarjeta = tarjeta.getAttribute("data-categoria");

                if (categoria === "todos" || catTarjeta === categoria) {
                    tarjeta.style.display = "";
                    tarjeta.classList.add("fade-in");
                } else {
                    tarjeta.style.display = "none";
                }
            });
        });
    });
}
