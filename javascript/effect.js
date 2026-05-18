// =============================================
// NEOTOPIA NEON EFFECTS - Dark Green Theme
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Neon Text Glow Animation
    function initNeonGlow() {
        const neonTexts = document.querySelectorAll('h1, .brand-mark, .hero-content-wrapper h1');
        neonTexts.forEach(text => {
            text.classList.add('neon-glow');
        });
    }

    // 2. Scroll Reveal Animation
    function initScrollReveal() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        sections.forEach(section => {
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            observer.observe(section);
        });
    }

    // 3. Card Hover Tilt Effect (3D)
    function initCardTilt() {
        const cards = document.querySelectorAll('.card, .card-course, .testimonial-card, .status-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // 4. Stats Counter Animation
    function initCounter() {
        const stats = document.querySelectorAll('.mini-card strong');
        
        const animateValue = (el, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                el.textContent = value + (el.dataset.suffix || '+');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const strong = entry.target.querySelector('strong');
                    if (strong) {
                        const target = parseInt(strong.textContent) || 1200;
                        strong.textContent = '0';
                        animateValue(strong, 0, target, 2000);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.hero-mini-stats .mini-card').forEach(card => {
            observer.observe(card);
        });
    }

    // 5. Cursor Neon Trail (Optional - Ringan)
    function initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'neon-cursor';
        document.body.appendChild(cursor);

        let timeout;
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cursor.style.opacity = '0';
            }, 800);
        });
    }

    // 6. Button Ripple + Neon Pulse
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.primary-btn, .read-button, .host-copy-button');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'neon-ripple';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            });
        });
    }

    // Initialize All Effects
    function initAllEffects() {
        initNeonGlow();
        initScrollReveal();
        initCardTilt();
        initCounter();
        initButtonEffects();
        // initCursorEffect(); // Uncomment kalau mau cursor effect
    }

    // Jalankan semua efek
    initAllEffects();

    // Re-init saat config di-load
    document.addEventListener('configLoaded', initAllEffects);
});