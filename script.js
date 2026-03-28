document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navbar cambio de fondo al hacer scroll
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Menú móvil (Hamburguesa)
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");

    mobileMenuBtn.addEventListener("click", () => {
        navList.classList.toggle("active");
    });

    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
        });
    });

    // 3. Animaciones suaves al hacer scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll(".fade-in");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

// Lógica del Acordeón de Servicios
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            // Alternar la clase activa en el botón actual
            header.classList.toggle("active");
            
            // Seleccionar el contenedor del texto que le sigue al botón
            const content = header.nextElementSibling;
            
            // Si está activo, le damos la altura máxima basada en su contenido; si no, la reducimos a 0
            if (header.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
            
            // Opcional: Cerrar los otros acordeones automáticamente al abrir uno
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains("active")) {
                    otherHeader.classList.remove("active");
                    otherHeader.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    // 4. Prevenir envío por defecto del formulario (simulación)
    const formContacto = document.getElementById("formContacto");
    if(formContacto){
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();
            // Aquí puedes conectar el form a Formspree, Netlify Forms o EmailJS
            alert("¡Gracias por su mensaje! Un asesor de ICTUS se contactará a la brevedad.");
            formContacto.reset();
        });
    }
});