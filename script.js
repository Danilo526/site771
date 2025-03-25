// Elemento da imagem inicial
const inicioElement = document.getElementById('inicio');

// Menu toggle para dispositivos móveis
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Função para mostrar apenas a seção selecionada
function showSection(sectionId) {
    // Ocultar a imagem inicial para qualquer seção que não seja o início
    if (sectionId !== '#inicio') {
        inicioElement.classList.add('hidden');
    } else {
        inicioElement.classList.remove('hidden');
    }
    
    // Esconder todas as seções
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Se for o início, não precisamos mostrar nenhuma seção
    if (sectionId === '#inicio') {
        return;
    }
    
    // Mostrar apenas a seção selecionada com um pequeno atraso para animação
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 100);
    }
    
    // Fechar o menu em dispositivos móveis após clicar
    if (window.innerWidth <= 768) {
        navMenu.classList.remove('show');
    }
}

// Configurar os links de navegação
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Mostrar a seção correspondente
        showSection(targetId);
        
        // Rolagem suave até a seção
        if (targetId === '#inicio') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Pequeno atraso para que a seção seja exibida antes da rolagem
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 150);
        }
    });
});

// Verificar se há um hash na URL ao carregar a página
window.addEventListener('load', function() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        showSection(targetId);
        
        // Pequeno atraso para garantir que a seção seja exibida antes da rolagem
        setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'auto'
                });
            }
        }, 200);
    }
});

// Ajuste de layout ao redimensionar a janela
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
    }
});