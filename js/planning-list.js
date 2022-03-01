"use strict";
console.log("Main List Script Loaded");

function loadFilms(tableID){
  const table = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  const data = JSON.parse(localStorage.getItem("planningFilms"));

  data.forEach(film => {
    const row = table.insertRow();

    const titleCell = row.insertCell(0);
    const yearCell = row.insertCell(1);

    titleCell.innerHTML = film.title;
    yearCell.innerHTML = film.year;

  });
}

loadFilms("planning");