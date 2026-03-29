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

    // --- Lógica del Slider de Galería (Bucle Perfecto sin Rebobinar) ---
    const track = document.getElementById("slider-track");
    const btnPrev = document.getElementById("slide-prev");
    const btnNext = document.getElementById("slide-next");
    const windowContainer = document.getElementById("slider-window");

    if(track && btnPrev && btnNext) {
        let isAnimating = false; // Evita bugs si hacen muchos clics rápidos

        // Función para avanzar
        const moveNext = () => {
            if (isAnimating) return;
            isAnimating = true;

            const itemWidth = track.firstElementChild.offsetWidth + 20; // 20px es el gap

            // 1. Movemos la pista hacia la izquierda
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(-${itemWidth}px)`;

            // 2. Al terminar el movimiento (400ms), pasamos la primera foto al final silenciosamente
            setTimeout(() => {
                track.style.transition = "none"; 
                track.appendChild(track.firstElementChild); 
                track.style.transform = `translateX(0px)`; 
                isAnimating = false;
            }, 400); 
        };

        // Función para retroceder
        const movePrev = () => {
            if (isAnimating) return;
            isAnimating = true;

            const itemWidth = track.firstElementChild.offsetWidth + 20;

            // 1. Pasamos la última foto al principio instantáneamente y sin que se vea
            track.style.transition = "none";
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${itemWidth}px)`;
            
            // 2. Forzamos al navegador a registrar el cambio
            void track.offsetWidth;

            // 3. Movemos la pista a su lugar de forma animada
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(0px)`;

            setTimeout(() => { isAnimating = false; }, 400);
        };

        // Eventos de botones
        btnNext.addEventListener("click", moveNext);
        btnPrev.addEventListener("click", movePrev);

        // Pase automático cada 3.5 segundos
        let autoPlay = setInterval(moveNext, 3500);

        // Frenar autoplay al poner el mouse encima
        windowContainer.addEventListener("mouseenter", () => clearInterval(autoPlay));
        windowContainer.addEventListener("mouseleave", () => {
            clearInterval(autoPlay); // Limpiamos por seguridad
            autoPlay = setInterval(moveNext, 3500);
        });

        // --- SOPORTE PARA DESLIZAR CON EL DEDO (CELULARES) ---
        let touchStartX = 0;
        let touchEndX = 0;

        windowContainer.addEventListener("touchstart", (e) => {
            clearInterval(autoPlay);
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        windowContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            // Si deslizó a la izquierda (Avanza)
            if (touchStartX - touchEndX > 50) moveNext(); 
            // Si deslizó a la derecha (Retrocede)
            if (touchEndX - touchStartX > 50) movePrev(); 
            
            autoPlay = setInterval(moveNext, 3500); // Reactivamos autoplay
        }, {passive: true});
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
