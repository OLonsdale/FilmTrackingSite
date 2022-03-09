"use strict";

//gets data from the local storage, and adds it to correct table. Also refreshes the stats.
function loadFilms() {
  const watchedTable = document.getElementById("watched").getElementsByTagName('tbody')[0];
  const planningTable = document.getElementById("planning").getElementsByTagName('tbody')[0];
  const data = JSON.parse(localStorage.getItem("films"));
  watchedTable.innerHTML = "";
  planningTable.innerHTML = "";

  data.forEach(film => {
    if (film.status == "watched") {
      const row = watchedTable.insertRow();
      const favCell = row.insertCell(0)
      const titleCell = row.insertCell(1);
      const yearCell = row.insertCell(2);
      const dateWatchedCell = row.insertCell(3);
      const scoreCell = row.insertCell(4);
      const removeButtonCell = row.insertCell(5);

      const removeButton = document.createElement('button');
      removeButton.textContent = "❌";
      removeButton.title = "Remove"
      removeButton.ariaLabel = "Remove button";
      removeButton.addEventListener('click', ev => {
        deleteFilm(film);
      });

      const editButton = document.createElement('button');
      editButton.textContent = "✏️";
      editButton.title = "Edit Film";
      editButton.ariaLabel = "Edit Film Button";
      editButton.addEventListener('click', ev => {
        deleteFilm(film);
        editFilm(film);
      });

      let score = "";
      for (let i = 0; i < film.score; i++) {
        score = score.concat("★");
      }
      score = score.padEnd(5, "☆");

      let fav;
      if (film.favourite == true) {
        fav = "❤️";
      } else {
        fav = "🖤";
      }

      favCell.innerHTML = fav;
      titleCell.innerHTML = film.title;
      yearCell.innerHTML = film.year;
      dateWatchedCell.innerHTML = film.date;
      scoreCell.innerHTML = score;
      removeButtonCell.append(removeButton);
      removeButtonCell.append(editButton);

    } else {
      const row = planningTable.insertRow();
      const titleCell = row.insertCell(0);
      const yearCell = row.insertCell(1);
      const buttonCell = row.insertCell(2);

      const removeButton = document.createElement('button');
      removeButton.textContent = "❌";
      removeButton.title = "Remove"
      removeButton.ariaLabel = "Remove Button";
      removeButton.addEventListener('click', ev => {
        deleteFilm(film);
      });

      const watchedButton = document.createElement('button');
      watchedButton.textContent = "🔭";
      watchedButton.ariaLabel = "Mark film as watched";
      watchedButton.title = "Mark as Watched"
      watchedButton.addEventListener('click', ev => {
        deleteFilm(film);
        markWatched(film);
      })

      const editButton = document.createElement('button');
      editButton.textContent = "✏️";
      editButton.title = "Edit Film";
      editButton.ariaLabel = "Edit Film Button";
      editButton.addEventListener('click', ev => {
        deleteFilm(film);
        editFilm(film);
      });


      titleCell.innerHTML = film.title;
      yearCell.innerHTML = film.year;
      buttonCell.append(removeButton);
      buttonCell.append(watchedButton);
      buttonCell.append(editButton);
    }

    loadStats();
  });
}

//takes a film object, and removes it from the local storage array, and reloads the data
function deleteFilm(toDelete) {
  let array = JSON.parse(localStorage.getItem("films"));
  let target;
  array.forEach(film => {
    if (film.title == toDelete.title && film.year == toDelete.year) {
      target = array.indexOf(film);
    }
  });
  array.splice(target, 1);
  localStorage.setItem("films", JSON.stringify(array));
  loadFilms();
}

//takes film object, mostly temporary, just fills missing data, changes planning to watched, and reloads the tables
function markWatched(film) {

  let array = JSON.parse(localStorage.getItem("films"));
  film.status = "watched";
  const d = new Date();
  film.date = d.toISOString().split('T')[0]
  film.score = 0;
  film.favourite = false;
  film.timesWatched = 1;
  array.push(film);
  localStorage.setItem("films", JSON.stringify(array));
  loadFilms();
}

