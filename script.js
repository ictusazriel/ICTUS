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

    // 4. Enviar formulario a WhatsApp
    const formContacto = document.getElementById("formContacto");
    if(formContacto){
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault(); // Evitamos que la página se recargue
            
            // Capturamos los datos que ingresó el usuario
            const nombre = document.getElementById("nombre").value;
            const empresa = document.getElementById("empresa").value;
            const telefono = document.getElementById("telefono").value;
            const mensaje = document.getElementById("mensaje").value;
            
            // Armamos el mensaje (los %0A funcionan como la tecla "Enter" para hacer saltos de línea)
            const textoWhatsApp = `Hola ICTUS, me contacto desde la web.%0A%0A*Nombre:* ${nombre}%0A*Empresa:* ${empresa}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje}`;
            
            // Número de ICTUS
            const numeroIctus = "5491159621202";
            
            // Abrimos WhatsApp en una pestaña nueva ya con el texto escrito
            window.open(`https://wa.me/${numeroIctus}?text=${textoWhatsApp}`, '_blank');
            
            // Limpiamos los campos del formulario
            formContacto.reset();
        });
    }
});
