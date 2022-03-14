"use strict";

//gets data from the local storage, and adds it to correct table. Also refreshes the stats.
function loadFilms() {
  const watchedTable = document.getElementById("watched").getElementsByTagName('tbody')[0];
  const planningTable = document.getElementById("planning").getElementsByTagName('tbody')[0];
  const watchedGrid = document.getElementById("watchedCards");
  const planningGrid = document.getElementById("planningCards");
  const data = JSON.parse(localStorage.getItem("films"));

  //clears tables
  watchedTable.innerHTML = "";
  planningTable.innerHTML = "";
  watchedGrid.innerHTML = "";
  planningGrid.innerHTML = "";

  data.forEach(film => {

    //add to table
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
      editFilm(film);
    });

    const watchedButton = document.createElement('button');
    watchedButton.textContent = "🔭";
    watchedButton.ariaLabel = "Mark film as watched";
    watchedButton.title = "Mark as Watched"
    watchedButton.addEventListener('click', ev => {
      deleteFilm(film);
      markWatched(film);
    })

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

    //grid stuff
    const card = document.createElement("div");
    const head = document.createElement("div");
    const body = document.createElement("div");
    const foot = document.createElement("div");
    card.className = "card";
    head.className = "card-head";
    body.className = "card-body";
    foot.className = "card-foot";

    if (film.status == "watched") {
      const row = watchedTable.insertRow();
      const favCell = row.insertCell(0)
      const titleCell = row.insertCell(1);
      const yearCell = row.insertCell(2);
      const dateWatchedCell = row.insertCell(3);
      const scoreCell = row.insertCell(4);
      const buttonCell = row.insertCell(5);

      favCell.innerHTML = fav;
      titleCell.innerHTML = film.title;
      yearCell.innerHTML = film.year;
      dateWatchedCell.innerHTML = film.date;
      scoreCell.innerHTML = `<div class="score-text">${score}</div>`;
      buttonCell.append(removeButton);
      buttonCell.append(editButton);

      //add to grid
      head.innerHTML = `<div class="fav inline">${fav}</div><div class="title-card inline">${film.title}</div>`;
      body.innerHTML = `
        <div class="inline">Year: ${film.year}<br></div>
        <div class="inline">Date Watched: ${film.date}<br></div>
        <div class="inline">Runtime: ${film.runtime} min<br></div>
        <div class="inline">Times watched: ${film.timesWatched}<br></div>
        <div class="inline">Score: <div class="score-text">${score}<br></div>
        `;

      const gridRemoveButton = removeButton.cloneNode(true);
      const gridEditButton = editButton.cloneNode(true);

      gridRemoveButton.addEventListener('click', ev => {
        deleteFilm(film);
      });

      gridEditButton.addEventListener('click', ev => {
        editFilm(film);
      });

      foot.append(gridRemoveButton);
      foot.append(gridEditButton);

      card.append(head);
      card.append(body);
      card.append(foot);
      watchedGrid.appendChild(card);

    } else {
      const row = planningTable.insertRow();
      const titleCell = row.insertCell(0);
      const yearCell = row.insertCell(1);
      const buttonCell = row.insertCell(2);
      const gridRemoveButton = removeButton.cloneNode(true);
      const gridEditButton = editButton.cloneNode(true);
      const gridWatchedButton = watchedButton.cloneNode(true);

      titleCell.innerHTML = film.title;
      yearCell.innerHTML = film.year;
      buttonCell.append(removeButton);
      buttonCell.append(watchedButton);
      buttonCell.append(editButton);

      //add to grid
      head.innerHTML = `<div class="title-card inline">${film.title}</div>`;
      body.innerHTML = `
        <div class="inline">Year: ${film.year}<br></div>
        <div class="inline">Runtime: ${film.runtime} min<br></div>
        `;


      gridRemoveButton.addEventListener('click', ev => {
        deleteFilm(film);
      });

      gridEditButton.addEventListener('click', ev => {
        editFilm(film);
      });

      gridWatchedButton.addEventListener('click', ev => {
        deleteFilm(film);
        markWatched(film);
      })

      foot.append(gridRemoveButton);
      foot.append(gridWatchedButton)
      foot.append(gridEditButton);

      card.append(head);
      card.append(body);
      card.append(foot);
      planningGrid.appendChild(card);
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

  localStorage.setItem("editing",JSON.stringify(film));

  document.getElementById("title").value = film.title;
  document.getElementById("year").value = film.year;
  document.getElementById("runtime").value = film.runtime;
  if (film.status == "watched") {
    document.getElementById("watchedRadio").checked = true;
  } else {
    document.getElementById("planningRadio").checked = true;
  }
  document.getElementById("favourite").value = film.favourite;
  document.getElementById("score").value = film.score;
  if(film.date){
    document.getElementById("watchedDate").value = film.date;
  }
  if(film.timesWatched){
    document.getElementById("timesWatched").value = film.timesWatched;
  }

  //changing button and heading to say edit instead of save
  submit.innerHTML = "Save Edit";
  document.getElementById("addFilmHeading").innerHTML="<h4>Edit Film</h4>"

  setScoreString();
  loadFilms();
  showAdd();
}

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

// Add Film Form //

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
  alert("not yet implemented. will pull data from API")
});

