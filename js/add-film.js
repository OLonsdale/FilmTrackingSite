"use strict";
console.log("Add Film Script Loaded");

//updading the stars with the slider on add page
score.addEventListener('input', ev => {
  let scoreString = ""
  for (let i = 0; i < score.value; i++) {
    scoreString = scoreString.concat("★");
  }
  scoreString = scoreString.padEnd(5,"☆")

  scoreText.innerHTML=scoreString;

});

//toggle the red/black heart on click
favourite.addEventListener('click', ev => {
  if (document.getElementById("favourite").checked) {
    favText.innerHTML = "❤️";
  } else {
    favText.innerHTML = "🖤";
  }
});

//hide and show elements based on the status selected.
//"status" seems to be a reserved word, so had to use statusA
//inelegent method, doesn't move stuff below up the page
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
  const status = statusA.options[statusA.selectedIndex].value;
  const favourite = document.getElementById("favourite").checked;
  const score = document.getElementById("score").value;
  const date = document.getElementById("watched-date").value;
  const watchedNum = document.getElementById("times-watched").value;

  //save data in correct file
  //Lots of redunancy. TODO.
  //saves as array. Object would be better, for dot notation, eg. get film.title rather than film[0]
  if (status == "planning") {
    const newFilm = [title, year, runtime, status];
    let planningFilms = JSON.parse(localStorage.getItem("planningFilms"));
    let dupe = false;
    planningFilms.forEach(film => {
      if(film[0]==newFilm[0] && film[1]==newFilm[1]){
        dupe=true;
      }
    });
    if(dupe == false){
      planningFilms.push(newFilm)
      localStorage.setItem("planningFilms", JSON.stringify(planningFilms));
    }
  //watched  
  } else{
    const newFilm = [title, year, runtime, status, favourite, score, date, watchedNum];
    let watchedFilms = JSON.parse(localStorage.getItem("watchedFilms"));
    let dupe = false;
    watchedFilms.forEach(film => {
      if(film[0]==newFilm[0] && film[1]==newFilm[1]){
        dupe=true;
      }
    })
    if(dupe == false){
      watchedFilms.push(newFilm)
      localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
    }
  }

};
