var midi = null;
var previous = 0;

if (navigator){
    navigator.requestMIDIAccess().then(success, fail);
}else{
    console.alert("No midi for you");
}

function success(midiAccess){
    midi = midiAccess;
    settingUp();
}

function fail(){
    console.log("No midi");
}

function settingUp(){
    var text = "<p> MIDI Input detected: <ul>";
    midi.inputs.forEach(function(input, key){
        text += "<li> input name: " + input.name + "</li>";
        input.onmidimessage = getMidiInput;
    });
    text += "</ul></p>";
    document.getElementById('inputs').innerHTML = text;
}

function clearConsole(){
    document.getElementById('result').innerHTML = "";
}

function getMidiInput(midiInput){
    var text = "";
    var midiData = midiInput.data;
    //Si valuta solo casi in cui manda note on e note off.
    var statusByte = midiData[0];
    var pitch = midiData[1];
    var velocity = midiData[2];
    var timeStamp = midiInput.timeStamp;
    var deltaTime = (timeStamp-previous)/1000;
    previous = timeStamp;
    document.getElementById('result').innerHTML += text;
    var value2nopad = statusByte.toString(2);
    var pad = "00000000";
    var value2 = pad.substring(0, pad.length - value2nopad.length) + value2nopad;
    console.log("value2 " + typeof(value2));
    console.log(typeof(value2nopad));
}