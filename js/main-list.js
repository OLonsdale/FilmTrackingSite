// We want to see some non-trivial Javascript code
// At a minimum, you should demonstrate a few simple uses of event-driven JavaScript for DOM manipulation
// You should use ES6 syntax throughout: e.g. don't use "var", use the modern tools (template literals, arrow functions).
// There should be no JavaScript errors in the browser console

// For more marks, we like to see a bit more complex use of JavaScript, perhaps some looping and/or more complex DOM manipulation.
// Accessing APIs is a great option if it fits with your project, or you can work with your own, local data.
// Your code should be DRY, if you have repeated code, consider refactoring as a function with arguments for example.
// We like to see what you can do. Be creative.

console.log("Main List Script Loaded");

"use strict";

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

    //uses var score and i for loop
    score = ""
    for (let i = 0; i < film[7]; i++) {
      score = score.concat("★");
    }
    score = score.padEnd(5,"☆")

    if(film[4] == true){
      fav = "❤️" ;
    } else {
      fav = "🖤";
    }

    favCell.innerHTML = fav
    titleCell.innerHTML = film[0];
    yearCell.innerHTML = film[1];
    dateWatchedCell.innerHTML = film[6];
    scoreCell.innerHTML = score;
  });
}

loadFilms("watched");