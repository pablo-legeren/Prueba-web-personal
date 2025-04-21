// Animación del título del trabajo
const jobTitles = ['Data Scientist', 'AI Engineer', 'Machine Learning Engineer'];
let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Control de navegación
document.addEventListener('DOMContentLoaded', () => {
    const initialMenu = document.querySelector('.initial-menu');
    const homeSection = document.getElementById('home');
    let hasPassedHome = false;

    // Mostrar el contenido principal inmediatamente
    document.body.classList.add('content-visible');

    function checkScroll() {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const currentScroll = window.scrollY;

        if (currentScroll > homeSectionBottom - 100 && !hasPassedHome) {
            initialMenu.classList.add('scrolled');
            hasPassedHome = true;
        } else if (currentScroll <= homeSectionBottom - 100 && hasPassedHome) {
            initialMenu.classList.remove('scrolled');
            hasPassedHome = false;
        }
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll(); // Verificar posición inicial
});

function typeEffect() {
    const jobTitleElement = document.getElementById('jobTitle');
    const currentTitle = jobTitles[currentTitleIndex];

    if (isDeleting) {
        jobTitleElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        jobTitleElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
    }

    setTimeout(typeEffect, typingSpeed);
}


// Iniciar la animación del título
typeEffect();

// Agregar estilos para el cursor
const style = document.createElement('style');
style.textContent = `
    .cursor {
        opacity: 1;
        animation: blink 0.7s infinite;
        font-weight: 100;
    }
   
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|es)$/i;
        return emailRegex.test(email);
    }

    // Función para mostrar error
    function showError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    // Función para mostrar éxito
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.classList.remove('visible');
    }

    // Función para limpiar estado
    function clearValidation(input, errorElement) {
        input.classList.remove('error', 'valid');
        errorElement.classList.remove('visible');
    }

    // Función para validar campo
    function validateField(input, errorElement, validationFn, errorMessage) {
        const value = input.value.trim();
        if (value === '') {
            clearValidation(input, errorElement);
            return false;
        }
        const isValid = validationFn(value);
        if (!isValid) {
            showError(input, errorElement, errorMessage);
        } else {
            showSuccess(input, errorElement);
        }
        return isValid;
    }

    // Validar nombre
    function validateName() {
        return validateField(
            nameInput,
            nameError,
            value => value.length >= 2,
            'Please enter your name (minimum 2 characters)'
        );
    }

    // Validar email
    function validateEmail() {
        return validateField(
            emailInput,
            emailError,
            isValidEmail,
            'Please enter a valid email address (example@domain.com)'
        );
    }

    // Validar mensaje
    function validateMessage() {
        return validateField(
            messageInput,
            messageError,
            value => value.length >= 10,
            'Please enter your message (minimum 10 characters)'
        );
    }

    // Validar todo el formulario
    function validateForm() {
        const isNameValid = nameInput.value.trim() !== '' ? validateName() : false;
        const isEmailValid = emailInput.value.trim() !== '' ? validateEmail() : false;
        const isMessageValid = messageInput.value.trim() !== '' ? validateMessage() : false;
       
        submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid);
       
        return isNameValid && isEmailValid && isMessageValid;
    }

    // Event listeners para validación al perder el foco
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Event listeners para limpiar errores al empezar a escribir
    nameInput.addEventListener('focus', () => clearValidation(nameInput, nameError));
    emailInput.addEventListener('focus', () => clearValidation(emailInput, emailError));
    messageInput.addEventListener('focus', () => clearValidation(messageInput, messageError));

    // Validar al enviar el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
       
        // Forzar validación de todos los campos al enviar
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
       
        if (isNameValid && isEmailValid && isMessageValid) {
            form.submit();
        }
    });
});

// Función para animar las tarjetas al hacer scroll
function animateCardsOnScroll() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Reducido para que se active un poco antes
    };
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // No desconectamos el observer para permitir que la animación se repita
            }
        });
    }, options);

    // Observar elementos de educación
    document.querySelectorAll('.education-item').forEach(item => {
        observer.observe(item);
    });

    // Observar elementos de experiencia
    document.querySelectorAll('.experience-item').forEach(item => {
        observer.observe(item);
    });
}

// Asegurarnos de que la función se ejecute cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    animateCardsOnScroll();
});

// También ejecutar cuando la página esté completamente cargada
window.addEventListener('load', () => {
    animateCardsOnScroll();
}); 