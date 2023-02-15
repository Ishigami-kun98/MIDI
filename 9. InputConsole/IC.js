var midi = null;

if (navigator){
    navigator.requestMIDIAccess().then(Success, Fail);
}else{
    console.alert("No navigator for you");
}

function Success(access){
    midi = access;
    settingUp();
}

function Fail(){
    console.log("No midi connection for you");
}

function settingUp(){
    var text = "";
    midi.inputs.forEach(function(input, key){
        text += "<li> input name: " + input.name + "</li>";
        input.onmidimessage = getMIDIMessage;
    });

    document.getElementById('inputs').innerHTML = text;
}

function resetMsg(){
    document.getElementById('results').innerHTML = "Here's the result";
}

function getMIDIMessage(midiMessage){
    var text = "";
    var input = midiMessage.data;
    console.log(midiMessage);
    text = "<li> msg midi is: " + input + "  time stamp is: "+midiMessage.timeStamp +"</li>";
    document.getElementById('results').innerHTML += text;
}