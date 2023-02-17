var midi = null;
var currentOutput;
var pitch = 64;
var limit = 16;
var start = 1;
var attempt = 0;
var azzeccato = [false, false, false, false];
var ready = false;
if (navigator){
    navigator.requestMIDIAccess().then(onSuccess, onFail);
}else{
    console.alert("No midi");
}

function onSuccess(midiAccess){
    midi = midiAccess;
    settingUp();
}

function onFail(){
    console.log("No connection to midi");
}

function settingUp(){
    var txt = "";
    midi.outputs.forEach(function(output, key){
        if (txt == ""){
            currentOutput = output;
        }
        txt += "<option value="+key+ ">"+output.name+ "</option>";
    });
    document.getElementById('chooseOutput').innerHTML = txt;
    midi.inputs.forEach(function(input){

        input.onmidimessage = getMidiInput;
    });
}

function onchange(value){

}

var myTimer;
function playMelody(){
    start *=2;
    if(start <= limit){
        document.getElementById('inputs').innerHTML = "";
        clearInterval(myTimer);
        myTimer = setInterval(playMelody, 1000);
        currentOutput.send([144, pitch + start, 90]);
    }else{
        clearInterval(myTimer);
        start = 1;
        ready = true;
    }
}

function getMidiInput(midiInput){
    console.log(midiInput);
    if (ready){
        var input = midiInput.data;
        console.log(input[1]);
        var statusByte = input[0];
        if(Math.floor(statusByte/16) == 9){
            let txt = "";
            attempt++;
            if (input[1] == pitch + Math.pow(2, attempt)){
                azzeccato[attempt-1] = true;
                txt += " this one is correct";
            }
            
            txt += " pitch # " + attempt + "is " + input[1] + "<br>";
            document.getElementById('inputs').innerHTML += txt;
            if (attempt == 4){
                let result = true;
                for (var i = 0; i < azzeccato.length; i++){
                    if(!azzeccato[i]){
                        result = false;
                        break;
                    }
                }
                azzeccato = [false, false, false, false];
                attempt = 0;
                ready = false;
                document.getElementById('inputs').innerHTML += "<br> the result is: " + result;
                
            }
        }
    }

}