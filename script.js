// LocalStorage (User Preferences: Light/Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('app-theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = 'Beralih ke Dark Mode';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode'); 
    
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = 'Beralih ke Dark Mode';
        localStorage.setItem('app-theme', 'light');
    } else {
        themeToggle.textContent = 'Beralih ke Light Mode';
        localStorage.setItem('app-theme', 'dark');
    }
});
