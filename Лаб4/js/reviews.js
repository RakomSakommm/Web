window.addEventListener('load', function() {
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;

    const defaultReviews = [
        { 
            id: 1, 
            name: 'Voodoosh', 
            text: 'После покупки моя жизнь изменилась раз и на всегда! Кто бы мог подумать, что из-за кровати на стрим по третьим героям в час ночи будет заходить по 5 тысяч зрителей!',
            avatar: 'img/voodoosh.webp'
        },
        { 
            id: 2, 
            name: 'Olyashaa', 
            text: 'Мои коллеги-стримеры усомнились во мне, когда увидели на моем стриме по просмотру Миньонов 10 тысяч зрителей ночью. Что я могу им ответить? Купите себе уже нормальную стримерскую кровать и не позорьтесь!',
            avatar: 'img/olyasha.jpg'
        },
        { 
            id: 3, 
            name: 'sasavot', 
            text: 'У меня 50 тысяч зрителей на твиче, а Вы не знаете, кто я и откуда взялся. Купив эту кровать, Вы откроете все тайны спящего бизнеса!',
            avatar: 'img/sasavot.jpg'
        }
    ];

    let reviews = CookieManager.loadReviews();
    if (reviews.length === 0) {
        reviews = [...defaultReviews];
        CookieManager.saveReviews(reviews);
    }

    function showReviews() {
        container.innerHTML = '';
        reviews.forEach(r => {
            const card = document.createElement('article');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-avatar">
                    <img src="${r.avatar || 'img/default-avatar.jpg'}" alt="Фото ${r.name}">
                </div>
                <div class="testimonial-content">
                    <blockquote class="testimonial-text">"${r.text}"</blockquote>
                    <p class="testimonial-author">— ${r.name}</p>
                    <div class="testimonial-rating">★★★★★</div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    showReviews();

    const formHtml = `
        <h3 class="section-title section-title--bubble">✍️ ДОБАВИТЬ ОТЗЫВ</h3>
        <form id="reviewForm" class="review-form">
            <input type="text" id="name" placeholder="Имя" required>
            <textarea id="text" placeholder="Отзыв" required rows="4"></textarea>
            
            <div class="file-input">
                <label for="avatar">Фото:</label>
                <input type="file" id="avatar" accept="image/*">
            </div>
            
            <div id="avatarPreview" class="avatar-preview">
                <img src="" alt="Превью аватара">
            </div>
            
            <button type="submit" class="submit-btn">ДОБАВИТЬ</button>
            <button type="button" id="resetReviews" class="reset-btn">🔄 СБРОСИТЬ К ИСХОДНЫМ</button>
            <div id="error" class="error-message">Имя (мин. 2 символа) и текст (мин. 10 символов)</div>
        </form>
    `;

    const formDiv = document.createElement('div');
    formDiv.innerHTML = formHtml;
    document.querySelector('.testimonials').appendChild(formDiv);

    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.getElementById('avatarPreview');
    const previewImg = avatarPreview.querySelector('img');

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Файл слишком большой (макс. 5MB)');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                avatarPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('reviewForm').onsubmit = function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const text = document.getElementById('text').value.trim();
        const avatarFile = document.getElementById('avatar').files[0];
        const errorDiv = document.getElementById('error');

        if (name.length < 2 || text.length < 10) {
            errorDiv.style.display = 'block';
            return;
        }

        errorDiv.style.display = 'none';

        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addReview(name, text, e.target.result);
            };
            reader.readAsDataURL(avatarFile);
        } else {
            addReview(name, text, 'img/default-avatar.jpg');
        }
    };

    function addReview(name, text, avatarUrl) {
        const newReview = {
            id: Date.now(),
            name: name,
            text: text,
            avatar: avatarUrl
        };

        reviews.push(newReview);
        CookieManager.saveReviews(reviews);
        showReviews();
        
        document.getElementById('name').value = '';
        document.getElementById('text').value = '';
        document.getElementById('avatar').value = '';
        avatarPreview.style.display = 'none';
    }

    document.getElementById('resetReviews').onclick = function() {
        if (confirm('Вернуть исходные отзывы?')) {
            reviews = [...defaultReviews];
            CookieManager.saveReviews(reviews);
            showReviews();
            
            document.getElementById('name').value = '';
            document.getElementById('text').value = '';
            document.getElementById('avatar').value = '';
            avatarPreview.style.display = 'none';
        }
    };
});