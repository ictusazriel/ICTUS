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

    // 2. Menú móvil (Hamburguesa transformándose en "X")
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");
    const menuIcon = mobileMenuBtn.querySelector("i"); // Atrapamos el ícono

    mobileMenuBtn.addEventListener("click", () => {
        navList.classList.toggle("active");
        
        // Si el menú está abierto, cambiamos a la Cruz (fa-times), sino volvemos a Hamburguesa (fa-bars)
        if (navList.classList.contains("active")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Cerrar menú móvil al hacer click en un enlace y volver a poner la hamburguesa
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        });
    });

    // --- NUEVO: Lógica del Slider de Galería ---
    const sliderContainer = document.getElementById("slider-container");
    const btnPrev = document.getElementById("slide-prev");
    const btnNext = document.getElementById("slide-next");

    if(sliderContainer && btnPrev && btnNext) {
        // La cantidad a scrollear depende de si estamos en PC (1/3) o celular (entero)
        const scrollAmount = () => sliderContainer.clientWidth; 

        // Botón Siguiente
        btnNext.addEventListener("click", () => {
            sliderContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        // Botón Anterior
        btnPrev.addEventListener("click", () => {
            sliderContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        // Autoplay (Pasa una foto cada 3.5 segundos)
        let autoPlay = setInterval(() => {
            // Si llegamos al final, vuelve rápido al principio. Si no, avanza una foto.
            if (sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 10) {
                sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            }
        }, 3500);

        // Si el usuario toca la foto con el dedo en el celular, frenamos el automático para no molestarlo
        sliderContainer.addEventListener("touchstart", () => clearInterval(autoPlay), {passive: true});
        sliderContainer.addEventListener("mouseenter", () => clearInterval(autoPlay));
    }

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
