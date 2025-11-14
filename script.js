// 1. Seleciona os elementos que vamos usar
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// 2. Adiciona um "ouvidor de clique" ao hamburguer
hamburger.addEventListener("click", () => {
    // Quando clicado, ele "liga/desliga" a classe "active"
    // em AMBOS os elementos.
    
    // Isso anima o ícone hamburguer (para "X" e de volta)
    hamburger.classList.toggle("active");
    
    // Isso faz o menu aparecer (deslizando) e desaparecer
    navMenu.classList.toggle("active");
});

// (Opcional) Fecha o menu ao clicar em um link
// Isso é útil para páginas de uma só seção (Single Page)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        // Remove a classe "active" de ambos ao clicar em um link
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});


/* ================================== */
/* CÓDIGO DO BOTÃO WHATSAPP C/ DELAY  */
/* ================================== */

// 1. Seleciona o botão
const whatsappButton = document.querySelector(".whatsapp-button");

// 2. Variável para guardar o "timer"
let leaveTimeout = null;

// 3. Quando o mouse ENTRA no botão
whatsappButton.addEventListener("mouseenter", () => {
    // Cancela qualquer "timer" de saída que estiver ativo
    // Isso impede que o botão encolha se o mouse sair e voltar rápido
    if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
    }
    
    // Adiciona a classe que expande o botão
    whatsappButton.classList.add("hover-active");
});

// 4. Quando o mouse SAI do botão
whatsappButton.addEventListener("mouseleave", () => {
    // Cria um "timer" de 2 segundos (2000ms) para remover a classe
    leaveTimeout = setTimeout(() => {
        whatsappButton.classList.remove("hover-active");
    }, 50); // 2 segundos de delay
});

/* ================================== */
/* ANIMAÇÃO DE TEXTO DIGITADO NA HOME */
/* ================================== */

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["seu sorriso.", "sua saúde.", "sua família."]; // Textos para digitar
const typingDelay = 100; // Velocidade de digitação (ms)
const erasingDelay = 70; // Velocidade de apagar (ms)
const newTextDelay = 1500; // Tempo antes de começar a digitar o próximo texto (ms)
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0; // Volta para o primeiro texto
        setTimeout(type, typingDelay + 1100); // Atraso antes de começar a digitar o próximo
    }
}

// Inicia a animação quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250); // Pequeno delay inicial

    /* ================================== */
    /* GRADIENTE INTERATIVO DA HOME       */
    /* ================================== */
    const heroSection = document.querySelector(".home-hero");

    if (heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            // Pega as dimensões e posição da seção
            let rect = heroSection.getBoundingClientRect();
            
            // Calcula a posição X e Y do mouse DENTRO da seção
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // Atualiza as variáveis CSS (--mouse-x, --mouse-y) em tempo real
            heroSection.style.setProperty('--mouse-x', `${x}px`);
            heroSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});