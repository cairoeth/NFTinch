// theme setting
$(function() {
    "use strict";
    window.onscroll = function () {
       var header_navbar = document.querySelector(".navbar");
       var sticky = header_navbar.offsetTop;
       if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
       } else {
            header_navbar.classList.remove("sticky");
       }
    };
});

// light and dark theme setting js
$(function() { 
    "use strict";
    var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    var toggleHcSwitch = document.querySelector('.theme-high-contrast input[type="checkbox"]');
    var currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
        if (currentTheme === 'high-contrast') {
            toggleHcSwitch.checked = true;
            toggleSwitch.checked = false;
        }
    }
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            $('.theme-high-contrast input[type="checkbox"]').prop("checked", false);
        }
        else {        
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }
    function switchHc(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'high-contrast');
            localStorage.setItem('theme', 'high-contrast');
            $('.theme-switch input[type="checkbox"]').prop("checked", false);
        }
        else {        
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    toggleSwitch.addEventListener('change', switchTheme, true);
    toggleHcSwitch.addEventListener('change', switchHc, false);
});



 