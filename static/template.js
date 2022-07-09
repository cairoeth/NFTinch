
if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

// theme setting
$(function() {
    "use strict";
    let root = document.documentElement;

    // window.oncontextmenu = function () {
    //     return false;
    // }

    // $(document).keydown(function (event) {
    //     if (event.keyCode == 123) {
    //         return false;
    //     }
    //     else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
    //         return false;
    //     }
    // });

    window.onscroll = function () {
       var header_navbar = document.querySelector(".navbar");
       var sticky = header_navbar.offsetTop;
       if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
       } else {
            header_navbar.classList.remove("sticky");
       }
    };

    $('.menu-toggle-option').on('click', function () {
        $('.menu').toggleClass('open');
    });

    // LTR/RTL active js
    $(".theme-rtl input").on('change',function() {
        if(this.checked) {
            $("body").addClass('rtl_mode');
        }else{
            $("body").removeClass('rtl_mode');
        }
       
    });

    // google font setting
    $('.font_setting input:radio').on('click', function ()  {
		var others = $("[name='" + this.name + "']").map(function () {
			return this.value
		}).get().join(" ")
		console.log(others)
		$('body').removeClass(others).addClass(this.value)
    });

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



 