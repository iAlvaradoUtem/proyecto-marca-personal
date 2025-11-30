document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        // Abrir/Cerrar menú
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 2. ACCESIBILIDAD ---
    const btnA11yToggle = document.getElementById('btnA11yToggle');
    const a11yMenu = document.getElementById('a11yMenu');
    const btnContrast = document.getElementById('btnContrast');
    const btnIncrease = document.getElementById('btnIncrease');
    const btnDecrease = document.getElementById('btnDecrease');

    // Toggle del menú flotante
    if (btnA11yToggle && a11yMenu) {
        btnA11yToggle.addEventListener('click', () => {
            a11yMenu.classList.toggle('active');
        });
    }

    // Modo Alto Contraste
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    // Control de Tamaño de Fuente (Afecta a todo vía root html)
    let fontSizePercent = 100;

    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            if(fontSizePercent < 150) {
                fontSizePercent += 10;
                document.documentElement.style.fontSize = fontSizePercent + '%';
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            if(fontSizePercent > 80) {
                fontSizePercent -= 10;
                document.documentElement.style.fontSize = fontSizePercent + '%';
            }
        });
    }

    // --- 3. SCROLL REVEAL (ANIMACIONES AL BAJAR) ---
    const revealElements = document.querySelectorAll('.reveal');

    // Usamos IntersectionObserver para mejor rendimiento
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Agrega la clase 'active' para iniciar animación
                    entry.target.classList.add('active');
                    // Deja de observar el elemento una vez animado
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealOptions = {
            threshold: 0.15, // Se activa cuando el 15% del elemento es visible
            rootMargin: "0px 0px -50px 0px" // Margen inferior para activar un poco antes
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback para navegadores muy antiguos: mostrar todo de inmediato
        revealElements.forEach(el => el.classList.add('active'));
    }
});