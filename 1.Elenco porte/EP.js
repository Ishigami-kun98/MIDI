var midi = null

if(navigator){
    navigator.requestMIDIAccess().then(onMIDISuccess, onMidiFailure);
}else{
    console.log("No MIDI For You");
}

function onMIDISuccess(midiAccess){
    midi = midiAccess;
    console.log("There is MIDI For you");
    listAllInputAndOutput();
}

function onMidiFailure(){
    alert("No midi for you");
}

function listAllInputAndOutput(){
    var inPorts = "<h1> Input ports </h1>";
    inPorts += '<ul>';
    midi.inputs.forEach(function (input, key) {
        inPorts += '<li>Input port "' + key + '"';
        inPorts += '<ul>';
        inPorts += '<li>id: "' + input.id + '" (uguale al valore di key)</li>';
        inPorts += '<li>type: "' + input.type + '"</li>';
        inPorts += '<li>manufacturer: "' + input.manufacturer + '"</li>';
        inPorts += '<li>name: "' + input.name + '"</li>';
        inPorts += '<li>version: "' + input.version + '"</li>';
        inPorts += '</ul>';
        inPorts += '</li>'
    });
    inPorts += '</ul>';
    outPorts = "<h1> Output ports </h1>";
    outPorts += '<ul>';
    midi.outputs.forEach(function (input, key) {
        outPorts += '<li> Input port ' + key;
        outPorts += '<ul>';
        outPorts += '<li> id: ' + input.id + '</li>';
        outPorts += '<li>  type: ' + input.type + '</li> ';
        outPorts += '<li> manufactured : ' + input.manufacturer + '</li>';
        outPorts += '<li>name: "' + input.name + '"</li>';
        outPorts += '<li>version: "' + input.version + '"</li>';
        outPorts += '</ul>';
        outPorts += '</li>';
    });

    outPorts += '</ul>';
    document.getElementById('esito').innerHTML = inPorts + outPorts;
}
