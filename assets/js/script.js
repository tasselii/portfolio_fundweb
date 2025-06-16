// ========================================
// PORTFOLIO TEAM LIQUID - JAVASCRIPT
// Funcionalidades e interatividade
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========================================
    // LOADER / ANIMAÇÃO DE CARREGAMENTO
    // ========================================
    function hideLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2000);
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ========================================
    // MENU MOBILE
    // ========================================
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'visible';
    }

    // ========================================
    // NAVEGAÇÃO SUAVE E ACTIVE LINKS
    // ========================================
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    // ========================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // ========================================
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animação do ícone
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // ========================================
    // FORMULÁRIO DE CONTATO
    // ========================================

    const formulario = document.querySelector("#formulario")
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    if (campoNome.value.length < 3) {
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres";
        campoNome.focus();
        return;
    } else {
        txtNome.innerHTML = "";
    }

    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = "Digite um e-mail válido";
        campoEmail.focus();
        return;
    } else {
        txtEmail.innerHTML = "";
    }

    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    if (campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres";
        campoAssunto.focus();
        return;
    } else {
        txtAssunto.innerHTML = "";
    }

    // Enviar o e-mail
    formulario.submit();
    });
    

    // ========================================
    // SISTEMA DE NOTIFICAÇÕES
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-blue)' : type === 'error' ? '#ff4757' : 'var(--bg-secondary)'};
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border: 1px solid var(--border-color);
        `;

        document.body.appendChild(notification);

        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remover após 5 segundos
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Botão de fechar
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });

        closeButton.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 1rem;
        `;
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ========================================
    // ANIMAÇÕES DE SCROLL
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(
            '.hero-text, .hero-image, .about-image, .about-text, .skill-category, .project-card, .contact-info, .contact-form'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ========================================
    // EFEITOS DE HOVER NOS CARDS
    // ========================================
    function initCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        const skillItems = document.querySelectorAll('.skill-item');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                }
            });

            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // ========================================
    // PARALLAX EFFECT (SIMPLES)
    // ========================================
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .about-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }

    // ========================================
    // TYPING EFFECT
    // ========================================
    function initTypingEffect() {
        const typingElement = document.querySelector('.hero-text h3');
        if (!typingElement) return;

        const texts = [
            'Desenvolvedor Full Stack',
            'Frontend Developer',
            'Backend Developer',
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeText, speed);
        }

        // Iniciar o efeito após um pequeno delay
        setTimeout(typeText, 1000);
    }

    // ========================================
    // CONTADOR ANIMADO
    // ========================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-item h4');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    const increment = target / 100;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        updateActiveLink();
        toggleBackToTop();
    });

    // Menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Back to top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Fechar menu mobile ao redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    function init() {
        loadTheme();
        hideLoader();
        initScrollAnimations();
        initCardEffects();
        initParallaxEffect();
        initTypingEffect();
        initCounterAnimation();
        
        // Inicializar AOS se disponível
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }

    // Inicializar quando o DOM estiver pronto
    init();

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Throttle function para otimizar eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Aplicar throttle aos eventos de scroll
    window.addEventListener('scroll', throttle(() => {
        handleHeaderScroll();
        updateActiveLink();
        toggleBackToTop();
    }, 16)); // ~60fps


    // Console message
    console.log(`
    ========================
    Desenvolvido com ❤️ e muito ☕
    
    Tecnologias utilizadas:
    • HTML5 Semântico
    • CSS3 com Custom Properties
    • JavaScript Vanilla ES6+
    • AOS (Animate On Scroll)
    • SVG Animations

    Paleta de cores: #0F1620, #192734, #3A4C66, #A8B2D1, #FFFFFF, #009DFF, #FFCE00
    `);

});

// ========================================
// CSS ANIMATIONS KEYFRAMES (via JavaScript)
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(style);

// ========================================
// GITHUB 
// ========================================

const sobre = document.querySelector("#about")

async function getApiGitHub() {
  try {
  // Enviar uma requisição HTTP para API do GitHub 
  const dadosPerfil = await fetch(`https://api.github.com/users/tasselii`)

  // Converte a Resposta HTPP para o formato JSON
  const perfil = await dadosPerfil.json()

  // Criando o conteúdo da Seção about
    let conteudo = `  
            <div class="container">
                <div class="section-header">
                    <h2>Sobre <span>Mim</span></h2>
                    <div class="underline"></div>
                </div>
                <div class="about-content">
                    <div class="about-image">
                        <img src="${perfil.avatar_url}" alt="Foto do perfil do Github - ${perfil.name}">
                        <div class="about-image-overlay">
                            <svg class="about-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="80" stroke="#009DFF" stroke-width="2" fill="none" opacity="0.3">
                                    <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite"/>
                                </circle>
                            </svg>
                        </div>
                    </div>
                    <div class="about-text">
                        <h3>Desenvolvedor Full Stack</h3>
                        <p>Iniciei minha jornada técnica instalando, configurando e padronizando sistemas de redes, onde desenvolvi senso de organização, atenção aos detalhes e resolução de problemas. Em seguida, empreendi com um delivery de açaí, atuando em todas as frentes — do atendimento à logística — e implementando controles de dados para otimizar a operação. Essa vivência me aproximou da tecnologia e despertou meu interesse por soluções automatizadas.</p>
                        <p>Hoje, mergulhado em um bocam intensivo de Java Fullstack, aplico esse repertório no desenvolvimento de APIs RESTful, CRUDs, e na prática de POO com Java e Spring Boot. Utilizo MySQL, Git/GitHub, e ferramentas como Postman/Insomnia para testes, enquanto participo de projetos ágeis que simulam o ambiente real de desenvolvimento. Unindo teoria e prática, sigo evoluindo como desenvolvedor com foco em eficiência e entrega de valor.</p>
                        <div class="about-stats">
                            <div class="stat-item">
                                <h4>${perfil.public_repos}</h4>
                                <p>Repositórios</p>
                            </div>
                            <div class="stat-item">
                                <h4>${perfil.followers} </h4>
                                <p>Seguidores</p>
                            </div>
                            <div class="stat-item">
                                <h4>${perfil.following} </h4>
                                <p>Seguindo</p>
                            </div>
                        </div>
                        <div class="about-buttons">
                            <a href="${perfil.html_url}" class="btn btn-primary" target="_blank">Github</a>
                            <a href="./assets/docs/CV-THIAGO-TASSELI-GENERATION.pdf" class="btn btn-outline" download>Download CV</a>
                        </div>
                    </div>
                </div>
            </div>  
  ` 
  // Adicionar o conteúdo na página index.html, na Seção about
  about.innerHTML += conteudo;

  } catch (error) {
    console.error(error)
  }
}

getApiGitHub()

// ========================================
// Copiar - Email
// ========================================

function copiarEmail() {
  navigator.clipboard.writeText("tasselii.dev@outlook.com.br")
    .then(() => {
      const alerta = document.getElementById("alerta");
      alerta.classList.add("mostrar");
      setTimeout(() => {
        alerta.classList.remove("mostrar");
      }, 2000); // some depois de 2 segundos
    });
}