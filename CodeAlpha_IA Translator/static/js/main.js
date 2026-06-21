// ===========================
// TOGGLE MODE SOMBRE / CLAIR
// ===========================
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Vérifier si un thème est déjà sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Changer le thème au clic
themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});