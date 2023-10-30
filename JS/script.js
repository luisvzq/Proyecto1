"use strict";
//Variables globales
let audio = document.getElementById("audioQuest");
let paragraphSolution = document.getElementById("solution");
let answer1 = document.getElementById("ans1");
let answer2 = document.getElementById("ans2");
let answer3 = document.getElementById("ans3");
let answer4 = document.getElementById("ans4");
let quest = document.getElementById("questionContent");
// let go = document.getElementById("btnGo");
const buttonNext = document.getElementById("botonPruebaNext");
let scores = 0;
let boxScores = document.getElementById("scores");
let indexCard = 0;
const indiceAleatorioASeguir = [];

//Obtenemos un array con 50 numeros ordenados de forma aleatoria, y sin repetirse. Este será el orden que seguirá el jugador
//-------------------------------------------------------------------------
let num = 0;
for (let i = 0; i < 500; i++) {
  num = Math.floor(Math.random() * 50);
  if (!indiceAleatorioASeguir.includes(num)) {
    indiceAleatorioASeguir.push(num);
  }
}
console.log(indiceAleatorioASeguir);

getCard(indiceAleatorioASeguir[indexCard]);
//------------------------------------------------------------------------

/*
Función para llamar a la API. 
  Nos traerá la tarjeta elegida por el orden aleatorio
  Mostrará el resultado por pantalla
  Comprobará el resultado de la eleccion
*/
function getCard(numCard) {
  fetch(
    "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(numCard);
      if (answer1) {
        showCard(data[numCard]);
        check(data[numCard]);
      }
    })

    .catch((error) => {
      console.error(error.message);
    });
}

//Funcion para mostrar cada tarjeta en pantalla
function showCard(card) {
  console.log(card);
  boxScores.textContent = ` Your score: ${scores} points`;
  quest.textContent = card.question;
  answer1.textContent = card.answers[0];
  answer2.textContent = card.answers[1];
  answer3.textContent = card.answers[2];
  answer4.textContent = card.answers[3];
  enable();
}

function check(card) {
  const { correct } = card;
  console.log("La correcta es:", correct);

  function handleAnswerClick(answerElement) {
    disable();
    answerElement.style.background = "orange";
    setTimeout(() => {
      if (answerElement.textContent === correct) {
        answerElement.style.background = "green";
        paragraphSolution.textContent = "Correct! 👍";
        scores += 5;
        audio.play();
        // nextQuestion();
      } else {
        answerElement.style.background = "red";
        paragraphSolution.textContent = "Incorrect! 👎";
        audio.play();
        // nextQuestion();
      }
    }, 2000);
  }

  const answerElements = [answer1, answer2, answer3, answer4];

  answerElements.forEach((answerElement) => {
    answerElement.addEventListener("click", () => {
      handleAnswerClick(answerElement);
    });
  });
}
// function nextQuestion() {
//   setTimeout(() => {
//     indexCard++;
//     // console.log("siguiente", indiceAleatorioASeguir[indexCard]);
//     getCard(indiceAleatorioASeguir[indexCard]);
//     stopCounter();
//   }, 2000);
// }
//Función con un botón Next para pasar a otra tarjeta

if (buttonNext) {
  //con este if, hace el event si le llega el valor
  buttonNext.addEventListener("click", function () {
    indexCard++;
    if (indexCard === 49) {
      window.location.assign("finalScores.html");
    }

    console.log("siguiente", indiceAleatorioASeguir[indexCard]);
    getCard(indiceAleatorioASeguir[indexCard]);
    stopCounter();
  });
}

// // Función con un temporizador para pasar a otra tarjeta
// function timer() {
//   setTimeout(()=>{
//   indexCard++;
//     console.log("siguiente",indiceAleatorioASeguir[indexCard]);
//     getCard(indiceAleatorioASeguir[indexCard]);
//     enable();
//   },3500);
//   }

//Función para deshabilitar los botones una vez se ha seleccionado una respuesta
function disable() {
  answer1.setAttribute("disabled", "true");
  answer2.setAttribute("disabled", "true");
  answer3.setAttribute("disabled", "true");
  answer4.setAttribute("disabled", "true");
  clearInterval(nIntervId);
}

//Función para habilitar los botones una vez se ha cambiado la tajeta
function enable() {
  answer1.removeAttribute("disabled");
  answer2.removeAttribute("disabled");
  answer3.removeAttribute("disabled");
  answer4.removeAttribute("disabled");

  answer1.style.backgroundColor = "white";
  answer2.style.backgroundColor = "white";
  answer3.style.backgroundColor = "white";
  answer4.style.backgroundColor = "white";
  activeCounter();
}

// Cuenta atrás-----------------------------------------------------------------------

let nIntervId;
const boxCounter = document.getElementById("solution"); //Aqui el parrafo donde se mostrará
function activeCounter() {
  let numcounter = 10;
  // comprobar si ya se ha configurado un intervalo
  if (!nIntervId) {
    nIntervId = setInterval(() => {
      boxCounter.textContent = numcounter;
      numcounter--;
      if (numcounter < 0) {
        clearInterval(nIntervId);
        boxCounter.textContent = "El tiempo se ha agotado";
        disable();
        // nextQuestion();
      }
    }, 1000);
  }
}

function stopCounter() {
  clearInterval(nIntervId);
  // liberar nuestro inervalId de la variable
  nIntervId = null;
}
// ----------------------------------------------------------------------------------------
