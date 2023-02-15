var midi = null;
var eventCounter = 0;
var pitchCounter = [0,0,0,0,0,0,0,0,0,0,0,0];

if (navigator){
    navigator.requestMIDIAccess().then(success, fail);
}else{
    console.alert("No midi for you");
}

function success(midi){
    midi.inputs.forEach(function(input){
        input.onmidimessage = getMidiMsg;
    });
}

function fail(){
    console.log("No midi for you");
}

function getMidiMsg(midiMsg){
    
    if (Math.floor(midiMsg.data[0] / 16) == 9){
        console.log("noteon");
        var pitch = midiMsg.data[1]%12;
        eventCounter++;
        pitchCounter[pitch]++;
        for(var i = 0; i < pitchCounter.length; i++){
            var currentBar = document.getElementById("pc" + i);
            var height = (pitchCounter[i]/eventCounter) * 100;
            currentBar.style.height = height + "vh";
            if (pitchCounter[i] > 0)
                currentBar.innerHTML = pitchCounter[i] + " (" + height.toFixed(2) + "%)";
        }
    }
}