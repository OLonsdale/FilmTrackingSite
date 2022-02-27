console.log("Add Film Script Loaded");

"use strict";

//updading the stars with the slider on add page
//uses vars
//TODO
score.addEventListener('input', ev => {
  const score = document.getElementById("score").value;
  const out = document.getElementById("scoreText");

  scoreString = ""
  for (let i = 0; i < score; i++) {
    scoreString = scoreString.concat("★");
  }
  scoreString = scoreString.padEnd(5,"☆")

  out.innerHTML=scoreString;

});

//toggle the red/black heart when favs checkbox
favourite.addEventListener('click', ev => {
  const fav = document.getElementById("favourite").checked;
  const out = document.getElementById("favText");

  if (fav) {
    out.innerHTML = "❤️";
  } else {
    out.innerHTML = "🖤";
  }
});

//hide and show elements based on the status selected.
//"status" seems to be a reserved word, so had to use statusA
statusA.addEventListener('input', ev => {
  const select = document.getElementById("statusA");
  const value = select.options[select.selectedIndex].value;

  if (value == "planning") {
    document.documentElement.style.setProperty('--hiddenTF', "hidden");
  } else {
    document.documentElement.style.setProperty('--hiddenTF', "visible");
  }

});

submit.addEventListener('click', ev => {
  saveFilm();
});

//todo: add more validation
function saveFilm() {

  //create the files if they don't exist, just stores empty array
  if (localStorage.getItem("planningFilms") === undefined || localStorage.getItem("planningFilms") === null) {
    localStorage.setItem("planningFilms", JSON.stringify([]));
    console.log("Created planningFilms file");
  }
  if (localStorage.getItem("watchedFilms") === undefined || localStorage.getItem("watchedFilms") === null) {
    localStorage.setItem("watchedFilms", JSON.stringify([]));
    console.log("Created watchedFilms file");
  }

  //get data from form
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const runtime = document.getElementById("runtime").value;
  const dropdown = document.getElementById("statusA");
  const status = dropdown.options[dropdown.selectedIndex].value;
  const favourite = document.getElementById("favourite").checked;
  const score = document.getElementById("score").value;
  const date = document.getElementById("watched-date").value;
  const watchedNum = document.getElementById("times-watched").value;

  //save data in correct file
  //uses var at the moment.
  //also a bit redundent.
  //also doesn't check for duplicate data
  if (status == "planning") {
    const newFilm = [title, year, runtime, status];
    var planningFilms = JSON.parse(localStorage.getItem("planningFilms"));
    planningFilms.push(newFilm)
    localStorage.setItem("planningFilms", JSON.stringify(planningFilms));
  } else{
    const newFilm = [title, year, runtime, status, favourite, score, date, watchedNum];
    var watchedFilms = JSON.parse(localStorage.getItem("watchedFilms"));
    watchedFilms.push(newFilm)
    localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
  }

};


