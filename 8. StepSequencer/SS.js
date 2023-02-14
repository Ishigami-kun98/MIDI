const X = 8;
const Y = 8;
var list = new Array(X);
function prepareTable() {
    var stringCells = "";
    
    var dim_x = (90 - (X - 1)) / X; // 90 è la dimensione orizzontale del riquadro; (X - 1) consente di introdurre degli spazi bianchi
    var dim_y = (90 - (Y - 1)) / Y; // 90 è la dimensione verticale del riquadro; (Y - 1) consente di introdurre degli spazi bianchi
    for (var i = 0; i < Y * X; i++) // grazie a display: flex e il wrapping, è sufficiente un unico ciclo (ma ai passaggi successivi...)
        stringCells += "<div class='cell' style='width:" + dim_x + "vh; height:" + dim_y + "vh' id="+Math.trunc(i/8)+"_"+i%8+" onclick = 'onClick(this)'></div>";
    document.getElementById("container").innerHTML = stringCells;

    createArray();
}

function onClick(div){
    var position = div.id.split('_');
    var currentDiv = document.getElementById(div.id);
    console.log(list[position[0]][position[1]]);
    if(list[position[0]][position[1]] == 0){
        currentDiv.style.backgroundColor = "Orange";
        list[position[0]][position[1]] = 1;
    }else{
        currentDiv.style.backgroundColor = "DarkMagenta";
        list[position[0]][position[1]] = 0;
    }
}

function createArray(){
    for (var i = 0; i < X; i++){
        var l = new Array(Y);
        for (var j = 0; j < X; j++){
            l[j] = 0;
        }
        list[i] = l;
    }
    console.log(list);
}