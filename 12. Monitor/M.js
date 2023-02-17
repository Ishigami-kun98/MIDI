var midi = null;
var currentOutput;
var channel = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var type = [0,0,0,0,0,0,0];
var typeName = ["NoteOn", "Noteoff", "Polyphonic aftertouch", "Channel Pressure", "Program change", "ControlChange", "PitchBendChange"];

if (navigator){
    navigator.requestMIDIAccess().then(success, fail);
}else{
    console.alert("No midi");
}

function success(midiAccess){
    midi = midiAccess;
    midiAccess.inputs.forEach(function(input, key){
        input.onmidimessage = gettingMIDIMessage;
    });
    settingUp();
}

function fail(){
    console.alert("Failed to use midi");
}

function settingUp(){
    var txt = "";
    midi.outputs.forEach(function(output, key){
        if(txt == ""){
            currentOutput = output;
        }
        txt += "<option value="+key+">"+output.name+"</option>";
    });

    document.getElementById('chooseOutput').innerHTML = txt;
    txt = "Type msg :"
    for (var i = 0; i < type.length; i++){
        txt += "<p> " + typeName[i] + ": " + type[i] + "</p>";
    }
    document.getElementById('result1').innerHTML = txt;
    txt = "Channel msg :";
    for (var i = 0; i < channel.length; i++){
        txt += "<p> channel " + (i+1) + ": " + channel[i] + "</p>"; 
    }
    document.getElementById('result2').innerHTML = txt;
}

function gettingMIDIMessage(midiMsg){
    var input = midiMsg.data;
    var firstNipple = Math.floor(input[0]/16);
    var secondNipple = input[0]%16;
    console.log(secondNipple);
    channel[secondNipple]++;
    switch (firstNipple) {
        case 9:
            type[0]++;
            break;
        case 8:
            type[1]++;
            break;
        case 10:
            type[2]++;
            break;
        case 13:
            type[3]++;
            break;
        case 12:
            type[4]++;
            break;
        case 11:
            type[5]++;
            break;
        case 14:
            type[6]++;
            break;
        default:
            break;
    }
    var txt = "Type msg :"
    for (var i = 0; i < type.length; i++){
        txt += "<p> " + typeName[i] + ": " + type[i] + "</p>";
    }
    document.getElementById('result1').innerHTML = txt;

    txt = "Channel msg :";
    for (var i = 0; i < channel.length; i++){
        txt += "<p> channel " + (i+1) + ": " + channel[i] + "</p>"; 
    }
    document.getElementById('result2').innerHTML = txt;
}

function changeOutput(value){
    currentOutput = midi.outputs.get(value);
}