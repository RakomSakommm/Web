document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    const stickyNote = document.querySelector('.sticky-note');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('🎉 ПОЗДРАВЛЯЕМ! Вы сделали правильный выбор!🎉');
        });
    }
    
    if (stickyNote) {
        stickyNote.addEventListener('click', function() {
            alert('😱 ТЫ КЛИКНУЛ! ПОЛУЧИ СКИДКУ 100%! 😱');
        });
    }
    
    const adButtons = document.querySelectorAll('.ad-button');
    adButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    let counter = 1337;
    const footerCounter = document.querySelector('.footer-counter');
    if (footerCounter) {
        setInterval(() => {
            counter += Math.floor(Math.random() * 10);
            footerCounter.textContent = `📊 Сейчас смотрят: ${counter} человек`;
        }, 3000);
    }
    
    setInterval(() => {
        const messages = [
            'НЕ УХОДИ!',
            'КУПИ!',
            'ТОЛЬКО СЕГОДНЯ!',
            'СКИДКА!',
            'УСПЕЙ!'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        if (stickyNote) {
            stickyNote.innerHTML = `<p>🔔 ${randomMessage}</p><p>Только сегодня подарок!</p>`;
        }
    }, 5000);
});