var midi = null;
var selectedOut = null;

if (navigator){
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}else{
    console.alert("No navigator for you");
}

function onMIDISuccess(Failuire){
    midi = Failuire;
    document.getElementById("esito").innerHTML = "There is midi for you";
    setup();
}

function onMIDIFailure (){
    console.log("You are a failure");
}

function setup(){
    var t;
    midi.outputs.forEach(function(output, key){
        t += "<option value="+ key + ">" + output.name + "</option>";
        selectedOut = output;
    });
    document.getElementById("chooseOutput").innerHTML = t;
    ProgramChange(0);
}

function ProgramChange(number){
    console.log("Changing program " + number);
    var allNotesOffMsg = [176, 123, 0];
    var PC = [0xC0, number];
    selectedOut.send(allNotesOffMsg);
    selectedOut.send(PC);
}

function outputChange(value){
    console.log("Changing output " + value);
    var allNotesOff = [176, 123, 0];
    selectedOut.send(allNotesOff);
    selectedOut = midi.outputs.get(value);
}

function playNote(div){

    var pitch = div.id.substring(3, 5)
    var noteOn = [0x90, pitch, 40];
    selectedOut.send(noteOn);
    document.getElementById(div.id).style.backgroundColor = "orangered";
}
function stopNote(div){
    console.log("stopNOte " + div);
    var pitch = div.id.substring(3, 5)
    var noteOff = [0x80, pitch, 0];
    selectedOut.send(noteOff);
    if (pitch % 12 == 1 || pitch % 12 == 3 || pitch % 12 == 6 || pitch % 12 == 8 || pitch % 12 == 10)
		document.getElementById(div.id).style.backgroundColor = "black";
	else
		document.getElementById(div.id).style.backgroundColor = "ivory";
}
