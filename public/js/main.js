// ---------------------------LES VARIABLES
let container = document.querySelector(".container");
let containerJeux = document.querySelector(".containerJeux");

let win = document.querySelector(".win");
let loose = document.querySelector(".loose");
let draw = document.querySelector(".draw");
let retry = document.querySelector(".retry");
let score = document.querySelector(".score");
let leScore = 0;

let blocsLigne1 = document.querySelectorAll(".blocLigne1");
let blocsLigne2 = document.querySelectorAll(".blocLigne2");
let blocsLigne3 = document.querySelectorAll(".blocLigne3");
let toutLesBlocs = Array.from(document.querySelectorAll(".bloc"));

let Ligne1 = [1, 2, 3];
let Ligne2 = [4, 5, 6];
let Ligne3 = [7, 8, 9];
let tourjouer = 0;

//------------------------------- FONCTION POUR DESACTIVER LE CLIC SUR L'ECRAN
function disableClicks() {
  const overlay = document.getElementById("overlay");
  overlay.style.pointerEvents = "auto"; // Les clics ne passent plus à travers
}

//--------------------------------- FONCTION POUR ACTIVER LE CLIC SUR L'ECRAN
function enableClicks() {
  const overlay = document.getElementById("overlay");
  overlay.style.pointerEvents = "none"; // Les clics passent à travers
}

//----------------------------- FONCTION POUR LES 4 SECONDES ENTRE CHAQUE TOURS
function disableClicksFor4Seconds() {
  disableClicks();

  setTimeout(function () {
    // Réactive les clics après 4 secondes
    enableClicks();
  }, 2001);
}

//----------------------------- FONCTION POUR ENLEVER ELEMENT DU TABLEAU
function enleverTab(x) {
  toutLesBlocs = toutLesBlocs.filter((element) => element !== x);
}
//--------------------------------- FONCTION POUR RESET LE JEU
function resetGame() {
  Ligne1 = [1, 2, 3];
  Ligne2 = [4, 5, 6];
  Ligne3 = [7, 8, 9];
  tourjouer = 0;
  containerJeux.style.display = "flex";
  loose.style.display = "none";
  win.style.display = "none";
  draw.style.display = "none";
  toutLesBlocs.forEach((element, index) => {
    element.classList.remove("FaisCroix");
    element.classList.remove("FaisRond");
    element.classList.add("none");
  });
  blocsLigne1.forEach((element, i) => {
    element.classList.remove("FaisCroix");
    element.classList.remove("FaisRond");
    element.classList.add("none");
    element.innerHTML = Ligne1[i].toString();
    console.log(element);
  });
  blocsLigne2.forEach((element, i) => {
    element.classList.remove("FaisCroix");
    element.classList.remove("FaisRond");
    element.classList.add("none");
    element.innerHTML = Ligne2[i].toString();

    console.log(element);
  });
  blocsLigne3.forEach((element, i) => {
    element.classList.remove("FaisCroix");
    element.classList.remove("FaisRond");
    element.classList.add("none");
    element.innerHTML = Ligne3[i].toString();
    console.log(element);
  });
  toutLesBlocs = Array.from(document.querySelectorAll(".bloc"));
}

//------------------------------------ FONCTION POUR ENLEVER LA CASE QUE LADVERSAIRE AS CHOISI
function chiffreAdverse(x) {
  if (x === 1 || x === 2 || x === 3) {
    Ligne1.forEach((element, index) => {
      if (element === x) {
        Ligne1[index] = false;
        console.log(`Ligne 1 : ${Ligne1} le tour jouer : ${tourjouer}`);
      }
    });
  } else if (x === 4 || x === 5 || x === 6) {
    Ligne2.forEach((element, index) => {
      if (element === x) {
        Ligne2[index] = false;
        console.log(`Ligne 2 : ${Ligne2}`);
      }
    });
  } else {
    Ligne3.forEach((element, index) => {
      if (element === x) {
        Ligne3[index] = false;
        console.log(`Ligne 3: ${Ligne3}`);
      }
    });
  }
}

//---------------------------------- FONCTION WIN OU LOOSE

