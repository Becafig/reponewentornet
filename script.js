// =========================================
// ENTORNET FIBRA - MODERN JAVASCRIPT
// Versão Única e Corrigida
// =========================================

/**
 * Função 1: Anima um número de 0 até o alvo (Ex: Velocímetro, Estatísticas)
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16.67); // Roda a ~60fps
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            // Durante a animação
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            // A animação terminou, define o valor final exato
            element.textContent = target; 
            
            // Verifica se é o velocímetro para chamar o jitter
            if (element.closest('.speed-meter')) {
                jitterCounter(element, target); 
            }
        }
    };
    
    // Inicia a animação DEPOIS de 1s (para sincronizar com o 'animation-delay: 1s' do CSS)
    setTimeout(updateCounter, 1000);
}

/**
 * Função 2: Faz o "jitter" (tremulação) do número do velocímetro
 */
function jitterCounter(counterElement, baseValue) {
    // Garante 100% que estamos trabalhando com um número inteiro
    let numBaseValue = parseInt(baseValue, 10);
    let isToggled = false;
    
    // Intervalo de 1000ms (1s) para bater com a animação CSS
    setInterval(() => {
        if (isToggled) {
            counterElement.innerText = numBaseValue; // ex: 831
        } else {
            counterElement.innerText = numBaseValue + 1; // ex: 832
        }
        isToggled = !isToggled;
    }, 1000); // 1000ms = 1 segundo
}

let mainAnimationsStarted = false;

/**
 * Função 6: Inicia todas as animações principais do site (Velocímetro, AOS, Contadores, Hero)
 */
function startMainSiteAnimations() {
    // Se as animações já foram iniciadas, não faça nada
    if (mainAnimationsStarted) return;
    
    // 1. Marcar como iniciada
    mainAnimationsStarted = true;
    
    // 2. Dar "Play" nas animações CSS (Velocímetro)
    // Isso adiciona a classe 'animations-ready' ao <body>
    document.body.classList.add('animations-ready');

    // 3. Inicializar o AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // 4. Inicializar o OBSERVADOR DE CONTADORES
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = element.getAttribute('data-value');
                
                if (targetValue) {
                    const target = parseInt(targetValue, 10);
                    animateCounter(element, target, 2000); 
                    observer.unobserve(element);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // 5. Inicializar a animação do Hero Text
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        // Verifica se a animação já não está no estilo (para a página 'sobre.html')
        if (!heroText.style.gridColumn) { 
           heroText.style.animation = 'slideInUp 1s ease forwards';
        }
    }
}

