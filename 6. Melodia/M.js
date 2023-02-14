var midi = null;
var selectedOutput = null;
var list = Array();
var current = 0;
var mytimer;

if (navigator){
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFails);
}else
{console.log("No navigator for you");}

function onMidiSuccess(failure){
    midi = failure;
    document.getElementById('logger').innerHTML = "MIDI ready for you";
    setup();
}
function onMidiFails(){
    console.alert("No midi for you");
}
function insertNotes(pitch, time){
    list.push([pitch,time]);
    if (document.getElementById("MelodyList").innerHTML == "Empty for now")
        document.getElementById("MelodyList").innerHTML = "pitch " + pitch + "[" + time +"]: ";
    else{
        document.getElementById("MelodyList").innerHTML += "pitch " + pitch + "[" + time +"]: ";
    }
}
function playMelody(){
    console.log("before " + mytimer)
    if (current < list.length){
        var allNotesOff = [176, 123, 0];
        selectedOutput.send(allNotesOff);
        var pitch = list[current][0];
        selectedOutput.send([0x90, pitch, 90]);
        clearInterval(mytimer);
        console.log("after clear " + mytimer);
        mytimer = setInterval(playMelody, list[current][1]);
        current += 1;
    }else{
        stopMelody();
    }
}
function stopMelody(){
    var allNotesOff = [176, 123, 0];
    selectedOutput.send(allNotesOff);
    clearInterval(mytimer);
    current = 0;
}
function emptyList(){
    list = new Array();
    current += 1;
    document.getElementById("MelodyList").innerHTML = "Empty for now";
}
function changeOutput(value){
    var allNotesOff = [176, 123, 0];
    selectedOutput.send(allNotesOff);
    selectedOutput = midi.outputs.get(value);
}
function setup(){
    var txt;
    midi.outputs.forEach(function(output, key){
        txt += '<option value='+key+'>'+output.name+"</option>";
        selectedOutput = output;
    });
    document.getElementById('chooseOutput').innerHTML = txt;
}

document.addEventListener("visibilitychange", function() {
    stopMelody();
});