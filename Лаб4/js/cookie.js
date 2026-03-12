function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
        const [key, val] = c.split('=');
        if (key === name) return JSON.parse(val);
    }
    return null;
}

window.CookieManager = {
    saveReviews: (reviews) => setCookie('reviews', reviews, 30),
    loadReviews: () => getCookie('reviews') || [],
    saveTheme: (theme) => setCookie('theme', theme, 30),
    loadTheme: () => getCookie('theme') || 'light'
};