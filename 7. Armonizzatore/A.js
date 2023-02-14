var midi = null;
var currentOutput = null;
const chord = [[4,7], [3,8], [5,9],[3,7],[4,9],[5,8]]
var currentChord = 0;

if (navigator){
    navigator.requestMIDIAccess().then(onMIDISuccess, onMidiFailure);
}else{
    console.alert("没有midi给你");
}

function onMIDISuccess(s){
    midi = s;
    document.getElementById('logger').innerHTML = "你midi准备好了";
    settingUp();
    changeProgram(0, 43); // contrabbasso
    changeProgram(1, 41); // viola
    changeProgram(2, 40); // violino
}

function onMidiFailure(){
    console.alert("You are still a failure");
}

function settingUp(){
    // sfrutto variabile globale
		var outputsToString = "";
		midi.outputs.forEach(function (output, key) {
			if (outputsToString == "") {
				outputsToString += "<option selected='selected' value='" + key + "'>" + output.name + "</option>"; 
				currentOutput = output;
			} else {
				outputsToString += "<option value='" + key + "'>" + output.name + "</option>";
			}
            
		});
		document.getElementById("chooseOutput").innerHTML = outputsToString;
    
}

function manageNote(pitch1, play){
    var statusByte = play ? 0x90 : 0x80;
    var p1 =chord[currentChord][0];
    var p2 = chord[currentChord][1];
    var pitch2 = pitch1 + p1;
    var pitch3 = pitch1 + p2;
    var noteOn = [statusByte, pitch1, 127];
    var noteOn2 = [statusByte + 1, pitch2, 96];
    var noteOn3 = [statusByte + 1, pitch3, 96];

    currentOutput.send(noteOn);
    currentOutput.send(noteOn2);
    currentOutput.send(noteOn3);

    try{
        div1 = document.getElementById('div' + pitch1);
        div2 = document.getElementById('div' + pitch2);
        div3 = document.getElementById('div' + pitch3);
        if (play){
            div1.style.background = "SteelBlue";
            div2.style.background = "PowderBlue";
            div3.style.background = "PowderBlue";
        }else{
            if (pitch1 % 12 == 1 || pitch1 % 12 == 3 || pitch1 % 12 == 6 || pitch1 % 12 == 8 || pitch1 % 12 == 10)
                div1.style.backgroundColor = "black";
            else
                div1.style.backgroundColor = "ivory";
            if (pitch2 % 12 == 1 || pitch2 % 12 == 3 || pitch2 % 12 == 6 || pitch2 % 12 == 8 || pitch2 % 12 == 10)
                div2.style.backgroundColor = "black";
            else
                div2.style.backgroundColor = "ivory";
            if (pitch3 % 12 == 1 || pitch3 % 12 == 3 || pitch3 % 12 == 6 || pitch3 % 12 == 8 || pitch3 % 12 == 10)
                div3.style.backgroundColor = "black";
            else
                div3.style.backgroundColor = "ivory";
        }
    }catch{
        ;
    }
}

function chooseOutput(value){
    var allNotesOff = [0x90, 123, 0];
    currentOutput.send(allNotesOff);
    currentOutput = midi.outputs.get(value);
}

function changeAccord(which){
    currentChord = which;
}

function changeProgram(channel, patch) {
    var allNotesOffMsg = [176 + channel, 123, 0];  // 176 corrisponde a 0xB0 (Control Change di tipo All Notes Off)
    var programChangeMsg = [192 + channel, patch]; // 192 corrisponde a 0xC0
    currentOutput.send(allNotesOffMsg);
    currentOutput.send(programChangeMsg);
}