//takes film object, and loads the data into the "create film" form.
function editFilm(film) {
  document.getElementById("title").value = film.title;
  document.getElementById("year").value = film.year;
  document.getElementById("runtime").value = film.runtime;
  if (film.status == "watched") {
    document.getElementById("watchedRadio").checked = true;
  } else document.getElementById("planningRadio").checked = true;
  document.getElementById("favourite").value = film.favourite;
  document.getElementById("score").value = film.score;
  document.getElementById("watchedDate").value = film.date;
  document.getElementById("timesWatched").value = film.timesWatched;
  submit.innerHTML = "Edit Film";
  setScoreString();
  loadFilms();
  showAdd();
}
////////////////////////////////////////////////////////////////////////////////////////////

//loads the stats
function loadStats() {
  const data = JSON.parse(localStorage.getItem("films"));
  let totalWatched = 0;
  let totalPlanning = 0;
  let totalWatchedTime = 0;
  let aveScore = 0;

  data.forEach(film => {
    if (film.status == "watched") {
      totalWatched++;
      totalWatchedTime += parseInt(film.runtime);
      aveScore += parseInt(film.score);
    } else {
      totalPlanning++;
    }
  })
  //mins to hours
  totalWatchedTime = totalWatchedTime / 60;
  aveScore = aveScore / totalWatched;

  watchedFilmsCount.innerHTML = totalWatched;
  plannedFilmsCount.innerHTML = totalPlanning;
  hoursWatched.innerHTML = totalWatchedTime.toFixed(2);
  allFilms.innerHTML = data.length
  averageRating.innerHTML = aveScore.toFixed(1);
}

////////////////////////////////////////////////////////////////////////////////////////////
// Add Film Form //

//set default value of first watched to today. No idea why that needs JS.
watchedDate.valueAsDate = new Date();

function setScoreString() {
  let scoreString = "";
  for (let i = 0; i < score.value; i++) {
    scoreString = scoreString.concat("★");
  }
  scoreString = scoreString.padEnd(5, "☆");
  scoreText.innerHTML = scoreString;
}

//updading the stars with the slider on add page
score.addEventListener('input', ev => {
  setScoreString();
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
watchedRadio.addEventListener('change', ev => {
  document.documentElement.style.setProperty('--hiddenTF', "default");
});
planningRadio.addEventListener('change', ev => {
  document.documentElement.style.setProperty('--hiddenTF', "none");
});

addFilm.addEventListener('submit', ev => {
  saveFilm();
});

function saveFilm() {
  //get data from form
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const runtime = document.getElementById("runtime").value;
  const status = document.querySelector('input[name="statusSelect"]:checked').value
  const favourite = document.getElementById("favourite").checked;
  const score = document.getElementById("score").value;
  const date = document.getElementById("watchedDate").value;
  const watchedNum = document.getElementById("timesWatched").value;

  let arrayName = "films";
  let newFilm;
  //add to new object
  if (status == "planning") {
    newFilm = {
      title: title,
      year: year,
      runtime: runtime,
      status: status,
    }
  } else {
    newFilm = {
      title: title,
      year: year,
      runtime: runtime,
      status: status,
      favourite: favourite,
      score: score,
      date: date,
      timesWatched: watchedNum
    };
  }

  //get correct array from localStorage
  let array = JSON.parse(localStorage.getItem(arrayName));
  //Check for duplicate
  let dupe = false;
  array.forEach(film => {
    if (newFilm.title == film.title && newFilm.year == film.year) {
      dupe = true;
    }
  });
  //if not dupe, push. If dupe, give error. I wish could do if(!dupe)
  if (dupe) {
    alert("This film is already on your list");
  } else {
    array.push(newFilm);
    localStorage.setItem(arrayName, JSON.stringify(array));
  }

  loadFilms();
};

function showWatched() {
  console.log("showing watched films");
  watchedFilms.style.display = "block";
  planningFilms.style.display = "none";
  stats.style.display = "none";
}

function showPlanning() {
  console.log("showing planning films");
  watchedFilms.style.display = "none";
  planningFilms.style.display = "block";
  stats.style.display = "none";
}

function showStats() {
  console.log("showing stats");
  stats.style.display = "block";
  watchedFilms.style.display = "none";
  planningFilms.style.display = "none";
}

const watchedMenu = document.getElementById("showWatched");
const planningMenu = document.getElementById("showPlanning");
const statsMenu = document.getElementById("showStats");
const addMenu = document.getElementById("showAdd");

watchedMenu.addEventListener('click', ev => {
  showWatched();
});

planningMenu.addEventListener('click', ev => {
  showPlanning();
});

statsMenu.addEventListener('click', ev => {
  showStats();
});

addMenu.addEventListener('click', ev => {
  showAdd();
});


// Get the modal
const modal = document.getElementById("addPopup");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', ev => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', ev => {
  if (ev.target == modal) {
    modal.style.display = "none";
  }
});

function showAdd() {
  modal.style.display = "block";
}

//Splash screen

// Get the modal
const splash = document.getElementById("splashPopup");
// Get the <span> element that closes the modal
const splashSpan = document.getElementsByClassName("closeSplash")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', ev => {
  splashSpan.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', ev => {
  if (ev.target == splashSpan) {
    splash.style.display = "none";
  }
});

