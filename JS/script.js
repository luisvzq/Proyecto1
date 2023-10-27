"use strict";
'use strict'



function buscaTarjeta(indexCard) { 
 fetch("https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json")
     
        
        .then(function (response) {
                return response.json();
            })
        .then(function (data) {              
             console.log(data[indexCard]);
            const quest= document.getElementById("questionContent");
            console.log(data[indexCard].question);
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
                       
            });
    }

    
    // const arrayNumero=[0];

    // function generarNum() {
    //     const cardRandom= Math.floor(Math.random()* 49);
    //     console.log(cardRandom);
        
    //     while(arrayNumero.length<50)
    //     if(!arrayNumero.includes(cardRandom)){
    //         arrayNumero.push(cardRandom);
    
    //         console.log(arrayNumero); 
    //         return cardRandom;

    //     }else{
    //         generarNum();
    //     }        
    //     if(arrayNumero.length===50){
    //         return
    //     } 
           
    // }
    
    

    
    
 buscaTarjeta(generarNum());
 buscaTarjeta(generarNum());

 buscaTarjeta(generarNum());

 buscaTarjeta(generarNum());

 buscaTarjeta(generarNum());




    