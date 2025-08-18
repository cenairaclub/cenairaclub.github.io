// Tema kalıcılığı ve başlatma
(function initTheme() {
    try {
        var savedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var initial = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', initial);
        
        // Sayfa yüklendikten sonra buton metnini güncelle
        document.addEventListener('DOMContentLoaded', function() {
            updateToggleLabel(initial);
        });
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.addEventListener('DOMContentLoaded', function() {
            updateToggleLabel('dark');
        });
    }
})();

// Tema değiştirme fonksiyonu
function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    
    try { 
        localStorage.setItem('theme', next); 
    } catch (e) {
        console.warn('LocalStorage kullanılamıyor:', e);
    }
    
    updateToggleLabel(next);
}

// Buton metnini güncelleme fonksiyonu
function updateToggleLabel(theme) {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    
    if (theme === 'dark') {
        button.innerHTML = '☀️ Light Theme';
    } else {
        button.innerHTML = '🌙 Dark Theme';
    }
}

// Sistem tema tercihi değişikliklerini dinle
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Sadece kullanıcı manuel bir tercih yapmadıysa sistem tercihini takip et
        var savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {}
        
        if (!savedTheme) {
            var newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateToggleLabel(newTheme);
        }
    });
}