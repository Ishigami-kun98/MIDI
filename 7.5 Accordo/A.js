var midi = null;
var currentOutput;
const pitch = 48;
const allSoundOff = [0xB0, 120, 0];
var currentAchord = 1;

if (navigator){
    navigator.requestMIDIAccess().then(success, fail);
}else{
    console.alert("No navigator");
}

function success(midiAccess){
    midi = midiAccess;
    settingUp();
}

function fail(){
    console.alert("Midi non supported");
}

function settingUp(){
    var text = "";
    midi.outputs.forEach(function(output, key){
        if (text == ""){
            currentOutput = output;
        }
        text += "<option value="+key+">" + output.name + "</option>";
        

    });
    console.log(currentOutput);
    document.getElementById('chooseOutput').innerHTML = text;

    text = "";
    for (var i = 1; i <= 8; i++){
        text += "<option value="+i+">" + i + "</option>";
    }
    document.getElementById('chooseNumber').innerHTML = text;
}

function changeNumber(value){
    playAccord(false);

    currentAchord = value;
}

function changeOutput(value){
    playAccord(false);

    currentOutput = midi.outputs.get(value);
}

function ProgramChange(value){
    playAccord(false);
    var PC = [0xC0, value];
    currentOutput.send(PC);
}

function playAccord(isToPlay){
    if(isToPlay){
        if(pitch + (currentAchord * 3) < 127)
            for(var i = 0; i < currentAchord; i++){
                let noteOn = [0x90, pitch + (i*3), 90];
                let noteOff = [0x80, pitch + (i*3), 90];
                currentOutput.send(noteOn);
                currentOutput.send(noteOff, window.performance.now() + 1000);
            }
        else{
            console.alert("The value is out of range");
        }
    }else{
        var allNotesOff = [176, 123, 0];
        currentOutput.send(allNotesOff);
    }
}