var midi=null;
var currentOutput;
var x = 1;

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
    console.alert("No connection to midi");
}

function  settingUp(){
    var txt = "";
    for (var i = 1; i <= 8; i++){
        txt += "<option value="+i+">N."+i+"</option>";
    }
    document.getElementById("x").innerHTML = txt;

    var text = "";
    midi.outputs.forEach(function(output, key){
        if (text == ""){
            currentOutput = output;
        }
        text += "<option value="+key+">" + output.name + "</option>";
        

    });
    console.log(currentOutput);
    document.getElementById('chooseOutput').innerHTML = text;

    txt = "";
    midi.outputs.forEach(function(output, key){
        currentOutput = output;
    })
}

function chageOutput(value){
    currentOutput = midi.outputs.get(value);
}

function changeX(value){
    x = value;
}



function Play(){
    console.log("Click Play");
    var noteOn = [0x90, 48, 90];
    console.log(currentOutput);
    currentOutput.send(noteOn);
}
function Stop(){

}