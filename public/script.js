const symptoms = document.querySelector("#covid-symptoms");
const prevention = document.querySelector("#covid-prevention");
const treatment = document.querySelector("#covid-treatment");
const hideDisplayButton = document.querySelector(".display-button1");
const hideDisplayButton2 = document.querySelector(".display-button2");
const hideDisplayButton3 = document.querySelector(".display-button3");


hideDisplayButton.addEventListener("click", function(){
    symptoms.classList.toggle("display-hide");
    
    if (symptoms.className === "display-hide"){
        hideDisplayButton.innerHTML = "+";
    } else {
        hideDisplayButton.innerHTML = "-";
    }
});

hideDisplayButton2.addEventListener("click", function(){
    prevention.classList.toggle("display-hide");

    if (prevention.className === "display-hide"){
        hideDisplayButton2.innerHTML = "+";
    } else {
        hideDisplayButton2.innerHTML = "-";
    }
});

hideDisplayButton3.addEventListener("click", function(){
    treatment.classList.toggle("display-hide");

    if (treatment.className === "display-hide"){
        hideDisplayButton3.innerHTML = "+";
    } else {
        hideDisplayButton3.innerHTML = "-";
    }
});





