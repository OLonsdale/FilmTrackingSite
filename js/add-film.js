console.log("Add Film Script Loaded");

"use strict";

//updading the stars with the slider on add page
score.addEventListener('input', ev =>{
  const score = document.getElementById("score").value;
  const out = document.getElementById("scoreText");
    
  if(score == 0){
    out.innerHTML = "☆☆☆☆☆";
  } else if(score == 1){
    out.innerHTML = "★☆☆☆☆";
  } else if(score == 2){
    out.innerHTML = "★★☆☆☆";
  } else if(score == 3){
    out.innerHTML = "★★★☆☆";
  } else if(score == 4){
    out.innerHTML = "★★★★☆";
  } else {
    out.innerHTML = "★★★★★";
  }
});

//toggle the red/black heart when favs checkbox
favourite.addEventListener('click', ev =>{
  const fav = document.getElementById("favourite").checked;
  const out = document.getElementById("favText");

  if(fav) {
    out.innerHTML = "❤️";
  } else {
      out.innerHTML = "🖤";
    } 
});

//hide and show elements based on the status selected.
//"status" seems to be a reserved word, so had to use statusA
statusA.addEventListener('input', ev =>{
  const select = document.getElementById("statusA");
  const value = select.options[select.selectedIndex].value;

  if(value == "planning"){
    document.documentElement.style.setProperty('--hiddenTF', "hidden");
  } else {
    document.documentElement.style.setProperty('--hiddenTF', "visible");
  }

});

submit.addEventListener('click', ev =>{
    saveFilm();
  });

//todo: add validation
function saveFilm() {
    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const runtime = document.getElementById("runtime").value;
    const dropdown = document.getElementById("statusA");
    const status = dropdown.options[dropdown.selectedIndex].value;
    const favourite = document.getElementById("favourite").checked;
    const score = document.getElementById("score").value;
    const date = document.getElementById("watched-date").value;
    const watchedNum = document.getElementById("times-watched").value;

    const data = [title,year,runtime,status,favourite,score,date,watchedNum];

    localStorage.setItem(`${title},${year}`,data)

};