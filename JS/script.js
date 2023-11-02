"use strict";

async function main() {
  const response = await fetch(
    "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
  );

  //-----------------------------------------------------Algoritmo orden aleatorio
  function shuffle(array) {
    let m = array.length,
      obj,
      rnd;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      rnd = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      obj = array[m];
      array[m] = array[rnd];
      array[rnd] = obj;
    }

    return array;
  }
  const dataQuiz = await response.json();
  shuffle(dataQuiz);
  //------------------------------------------------------------------Fin algoritmo

  let answer1 = document.getElementById("ans1");
  let answer2 = document.getElementById("ans2");
  let answer3 = document.getElementById("ans3");
  let answer4 = document.getElementById("ans4");
  let quest = document.getElementById("questionContent");
  let answerElements = [answer1, answer2, answer3, answer4];
  let scores = 0;

  let boxScores = document.getElementById("scores");

  console.log("Array aleatorio", dataQuiz);
  let indexCard = 47;

  //Funcion para mostrar cada tarjeta en pantalla
  function showCard(card) {
    boxScores.textContent = `Your score: ${scores} points`;
    quest.textContent = card.question;
    answerElements.forEach((element, index = 0) => {
      element.textContent = card.answers[index];
      index++;
    });
    answerElements.forEach((element) => {
      element.addEventListener("click", handleAnswerClick);
    });
    console.log(`CORRECTA: ${dataQuiz[indexCard].correct}`);
  }

  showCard(dataQuiz[indexCard]);
  console.log("Siguiente pregunta: ", dataQuiz[indexCard]);

  // function check() {
  //   let btnMute = document.getElementById("mute");
  //   let finalScore = document.getElementById("finalScore");

  //   // console.log("La correcta es:", correct);

  //   ;
  // } //final del check

  // check(dataQuiz[indexCard]);

  function handleAnswerClick(event) {
    const { correct } = dataQuiz[indexCard];
    console.log(`la respuesta es ${correct}`);
    // console.log(card.target);
    const answerElement = event.currentTarget;
    let audioMain = document.getElementById("mainAudio");
    let audioQuest = document.getElementById("audioQuest");
    let audioCount = document.getElementById("audioCount");
    const audio = [audioQuest, audioMain, audioCount];
    audio[1].play();
    let paragraphSolution = document.getElementById("solution");
    console.log("patata");
    disable();
    answerElement.style.backgroundColor = "orange";
    audio[1].pause();

    setTimeout(() => {
      if (answerElement.textContent === correct) {
        answerElement.style.backgroundColor = "green";
        paragraphSolution.textContent = "Correct! 👍";
        scores += 5;
        audio[0].play();

        setTimeout(() => {
          audio[1].play();
        }, 2500);
      } else {
        answerElement.style.backgroundColor = "red";
        paragraphSolution.textContent = "Incorrect! 👎";
        answerElements.find((answerCorrect) => {
          if (answerCorrect.textContent === correct) {
            answerCorrect.style.animation = "flicker 3s";
            setTimeout(() => {
              answerCorrect.style.backgroundColor = "green";
              answerCorrect.style.animation = "none";
            }, 2000);
          }
        });

        audio[0].play();

        setTimeout(() => {
          audio[1].play();
        }, 2500);
      }

      setTimeout(() => {
        indexCard++;
        if (indexCard === 50) {
          let card = document.querySelector("ul");
          card.remove();
          let finalScore = document.createElement("h3");
          finalScore.textContent = `Your final score is ${scores}`;
          document.getElementById("card").prepend(finalScore);

          console.log();
        } else {
          showCard(dataQuiz[indexCard]);
        }

        console.log("la siguiente es:", indexCard);

        enable();
        // activeCounter();
        // check(dataQuiz[indexCard]);
        // stopCounter();
      }, 2000);
    }, 2000);
  }

  // function nextQuestion() {
  //     // setTimeout(() => {
  //       showCard(dataQuiz[indexCard]);
  //       indexCard++;
  //       console.log("la siguiente es:", indexCard);

  //       enable();
  //       // activeCounter();
  //       check(dataQuiz[indexCard]);
  //       // stopCounter();
  //     // }, 2000);
  //   }

  //Función para deshabilitar los botones una vez se ha seleccionado una respuesta
  function disable() {
    console.log("Deshabilita botones");

    for (let element of answerElements) {
      element.style.color = "grey";
      element.setAttribute("disabled", "true");
    }
  }

  //Función para habilitar los botones una vez se ha cambiado la tajeta
  function enable() {
    for (let element of answerElements) {
      element.style.color = "black";
      element.removeAttribute("disabled");
      element.style.backgroundColor = "white";
    }
  }
} //Final function main

main();
