function IniciarNavegacao() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]'); // pega só links com hash
    const menuCheckbox = document.getElementById('nav-hamburger-input');
    const header = document.querySelector('header');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Scroll suave moderno usando scrollIntoView
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }
            if (menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });

    const toggleHeaderShadow = () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', toggleHeaderShadow);
    toggleHeaderShadow(); 

    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
}

function CarregarDoInicio() {

    window.addEventListener('load', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    IniciarNavegacao();
    CarregarDoInicio();
});