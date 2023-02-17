var midi = null;
var currentOutput;
var n = 3;
var minimumPitch = 21;


if (navigator){
    navigator.requestMIDIAccess().then(success, fail);
}else{
    console.alert("No navigator for you");
}

function success(midiAccess){
    midi = midiAccess;
    settingUp();
}

function fail(){
    console.alert("Connection to midi failed");
}

function settingUp(){
    var txt = "";
    midi.inputs.forEach(function(input){
        txt += "<p> input name: " + input.name + "</p>";
        input.onmidimessage = gettingMidiInput;
    });
    document.getElementById('inputs').innerHTML = txt;

    txt = "";
    midi.outputs.forEach(function(output, key){
        if (txt == ""){
            currentOutput = output;
        }
        txt += "<option value=" + key + ">" + output.name + "</option>";
    });
    console.log(currentOutput);
    document.getElementById('chooseOutput').innerHTML = txt;
}

function changeOutput(value){
    currentOutput.send([176, 123, 0]);
    currentOutput = midi.outputs.get(value);
}

function changeN(value){
    currentOutput.send([176, 120, 0]);
    n= value;
}

function gettingMidiInput(input){
    console.log(input.data[1]);
    var statusByte = input.data[0];
    var note = Math.floor(statusByte/16) 
    if(note == 9 || note == 8){
        let pitch = input.data[1];
        let velocity = input.data[2];
        if(note == 9){
            console.log("note on");
        }else{
            console.log("Note off");
        }
        currentOutput.send(input.data);
        if(pitch - n >= 21){
            currentOutput.send([statusByte, pitch + n, velocity]);
        }else{
            console.log("U outside so no play outside for you");
        }
            
    }
}