/*********
Variables!
**********/

var context = null;

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

// ping pong delay
let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5
})

// low pass filter
let lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 200,
    peak: 10
})

// high pass filter
let highPassFilter = new Pizzicato.Effects.HighPassFilter({
    frequency: 10,
    peak: 1
});

var dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.6,
    time: 0.7,
    mix: 0.5,
    cutoff: 700
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
        frequency: midiToFreq(emulatedKeys[e.key])
      }
    });
    notePlayed.addEffect(convolver); 
    notePlayed.addEffect(lowPassFilter);
    notePlayed.addEffect(dubDelay);
    notePlayed.play();
    
  }
});

// Stop sound when key released
document.addEventListener("keyup", function(e) {
  down = false;
  delete keysPressed; //trying to handle multiple keys but it's not working...

  if (emulatedKeys.hasOwnProperty(e.key)) {
    console.log(emulatedKeys[e.key] + ' released');
    notePlayed.stop();
  }
});

// on mouse move, vary effects parameters functions of Y mouse position
document.body.addEventListener('mousemove', function (event) {
    // vary dub delay on X axis
    dubDelay.time = event.pageX / document.body.clientWidth;
    // vary low pass filter on Y axis  
    lowPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;
}, false);

// on mouse scroll, vary effects parameters functions 
document.body.addEventListener('wheel', function (event) {
    // vary time of dub delay on up scroll
    const delta = Math.sign(event.deltaY);
    if(delta > 0 && convolver.mix > 0.1){
      convolver.mix -= 0.1;
      console.log('Scroll down ' + convolver.mix);
    }
    else if (convolver.mix < 0.9 && delta < 0){
      convolver.mix += 0.1;
      console.log('Scroll up ' + convolver.mix);
    }

}, false);

// on mouse click, add/remove drum sound? 
document.body.addEventListener('click', function (event) {

}, false);

// on mouse double click, add flanger? 
document.body.addEventListener('dbclick', function (event) {

}, false);