//hide and show elements based on the status selected.
//TODO
watchedRadio.addEventListener('change', ev => {
  document.documentElement.style.setProperty('--hiddenTF', "default");
});
planningRadio.addEventListener('change', ev => {
  document.documentElement.style.setProperty('--hiddenTF', "none");
});

//on save, checks for old editing items in local storage and removes them
addFilm.addEventListener('submit', ev => {
  if(!document.getElementById("addFilmHeading").innerHTML==="<h4>Edit Film</h4>"){
    if(localStorage.getItem("editing") != undefined || localStorage.getItem("editing") != null){
      localStorage.removeItem("editing");
    }
  }
  saveFilm();
});

//save the data from the form into the local storage array
function saveFilm() {

  if(localStorage.getItem("editing") != undefined || localStorage.getItem("editing") != null){
    console.log("editing film");
    deleteFilm(JSON.parse(localStorage.getItem("editing")));
    localStorage.removeItem("editing");
  }
  //get data from form
  let title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const runtime = document.getElementById("runtime").value;
  const status = document.querySelector('input[name="statusSelect"]:checked').value
  const favourite = document.getElementById("favourite").checked;
  const score = document.getElementById("score").value;
  const date = document.getElementById("watchedDate").value;
  const watchedNum = document.getElementById("timesWatched").value;

  //crudely cleans input against xss.
  title = title.replaceAll("<"," ");
  title = title.replaceAll(">"," ");

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

//show the watched table and hide other elements
function showWatched() {
  console.log("showing watched films");
  watchedFilms.style.display = "block";
  planningFilms.style.display = "none";
  stats.style.display = "none";
}

//show the watched table and hide other elements
function showPlanning() {
  console.log("showing planning films");
  watchedFilms.style.display = "none";
  planningFilms.style.display = "block";
  stats.style.display = "none";
}

//show the stats screen and hide other elements
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
  //clear add form if opened via menu instead of edit button
  document.getElementById("addFilm").reset();
  //set default value of first watched to today. No idea why that needs JS.
  watchedDate.valueAsDate = new Date();

  if(localStorage.getItem("editing") != undefined || localStorage.getItem("editing") != null){
    localStorage.removeItem("editing");
  }

  showAdd();
});


// Add film popup

// Get the modal
const addPopup = document.getElementById("addPopup");
// Get the <span> element that closes the addPopup
const addPopupClose = document.getElementsByClassName("close")[0];

// When the user clicks on <addPopupClose> (x), close the addPopup
addPopupClose.addEventListener('click', ev => {
  addPopup.style.display = "none";
});

// When the user clicks anywhere outside of the addPopup, close it
window.addEventListener('click', ev => {
  if (ev.target == addPopup) {
    addPopup.style.display = "none";
  }
});

function showAdd() {
  addPopup.style.display = "block";
}

//Splash screen

// Get the modal
const splash = document.getElementById("splashPopup");
// Get the <span> element that closes the modal
const splashSpan = document.getElementById("closeSplash");

// When the user clicks on <span> (x), close the modal
closeSplash.addEventListener('click', ev => {
  splash.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', ev => {
  if (ev.target == splashPopup) {
    splash.style.display = "none";
  }
});

//Show the help splash when question mark button is clicked
showHelpButton.addEventListener('click', ev => {
  showSplash();
});

function showSplash() {
  splash.style.display = "block";
}

//Button Bar event handlers
clearButton.addEventListener('click', ev => {
  localStorage.setItem("films", JSON.stringify([]));
  loadFilms();
});

