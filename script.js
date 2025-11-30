document.addEventListener('DOMContentLoaded', () => {
    // Music Control
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    const musicText = musicControl.querySelector('.text');
    let isPlaying = false;

    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicText.textContent = "Wake Up! (Play Music)";
            musicControl.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                musicText.textContent = "Shhh... (Pause)";
                musicControl.classList.add('playing');
            }).catch(e => {
                alert("Please interact with the document first (click anywhere) to play music.");
            });
        }
        isPlaying = !isPlaying;
    });

    // Balloons/Confetti on Load (Simulating Balloons with Confetti)
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // Left side balloons
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#fcd34d', '#3b82f6', '#ffffff'],
            shapes: ['circle'],
            scalar: 2 // Make them bigger like balloons
        });
        // Right side balloons
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#fcd34d', '#3b82f6', '#ffffff'],
            shapes: ['circle'],
            scalar: 2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Scroll Animations & Parallax
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation classes
    document.querySelectorAll('.photo-card, .message-box, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(el);
    });

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');

        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Candle Interaction
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.addEventListener('click', function () {
            if (!this.classList.contains('out')) {
                this.classList.add('out');
                // Smoke effect is handled by CSS

                // Check if all candles are out
                const allOut = Array.from(candles).every(c => c.classList.contains('out'));
                if (allOut) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.6 },
                            colors: ['#fbbf24', '#f472b6', '#ffffff'],
                            scalar: 1.2
                        });
                        // Add a celebrate class to the title for extra effect if desired
                        const mainTitle = document.querySelector('.main-title');
                        if (mainTitle) mainTitle.classList.add('celebrate');
                    }, 500);
                }
            }
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    document.querySelectorAll('.photo-card img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // 3D Tilt Effect
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    // Balloon Logic
    function createBalloon() {
        const balloonContainer = document.getElementById('balloons-container');
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        // Randomize position and color
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5; // 5-10s
        const colors = ['#fbbf24', '#f472b6', '#3b82f6', '#ef4444', '#10b981'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        balloon.style.left = `${left}%`;
        balloon.style.animationDuration = `${animationDuration}s`;
        balloon.style.background = color;

        balloonContainer.appendChild(balloon);

        // Remove balloon after animation
        setTimeout(() => {
            balloon.remove();
        }, animationDuration * 1000);
    }

    // Create balloons periodically
    setInterval(createBalloon, 800);

    // Section Reveal on Scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
