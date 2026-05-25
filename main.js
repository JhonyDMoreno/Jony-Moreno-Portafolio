// Este archivo se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
 
    console.log("Portafolio de Jhony Moreno — listo ✅");
 
 
    // ================================================
    // 1. NAVBAR: oscurecer cuando el usuario hace scroll
    // ================================================
    const navbar = document.querySelector('.navbar');
 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // El usuario bajó: agregamos la clase "scrolled"
            navbar.classList.add('scrolled');
        } else {
            // El usuario está arriba: quitamos la clase
            navbar.classList.remove('scrolled');
        }
    });
 
 
    // ================================================
    // 2. NAVBAR: resaltar el link de la sección visible
    // ================================================
    const secciones = document.querySelectorAll('section[id]');
    const linksNav  = document.querySelectorAll('.nav-link');
 
    // IntersectionObserver avisa cuando una sección entra en pantalla
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Quitamos "activo" de todos los links del menú
                linksNav.forEach(link => link.classList.remove('activo'));
                // Ponemos "activo" solo al link de la sección visible
                const linkActivo = document.querySelector(
                    `.nav-link[href="#${entrada.target.id}"]`
                );
                if (linkActivo) linkActivo.classList.add('activo');
            }
        });
    }, { threshold: 0.4 }); // el 40% de la sección debe ser visible
 
    secciones.forEach(seccion => observador.observe(seccion));
 
 
    // ================================================
    // 3. MENÚ MÓVIL: cerrarlo al hacer clic en un link
    // ================================================
    const menuMovil = document.getElementById('navbarNav');
 
    linksNav.forEach(link => {
        link.addEventListener('click', () => {
            // Si el menú está abierto en móvil, lo cerramos
            if (menuMovil.classList.contains('show')) {
                new bootstrap.Collapse(menuMovil).toggle();
            }
        });
    });
 
});