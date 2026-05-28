/**
 * Undangan Haflah Takharruj
 * Main JavaScript Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       ENVELOPE ANIMATION
       ========================================= */
    const envelopeContainer = document.getElementById('envelope-container');
    const transitionScreen = document.getElementById('transition-screen');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    const envelopeHint = document.querySelector('.envelope-hint');
    const backsound = document.getElementById('backsound');
    const musicToggle = document.getElementById('music-toggle');
    envelopeContainer.addEventListener('click', () => {
        // Step 1: Stop floating, slight zoom, flap opens
        envelopeContainer.classList.add('open-animation');
        if (envelopeHint) envelopeHint.style.opacity = '0';
        
        // Play audio immediately on envelope click (user interaction trigger)
        if (backsound) {
            backsound.play().catch(err => console.log('Audio playback failed:', err));
        }
        if (musicToggle) {
            musicToggle.classList.add('visible');
            musicToggle.classList.add('playing');
        }
        
        // Wait for flap to open (600ms)
        setTimeout(() => {
            // Step 2: Pull out paper
            envelopeContainer.classList.add('pull-out');
            
            // Wait for paper to come out (1000ms)
            setTimeout(() => {
                // Step 3: Expand transition screen
                transitionScreen.classList.add('expand');
                
                // Wait for expansion to cover screen (1000ms)
                setTimeout(() => {
                    // Step 4: Hide overlay, show main site
                    envelopeOverlay.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    
                    // Trigger fade in for main content
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                    }, 50);
                    // Ensure window is scrolled to top
                    window.scrollTo(0, 0);
                }, 900); // slightly before transition finishes
            }, 1000);
        }, 600);
    });
    // Control music playback via the floating button
    if (musicToggle && backsound) {
        musicToggle.addEventListener('click', () => {
            if (backsound.paused) {
                backsound.play().catch(err => console.log('Audio playback failed:', err));
                musicToggle.classList.add('playing');
            } else {
                backsound.pause();
                musicToggle.classList.remove('playing');
            }
        });
    }
    /* =========================================
       COUNTDOWN TIMER
       ========================================= */
    // Target date: June 15, 2026 08:00:00
    const targetDate = new Date('June 15, 2026 08:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            // Event has started or passed
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Display formatting (add leading zero)
        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);
});
// --- GALLERY POP-UP LIGHTBOX ---
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("gallery-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".modal-close");
    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
