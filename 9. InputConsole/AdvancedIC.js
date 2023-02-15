var midi = null;
var previous = 0;
var currentOutput;

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
    midi.inputs.forEach(function(input){
        text += "<li> input name: " + input.name + "</li>";
        input.onmidimessage = getMidiInput;
    });
    text += "</ul></p>";
    document.getElementById('inputs').innerHTML = text;
    var txt = "";
    midi.outputs.forEach(function(output, key){
        if (txt){
            currentOutput = output;
        }
        txt += "<option value="+key+">" + output.name + "</option>";
    });

    document.getElementById('chooseOutput').innerHTML = txt;
}

function changeOutput(value){
    currentOutput = midi.outputs.get(value);
}

function clearConsole(){
    document.getElementById('result').innerHTML = "";
}



function getMidiInput(midiInput){
    var text = "<p>";
    var midiData = midiInput.data;
    //Si valuta solo casi in cui manda note on e note off.
    var timeStamp = midiInput.timeStamp;
    var deltaTime = (timeStamp-previous)/1000;
    previous = timeStamp;
    

    for(var i = 0; i < midiData.length; i++){
        if (i == 0){
            //Status byte
            var firstPart = Math.floor(midiData[i]/16);
            var secondPart = midiData[i] % 16;
            var note = false;
            switch (firstPart) {
                case 9:
                    note = true;
                    text += "Note on ";
                    break;
                case 8 :
                    note = true;
                    text += "Note off ";
                    break;
                default:
                    break;
            }
        }else{
            if (i == 1){
                if (note){
                    text += "Pitch " + midiData[i];
                }
            }
            if (i == 2){
                if (note){
                    text += " Velocity " + midiData[i];
                }
            }
        }
    }
    if (note){
        currentOutput.send([midiData[0], midiData[1], midiData[2]]);
    }
    text += "</p>";
    document.getElementById('result').innerHTML += text;
}