function winLoose() {
  // Vérification en horizontal (lignes)
  setTimeout(() => {
    for (const ligne of [Ligne1, Ligne2, Ligne3]) {
      if (ligne.every((element) => element === true)) {
        //  victoire en horizontal
        score.innerHTML = leScore += 1;
        containerJeux.style.display = "none";
        win.style.display = "block";
        return;
      }
      if (ligne.every((element) => element === false)) {
        //  défaite en horizontal
        containerJeux.style.display = "none";
        loose.style.display = "block";
        return;
      }
    }

    // Vérification en vertical (colonnes)
    for (let colonne = 0; colonne < 3; colonne++) {
      const colonneElements = [
        Ligne1[colonne],
        Ligne2[colonne],
        Ligne3[colonne],
      ];
      if (colonneElements.every((element) => element === true)) {
        //  victoire en vertical
        score.innerHTML = leScore += 1;
        containerJeux.style.display = "none";
        win.style.display = "block";

        return;
      }
      if (colonneElements.every((element) => element === false)) {
        //  défaite en vertical
        containerJeux.style.display = "none";
        loose.style.display = "block";
        return;
      }
    }

    // Vérification en diagonale de haut à droite à bas à gauche
    const diagonale1 = [Ligne1[0], Ligne2[1], Ligne3[2]];
    if (diagonale1.every((element) => element === true)) {
      //  victoire en diagonale (haut à droite à bas à gauche)

      score.innerHTML = leScore += 1;
      containerJeux.style.display = "none";
      win.style.display = "block";
      return;
    }
    if (diagonale1.every((element) => element === false)) {
      //  défaite en diagonale (haut à droite à bas à gauche)
      containerJeux.style.display = "none";
      loose.style.display = "block";
      return;
    }

    // Vérification en diagonale de haut à gauche à bas à droite
    const diagonale2 = [Ligne1[2], Ligne2[1], Ligne3[0]];
    if (diagonale2.every((element) => element === true)) {
      //  victoire en diagonale (haut à gauche à bas à droite)

      score.innerHTML = leScore += 1;
      containerJeux.style.display = "none";
      win.style.display = "block";
      return;
    }
    if (diagonale2.every((element) => element === false)) {
      //  défaite en diagonale (haut à gauche à bas à droite)
      containerJeux.style.display = "none";
      loose.style.display = "block";
      return;
    }
    if (tourjouer == 5) {
      containerJeux.style.display = "none";
      draw.style.display = "block";
    }
  }, 2000);
}

//______________________________________________ REESAYER LE JEU
retry.addEventListener("click", function () {
  resetGame();
});

// ________________________________________________________LOGIQUE DU JEU _________________________________________________________

blocsLigne1.forEach((element) => {
  element.addEventListener("click", function () {
    tourjouer++;
    console.log(tourjouer);
    if (element.className.includes("none")) {
      number = parseInt(element.textContent);
      console.log(number);
      element.innerHTML = '<div class="cross"></div>';
      element.classList.add("FaisCroix");
      element.classList.remove("none");
      Ligne1.forEach((element, index) => {
        if (element === number) {
          Ligne1[index] = true;
          console.log(Ligne1);
        }
      });
      if (tourjouer == 5) {
        winLoose();
      }
      enleverTab(element);
      disableClicksFor4Seconds();

      let caseRandom =
        toutLesBlocs[Math.floor(Math.random() * toutLesBlocs.length)];
      if (caseRandom && caseRandom.className.includes("none")) {
        let numberAdverse;
        numberAdverse = parseInt(caseRandom.textContent);
        setTimeout(() => {
          caseRandom.innerHTML = '<div class="circle"></div>';
        }, 200);
        caseRandom.classList.add("FaisRond");
        caseRandom.classList.remove("none");
        chiffreAdverse(numberAdverse);
      }
      enleverTab(caseRandom);
      winLoose();
      console.log(`Ligne 1 ${Ligne1}`);
    }
  });
});

blocsLigne2.forEach((element) => {
  element.addEventListener("click", function () {
    tourjouer++;
    console.log(tourjouer);
    if (element.className.includes("none")) {
      number = parseInt(element.textContent);
      element.innerHTML = '<div class="cross"></div>';
      element.classList.add("FaisCroix");
      element.classList.remove("none");
      Ligne2.forEach((element, index) => {
        if (element === number) {
          Ligne2[index] = true;
          console.log(`Ligne 2 : ${Ligne2}`);
        }
      });
      if (tourjouer == 5) {
        winLoose();
      }
      enleverTab(element);
      disableClicksFor4Seconds();
      let caseRandom =
        toutLesBlocs[Math.floor(Math.random() * toutLesBlocs.length)];
      if (caseRandom && caseRandom.className.includes("none")) {
        let numberAdverse;
        numberAdverse = parseInt(caseRandom.textContent);
        setTimeout(() => {
          caseRandom.innerHTML = '<div class="circle"></div>';
        }, 200);
        caseRandom.classList.add("FaisRond");
        caseRandom.classList.remove("none");
        chiffreAdverse(numberAdverse);
      }
      winLoose();
      enleverTab(caseRandom);
    }
  });
});

blocsLigne3.forEach((element) => {
  element.addEventListener("click", function () {
    tourjouer++;
    console.log(tourjouer);
    if (element.className.includes("none")) {
      number = parseInt(element.textContent);
      element.innerHTML = '<div class="cross"></div>';
      element.classList.add("FaisCroix");
      element.classList.remove("none");
      Ligne3.forEach((element, index) => {
        if (element === number) {
          Ligne3[index] = true;
          console.log(`Ligne 3 : ${Ligne3}`);
        }
      });
      //   POUR LE DRAW OBLIGER DE RAPPELER LA FONCTION
      if (tourjouer == 5) {
        winLoose();
      }
      enleverTab(element);
      disableClicksFor4Seconds();

      let caseRandom =
        toutLesBlocs[Math.floor(Math.random() * toutLesBlocs.length)];
      if (caseRandom && caseRandom.className.includes("none")) {
        let numberAdverse;
        numberAdverse = parseInt(caseRandom.textContent);
        setTimeout(() => {
          caseRandom.innerHTML = '<div class="circle"></div>';
        }, 200);
        caseRandom.classList.add("FaisRond");
        caseRandom.classList.remove("none");
        chiffreAdverse(numberAdverse);
      }
      winLoose();
      enleverTab(caseRandom);
    }
  });
});
