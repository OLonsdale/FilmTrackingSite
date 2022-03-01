"use strict";
console.log("Stats Script Loaded");

const dataWatched = JSON.parse(localStorage.getItem("watchedFilms"));
const dataPlanned = JSON.parse(localStorage.getItem("planningFilms"));

let total = 0;
let aveScore = 0;
dataWatched.forEach(film => {
    total += parseInt(film.runtime);
    aveScore += parseInt(film.score);
})
total = total/60;
aveScore = aveScore/dataWatched.length;

watchedFilms.innerHTML = dataWatched.length;
plannedFilms.innerHTML = dataPlanned.length;
hoursWatched.innerHTML = total.toFixed(2);
allFilms.innerHTML = dataWatched.length + dataPlanned.length;
averageRating.innerHTML = aveScore.toFixed(1);