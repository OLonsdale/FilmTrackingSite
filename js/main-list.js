"use strict";
console.log("Main List Script Loaded");

function loadFilms(tableID){
  const table = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  const data = JSON.parse(localStorage.getItem("watchedFilms"));

  data.forEach(film => {
    const row = table.insertRow();
    const favCell = row.insertCell(0)
    const titleCell = row.insertCell(1);
    const yearCell = row.insertCell(2);
    const dateWatchedCell = row.insertCell(3);
    const scoreCell = row.insertCell(4);
    const removeButtonCell = row.insertCell(5);

    let score = ""
    for (let i = 0; i < film.score; i++) {
      score = score.concat("★");
    }
    score = score.padEnd(5,"☆")

    let fav;
    if(film.favourite == true){
      fav = "❤️" ;
    } else {
      fav = "🖤";
    }

    favCell.innerHTML = fav
    titleCell.innerHTML = film.title;
    yearCell.innerHTML = film.year;
    dateWatchedCell.innerHTML = film.date;
    scoreCell.innerHTML = score;
    removeButtonCell.innerHTML = "❌"
  });
}

loadFilms("watched");