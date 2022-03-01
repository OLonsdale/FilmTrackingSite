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

search.addEventListener('click', ev => {
  alert("not yet implemented")
});

//hide and show elements based on the status selected.
watched.addEventListener('change', ev => {
    document.documentElement.style.setProperty('--hiddenTF', "default");  
});

planning.addEventListener('change', ev => {
  document.documentElement.style.setProperty('--hiddenTF', "none");
});

addFilm.addEventListener('submit', ev => {
  saveFilm();
});

//todo: add more validation
function saveFilm() {

  //get data from form
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const runtime = document.getElementById("runtime").value;
  const status = document.querySelector('input[name="statusSelect"]:checked').value

  let arrayName;
  let newFilm;
  //save data in correct file
  if (status == "planning") {
    //add data to new object
    newFilm = {title:title,year:year,runtime:runtime,status:status};
    //select correct localStorage stored array
    arrayName = "planningFilms"
  //watched  
  } else {
    //collect the rest of the data
    const favourite = document.getElementById("favourite").checked;
    const score = document.getElementById("score").value;
    const date = document.getElementById("watchedDate").value;
    const watchedNum = document.getElementById("timesWatched").value;
    //add to new object
    newFilm = {title:title,year:year,runtime:runtime,status:status,
      favourite:favourite,score:score,date:date,timesWatched:watchedNum};
    //select correct localStorage stored array
    arrayName = "watchedFilms"
  }
  //get correct array from localStorage
  let array = JSON.parse(localStorage.getItem(arrayName));
  //if not dupe, push. Broken.
  if(array.includes(newFilm) == false){
    array.push(newFilm);
    localStorage.setItem(arrayName, JSON.stringify(array));
  }
};

//create the files if they don't exist, just stores empty array
if (localStorage.getItem("planningFilms") === undefined || localStorage.getItem("planningFilms") === null) {
  localStorage.setItem("planningFilms", JSON.stringify([]));
  console.log("Created planningFilms file");
}
if (localStorage.getItem("watchedFilms") === undefined || localStorage.getItem("watchedFilms") === null) {
  localStorage.setItem("watchedFilms", JSON.stringify([]));
  console.log("Created watchedFilms file");
}