showHelpButton.addEventListener('click', ev => {
  showSplash();
});

function showSplash() {
  splash.style.display = "block";
}


//Theming

function toggleTheme() {
  if (JSON.parse(localStorage.getItem("darkTheme"))) {
    localStorage.setItem("darkTheme", "false");
    console.log("switching to light theme");
    loadTheme();
  } else {
    localStorage.setItem("darkTheme", "true");
    console.log("switching to dark theme");
    loadTheme();
  }
}

function loadTheme() {
  let r = document.querySelector(":root");
  if (!JSON.parse(localStorage.getItem("darkTheme"))) {
    r.style.setProperty("--background-colour", "gainsboro");
    r.style.setProperty("--background-accent", "lightgray");
    r.style.setProperty("--highlight-colour", "lightslategray");
    r.style.setProperty("--contrast-colour", "black");
    r.style.setProperty("--font-colour", "black");
  } else {
    r.style.setProperty("--background-colour", "#121212");
    r.style.setProperty("--background-accent", "#1F1B24");
    r.style.setProperty("--highlight-colour", "darkslategray");
    r.style.setProperty("--contrast-colour", "white");
    r.style.setProperty("--font-colour", "white");
  }
}

toggleThemeButton.addEventListener("click", ev => {
  toggleTheme();
});

//create dark theme local storage file, default to light theme
if (localStorage.getItem("darkTheme") === undefined || localStorage.getItem("darkTheme") === null) {
  localStorage.setItem("darkTheme", "false");
  console.log("set light theme as default")
}

//create splash read local storage file, default to no
if (localStorage.getItem("splashRead") === undefined || localStorage.getItem("splashRead") === null) {
  localStorage.setItem("splashRead", "false");
  console.log("splash not read")
}

if (!JSON.parse(localStorage.getItem("splashRead"))) {
  showSplash()
  localStorage.setItem("splashRead", "true");
}

//create the file if it doesn't exist, and fills it with example data
if (localStorage.getItem("films") === undefined || localStorage.getItem("films") === null) {
  localStorage.setItem("films", JSON.stringify([{
      "title": "watched-01",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": true,
      "score": "4",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-02",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": false,
      "score": "5",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-03",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": true,
      "score": "3",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-04",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": false,
      "score": "4",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-05",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": false,
      "score": "3",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-06",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": false,
      "score": "4",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "watched-07",
      "year": "2001",
      "runtime": "201",
      "status": "watched",
      "favourite": true,
      "score": "5",
      "date": "2022-03-02",
      "timesWatched": "1"
    },
    {
      "title": "planned-01",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-02",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-03",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-04",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-05",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-06",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    },
    {
      "title": "planned-07",
      "year": "2001",
      "runtime": "201",
      "status": "planned"
    }
  ]));
  console.log("Created films file");
}

loadTheme();
loadFilms();