downloadButton.addEventListener('click', ev => {
  navigator.clipboard.writeText(localStorage.getItem("films"));
  alert("films json copied to clipboard")
});

uploadButton.addEventListener('click', ev => {
  readClipboard();
});

async function readClipboard() {
  const text = await navigator.clipboard.readText();
  try {
    JSON.parse(text);
  } catch (error) {
    alert("JSON invalid");
    return;
  }
  localStorage.setItem("films", text);
  loadFilms();
}


//Theming

//flip the value of "dark theme" in local storage, and reload theme
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

// set the colours depending on the value of "dark theme" in local storage
function loadTheme() {
  let r = document.querySelector(":root");
  if (JSON.parse(localStorage.getItem("darkTheme"))) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

//on click, change the theme
toggleThemeButton.addEventListener("click", ev => {
  toggleTheme();
});

//Creating the files in local storage

//create dark theme local storage file, default to light theme
if (localStorage.getItem("darkTheme") === undefined || localStorage.getItem("darkTheme") === null) {
  localStorage.setItem("darkTheme", "false");
  console.log("set light theme as default");
}

//create splash read local storage file, default to no
if (localStorage.getItem("splashRead") === undefined || localStorage.getItem("splashRead") === null) {
  localStorage.setItem("splashRead", "false");
  console.log("splash not read");
}

//create file to show the splash screen has been read, and show the splash
if (!JSON.parse(localStorage.getItem("splashRead"))) {
  showSplash();
  localStorage.setItem("splashRead", "true");
}

resetButton.addEventListener('click', ev => {
  localStorage.setItem("films", JSON.stringify([{
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "year": "2001",
    "runtime": "222",
    "status": "watched",
    "favourite": false,
    "score": "5",
    "date": "2020-02-03",
    "timesWatched": "2"
  }, {
    "title": "Die Hard",
    "year": "1988",
    "runtime": "132",
    "status": "watched",
    "favourite": true,
    "score": "3",
    "date": "2012-03-02",
    "timesWatched": "1"
  }, {
    "title": "Dirty Harry",
    "year": "1971",
    "runtime": "102",
    "status": "watched",
    "favourite": false,
    "score": "4",
    "date": "2022-03-02",
    "timesWatched": "1"
  }, {
    "title": "John Wick",
    "year": "2014",
    "runtime": "111",
    "status": "watched",
    "favourite": false,
    "score": "4",
    "date": "2022-03-02",
    "timesWatched": "1"
  }, {
    "title": "Mad Max",
    "year": "1979",
    "runtime": "201",
    "status": "planned"
  }, {
    "title": "Pirates of the Caribbean At World's End ",
    "year": "2007",
    "runtime": "110",
    "status": "planned"
  }, {
    "title": "Star Trek - The Motion Picture",
    "year": "1979",
    "runtime": "221",
    "status": "planned"
  }, {
    "title": "The Terminator",
    "year": "1984",
    "runtime": "201",
    "status": "planned"
  }, {
    "title": "Batman Begins",
    "year": "2005",
    "runtime": "118",
    "status": "planned"
  }, {
    "title": "The Dark Knight",
    "year": "2008",
    "runtime": "101",
    "status": "planned"
  }, {
    "title": "The Dark Knight Rises",
    "year": "2012",
    "runtime": "201",
    "status": "planned"
  }, {
    "title": "Kill Bill Vol 1",
    "year": "2003",
    "runtime": "201",
    "status": "watched",
    "favourite": false,
    "score": "2",
    "date": "2021-12-08",
    "timesWatched": "1"
  }, {
    "title": "James Bond: No Time to Die",
    "year": "2021",
    "runtime": "163",
    "status": "watched",
    "favourite": false,
    "score": "4",
    "date": "2022-03-02",
    "timesWatched": "1"
  }, {
    "title": "Harry Potter and the Goblet of Fire",
    "year": "2005",
    "runtime": "210",
    "status": "watched",
    "favourite": false,
    "score": "4",
    "date": "2022-03-02",
    "timesWatched": "1"
  }]));
  loadFilms();
});

//create the file if it doesn't exist, and fills it with example data
if (localStorage.getItem("films") === undefined || localStorage.getItem("films") === null) {
  localStorage.setItem("films", JSON.stringify([]));
  console.log("Created films file");
}

loadTheme();
loadFilms();