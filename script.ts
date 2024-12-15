document.addEventListener("DOMContentLoaded", function(){
    const checkbox = document.querySelector('.manu-check') as HTMLInputElement;
    const manu = document.querySelector(".manu") as HTMLDivElement;
    
    checkbox.addEventListener("change", function(){
        if (checkbox.checked){
            manu.classList.add("show")
        }
        else{
            manu.classList.remove("show")
        }
    });

    window.onresize = function(){
        if (window.innerWidth > 660) { //660 is from nav-bar.css
            checkbox.checked = false
            manu.classList.remove("show")
        }
    };
});