/**
 * Função 3: Cria partículas de fundo
 */
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #FDB813 0%, #06B6D4 100%);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        z-index: 1;
    `;
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endX = startX + (Math.random() - 0.5) * 200;
    const duration = 3000 + Math.random() * 2000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    particle.animate([
        { 
            opacity: 0,
            transform: 'translate(0, 0) scale(0)'
        },
        {
            opacity: 1,
            transform: 'translate(0, -200px) scale(1)'
        },
        {
            opacity: 0,
            transform: `translate(${endX - startX}px, -${window.innerHeight}px) scale(0.5)`
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => particle.remove();
}

/**
 * Função 4: Otimização de performance (Debounce)
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Função 5: Copiar Logo (Placeholder)
 */


// --- Executa quando o HTML da página é carregado ---
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Initialize AOS (Animate On Scroll)


    // 2. --- LÓGICA DAS ABAS DOS PLANOS ---
    const tabButtons = document.querySelectorAll('.tab-btn,.btn-gamer,.emp,.dedicado');
    const plansContents = document.querySelectorAll('.plans-content');

    if (tabButtons.length > 0 && plansContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                if (!targetTab) return; // Proteção

                // Atualiza a classe dos botões
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Mostra/Esconde o conteúdo
                plansContents.forEach(content => {
                    if (content.getAttribute('data-category') === targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }


    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = element.getAttribute('data-value');
                
                if (targetValue) {
                    const target = parseInt(targetValue, 10);
                    // Chama a animação
                    animateCounter(element, target, 2000); // 2s de duração
                    // Para de observar (anima só uma vez)
                    observer.unobserve(element);
                }
            }
        });
    }, observerOptions);

    // Encontra TODOS os elementos .stat-number e começa a observá-los
    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // 5. --- Animação de entrada do Hero ---

const speedSlider = document.getElementById('speedSlider');
    const dedicatedSpeedValue = document.getElementById('dedicatedSpeedValue');
    const dedicatedSpeedUnit = document.getElementById('dedicatedSpeedUnit');

    // Verifica se o slider existe na página atual
    if (speedSlider && dedicatedSpeedValue && dedicatedSpeedUnit) {
        
        // Função para atualizar o texto da velocidade
        function updateSpeedDisplay() {
            let value = parseInt(speedSlider.value);
            
            if (value >= 1000) {
                // Converte para Giga (divide por 1000)
                let gigaValue = (value / 1000).toFixed(1); 
                // Remove o .0 se for número inteiro (ex: 1.0 -> 1)
                gigaValue = gigaValue.endsWith('.0') ? gigaValue.slice(0, -2) : gigaValue;
                
                dedicatedSpeedValue.textContent = gigaValue;
                dedicatedSpeedUnit.textContent = "GIGA";
            } else {
                // Mantém em Mega
                dedicatedSpeedValue.textContent = value;
                dedicatedSpeedUnit.textContent = "MEGA";
            }
        }

        // Atualiza o display quando o slider é movido
        speedSlider.addEventListener('input', updateSpeedDisplay);

        // Atualiza o display na carga inicial (caso o valor padrão não seja 50)
        updateSpeedDisplay(); 
    }

}); // --- FIM DO DOMCONTENTLOADED ---


// --- Loading Screen ---
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            
            // 1. Esconde a tela de loading
            loadingScreen.classList.add('hidden');
            
            // 2. Verifica se o modal deve aparecer
            if (!sessionStorage.getItem('gamerModalSeen')) {
                // Se NUNCA VIU, mostra o modal
                if(typeof showGamerModal === 'function') {
                    showGamerModal(); 
                }
                sessionStorage.setItem('gamerModalSeen', 'true');
                
                // NÃO INICIA AS ANIMAÇÕES AQUI
                
            } else {
                // Se JÁ VIU o modal, pula ele e inicia as animações
                startMainSiteAnimations();
            }

        }, 5000); // 5s 
    }
});
const gamerModalOverlay = document.getElementById('gamerModalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalConhecerBtn = document.getElementById('modalConhecerBtn');

function showGamerModal() {
    if (gamerModalOverlay) {
        gamerModalOverlay.classList.add('active');
    }
}

function hideGamerModal() {
    if (gamerModalOverlay) {
        gamerModalOverlay.classList.remove('active');
    }
    
    // --- GATILHO: Inicia as animações do site AGORA ---
    startMainSiteAnimations();
}

// Adiciona os gatilhos para fechar o modal
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', hideGamerModal);
}
if (modalConhecerBtn) {
    // Também fecha o modal ao clicar em "Conhecer Planos"
    modalConhecerBtn.addEventListener('click', hideGamerModal);
}
if (gamerModalOverlay) {
    // Fecha ao clicar no fundo (overlay)
    gamerModalOverlay.addEventListener('click', function(e) {
        if (e.target === gamerModalOverlay) {
            hideGamerModal();
        }
    });
}


// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 10 + 'px';
            cursorFollower.style.top = e.clientY - 10 + 'px';
        }, 50); // Delay
    });

    const hoverElements = document.querySelectorAll('a, button, .plan-card, .benefit-card, .support-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}


// --- Navbar Scroll Effect ---



// --- Mobile Menu Toggle ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active'); // Animação do hamburger
        
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}


// --- Smooth Scroll for Navigation Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return; 
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                     // Reseta o hamburger
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    });
});


// --- Parallax Effect for Hero Section (Debounced) ---
const debouncedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    const hero3dCard = document.querySelector('.hero-3d-card');
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Esta animação de Parallax conflita com a animação 'float3d' do CSS.
    // Descomente se preferir o parallax ao 'float3d'.
    /*
    if (hero3dCard) {
        hero3dCard.style.transform = `perspective(1000px) rotateY(${scrolled * 0.02}deg) rotateX(${scrolled * 0.01}deg)`;
    }
    */
}, 20); // 20ms de debounce para suavidade

window.addEventListener('scroll', debouncedParallax);


// --- Form Validation and WhatsApp Integration ---
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        let message = 'Olá! Gostaria de mais informações sobre os planos da Entornet Fibra.\n\n';
        for (const [key, value] of Object.entries(data)) {
            message += `${key}: ${value}\n`;
        }
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/552227781113?text=${encodedMessage}`, '_blank');
    });
});


// --- Testimonial Slider Auto-play ---
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

if (totalTestimonials > 0) {
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            // Usa display grid/block (o que for o padrão) ou none
            testimonial.style.display = i === index ? '' : 'none'; 
            testimonial.style.animation = i === index ? 'fadeIn 0.5s ease' : '';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }
    
    showTestimonial(0); // Mostra o primeiro
    setInterval(nextTestimonial, 5000); // Troca a cada 5s
}


// --- Magnetic Button Effect ---
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .plan-button');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Aplica o transform. Cuidado: isso pode conflitar com outros transforms (como o :hover)
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});


// --- Plan Card 3D Tilt Effect ---
const planCards = document.querySelectorAll('.plan-card');
planCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;
        
        // Cuidado: isso substitui o :hover do CSS.
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Cuidado: isso substitui o :hover do CSS.
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});


// --- Tooltips for plan features ---
const planFeatures = document.querySelectorAll('.plan-features li');
planFeatures.forEach(feature => {
    feature.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Clique para saber mais';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--gradient-primary);
            color: var(--black);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        feature.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});


// --- Ripple effect to buttons ---
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// --- Create particles periodically ---
setInterval(createParticle, 300);


// --- Adiciona animações CSS dinamicamente ---
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(253, 184, 19, 0.5); }
        50% { box-shadow: 0 0 40px rgba(253, 184, 19, 0.8); }
    }
    
    @keyframes particleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-200px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-400px) scale(0.5);
        }
    }
    
    @keyframes rippleAnimation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Entornet Fibra - Site Moderno Carregado com Sucesso! 🚀');

const gamerAwardImage = document.getElementById('gamerAwardImage');
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxClose = document.getElementById('lightboxClose');

    // Verifica se os elementos existem (para não quebrar a index.html)
    if (gamerAwardImage && imageLightbox && lightboxClose) {
        
        // 1. Abrir ao clicar na imagem
        gamerAwardImage.addEventListener('click', () => {
            imageLightbox.classList.add('active');
        });

        // 2. Fechar ao clicar no 'X'
        lightboxClose.addEventListener('click', () => {
            imageLightbox.classList.remove('active');
        });

        // 3. Fechar ao clicar no fundo (overlay)
        imageLightbox.addEventListener('click', (e) => {
            if (e.target === imageLightbox) { // Se o clique foi no fundo
                imageLightbox.classList.remove('active');
            }
        });
    }