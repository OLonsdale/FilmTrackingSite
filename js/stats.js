// We want to see some non-trivial Javascript code
// At a minimum, you should demonstrate a few simple uses of event-driven JavaScript for DOM manipulation
// You should use ES6 syntax throughout: e.g. don't use "var", use the modern tools (template literals, arrow functions).
// There should be no JavaScript errors in the browser console

// For more marks, we like to see a bit more complex use of JavaScript, perhaps some looping and/or more complex DOM manipulation.
// Accessing APIs is a great option if it fits with your project, or you can work with your own, local data.
// Your code should be DRY, if you have repeated code, consider refactoring as a function with arguments for example.
// We like to see what you can do. Be creative.

console.log("stats Script Loaded");

"use strict";

const dataWatched = JSON.parse(localStorage.getItem("watchedFilms"));
const dataPlanned = JSON.parse(localStorage.getItem("planningFilms"));

document.getElementById("watched-films").innerHTML = dataWatched.length;
document.getElementById("planned-films").innerHTML = dataPlanned.length;

total = 0
dataWatched.forEach(film => {
    total += parseInt(film[2]);
});
total = total/60;

document.getElementById("hours-watched").innerHTML = total.toFixed(2);
document.getElementById("all-films").innerHTML = dataWatched.length + dataPlanned.length;