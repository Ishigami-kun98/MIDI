var midi = null;
var selectedOutput = null;

if(navigator){
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
}else{
    console.alert("No midi for you");
}

function onMidiSuccess(youAreAFailure){
    midi = youAreAFailure;
    console.log("Successfuly connected to MIDI");
    basicSetup();
}

function onMidiFailure(){
    console.log("You are a failure");
}

function basicSetup(){
    var text;
    midi.outputs.forEach(function (input, key){
        text += "<option value="+key+">" + input.name + "</option>";
        changeOutput(key);
    });
    document.getElementById('chooseOutput').innerHTML = text;
}

function changeOutput(value){
    selectedOutput = midi.outputs.get(value);
    selectedOutput.send([0xC0, 13]);
}

function sendNote(pitch){
    console.log(pitch);
    var noteOn = [0x90, pitch, 40];
    var noteOff = [0x90, pitch, 0];
    selectedOutput.send(noteOn);
    selectedOutput.send(noteOff);
    document.getElementById('pitch').innerHTML = pitch;
}