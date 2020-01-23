/*********
Variables!
**********/

var context = null;
/*
//get lowpass slider
var slider = document.getElementById("lowpass");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the lowpass slider value

//on slider glide, vary effects
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	ouptut.innerHTML = this.value;
	//lowPassFilter.frequency = this.value;
}


//get dub delay slider
var dd_slider = document.getElementById("dubdelay");
*/

// Below is keyboard emulation for C4-C5 a-i keys
var emulatedKeys = {
  a: 45,
  z: 47,
  e: 48,
  r: 50,
  t: 52,
  y: 53,
  u: 55,
  i: 57,
}

let freqMax = 20000;
let init = false;
let voice;

var tremolo = new Pizzicato.Effects.Tremolo({
    speed: 7,
    depth: 0.5,
    mix: 1
});

// low pass filter
let lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 200,
    peak: 10
})

var dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.3,
    time: 0.7,
    mix: 0.5,
    cutoff: 400
});

var convolver = new Pizzicato.Effects.Convolver({
    impulse: './impulse/dub_impulse.wav',
    mix: 0.5
});

/*********
Functions
**********/


function midiToFreq(midiNote){
  const freq = Math.pow(2, (midiNote-69)/12)*440;
  return freq;
}

var notePlayed = null;
var down = false;
let keysPressed = {}; //trying to handle multiple keys but it's not working...

// If a keyboard key is pressed, play a Pizzicato sound with effects depending on mouse movements
document.addEventListener("keydown", function(e) {
  if(down) return;
  down = true;
  keysPressed[e.key] = true; //trying to handle multiple keys but it's not working...

  if (emulatedKeys.hasOwnProperty(e.key)) {
    Pizzicato.context.resume();
    console.log(emulatedKeys[e.key] + ' pressed');

    notePlayed = new Pizzicato.Sound({
      source: 'wave', 
      options: {
        type: 'triangle',
        frequency: midiToFreq(emulatedKeys[e.key]),
        volume: 0.3
      }
    });
    notePlayed.addEffect(convolver); 
    notePlayed.addEffect(tremolo);
    notePlayed.addEffect(lowPassFilter);
    //notePlayed.addEffect(dubDelay);
    notePlayed.play();
  }
});

/*
Template.myTemplate.rendered = function(){
	document.getElementById("lowpass").oninput = function() {
	    myFunction();
	};
}

function myFunction() {
   var val = document.getElementById("lowpass").value; //gets the oninput value
   lowPassFilter.frequency = val;
}



var i = 0;
slider.addEventListener("input", function(e) {
	output.innerHTML = this.value;
	lowPassFilter.frequency = e.currentTarget.value;
	//lowPassFilter.frequency = 200 + i;
	i += 100;
	// vary low pass filter on slider axis  
})
*/

// Stop sound when key released
document.addEventListener("keyup", function(e) {
  down = false;
  delete keysPressed; //trying to handle multiple keys but it's not working...

  if (emulatedKeys.hasOwnProperty(e.key)) {
    console.log(emulatedKeys[e.key] + ' released');
    notePlayed.removeEffect(lowPassFilter);	
    notePlayed.removeEffect(tremolo);
    notePlayed.removeEffect(convolver);
    notePlayed.stop();
  }
});

// on mouse move, vary effects parameters functions of Y mouse position

document.body.addEventListener('mousemove', function (event) {
    // vary tremolo speed on X axis
    tremolo.speed = Math.abs((event.pageX / document.body.clientWidth)-0.5) * 20;
    // vary low pass filter on Y axis  
    lowPassFilter.frequency = Math.pow(1-(event.pageY / document.body.clientHeight), 3) * freqMax;
}, false);


// on mouse scroll, vary effects parameters functions 
document.body.addEventListener('wheel', function (event) {
    // vary time of dub delay on up scroll
    const delta = Math.sign(event.deltaY);
    if(delta > 0){
      convolver.mix -= 0.1;
      if(convolver.mix < 0.1){
      	convolver.mix = 0.1;
      }
      console.log('Scroll down ' + convolver.mix);
    }
    else if (delta < 0){
      convolver.mix += 0.1;
      if(convolver.mix > 0.9){
      	convolver.mix = 0.9;
      }
      console.log('Scroll up ' + convolver.mix);
    }

}, false);

// on mouse click, add/remove drum sound? 
document.body.addEventListener('click', function (event) {

}, false);

// on mouse double click, add flanger? 
document.body.addEventListener('dbclick', function (event) {

}, false);