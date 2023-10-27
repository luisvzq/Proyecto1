"use strict";
'use strict'



function buscaTarjeta(indexCard) { 
 fetch("https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json")
     
        
        .then(function (response) {
                return response.json();
            })
        .then(function (data) {              
            
            const quest= document.getElementById("questionContent");
            //console.log(data[indexCard].question);
            quest.textContent=data[indexCard].question;
            const answer1= document.getElementById("ans1");
            //console.log(data[indexCard].answers[0]);
            answer1.textContent=data[indexCard].answers[0];

            const answer2= document.getElementById("ans2");
            //console.log(data[indexCard].answers[1]);
            answer2.textContent=data[indexCard].answers[1];

            const answer3= document.getElementById("ans3");
            //console.log(data[indexCard].answers[2]);
            answer3.textContent=data[indexCard].answers[2];

            const answer4= document.getElementById("ans4");
            //console.log(data[indexCard].answers[3]);
            answer4.textContent=data[indexCard].answers[3];           
            
// -----------------------------------------------------------
            comprobar(data[indexCard]);            
                       
          })
         .catch ((error)=>{console.log(error.message)})
    }




const indiceAleatorioASeguir = [];
let num=0;
for (let i=0; i<500 ;i++){ 
    num = Math.floor(Math.random()* 50);     
    if(!indiceAleatorioASeguir.includes(num)){     
        indiceAleatorioASeguir.push(num);
    }
    //Una vez explicado eliminar esto
    if(indiceAleatorioASeguir.length===50){
        console.log(`Lo lleno al ${i} intento`);
        break;
    }
    }
console.log(indiceAleatorioASeguir);
//Aqui lo que hice es un array para recorrer el objeto JSON, de forma aleatoria y sin repetir objetos "tarjetas". Asi que una vez empiezas el juego este será el orden en que saldrán las preguntas

//Cuando pulsemos Go!! iteraremos este array para seguir el orden

buscaTarjeta(indiceAleatorioASeguir[0]);



//---------------------------------------------------------------------

function comprobar(data) {    
    const {correct}=data;

    const answer1= document.getElementById("ans1");
    const answer2= document.getElementById("ans2");
    const answer3= document.getElementById("ans3");
    const answer4= document.getElementById("ans4");
    
    answer1.addEventListener('click',()=>{
        if(answer1.textContent===correct){
            answer1.style.background="green";
            console.log("Respuesta 1 correcta");
        }else{
            answer1.style.background="red";
            console.log("Respuesta 1 incorrecta");
        }
    });
    
    answer2.addEventListener('click',()=>{
        if(answer2.textContent===correct){
            answer2.style.background="green";
            console.log("Respuesta 2 correcta");
        }else{
            answer2.style.background="red";
            console.log("Respuesta 2 incorrecta");    
        }
    });
    
    answer3.addEventListener('click',()=>{
        if(answer3.textContent===correct){
            answer3.style.background="green";
            console.log("Respuesta 3 correcta");    
        }else{
            answer3.style.background="red";
            console.log("Respuesta 3 incorrecta");
        }
    });

    answer4.addEventListener('click',()=>{
        if(answer4.textContent===correct){
            answer4.style.background="green";
            console.log("Respuesta 4 correcta");
        }else{
            answer4.style.background="red";
            console.log("Respuesta 4 incorrecta");
        }
     }); 
}

//Cuando se selecciona una repuesta no se puede volver a pulsar
//Podemos pasar a la siguiente tarjeta con un boton siguiente
//Asignar una variable puntos para cuando acierte la respuesta