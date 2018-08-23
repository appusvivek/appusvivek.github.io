
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);

// Custom code for game 
window.addEventListener('load',init);

const levels ={
    easy:5,
    medium:3,
    hard:2
}

const currentLevel = levels.easy;

//Globals
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    "geeks", 
    "for", 
    "geeks", 
    "a", 
    "portal",
    "to", 
    "learn", 
    "can",
    "be", 
    "computer", 
    "science", 
    "zoom", 
    "yup", 
    "fire", 
    "in", 
    "be", 
    "data"
];

//Initialize 

function init(){
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    wordInput.addEventListener('input', startMatch);
    // Call countdown
    setInterval(countdown, 1000);
    setInterval(checkstatus, 50);
}

function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if(score === -1){
        scoreDisplay.innerHTML = 0; 
    }else{
        scoreDisplay.innerHTML = score;
    }
    
}

function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct';
        return true;
    }else{
        message.innerHTML = '';
        return false;
    }
}

//Pick and show random word
function showWord(words){
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];

}

function countdown(){
    if(time > 0){
        time--;
    }else if(time === 0){
        isPlaying = false;
    }

    timeDisplay.innerHTML = time;
}

function checkstatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over';
        score = -1;
    }
}
// Custom code ends here
