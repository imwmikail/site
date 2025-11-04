class Carousel {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
        this.interval = null;
        this.autoPlayDelay = 2500; 
        
        this.init();
    }
    
    init() {
        this.loadSlides();
        this.createSlides();
        this.createIndicators();
        this.startAutoPlay();
        this.addEventListeners();
    }
    
    loadSlides() {
        for (let i = 1; i <= 8; i++) {
            this.slides.push(`assets/${i}.jpg`);
        }
    }
    
    createSlides() {
        const slidesContainer = document.querySelector('.carousel-slides');
        
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slideElement.innerHTML = `<img src="${slide}" alt="Imagem ${index + 1} da IMW Mikail" loading="lazy">`;
            slidesContainer.appendChild(slideElement);
        });
    }
    
    createIndicators() {
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
        
        this.restartAutoPlay();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    addEventListeners() {
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoPlay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoPlay();
            });
        }
        
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
}

class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }
    
    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
            
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
        this.menuToggle.setAttribute('aria-expanded', !isExpanded);
        this.navMenu.classList.toggle('active');
        
        const spans = this.menuToggle.querySelectorAll('span');
        if (!isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    closeMenu() {
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
        
        const spans = this.menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

class AgendaModal {
    constructor() {
        this.modal = document.getElementById('agendaModal');
        this.expandBtn = document.querySelector('.agenda-expand');
        this.closeBtn = document.querySelector('.modal-close');
        this.init();
    }
    
    init() {
        if (this.expandBtn && this.modal) {
            this.expandBtn.addEventListener('click', () => this.openModal());
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}

class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => {
                this.observer.observe(img);
            });
        } else {
            this.images.forEach(img => {
                this.loadImage(img);
            });
        }
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src') || img.getAttribute('src');
        img.src = src;
        img.classList.add('loaded');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.carousel-container')) {
        new Carousel();
    }
    
    new MobileMenu();
    
    if (document.querySelector('.agenda-expand')) {
        new AgendaModal();
    }
    
    new SmoothScroll();
    
    new LazyLoader();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    function setActiveMenuLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.nav-menu a');
        
        menuLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveMenuLink();
});

window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 300);
        }, 500);
    }
});

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

function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const headerHeight = document.querySelector('header').offsetHeight;
        hero.style.height = `calc(100vh - ${headerHeight}px)`;
    }
}

window.addEventListener('resize', debounce(() => {
    adjustHeroHeight();
}, 250));

adjustHeroHeight();