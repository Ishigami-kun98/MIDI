midi = null
selectedOutput = null;

if (navigator){
    navigator.requestMIDIAccess().then(onMIDISuccess, onMidiFailure);
}else{
    console.alert("No midi for you");
}

function onMIDISuccess(sonoScemo){
    midi = sonoScemo;
    
    setup();
}

function onMidiFailure(){
    console.log("There is no MIDI for you");
}

function setup(){
    var text = '<h3> There is MIDI for you. All ready to go  </h3> '
    text += '<h4> Here"s the playable notes: </h4>';
    midi.outputs.forEach(function (input, key) {
        
        if (input.name == 'loopMIDI Port 1'){
            selectedOutput = key;
        }
    });
    text += '<p><a href="#" onClick = "PS(24, 3000)"> DO -> A0 500 ms (pitch 24)</a></p>';
    text += '<p><a href = "#" onClick = "PS(26, 500)"> RE -> B0 500ms s (pitch 26)</a></p>';
    text += '<p><a href = "#" onClick = "PS(28, 500)"> RE -> B0 500ms s (pitch 28)</a></p>';
    text += '<p><a href = "#" onClick = "PS(29, 500)"> RE -> B0 500ms s (pitch 29)</a></p>';
    text += '<p><a href = "#" onClick = "PS(31, 500)"> RE -> B0 500ms s (pitch 31)</a></p>';
    text += '<p><a href = "#" onClick = "PS(33, 500)"> RE -> B0 500ms s (pitch 33)</a></p>';
    text += '<p><a href = "#" onClick = "PS(35, 500)"> RE -> B0 500ms s (pitch 35)</a></p>';
    text += '<p><a href = "#" onClick = "PS(36, 500)"> DO2 -> B0 500ms s (pitch 35)</a></p>';
    document.getElementById('esito').innerHTML = text;
}

function PS(pitch, time){
    console.log(pitch, time);
    noteOn = [144, pitch, 100]
    noteOff = [144, pitch, 0];
    var output = midi.outputs.get(selectedOutput);
    output.send(noteOn);
    output.send(noteOff, window.performance.now() + time);
}