document.addEventListener("DOMContentLoaded", function () {
    var checkbox = document.querySelector('.manu-check');
    var manu = document.querySelector(".manu");
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            manu.classList.add("show");
        }
        else {
            manu.classList.remove("show");
        }
    });
    window.onresize = function () {
        if (window.innerWidth > 660) { //660 is from nav-bar.css
            checkbox.checked = false;
            manu.classList.remove("show");
        }
    };
});
