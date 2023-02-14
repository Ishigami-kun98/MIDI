var midi = null;
var selectedOutput = null;


if(navigator){
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFAilure);
}else{
    console.alert("There is no midi for you, go out shhshh");
}

function onMIDISuccess(whatTheHayyl){
    midi = whatTheHayyl;
    setup();
}
function onMIDIFAilure(){
    console.log("5pm reminder, you'are still a failure");
}

function ChangeOutput(value){
    
    document.getElementById("output").innerHTML = "selected Output is : " + value;
    selectedOutput = midi.outputs.get(value);
}

function Play(){
    selectedOutput.send([0x90, 60, 96, 0x91, 48, 127]); 								// 2 Note-On, sui canali 1 e 2
    selectedOutput.send([0x80, 60, 0, 0x90, 62, 96], window.performance.now() + 500);  	// Note-Off, Note-On sul canale 1
    selectedOutput.send([0x80, 62, 0, 0x90, 64, 96], window.performance.now() + 1000); 	// Note-Off, Note-On sul canale 1
    selectedOutput.send([0x80, 64, 0, 0x90, 60, 96], window.performance.now() + 1500);	// ...
    selectedOutput.send([0x80, 60, 0, 0x90, 60, 96], window.performance.now() + 2000);
    selectedOutput.send([0x80, 60, 0, 0x90, 62, 96], window.performance.now() + 2500);
    selectedOutput.send([0x80, 62, 0, 0x90, 64, 96], window.performance.now() + 3000);
    selectedOutput.send([0x80, 64, 0, 0x90, 60, 96], window.performance.now() + 3500);
    selectedOutput.send([0x80, 60, 0, 0x81, 48, 0], window.performance.now() + 4500);	// 2 Note-Off, sui canali 1 e 2
}
function Stop1(){
    selectedOutput.send([176, 123, 0]); // All Notes Off, canale 1
    selectedOutput.send([177, 123, 0]); // All Notes Off, canale 2
}
function Stop2(){
    selectedOutput.close();
}

function setup(){
    var lastPort = null;
    var t = '<p> MIDI rilevato e pronto! </p>';
    t += '<p> Output MIDI </p>';
    t += '<p> <select name="Choose Output" id="Choose Output" onChange="ChangeOutput(value)"> <option>--Select an output</option>';
    midi.outputs.forEach(function(output, key) {
        t += "<option value='" + output.id + "'>" + output.name + "</option>";
        lastPort = key;
    });
    t += '</select> </p> <p id="output"> selected Output is : ' + lastPort + '</p>';
    console.log(t)
    t += '<input type="button" value="Play" onClick="Play()">        ';
    t += '<input type="button" value="Stop1" onClick="Stop1()">         ';
    t += '<input type="button" value="Stop2" onClick="Stop2()">';
    document.getElementById('esito').innerHTML = t;
    selectedOutput = midi.outputs.get(lastPort);
}
