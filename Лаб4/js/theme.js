window.addEventListener('load', function() {
    const btn = document.createElement('button');
    btn.innerHTML = '🌙 Тёмная тема';
    btn.style.cssText = 'position:fixed;bottom:30px;right:30px;z-index:1001;background:#fff;border:4px solid #000;border-radius:50px;padding:12px 24px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:5px 5px 0 #000;';
    document.body.appendChild(btn);

    if (CookieManager.loadTheme() === 'dark') {
        document.documentElement.classList.add('dark-theme');
        btn.innerHTML = '☀️ Светлая тема';
    }

    btn.onclick = function() {
        if (document.documentElement.classList.contains('dark-theme')) {
            document.documentElement.classList.remove('dark-theme');
            btn.innerHTML = '🌙 Тёмная тема';
            CookieManager.saveTheme('light');
        } else {
            document.documentElement.classList.add('dark-theme');
            btn.innerHTML = '☀️ Светлая тема';
            CookieManager.saveTheme('dark');
        }
    };
});