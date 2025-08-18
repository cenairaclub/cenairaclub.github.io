// Tema kalıcılığı: kullanıcı tercihini localStorage'da sakla
(function initThemeFromStorage() {
    try {
        var savedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var initial = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', initial);
        updateToggleLabel(initial);
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleLabel('dark');
    }
})();

function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateToggleLabel(next);
}

function updateToggleLabel(theme) {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    if (theme === 'dark') {
        button.innerHTML = '☀️ Light Theme';
    } else {
        button.innerHTML = '🌙 Dark Theme';
    }
}


