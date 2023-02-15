var midi = null;
var counter = 1;

if (navigator){
    navigator.requestMIDIAccess().then(Success, Failed);
}else{
    console.alert("No midi for you");
}

function Success(midiAccess){
    midi = midiAccess;
    settingUp();
}

function Failed(){
    console.log("No midi for you");
}

function settingUp(){
    document.getElementById('esito').innerHTML = "MIDI rilevato e pronto";
    var text ="";
    midi.inputs.forEach(function(input, key){
        text += "<p> Input number: " + counter + "</p><ul>";
        text += "<li> nome: " + input.name + "</li>";
        text += "<li> Id: " + input.id + "</li>";
        text += "<li> produttore: " + input.manufacturer + "</li>";
        text += "<li> version: " + input.version + "</li>";
        text += "<li> tipo: " + input.type + "</li>";
        text += "</ul>";
    });

    document.getElementById('inputResult').innerHTML = text;
}